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
import { CiEdit } from "react-icons/ci";
import TruncatedText from "../ToggleComponent/TruncatedText";
import StartDateForm, { CustomDatePicker } from "../dataPicker";

interface ThirdPartyNomineesProps {
  toggleForm: (state: boolean) => void;
  nominees: any;
}

export default function ThirdPartyNominees({
  toggleForm,

  nominees,
}: ThirdPartyNomineesProps) {
  const ThirdPartyNominee = nominees.nominees;
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
  } = useDeleteRow(ThirdPartyNominee);

  const isMobile = useIsMobile();

  console.log("data", data);

  return (
    <div className="py-12 mb-[300px]">
      {/* Header */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="text-center">
          <h1
            className={`text-wrap text-black text-[22px] md:text-[24px] ${groteskTextMedium.className}`}
          >
            {`Vehicle ${nominees.registrationNumber}`}
          </h1>
          <h1 className={`${groteskText.className} text-[18px] leading-none`}>
            Notification Recipient History
          </h1>
        </div>
        <button
          className={`whitespace-nowrap hover:underline text-[#4169E1] text-[18px] ${groteskTextMedium.className}`}
          onClick={() => toggleForm(true)}
        >
          Add Recipient
        </button>
      </div>

      {isMobile ? (
        <NomineeMobile
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
          nominees={data}
          showDeleteConfirmation={showDeleteConfirmation}
          showConfirmButton={showConfirmButton}
          cancelDelete={cancelDelete}
          openDropdownIndex={openDropdownIndex}
          toggleDropdown={toggleDropdown}
          handleDelete={handleDelete}
          selectedDataIndex={selectedDataIndex}
        />
      )}
    </div>
  );
}

interface AddThirdPartyNomineeProps {
  vehiclesRegNunbers?: any;
  toggleForm?: any;
  addVehicle?: () => void;
  nominees?: any;
  user?: any;
}

