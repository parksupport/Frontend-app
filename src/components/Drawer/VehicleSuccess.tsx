import React from "react";
import { BsCheckCircle } from "react-icons/bs"; // You can install react-icons for the check icon
import DrawerHeader from "./DrawerHeader";

const VehicleAddedSuccess = ({ toggleDrawer, openVehicleDetails }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-4">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Added Successfully"
        subTitle="You can now track contraventions, manage fines, and receive notifications for Vehicle Make/Model/Registration Number."
      />

      <div className="relative mt-8 w-[300px] h-[300px]  flex items-center justify-center ">
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-300 to-blue-300 rounded-full blur-xl"></div>
        <BsCheckCircle
          size={145}
          className="text-6xl text-blue-600 relative z-10"
        />
      </div>

      <div className="flex mt-8 space-x-4 border p-2 rounded-[6px] bg-[#F1F4FD]">
        <button
          onClick={toggleDrawer}
          className=" rounded-[8px] px-4 py-2  text-blue-600 font-medium  hover:bg-blue-700 hover:text-white transition"
        >
          View Vehicle Dashboard
        </button>
        <button
          onClick={openVehicleDetails}
          className="px-4 py-2 text-blue-600 font-medium  hover:bg-blue-700 hover:text-white  transition"
        >
          Add Another Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleAddedSuccess;
