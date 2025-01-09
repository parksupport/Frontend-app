import successMark from "@/assets/images/successMark.png";
import Image from "next/image";
import DrawerHeader from "./DrawerHeader";
import { groteskText, groteskTextMedium } from "@/app/fonts";

const VehicleAddedSuccess = ({ toggleDrawer, openCarProfile }) => {
  return (
    <div className="flex flex-col gap-10 bg-blue-600 items-center justify-center bg-white p-4">
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Vehicle Added Successfully"
        subTitle={
          <>
            You cand now track contraventions, manage fines, and receive
            notifications for{" "}
            <span className={`${groteskTextMedium.className} `}>
              Vehicle Type/Model/Registration Number
            </span>
            .
          </>
        }
      />

      <div className="">
        <Image
          src={successMark}
          alt={"success"}
          width={344}
          height={344}
          className="rounded-lg object-cover h-full "
        />
      </div>

      <div className="flex mt-8 space-x-4 border p-2 rounded-[6px] bg-[#F1F4FD]">
        <button
          onClick={toggleDrawer}
          className={`${groteskText.className} whitespace-nowrap rounded-[8px] px-2 md:px-4 py-2  text-blue-600  hover:bg-blue-700 hover:text-white transition `}
        >
          View Vehicle Dashboard
        </button>
        <button
          onClick={openCarProfile}
          className={` ${groteskText.className} whitespace-nowrap  rounded-[8px] px-2 md:px-4   py-2 text-blue-600  hover:bg-blue-700 hover:text-white  transition`}
        >
          Add Another Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleAddedSuccess;