export function AddThirdPartyNominee({
  vehiclesRegNunbers,
  toggleForm,
  addVehicle,
  nominees,
  user,
}: AddThirdPartyNomineeProps) {
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    vehicle: "",
    phone_number: "",
    start_date: "",
    end_date: "",
  });

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

    // Trigger date validation before submitting
    handleDateValidation();

    if (!hasError) {
      // Proceed with form submission logic, e.g., addVehicle();
      toggleForm(false); // Close the form after submission
    }
  };

  const handleDateValidation = () => {
    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    if (startDate >= endDate) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="py-12 mb-[300px] ">
      <div className="flex flex-col">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex flex-col items-center">
            <h1
              className={`text-wrap text-black text-[22px] md:text-[24px] ${groteskText.className}`}
            >
              {`Vehicle ${nominees.registrationNumber}`}
            </h1>
            <h1 className={`${groteskText.className} text-[18px] leading-none`}>
              Add Notification Recipient
            </h1>
          </div>
          <div
            className={`text-[#4169E1] text-[18px] hover:underline ${groteskText.className}`}
            onClick={() => toggleForm(false)}
          >
            View all
          </div>
        </div>

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
                className={`${groteskText.className} w-[90%] md:w-[75%]`}
              />
            ))}

            {user === "Corporate" && (
              <div className="flex flex-col">
                <div className="flex gap-3">
                  <CustomDatePicker
                    label="Enter Start Date"
                    value={formData.start_date}
                    onChange={(date) =>
                      handleChange({
                        target: { name: "start_date", value: date },
                      })
                    }
                    placeholder="Enter Lease start date"
                    className={`${groteskText.className} w-[90%] md:w-[65%]`}
                  />
                  <CustomDatePicker
                    label="Enter End Date"
                    value={formData.end_date}
                    onChange={(date) =>
                      handleChange({
                        target: { name: "end_date", value: date },
                      })
                    }
                    placeholder="Enter Lease end date"
                    className={`${groteskText.className} w-[90%] md:w-[65%]`}
                    error={hasError} // Show error if date is invalid
                  />
                </div>

                {hasError && (
                  <p className="flex justify-end text-right text-red-600 text-[12px] leading-none mt-1">
                    End date should be after start date
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              variant="quinary"
              className="py-[10px] px-[12px] w-[80%] md:w-[65%]"
            >
              Add Nominee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const NomineeDesktop = ({
  nominees,
  showDeleteConfirmation,
  showConfirmButton,
  cancelDelete,
  openDropdownIndex,
  toggleDropdown,
  handleDelete,
  selectedDataIndex,
}) => {
  return (
    <div className=" overflow-x-auto max-w-[calc(100vh-200px)] rounded-[12px] border border-gray-300 pb-2 ">
      <table className="overflow-auto-y min-w-full bg-white text-black h-[200px] ">
        <thead>
          <tr
            className={`text-[#667185] text-[18px] border-b w-full ${groteskText.className}`}
          >
            <th
              className={`  ${groteskText.className} whitespace-nowrap  text-end px-2 w-[5%]`}
            >
              {" "}
            </th>
            <th
              className={` ${groteskText.className} whitespace-nowrap py-2 px-3 text-left w-[20%] `}
            >
              Name
            </th>
            <th
              className={` ${groteskText.className} whitespace-nowrap px-3 text-left  w-[20%] `}
            >
              Email Address
            </th>
            <th
              className={` ${groteskText.className} whitespace-nowrap  px-2  text-left  w-[25%]`}
            >
              Phone Number
            </th>
            <th
              className={` ${groteskText.className} whitespace-nowrap px-2   text-left  w-[20%] `}
            >
              Start Date
            </th>
            <th
              className={` ${groteskText.className} whitespace-nowrap px-2   text-left  w-[20%] `}
            >
              End Date
            </th>
          </tr>
        </thead>
        <tbody>
          {nominees?.map((nominee, index) => {
            const endDate = new Date(nominee.endDate);
            const today = new Date();
            const expiredLease = endDate < today;
            return (
              <tr key={index} className="hover:bg-gray-50 relative">
                <td className="cursor-pointer pt-2 text-end  pr-2 whitespace-nowrap relative">
                  <button
                    className="text-gray-500 px-1 hover:text-gray-900 hover:font-bold"
                    onClick={() => toggleDropdown(index)}
                    disabled={expiredLease}
                  >
                    &#8942;
                  </button>
                  {openDropdownIndex === index && (
                    <DeleteRowModal
                      showConfirmButton={showConfirmButton}
                      onEdit={() => {}}
                      onRemove={() => showDeleteConfirmation(index)}
                      onCancelDelete={cancelDelete}
                      onConfirmDelete={() => handleDelete(index)}
                      selectedDataIndex={selectedDataIndex}
                      index={index}
                      customStyles={`${groteskText.className} text-[14px]`}
                      position={{ right: -110, top: 30 }}
                      removeAddButton
                    />
                  )}
                </td>
                <td
                  className={`pt-2 px-3 whitespace-nowrap text-[15px] ${groteskText.className}`}
                >
                  <TruncatedText
                    text={nominee.name}
                    maxLength={10}
                    className={`${groteskText.className}`}
                  />
                </td>
                <td
                  className={`pt-2 px-3 whitespace-nowrap text-[15px] ${groteskText.className}`}
                >
                  <TruncatedText
                    text={nominee.email}
                    maxLength={15}
                    className={` ${groteskText.className}`}
                  />
                </td>
                <td
                  className={`pt-2 px-2 whitespace-nowrap text-[15px] ${groteskText.className}`}
                >
                  {nominee.phone}
                </td>
                <td
                  className={`pt-2 px-2  text-[15px] whitespace-nowrap ${groteskText.className}`}
                >
                  <TruncatedText
                    text={nominee.startDate}
                    maxLength={10}
                    className={` ${groteskText.className}`}
                  />
                </td>
                <td
                  className={`pt-2 px-2  text-[15px] whitespace-nowrap ${groteskText.className}`}
                >
                  <TruncatedText
                    text={nominee.endDate}
                    maxLength={10}
                    className={` ${groteskText.className}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const NomineeMobile = ({
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
  const sliderRef = useRef(null);

  const toggleActions = () => setShowActions((prev) => !prev);

  const settings = {
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentIndex(index), // Update state when slide changes
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current.slickGoTo(currentIndex - 1); // Programmatically move to the previous slide
    }
  };

  const handleNext = () => {
    if (currentIndex < nominees.length - 1) {
      setCurrentIndex(currentIndex + 1);
      sliderRef.current.slickGoTo(currentIndex + 1); 
    }
  };
  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-full max-w-md p-4 bg-white rounded-[12px] border-[#D0D5DD] border mb-4">
        <div className="flex justify-end items-center pb-3">
          <button
            disabled={
              nominees[currentIndex] &&
              new Date(nominees[currentIndex].endDate) < new Date()
            }
            onClick={() => {
              toggleActions();
              setShowConfirmButton(false);
            }}
            className="text-gray-600"
          >
            <IoEllipsisVertical size={20} />
          </button>
        </div>

        {showActions && (
          <div className="rounded-[8px] bg-white right-0 absolute z-10">
            <div className="border border-gray-200 rounded-[8px] shadow-lg p-1">
              <button
                className={`w-full flex items-center px-[1px] py-2 text-sm text-red-600 hover:bg-gray-100  ${groteskText.className}`}
                onClick={() => showDeleteConfirmation(currentIndex)}
              >
                <FiTrash2 className="mr-2" />
                End Nomination
              </button>
            </div>
            {showConfirmButton && selectedDataIndex === currentIndex && (
              <div className="flex justify-between gap-2 mt-1">
                <button
                  className="absolute bg-white border border-red-400 rounded-[8px] p-1 text-red-600 hover:bg-gray-100"
                  onClick={cancelDelete}
                >
                  <MdClose size={25} />
                </button>
                <button
                  className="absolute left-[96px] bg-white border border-green-400 rounded-[8px] p-1 text-green-700 hover:bg-gray-100"
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
          {nominees.map((nominee, index) => {
            const endDate = new Date(nominee.end_date);
            const today = new Date();
            const expiredLease = endDate < today;

            return (
              <div
                key={index}
                className="border p-4 rounded-[12px] bg-[#F9FAFB] space-y-2"
              >
                <div
                  className={`flex justify-between ${groteskText.className}`}
                >
                  <span className={`${groteskText.className} text-gray-500`}>
                    Name
                  </span>
                  <div className={`${groteskText.className} text-black`}>
                    <TruncatedText
                      text={nominee.name}
                      maxLength={22}
                      className={`${groteskText.className} text-black`}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className={`${groteskText.className} text-gray-500`}>
                    Email Address
                  </span>

                  <div className={`${groteskText.className} text-black`}>
                    <TruncatedText
                      text={nominee.email}
                      maxLength={22}
                      className={`${groteskText.className} text-black`}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className={`${groteskText.className} text-gray-500`}>
                    Phone Number
                  </span>

                  <div className={`${groteskText.className} text-black`}>
                    {nominee.phone}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className={`${groteskText.className} text-gray-500`}>
                    Start Date
                  </span>

                  <div className={`${groteskText.className} text-black`}>
                    <TruncatedText
                      text={nominee.startDate}
                      maxLength={22}
                      className={`${groteskText.className} text-black`}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className={`${groteskText.className} text-gray-500`}>
                    End Date
                  </span>

                  <div className={`${groteskText.className} text-black`}>
                    <TruncatedText
                      text={nominee.endDate}
                      maxLength={22}
                      className={`${groteskText.className} text-black`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            className={`${
              groteskText.className
            } w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] ${
              currentIndex === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1C1B1B]"
            }`}
            disabled={currentIndex === 0}
          >
            &lt; Previous
          </button>

          <div className="flex space-x-1">
            {nominees.map((_, index) => (
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
            className={`${
              groteskText.className
            } w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] ${
              currentIndex === nominees.length - 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1C1B1B]"
            }`}
            disabled={currentIndex === nominees.length - 1}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
