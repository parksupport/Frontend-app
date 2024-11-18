// components/VehicleTable.js
import { groteskText, groteskTextMedium } from "@/app/fonts";
import useDeleteRow from "@/hooks/useDeleteRow";
import useIsMobile from "@/hooks/useIsMobile";
import { useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import Button from "../Buttons";
import CarProfileSlider from "../CarProfileSlider";
import DeleteRowModal from "../DeleteRowModal";
import DropdownInputField from "../DropdownInputField";
import InputField from "../InputField";
import SearchSortModal from "../SearchSortModal";
import { AddThirdPartyNominee } from "../card/ThirdPartyNominee";
import DrawerHeader from "./DrawerHeader";

const CorporateCarProfileDrawer = ({ toggleDrawer, addVehicleDetails }) => {
  const isMobile = useIsMobile();

  const dataFromAPI = [
    {
      registrationNumber: "16UK567Y",
      owner: "Wisdom .O",
      contraventionStatus: "Verified",
      thirdPartyNominee: "Wisdom .O",
      color: "Black",
      make: "BMW",
      dateAdded: "2023-11-01",
    },
    {
      registrationNumber: "34JA890K",
      owner: "Jane D.",
      contraventionStatus: "Pending",
      thirdPartyNominee: "John D.",
      color: "White",
      make: "Toyota",
      dateAdded: "2023-11-02",
    },
    {
      registrationNumber: "87PL234X",
      owner: "Michael B.",
      contraventionStatus: "Verified",
      thirdPartyNominee: "Michael B.",
      color: "Blue",
      make: "Ford",
      dateAdded: "2023-11-03",
    },
    {
      registrationNumber: "09XY123A",
      owner: "Emily C.",
      contraventionStatus: "Not Verified",
      thirdPartyNominee: "Sophia C.",
      color: "Red",
      make: "Tesla",
      dateAdded: "2023-11-04",
    },
    // {
    //   registrationNumber: "45GH678T",
    //   owner: "Chris P.",
    //   contraventionStatus: "Verified",
    //   thirdPartyNominee: "Chris P.",
    //   color: "Silver",
    //   make: "Honda",
    //   dateAdded: "2023-11-05",
    // },
    // {
    //   registrationNumber: "67UV345R",
    //   owner: "Sandra K.",
    //   contraventionStatus: "Pending",
    //   thirdPartyNominee: "Sandra K.",
    //   color: "Green",
    //   make: "Chevrolet",
    //   dateAdded: "2023-11-06",
    // },
    // {
    //   registrationNumber: "90QR567L",
    //   owner: "David H.",
    //   contraventionStatus: "Verified",
    //   thirdPartyNominee: "Ella H.",
    //   color: "Black",
    //   make: "Audi",
    //   dateAdded: "2023-11-07",
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
    setData,
  } = useDeleteRow(dataFromAPI);

  return (
    <>
      {isMobile ? (
        <MobileCorporateProfileDrawer
          back={toggleDrawer}
          car={data}
          setData={setData}
          addVehicleDetails={addVehicleDetails}
        />
      ) : (
        <>
          <DrawerHeader
            toggleDrawer={toggleDrawer}
            title="Vehicle Overview"
            subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.."
          />
          <SearchSortModal data={data} setData={setData} />

          <div className=" w-[98%]  bg-green-100  rounded-[16px] border border-gray-200        ">
            {/* <div> */}

            <table className="min-w-full bg-white m-0  ">
              <thead>
                <tr className={`${groteskTextMedium.className} text-[17px] `}>
                  <th className="py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">
                    Registration number
                  </th>
                  <th className="py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">
                    Owner
                  </th>
                  <th className="py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-1/12">
                    Contravention Status
                  </th>
                  <th className="py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">
                    Third-party nominee
                  </th>
                  <th className="py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-1/12">
                    Color
                  </th>
                  <th className="py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-1/12">
                    Make
                  </th>
                  <th className="py-1 px-2 bg-gray-100 text-right font-semibold text-gray-500 w-1/12"></th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50  border-t border-gray-200 text-[18px] ${groteskText.className} `}
                  >
                    <td className=" px-6 text-sm text-gray-700 w-2/12 ">
                      {item.registrationNumber}
                    </td>
                    <td className=" px-4 text-sm text-gray-700 leading-none w-1/12 ">
                      {item.owner}
                    </td>
                    <td className="px-4 text-sm text-gray-700 leading-none w-2/12">
                      <span
                        className={` text-wrap   w-[96px] py-1 text-[18px] flex items-center justify-center rounded-full px-3 text-xs font-semibold ${
                          item.contraventionStatus === "Verified"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <div className="flex items-center ">
                          {item.contraventionStatus === "Verified" ? (
                            <IoMdCheckmark size={14} className="mr-1" />
                          ) : (
                            <IoMdClose size={14} className="mr-1" />
                          )}
                          {item.contraventionStatus}
                        </div>
                      </span>
                    </td>

                    <td className=" px-6 text-sm text-gray-700 leading-none w-2/12">
                      {item.thirdPartyNominee}
                    </td>
                    <td className=" px-6 text-sm text-gray-700 leading-none w-1/12">
                      {item.color}
                    </td>
                    <td className=" px-6 text-sm text-gray-700 leading-none w-1/12">
                      {item.make}
                    </td>
                    <td className="relative pt-2 text-end pr-5 whitespace-nowrap w-1/12">
                      <button
                        className="text-gray-500 hover:text-gray-900 px-4  "
                        onClick={() => toggleDropdown(index)}
                      >
                        &#8942;
                      </button>
                      {openDropdownIndex === index && (
                        <DeleteRowModal
                          position={{ right: 40, top: 40 }}
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
          <div className="pb-[200px] pt-[30px]">
            <CorporateAddThirdParytForm addVehicle={addVehicleDetails} />
          </div>
        </>
      )}
    </>
  );
};

export default CorporateCarProfileDrawer;





const CorporateAddThirdParytForm = ({addVehicle}) => {
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

  const handleDropdownChange = (selected: { value: string; label: string }) => {
    const { value } = selected;
    setFormData((prevData) => ({
      ...prevData,
      vehicle: value,
    }));
  };
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email format";
  };
  return (
    <>
      <div className="flex flex-col items-center py-4  ">
        <div className=" flex items-center gap-5 ">
          <h1 className="text-[28px] mx-auto">Add third party nominee</h1>
          <div
            className={`text-[#4169E1] font-semibold hover:underline ${groteskText.className}`}
            onClick={() => {}}
          >
            View all
          </div>
        </div>
        <div>
          <form className="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center ">
              <InputField
                type="text"
                placeholder="Enter your full name"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="individual"
                className={`${groteskText.className} w-[300px]`}
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
                className={`${groteskText.className} w-[300px]`}
              />
              <InputField
                type="text"
                placeholder="Enter your phone number"
                label="Phone Number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                variant="individual"
                className={`${groteskText.className} w-[300px]`}
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
                onChange={handleDropdownChange}
                selectedValue=""
                className={`${groteskText.className} w-[300px]`}
              />
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <Button
                  type="submit"
                  variant="quinary"
                  className="py-[10px] px-[12px] w-full md:w-1/2"
                  onClick={addVehicle}
                >
                  Add Vehicle
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const MobileCorporateProfileDrawer = ({
  back,
  car,
  addVehicleDetails,
  setData,
}) => {
  return (
    <>
      <DrawerHeader
        toggleDrawer={back}
        title="Vehicle Overview"
        subTitle="Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.."
      />
      <div className="-mb-[26px]">
        <SearchSortModal data={car} setData={setData} />
      </div>
      <CarProfileSlider car={car} addVehicle={addVehicleDetails} />
      <AddThirdPartyNominee vehicle={car}  addVehicle={addVehicleDetails} />
    </>
  );
};
