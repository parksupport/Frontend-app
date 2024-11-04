import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { groteskText } from "@/app/fonts";
import InputField from "../InputField";
import Button from "../Buttons";

export default function ThirdPartyNominees({ handleFormState }: any) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const [nominees, setNominees] = useState([
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
  ]);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [selectedNomineeIndex, setSelectedNomineeIndex] = useState<
    number | null
  >(null);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
    setShowConfirmButton(false);
  };

  const handleDelete = (index: number) => {
    setNominees(nominees.filter((_, nomineeIndex) => nomineeIndex !== index));
    setShowConfirmButton(false);
    setOpenDropdownIndex(null);
  };

  const showDeleteConfirmation = (index: number) => {
    setShowConfirmButton(true);
    setSelectedNomineeIndex(index);
  };

  const cancelDelete = () => {
    setShowConfirmButton(false);
    setSelectedNomineeIndex(null);
    setOpenDropdownIndex(null);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-center gap-10 mb-4">
        <h1
          className={`text-2xl font-semibold text-[26px] ${groteskText.className}`}
        >
          Third Party Nominees
        </h1>
        <div
          className={`text-[#4169E1] font-semibold hover:underline ${groteskText.className}`}
          onClick={() => handleFormState(true)}
        >
          Go back
        </div>
      </div>
      <div className="rounded-[12px] border border-gray-300">
        <table className="overflow-x-auto min-w-full bg-white">
          <thead>
            <tr
              className={`text-gray-600 text-[20px] border-b ${groteskText.className}`}
            >
              <th className="whitespace-nowrap py-2 px-4 text-left">Name</th>
              <th className="whitespace-nowrap px-5 text-left">
                Email Address
              </th>
              <th className="whitespace-nowrap text-left">Phone Number</th>
              <th className="whitespace-nowrap pl-12 text-left">Car</th>
              <th className="text-end w-[99px]"></th>
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
                  className={`pt-2 px-5 whitespace-nowrap text-[15px] ${groteskText.className}`}
                >
                  {nominee.email}
                </td>
                <td
                  className={`pt-2 whitespace-nowrap text-[15px] ${groteskText.className}`}
                >
                  {nominee.phone}
                </td>
                <td
                  className={`pt-2 pl-12 text-[15px] whitespace-nowrap ${groteskText.className}`}
                >
                  {nominee.car}
                </td>
                <td className="pt-2 text-end pr-4 whitespace-nowrap relative max-w-[99px]">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => toggleDropdown(index)}
                  >
                    &#8942;
                  </button>
                  {openDropdownIndex === index && (
                    <div className="rounded-[8px] bg-white  absolute right-0 -mt-1 z-10">
                      <div className=" border border-gray-200 rounded-[8px] p-[1px]">
                        <button className="w-full flex items-center px-[1px] py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <FiEdit className="mr-2" />
                          Edit Nominee
                        </button>
                        <button
                          className="w-full flex items-center px-[1px] py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => showDeleteConfirmation(index)}
                        >
                          <FiTrash2 className="mr-2" />
                          Remove Nominee
                        </button>
                      </div>
                      {showConfirmButton && selectedNomineeIndex === index && (
                        <div className="flex justify-between gap-2 ">
                          <button
                            className="bg-white border border-gray-200 rounded-[8px] p-1 text-red-600 hover:bg-gray-100"
                            onClick={cancelDelete}
                          >
                            <MdClose size={25} />
                          </button>
                          <button
                            className="bg-white border border-gray-200 rounded-[8px] p-1 text-green-700 hover:bg-gray-100"
                            onClick={() => handleDelete(index)}
                          >
                            <IoMdCheckmark size={25} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AddThirdPartyNominee({ handleFormState }: any) {
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
    <>
      <div className="flex flex-col ">
        <div className="flex items-center justify-center gap-10 mb-4 ">
          <h1
            className={`text-2xl font-semibold text-[26px] ${groteskText.className}`}
          >
            Add Third Party Nominees
          </h1>
          <div
            className={`text-[#4169E1] font-semibold hover:underline ${groteskText.className}`}
            onClick={() => handleFormState(false)}
          >
            View all
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-[161px]">
            <InputField
              type="text"
              placeholder="Enter your full name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              validationRules={validateEmail}
              variant="individual"
              className={`  ${groteskText.className} `}
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
              className={`  ${groteskText.className} `}
            />
            <InputField
              type="text"
              placeholder="Enter your phone number"
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              variant="individual"
              className={`  ${groteskText.className} `}
            />
            <InputField
              type="text"
              placeholder="Choose your Vehicle"
              label="Choose Vehicle"
              name="name"
              value={formData.vehicle}
              onChange={handleChange}
              validationRules={validateEmail}
              variant="individual"
              className={`  ${groteskText.className} pb-2 `}
            />
            <Button
              type="submit"
              variant="quinary"
              className=" py-[10px] px-[12px] w-full"
            >
              Add Vehicle
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
