import React from "react";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import Image from "next/image";
import rafiki from "@/assets/images/rafiki.png";

const VehicleAddedFailed = ({ back, }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white py-4">
      <DrawerHeader
        toggleDrawer={back}
        title="Failed To Add Vehicle"
        subTitle="We couldn't add your vehicle at the moment. Please check the following"
      />

      <div className={`mt-12 space-y-4 text-left ${groteskText.className} md:mx-[40px]`}>
        <p className={`${groteskText.className} text-red-600 font-medium`}>
          Correct Information:
          <span className={`${groteskText.className} text-black  ml-1`}>
            Ensure all vehicle details (registration number, owner information)
            are accurate.
          </span>
        </p>
         <p className={`${groteskText.className} text-red-600 font-medium`}>
          Vehicle Already Added:
          <span className={`${groteskText.className} text-black  ml-1`}>
            This vehicle may already be registered in our system.
          </span>
        </p>
      </div>
      <div>
        <Image
          src={rafiki}
          alt={"404 Error"}
          width={600}
          height={642}
          className="rounded-lg object-cover h-full "
        />
      </div>

      <h2 className={`md:text-[32px] text-[28px] text-black mt-8 ${groteskTextMedium.className} `}>
        Uh-oh, Something Went Wrong!
      </h2>
      <p className={` ${groteskTextMedium.className} mt-2 text-[20px] text-black`}>
        Click here to{" "}
        <span
          onClick={back}
          className={`text-[20px] text-blue-600 cursor-pointer hover:underline ${groteskTextMedium.className} `}
        >
          Try Again
        </span>
      </p>
    </div>
  );
};

export default VehicleAddedFailed;
