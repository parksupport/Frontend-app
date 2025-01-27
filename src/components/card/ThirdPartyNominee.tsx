import { groteskText, groteskTextMedium } from "@/app/fonts";
import React, { useEffect, useRef, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Button from "../Buttons";
import InputField from "../InputField";
import useIsMobile from "@/hooks/useIsMobile";
import DropdownInputField from "../DropdownInputField";
import useDeleteRow from "@/hooks/useDeleteRow";
import Slider from "react-slick";
import DeleteRowModal from "../DeleteRowModal";
import TruncatedText from "../ToggleComponent/TruncatedText";
import { CustomDatePicker } from "../dataPicker";
import { useAddNominee } from "@/hooks/mutations/nominee";
import { useGetProfile } from "@/hooks/queries/profile";
import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "../Drawer/ModalComponent";
import SubscriptionPlans from "../Subscription";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

/* -------------------------------------------------------------------------- */
/*                        ThirdPartyNominees (Listing)                        */
/* -------------------------------------------------------------------------- */

interface ThirdPartyNomineesProps {
  toggleForm: (state: boolean) => void;
  nominees: any[];
  selectedVehicle: any;
  user_type: "individual" | "corporate";
  loading?: boolean;
  openAddBillingMethod?: any;
  vehiclesRegNunbers?: any;
}

export default function ThirdPartyNominees({
  user_type,
  toggleForm,
  selectedVehicle,
  nominees,
  loading,
  openAddBillingMethod,
}: // vehiclesRegNunbers
ThirdPartyNomineesProps) {
  const {
    openDropdownIndex,
    data,
    showConfirmButton,
    selectedDataIndex,
    toggleDropdown,
    handleDelete,
    showDeleteConfirmation,
    cancelDelete,
    setShowConfirmButton,
    setOpenDropdownIndex,
  } = useDeleteRow(nominees, "nominee");

  const vehiclesRegNunbers = selectedVehicle?.registration_number;
  const status = selectedVehicle?.verification_status;

  const isMobile = useIsMobile();

  const { profile } = useGetProfile();
  const plan_id = profile?.userplan?.plan;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const AddRecipientsWithPlan = (plan_id, nominees, status) => {
    if (status === "Verified") {
      // Filter nominees with status "Active"
      const activeNominees = nominees.filter(
        (nominee) => nominee.status === "Active"
      );

      if (plan_id === 1) {
        onOpen();
      } else if (plan_id === 2 && activeNominees.length === 1) {
        onOpen();
      } else if (plan_id === 3 && activeNominees.length === 3) {
        onOpen();
      } else {
        toggleForm(true);
      }
    } else {
      onOpen();
    }
  };

  function updateNomineesWithEndDate(
    data: { end_date: string }[]
  ): { end_date: string }[] {
    const ONE_HUNDRED_YEARS = 100 * 365 * 24 * 60 * 60 * 1000; // 100 years in milliseconds
    const now = new Date();

    return data.map((nominee) => {
      const endDate = new Date(nominee.end_date);

      // Use .getTime() to convert Date objects to timestamps for comparison
      if (endDate.getTime() - now.getTime() > ONE_HUNDRED_YEARS) {
        return { ...nominee, end_date: "Infinite" };
      }

      return nominee;
    });
  }

  const updatedNominees = updateNomineesWithEndDate(data);

  return (
    <div className="py-12 mb-40">
      {/* Header */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center">
          <h1
            className={`text-wrap text-black text-[22px] md:text-[30px] ${groteskTextMedium.className}`}
          >
            {`Vehicle ${vehiclesRegNunbers?.toUpperCase()}`}
          </h1>
          <h1
            className={`${groteskText.className} text-[18px] md:text-[26px] leading-none`}
          >
            Notification Recipient History
          </h1>
        </div>
        <button
          className={`whitespace-nowrap hover:underline text-[#4169E1] md:text-[18px] text-[18px] ${
            groteskTextMedium.className
          } ${!vehiclesRegNunbers ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => AddRecipientsWithPlan(plan_id, data, status)}
          disabled={!vehiclesRegNunbers}
        >
          Add Recipient
        </button>
      </div>

      {loading ? (
        <div>Loading...</div> // You can add a loading spinner or any other content here
      ) : data.length === 0 ? (
        <div className="h-[300px] border  rounded-[8px] flex items-center justify-center flex-col">
          <div className="flex flex-col items-center justify-center ">
            <div className={`${groteskTextMedium.className} text-[32px]`}>
              No Nominee Yet
            </div>
            <Image
              src={require(`@/assets/images/contravention_emptyState.png`)}
              alt=""
              sizes="width: 200px"
              // className="max-w-[222px] "
            />
          </div>
        </div>
      ) : (
        <div>
          {isMobile ? (
            <NomineeMobile
              user_type={user_type}
              registarationNumber={vehiclesRegNunbers}
              nominees={updatedNominees}
              showDeleteConfirmation={showDeleteConfirmation}
              showConfirmButton={showConfirmButton}
              cancelDelete={cancelDelete}
              handleDelete={handleDelete}
              selectedDataIndex={selectedDataIndex}
              setShowConfirmButton={setShowConfirmButton}
            />
          ) : (
            <NomineeDesktop
              user_type={user_type}
              registarationNumber={vehiclesRegNunbers}
              nominees={updatedNominees}
              showDeleteConfirmation={showDeleteConfirmation}
              showConfirmButton={showConfirmButton}
              cancelDelete={cancelDelete}
              openDropdownIndex={openDropdownIndex}
              toggleDropdown={toggleDropdown}
              handleDelete={handleDelete}
              selectedDataIndex={selectedDataIndex}
              onCloseModal={() => setOpenDropdownIndex(null)}
            />
          )}
        </div>
      )}

      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        display={
          <AddNOmineesSubscription
            status={status}
            plan={plan_id}
            closeModal={onClose}
            openAddBillingMethod={openAddBillingMethod}
          />
        }

        // toggleDrawer={toggleDrawer}
        // openAddBillingMethod={openAddBillingMethod}
      />
    </div>
  );
}

interface AddNOmineesSubscriptionProps {
  plan: number;
  status: string;
  closeModal: () => void;
  openAddBillingMethod: (id: string, isSubscription?: boolean) => void;
}
const AddNOmineesSubscription = ({
  plan,
  status,
  closeModal,
  openAddBillingMethod,
}: AddNOmineesSubscriptionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderPlanMessage = () => {
    if (plan === 2 && status === "Verified") {
      return (
        <p className="text-lg font-medium text-gray-800">
          You can only add one (1) recipient per vehicle with your current plan.
          Please upgrade to add more recipients .
        </p>
      );
    }
    if (plan === 3 && status === "Verified") {
      return (
        <p className="text-lg font-medium text-gray-800">
          You can only add three (3) recipient per vehicle with your current
          plan. Please upgrade to add more recipients.
        </p>
      );
    }
    if (status !== "Verified") {
      return (
        <p className="text-lg font-medium text-gray-800">
          You need to verify your vehicle to add recipients
        </p>
      );
    }
    return null;
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      {/* Modal for Subscription Plans */}
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        type="subscription"
        display={
          <SubscriptionPlans
            onClick={(plan) => {
              openAddBillingMethod(plan);
              onClose();
              closeModal();
            }}
          />
        }
      />

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        onClick={closeModal}
        aria-label="Close"
      >
        <MdClose size={24} />
      </button>

      {/* Subscription Message */}
      <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
        {renderPlanMessage()}

        <button
          className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={
            status !== "Verified"
              ? () => {
                  console.log("Unverified");
                }
              : onOpen
          }
        >
          {status !== "Verified" ? "Verify Now" : "Subscribe Now"}
        </button>
      </div>
    </div>
  );
};

/* --------------------------- NomineeDesktop Table -------------------------- */

const NomineeDesktop = ({
  user_type,
  nominees,
  showDeleteConfirmation,
  showConfirmButton,
  cancelDelete,
  openDropdownIndex,
  toggleDropdown,
  handleDelete,
  selectedDataIndex,
  onCloseModal,
  registarationNumber,
}) => {
  return (
    <div className="   rounded-[12px] border border-gray-300 pb-2 ">
      <table className=" bg-white text-black min-w-[600px] min-h-[200px] ">
        <thead>
          <tr
            className={`text-[#667185] text-[22px] border-b w-full ${groteskText.className}`}
          >
            <th className="text-end px-2">&nbsp;</th>
            <th className="whitespace-nowrap py-2 px-2 text-left">Name</th>
            <th className="whitespace-nowrap px-2 text-left">Status</th>
            <th className="whitespace-nowrap px-2 text-left">Email Address</th>
            <th className="whitespace-nowrap px-2 text-left">Phone Number</th>
            {user_type === "corporate" && (
              <>
                <th className="whitespace-nowrap px-2 text-left">Start Date</th>
                <th className="whitespace-nowrap px-2 text-left">End Date</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {nominees?.map((nominee, index) => {
            const endDate = new Date(nominee.endDate);
            const today = new Date();
            const expiredLease =
              endDate < today || nominee?.status === "Inactive";

            return (
              <tr key={index} className="hover:bg-gray-50 relative">
                {/* Action Column */}
                <td className="cursor-pointer pt-2 text-end pr-2 whitespace-nowrap relative">
                  <button
                    className="text-gray-500 px-1 hover:text-gray-900 hover:font-bold"
                    onClick={() => toggleDropdown(index)}
                  >
                    &#8942;
                  </button>
                  {openDropdownIndex === index && (
                    <DeleteRowModal
                      showConfirmButton={showConfirmButton}
                      onEdit={() => {}}
                      onRemove={() => showDeleteConfirmation(index)}
                      onCancelDelete={cancelDelete}
                      onConfirmDelete={() =>
                        handleDelete(index, registarationNumber)
                      }
                      selectedDataIndex={selectedDataIndex}
                      index={index}
                      customStyles={`${groteskText.className} text-[14px]`}
                      position={{ right: -110, top: 30 }}
                      removeAddButton
                      expiredLease={expiredLease}
                      onClose={onCloseModal}
                    />
                  )}
                </td>

                {/* Name */}
                <td
                  className={`pt-2 px-2 whitespace-nowrap text-[18px] ${groteskText.className}`}
                >
                  <TruncatedText
                    text={nominee?.name}
                    maxLength={20}
                    className={groteskText.className}
                  />
                </td>
                {/* Status */}
                <td
                  className={`pt-2 px-2 whitespace-nowrap text-[18px] ${groteskText.className}`}
                >
                  <div
                    className={`flex items-center justify-center w-[100px] py-1 rounded-full text-xs font-semibold whitespace-nowrap  ${
                      nominee.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {nominee.status === "Active" ? "Active" : "Not Active"}
                  </div>
                </td>

                {/* Email */}
                <td
                  className={`pt-2 px-2 whitespace-nowrap text-[18px] ${groteskText.className}`}
                >
                  <TruncatedText
                    text={nominee?.email}
                    maxLength={25}
                    className={groteskText.className}
                  />
                </td>

                {/* Phone */}
                <td
                  className={`pt-2 px-2 whitespace-nowrap text-[18px] ${groteskText.className}`}
                >
                  {nominee?.phone}
                </td>

                {/* Start/End Date for corporate */}
                {user_type === "corporate" && (
                  <>
                    <td
                      className={`pt-2 px-2 text-[18px] whitespace-nowrap ${groteskText.className}`}
                    >
                      <TruncatedText
                        text={nominee?.start_date}
                        maxLength={10}
                        className={groteskText.className}
                      />
                    </td>
                    <td
                      className={`pt-2 px-2 text-[18px] whitespace-nowrap ${groteskText.className}`}
                    >
                      <TruncatedText
                        text={nominee?.end_date}
                        maxLength={10}
                        className={groteskText.className}
                      />
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* ----------------------- NomineeMobile (Slider View) ----------------------- */

export const NomineeMobile = ({
  user_type,
  registarationNumber,
  nominees,
  showDeleteConfirmation,
  showConfirmButton,
  cancelDelete,
  handleDelete,
  selectedDataIndex,
  setShowConfirmButton,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);

  const toggleActions = () => setShowActions((prev) => !prev);

  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentIndex(index),
  };

  const handlePrevious = () => {
    if (currentIndex > 0 && sliderRef.current) {
      sliderRef.current.slickGoTo(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < nominees.length - 1 && sliderRef.current) {
      sliderRef.current.slickGoTo(currentIndex + 1);
    }
  };

  // Close actions if clicked outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
        setShowConfirmButton(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowConfirmButton]);

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-full max-w-md p-4 bg-white rounded-[12px] border-[#D0D5DD] border mb-4">
        {/* Actions Button */}
        <div className="flex justify-end items-center pb-3">
          <button
            onClick={() => {
              toggleActions();
              setShowConfirmButton(false);
            }}
            className="text-gray-600"
          >
            <IoEllipsisVertical size={20} />
          </button>
        </div>

        {/* Actions Dropdown */}
        {showActions && (
          <div
            className="rounded-[8px] bg-white right-0 absolute z-10"
            ref={actionsRef}
            style={{ top: 40 }}
          >
            <div className="border border-gray-200 rounded-[8px] shadow-lg p-1">
              <button
                className={`w-full flex items-center px-[1px] py-2 text-[14px] ${
                  nominees[currentIndex] &&
                  new Date(nominees[currentIndex].endDate) < new Date()
                    ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                    : "text-red-600 hover:bg-gray-100"
                }`}
                onClick={() => showDeleteConfirmation(currentIndex)}
                disabled={
                  nominees[currentIndex] &&
                  new Date(nominees[currentIndex].endDate) < new Date()
                }
              >
                <FiTrash2 className="mr-2" />
                End Nomination
              </button>
            </div>
            {/* Confirm Buttons */}
            {showConfirmButton && selectedDataIndex === currentIndex && (
              <div className="flex justify-between gap-2 mt-1">
                <button
                  className="absolute bg-white border border-red-400 rounded-[8px] p-1 text-red-600 hover:bg-gray-100"
                  onClick={cancelDelete}
                  style={{ top: 40, right: 40 }}
                >
                  <MdClose size={25} />
                </button>
                <button
                  className="absolute bg-white border border-green-400 rounded-[8px] p-1 text-green-700 hover:bg-gray-100"
                  style={{ top: 40, right: 5 }}
                  onClick={() => {
                    handleDelete(currentIndex);
                    setShowActions(false);
                  }}
                >
                  <IoMdCheckmark size={25} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Slider Component */}
        <Slider ref={sliderRef} {...settings}>
          {nominees?.map((nominee, index) => {
            const endDate = new Date(nominee?.endDate);
            const today = new Date();
            const expiredLease = endDate < today;

            return (
              <div
                key={index}
                className="border p-4 rounded-[12px] bg-[#F9FAFB] space-y-2"
              >
                {/* Name */}
                <div
                  className={`flex justify-between ${groteskText.className}`}
                >
                  <span className="text-gray-500">Name</span>
                  <TruncatedText
                    text={nominee?.name}
                    maxLength={22}
                    className={`text-black text-[16px] ${groteskText.className}`}
                  />
                </div>
                {/* Email */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Email Address</span>
                  <TruncatedText
                    text={nominee?.email}
                    maxLength={22}
                    className={`text-black text-[16px] ${groteskText.className}`}
                  />
                </div>
                {/* Status */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <div
                    className={`${
                      groteskText.className
                    } flex items-center justify-center w-[100px] py-1 rounded-full text-sm font-semibold ${
                      nominee?.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {nominee?.status}
                  </div>
                </div>
                {/* Phone */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone Number</span>
                  <span
                    className={`text-black text-[16px] ${groteskText.className}`}
                  >
                    {nominee?.phone}
                  </span>
                </div>
                {/* Only show start/end dates if corporate */}
                {user_type === "corporate" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date</span>
                      <TruncatedText
                        text={nominee?.start_date}
                        maxLength={22}
                        className={`text-black text-[16px] ${groteskText.className}`}
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date</span>
                      <TruncatedText
                        text={nominee?.end_date}
                        maxLength={22}
                        className={`text-black text-[16px] ${groteskText.className}`}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </Slider>

        {/* Manual Prev/Next */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            className={`w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[14px] ${
              currentIndex === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1C1B1B]"
            }`}
            disabled={currentIndex === 0}
          >
            &lt; Previous
          </button>

          {/* Dot Indicators */}
          <div className="flex space-x-1">
            {nominees?.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-[#667185]" : "bg-[#E4E7EC]"
                }`}
              ></span>
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[14px] ${
              currentIndex === nominees?.length - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1C1B1B]"
            }`}
            disabled={currentIndex === nominees?.length - 1}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                         AddThirdPartyNominee Form                          */
/* -------------------------------------------------------------------------- */

interface AddThirdPartyNomineeProps {
  toggleForm?: (bool: boolean) => void;
  openAddVehicleDetailsDrawer?: () => void;
  selectedVehicle?: any;
  user_type?: any;
  setSelectedVehicle?: any;
  data?: any;
  vehiclesRegNunbers?: any;
  addNominee?:any;
}

export function AddThirdPartyNominee({
  selectedVehicle,
  toggleForm,
  user_type,
  setSelectedVehicle,
  data,
  addNominee,
}: // vehiclesRegNunbers,
AddThirdPartyNomineeProps) {
  const [hasError, setHasError] = useState(false);
  const [isIndefiniteEndDate, setIndefiniteEndDate] = useState(false);
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const vehiclesRegNunbers = selectedVehicle?.registration_number;

  const [smsNotifications, setSmsNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  useEffect(() => {
    if (isIndefiniteEndDate) {
      // Set end_date to 500 years from now
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 500);

      // Convert to ISO string format without the time part
      setEndDate(futureDate.toISOString().split("T")[0]);
    } else {
      setEndDate("");
    }
  }, [isIndefiniteEndDate]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      end_date: endDate,
    }));
  }, [endDate]);

  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: endDate,
  });

  // const { addNominee, isLoading } = useAddNominee();

  const UserInputFields = [
    {
      type: "text",
      placeholder: "Enter your full name",
      label: "Name",
      name: "name",
      value: formData.name,
    },
    {
      type: "email",
      placeholder: "Enter your email address",
      label: "Email Address",
      name: "email_address",
      value: formData.email_address,
    },
    {
      type: "text",
      placeholder: "Enter your phone number",
      label: "Phone Number",
      name: "phone_number",
      value: formData.phone_number,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDateValidation(); // Ensure date logic is correct before final submit

    if (!hasError) {
      addNominee({
        registration_number: vehiclesRegNunbers,
        data: formData,
      });

      if (user_type === "corporate") {
        const selectedVehicle = data.find(
          (vehicle) => vehicle.registration_number === vehiclesRegNunbers
        );
        setSelectedVehicle(selectedVehicle);
      }

      toggleForm?.(false);
    }
  };

  const handleDateValidation = () => {
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (!isIndefiniteEndDate && startDate >= endDate) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleSms = (checked: boolean) => {
    setSmsNotifications(checked);
  };

  const handleToggleEmail = (checked: boolean) => {
    setEmailNotifications(checked);
  };

  return (
    <div className="py-12 mb-24">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex flex-col items-center">
            <h1
              className={`text-wrap text-black text-[22px] md:text-[32px] leading-none ${groteskTextMedium.className}`}
            >
              {`Vehicle ${vehiclesRegNunbers.toUpperCase() || ""}`}
            </h1>
            <h1
              className={`${groteskText.className} text-[18px] md:text-[26px] leading-none`}
            >
              Add Notification Recipient
            </h1>
          </div>
          <div
            className={`text-[#4169E1] text-[18px] hover:underline ${
              groteskText.className
            } ${
              !vehiclesRegNunbers
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }`}
            onClick={() => vehiclesRegNunbers && toggleForm?.(false)} // Prevent click when vehiclesRegNumbers is empty
          >
            View all
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 items-center">
            {UserInputFields.map((field) => (
              <InputField
                key={field.name}
                type={field.type}
                placeholder={field.placeholder}
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={handleChange}
                variant="individual"
                className={`${groteskText.className}  w-[90%] md:w-[500px]`}
              />
            ))}

            {/* Only show these date fields if user is "corporate" */}
            {user_type === "corporate" && (
              <div className="flex flex-col w-[90%] md:w-[500px]">
                <div className="flex gap-3">
                  <CustomDatePicker
                    label="Enter Start Date"
                    value={formData.start_date}
                    onChange={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        start_date: date.toISOString().split("T")[0],
                      }))
                    }
                    placeholder="Enter Lease start date"
                    className={`${groteskText.className} w-[50%]`}
                  />
                  <CustomDatePicker
                    label="Enter End Date"
                    value={formData.end_date}
                    onChange={(date) =>
                      setFormData((prev) => ({
                        ...prev,
                        end_date: date.toISOString().split("T")[0],
                      }))
                    }
                    placeholder="Enter Lease end date"
                    className={`${groteskText.className} w-[50%]`}
                    error={hasError}
                    indefinite
                    endDate={isIndefiniteEndDate}
                    handleEndDateChange={() => {
                      setIndefiniteEndDate(!isIndefiniteEndDate);
                    }}
                  />
                </div>

                {hasError && (
                  <p className="flex justify-end text-right text-red-600 text-[12px] mt-1">
                    End date should be after start date
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center gap-[8px] w-[90%] md:w-[500px] mt-2">
              <div
                className={`flex text-[16px] md:text-[20px]  ${groteskText.className} `}
              >
                {" "}
                Receipent Notification Preference :
              </div>
              <div className={`flex ${groteskText.className} gap-[4px] `}>
                <div className="flex items-center gap-[8px]">
                  <label
                    className={`text-[20px] text-[#000000] ${groteskText.className}`}
                  >
                    Sms
                  </label>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={handleToggleSms}
                  />
                </div>
                <div className="flex items-center gap-[8px]">
                  <label
                    className={`text-[20px] text-[#000000] ${groteskText.className}`}
                  >
                    Email
                  </label>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={handleToggleEmail}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="quinary"
              className="py-[10px] px-[12px] w-[90%] md:w-[500px]"
            >
              Add Nominee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
