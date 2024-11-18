import { groteskText } from "@/app/fonts";
import React, { useRef, useState } from "react";
import {  FiTrash2 } from "react-icons/fi";
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

interface ThirdPartyNomineesProps {
  toggleForm: (state: boolean) => void;
}

export default function ThirdPartyNominees({
  toggleForm,
}: ThirdPartyNomineesProps) {
  const datafromAPI = [
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Ford",
    },
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Chevrolet",
    },
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Toyota",
    },
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Honda",
    },
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Jeep Cherokee",
    },
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Jeep Cherokee",
    },
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Jeep Cherokee",
    },
    {
      name: "Wisdom Odili",
      email: "Odiliwisdom5@gmail.com",
      phone: "+44 5641 464 4484",
      car: "Jeep Cherokee",
    },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },

    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
    // {
    //   name: "Wisdom Odili",
    //   email: "Odiliwisdom5@gmail.com",
    //   phone: "+44 5641 464 4484",
    //   car: "Jeep Cherokee",
    // },
  ];

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
  } = useDeleteRow(datafromAPI);

  const isMobile = useIsMobile();

  return (
    <div className="py-12 mb-[300px]">
      {/* Header */}
      <div className="flex items-center justify-center gap-10 mb-4">
        <h1
          className={`text-2xl font-semibold text-[26px] ${groteskText.className}`}
        >
          Third Party Nominees
        </h1>
        <div
          className={`text-[#4169E1] font-semibold hover:underline ${groteskText.className}`}
          onClick={() => toggleForm(true)}
        >
          Go back
        </div>
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
  vehicle: any;
  toggleForm?: (state: boolean) => void;
  addVehicle?: () => void;
}

export function AddThirdPartyNominee({
  vehicle,
  toggleForm,
  addVehicle,
}: AddThirdPartyNomineeProps) {
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    vehicle: "",
    phone_number: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email format";
  };

  return (
    <div className="py-12 mb-[300px] ">
      <div className="flex flex-col  ">
        <div className="flex items-center justify-center gap-4 mb-4  md:gap-10 ">
          <h1
            className={`text-wrap text-2xl text font-semibold text-[22px] md:text-[26px]  ${groteskText.className}`}
          >
            Add Third Party Nominees
          </h1>
          <div
            className={`text-[#4169E1] font-semibold hover:underline ${groteskText.className}`}
            onClick={() => toggleForm(false)}
          >
            View all
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4  items-center">
            <InputField
              type="text"
              placeholder="Enter your full name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="individual"
              className={`  ${groteskText.className} w-[90%]  md:w-[50%]`}
            />
            <InputField
              type="email"
              placeholder="Enter your email address"
              label="Email Address"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              validationRules={validateEmail}
              variant="individual"
              className={`  ${groteskText.className} w-[90%]  md:w-[50%] `}
            />
            <InputField
              type="text"
              placeholder="Enter your phone number"
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              variant="individual"
              className={`  ${groteskText.className} w-[90%]  md:w-[50%] `}
            />
            <DropdownInputField
              name="vehicle"
              value={formData.vehicle}
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              label="Choose Vehicle"
              placeholder="Enter your Vehicle"
              onChange={() => handleChange}
              selectedValue=""
              className={`  ${groteskText.className} w-[90%] pb-4  md:w-[50%]`}
            />

            <Button
              type="submit"
              variant="quinary"
              className=" py-[10px] px-[12px] w-[80%]   md:w-[50%]  "
              onClick={addVehicle}
            >
              Add Vehicle
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
    <div className="rounded-[12px] border border-gray-300 ">
      <table className="overflow-auto-y min-w-full bg-white ">
        <thead>
          <tr
            className={`text-gray-600 text-[20px] border-b ${groteskText.className}`}
          >
            <th className="whitespace-nowrap py-2 px-4 text-left w-[20%] ">
              Name
            </th>
            <th className="whitespace-nowrap px-4 text-left  w-[30%]  ">
              Email Address
            </th>
            <th className="whitespace-nowrap  px-4  text-left  w-[25%] ">
              Phone Number
            </th>
            <th className="whitespace-nowrap px-4   text-left  w-[20%] ">
              Car
            </th>
            <th className="text-end  w-[5%] "></th>
          </tr>
        </thead>
        <tbody>
          {nominees.map((nominee, index) => (
            <tr key={index} className="hover:bg-gray-50 relative">
              <td
                className={`pt-2 px-4 whitespace-nowrap text-[15px] ${groteskText.className}`}
              >
                {nominee.name}
              </td>
              <td
                className={`pt-2 px-4 whitespace-nowrap text-[15px] ${groteskText.className}`}
              >
                {nominee.email}
              </td>
              <td
                className={`pt-2 px-4 whitespace-nowrap text-[15px] ${groteskText.className}`}
              >
                {nominee.phone}
              </td>
              <td
                className={`pt-2 px-4  text-[15px] whitespace-nowrap ${groteskText.className}`}
              >
                {nominee.car}
              </td>
              <td className="cursor-pointer pt-2 text-end pr-6 whitespace-nowrap relative">
                <button
                  className=" text-gray-500 px-2 hover:text-gray-900 hover:font-bold"
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
                    onConfirmDelete={() => handleDelete(index)}
                    selectedDataIndex={selectedDataIndex}
                    index={index}
                    customStyles=""
                  />
                )}
              </td>
            </tr>
          ))}
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
      sliderRef.current.slickGoTo(currentIndex + 1); // Programmatically move to the next slide
    }
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-full max-w-md p-4 bg-white rounded-[12px] border-[#D0D5DD] border mb-4">
        <div className="flex justify-end items-center">
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

        {showActions && (
          <div className="rounded-[8px] bg-white absolute right-4  z-10">
            <div className="border border-gray-200 rounded-[8px] shadow-lg p-1">
              <button className="w-full flex items-center px-[1px] py-2 text-sm text-gray-700 hover:bg-gray-100">
                <CiEdit  className="mr-2" />
                Edit Nominee
              </button>
              <button
                className="w-full flex items-center px-[1px] py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => showDeleteConfirmation(currentIndex)}
              >
                <FiTrash2 className="mr-2" />
                Remove Nominee
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
          {nominees.map((nominee, index) => (
            <div
              key={index}
              className="border p-4 rounded-[12px] bg-[#F9FAFB] space-y-2"
            >
              <div className="flex justify-between">
                <span className="text-gray-500">Name</span>
                <span>{nominee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email Address</span>
                <span>{nominee.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone Number</span>
                <span>{nominee.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Car</span>
                <span>{nominee.car}</span>
              </div>
            </div>
          ))}
        </Slider>

        {/* Slider Navigation Controls */}
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevious}
            className={`w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] ${
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
            className={`w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] ${
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
