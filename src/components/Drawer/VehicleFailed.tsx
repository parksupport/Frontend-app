import React from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";

const VehicleAddedFailed = ({ toggleDrawer, openVehicleDetails ,Success}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-4">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Failed To Add Vehicle"
        subTitle="We couldn't add your vehicle at the moment. Please check the following"
      />

      <div className={`mt-12 space-y-4 text-center ${groteskText.className} `}>
        <p className="text-red-600 font-medium">
          Correct Information:
          <span className="text-gray-600 font-normal ml-1">
            Ensure all vehicle details (registration number, owner information)
            are accurate.
          </span>
        </p>
        <p className="text-red-600 font-medium">
          Vehicle Already Added:
          <span className="text-gray-600 font-normal ml-1">
            This vehicle may already be registered in our system.
          </span>
        </p>
      </div>

      <h2 className={`text-xl  mt-8 ${groteskTextMedium.className} `}>Uh-oh, Something Went Wrong!</h2>
      <p className="mt-2 text-gray-600">
        Click here to <span onClick={Success} className={`text-blue-600 cursor-pointer hover:underline ${groteskText.className} `}>Try Again</span>
      </p>

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

export default VehicleAddedFailed;
