import owner from "@/assets/images/owner.png";
import Image from "next/image";
import DrawerHeader from "./DrawerHeader";
import { groteskText } from "@/app/fonts";

type VehicleOwnerCheckProps = {
  back: () => void;
  selectownerDrawer: () => void;
  vehicleStatus: () => Promise<void>;
};

const VehicleOwnerCheck = ({ back, selectownerDrawer, vehicleStatus }: VehicleOwnerCheckProps) => {
  return (
    <div>
      <DrawerHeader
        toggleDrawer={back}
        title="Are you the registered owner of this vehicle?"
      />
      <div className="flex flex-col items-center justify-center bg-white p-4">
        <div className="py-10">
          <Image
            src={owner}
            alt={"Owner check"}
            width={504}
            height={377}
            className="rounded-lg object-cover h-full "
          />
        </div>

        <div className="flex mt-8 space-x-4 border p-2 rounded-[6px] bg-[#F1F4FD]">
          <button
            onClick={vehicleStatus}
            className={`${groteskText.className} w-[150px] md:w-[200px] rounded-[8px] px-8 py-2  text-blue-600  hover:bg-blue-700 hover:text-white transition`}
          >
            Yes I am
          </button>
          <button
            onClick={selectownerDrawer}
            className={`${groteskText.className} w-[150px] md:w-[200px]  rounded-[8px]  px-8 py-2 text-blue-600  hover:bg-blue-700 hover:text-white  transition`}
          >
            No I am not
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleOwnerCheck;
