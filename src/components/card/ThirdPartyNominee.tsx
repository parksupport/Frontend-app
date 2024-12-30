import { groteskText, groteskTextMedium } from "@/app/fonts";
import React, { useRef, useState } from "react";
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

/* -------------------------------------------------------------------------- */
/*                        ThirdPartyNominees (Listing)                        */
/* -------------------------------------------------------------------------- */

interface ThirdPartyNomineesProps {
  toggleForm: (state: boolean) => void;
  nominees: any[];
  vehiclesRegNunbers: string;
  user_type: "individual" | "corporate";
  loading?: boolean;
}

export default function ThirdPartyNominees({
  user_type,
  toggleForm,
  vehiclesRegNunbers,
  nominees,
  loading,
}: ThirdPartyNomineesProps) {
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

  const isMobile = useIsMobile();

  return (
    <div className="py-12 mb-40">
      {/* Header */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center">
          <h1
            className={`text-wrap text-black text-[22px] md:text-[30px] ${groteskTextMedium.className}`}
          >
            {`Vehicle ${vehiclesRegNunbers}`}
          </h1>
          <h1
            className={`${groteskText.className} text-[18px] md:text-[26px] leading-none`}
          >
            Notification Recipient History
          </h1>
        </div>
        <button
          className={`whitespace-nowrap hover:underline text-[#4169E1] md:text-[18px] text-[18px] ${groteskTextMedium.className}`}
          onClick={() => toggleForm(true)}
        >
          Add Recipient
        </button>
      </div>

      {loading ? (
        <div>Loading...</div> // You can add a loading spinner or any other content here
      ) : (
        <div>
          {isMobile ? (
            <NomineeMobile
              user_type={user_type}
              registarationNumber={vehiclesRegNunbers}
              nominees={data}
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
              nominees={data}
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
    </div>
  );
}

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
            const expiredLease = endDate < today;

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
                      nominee.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {nominee.status === "active" ? "Active" : "Not Active"}
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
                    className="text-black"
                  />
                </div>
                {/* Email */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Email Address</span>
                  <TruncatedText
                    text={nominee?.email}
                    maxLength={22}
                    className="text-black"
                  />
                </div>
                {/* Status */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <div
                    className={`flex items-center justify-center w-[100px] py-1 rounded-full text-xs font-semibold ${
                      nominee?.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {nominee?.status === "active" ? "Active" : "Not Active"}
                  </div>
                </div>
                {/* Phone */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone Number</span>
                  <span className="text-black">{nominee?.phone}</span>
                </div>
                {/* Only show start/end dates if corporate */}
                {user_type === "corporate" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Start Date</span>
                      <TruncatedText
                        text={nominee?.start_date}
                        maxLength={22}
                        className="text-black"
                      />
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">End Date</span>
                      <TruncatedText
                        text={nominee?.end_date}
                        maxLength={22}
                        className="text-black"
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
  vehiclesRegNunbers?: string;
  toggleForm?: (bool: boolean) => void;
  openAddVehicleDetailsDrawer?: () => void;
  selectedVehicle?: any;
  user_type?: any;
}

export function AddThirdPartyNominee({
  vehiclesRegNunbers,
  toggleForm,
  openAddVehicleDetailsDrawer,
  selectedVehicle,
  user_type,
}: AddThirdPartyNomineeProps) {
  const [hasError, setHasError] = useState(false);
  const [isIndefiniteEndDate, setIndefiniteEndDate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    start_date: "2024-01-01", // Example defaults
    end_date: "2024-01-30", // Example defaults
  });

  const { addNominee } = useAddNominee();

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

  return (
    <div className="py-12 mb-24">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex flex-col items-center">
            <h1
              className={`text-wrap text-black text-[22px] md:text-[32px] leading-none ${groteskTextMedium.className}`}
            >
              {`Vehicle ${vehiclesRegNunbers || ""}`}
            </h1>
            <h1
              className={`${groteskText.className} text-[18px] md:text-[26px] leading-none`}
            >
              Add Notification Recipient
            </h1>
          </div>
          <div
            className={`text-[#4169E1] text-[18px] hover:underline ${groteskText.className}`}
            onClick={() => toggleForm?.(false)}
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
                    handleEndDateChange={() =>
                      setIndefiniteEndDate(!isIndefiniteEndDate)
                    }
                  />
                </div>

                {hasError && (
                  <p className="flex justify-end text-right text-red-600 text-[12px] mt-1">
                    End date should be after start date
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              variant="quinary"
              className="py-[10px] px-[12px] w-full md:w-[500px]"
            >
              Add Nominee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
