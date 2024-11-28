"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/exportProfile.svg";
import NumberSVG from "@/assets/svg/numbers.svg";
import GroupUserSVG from "@/assets/svg/profile-2user.svg";
import TicketSVG from "@/assets/svg/ticket.svg";
import { Button } from "@/components";

import "@/components/Slider.css";
import { useAuthStore } from "@/lib/stores/useStore";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { AiOutlineExpand } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Outline from "@/assets/svg/outlined.svg";
import { useRef, useState } from "react";
import EditSVG from '@/assets/svg/edit-vehicle.svg'
import DeleteSVG from '@/assets/svg/delete-vehicle.svg'
import CarFilter from '@/assets/svg/colorfilter.svg'
import CarMake from '@/assets/svg/carMake.svg'
import UndoDelete from '@/assets/svg/undoDelete.svg'
import ConfirmDeleteSVG from '@/assets/svg/confirmDelete.svg'
import queryClient from "@/lib/tanstack-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDeleteCar } from "@/lib/tanstack-query/useDelete";
import vehicle from "@/api/vehicle";
import SearchSortModal from "./SearchSortModal";
import useDeleteRow from "@/hooks/useDeleteRow";
interface CarProfileSliderProps {
  vehicles:any;
  addVehicle: () => void;
  onVehicleChange?:any;
  user?:'User' | 'Corporate';
}


// const deleteCar = async (carId: string): Promise<void> => {
  //   // await axios.delete(`/api/cars/${carId}`);
// };

const CarProfileSlider: React.FC<CarProfileSliderProps> = ({
  vehicles,
  addVehicle,
  onVehicleChange,
  user,
}) => {
  console.log("CarProfileSliderProps", vehicles);
  const [isOpen, setIsOpen] = useState(false);

  const {
    openDropdownIndex,
    data,
    showConfirmButton,
    selectedDataIndex,
    toggleDropdown,
    // handleDelete,
    showDeleteConfirmation,
    cancelDelete,
    setData,
    setOpenDropdownIndex
  } = useDeleteRow(vehicles?.carDetails);

  
  const [isOpenVehicle, setIsOpenVehicle] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  // const [items, setItems] = useState(vehicles?.carDetails)
  const [items, setItems] = useState(data)
 const mutation = useDeleteCar()
 const [currentSlide, setCurrentSlide] = useState(0);
 const sliderRef = useRef(null);
const totalPages = data?.length
 const settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   beforeChange: (current) => setCurrentSlide(current),
   afterChange: (current: number) => {
    setCurrentSlide(current);
    handleSliderChange(current); // Corrected here to use afterChange
  },
 };

 const goToPrevious = () => {
   if (sliderRef.current) {
    sliderRef.current.slickNext();
   }
   console.log('next')
 };

 const goToNext = () => {
   if (sliderRef.current) {
    sliderRef.current.slickPrev();
   }
 };

  const removeVehicle = () => {
    setIsOpenVehicle((prevOpen) => !prevOpen)
  };
  const handleConfirmDelete = () => {
    setConfirmDelete((prevDelete) => !prevDelete)
}

const handleUndoConfirm =()=>{
  setConfirmDelete(false)
}
const handleDelete = (carId: any) => {
  setItems(items.filter((item)=> item.id !== carId))
  console.log('item deleted')
};

const handleSliderChange = (index: number) => {
  onVehicleChange(index); // Notify the parent about the vehicle change
};
  

  return (
    <article className="max-w-[428px] w-full md:max-w-[580px]">
      {user === "Corporate" && <SearchSortModal data={data} setData={setData} />}
      <div className=" bg-[#FFFFFF] rounded-[20px] border border-solid border-[#C5D5F8] px-[8px] pt-[20px] pb-[13px] mt-[40px] ">
        <Slider ref={sliderRef} {...settings}>
          {items?.map((car, index) => (
            <div  key={car.id} className="">
              <div className="flex justify-between  ">
                <h1
                  className={`text-[20px] text-[#000000] ${groteskTextMedium.className} `}
                >
                  My Vehicle
                </h1>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div
                      className="items-center flex gap-[11px]"
                      onClick={addVehicle}
                    >
                      <button className="bg-[#3957D7] items-center flex text-white cursor-pointer rounded-[8px]  py-[0.2rem] px-[8px] text-[16px]">
                        Add vehicle
                        <Plus className="inline-block " size={20} />
                      </button>

                      {/* <button>
                      <AiOutlineExpand size={24} onClick={()=> openCarProfile(car)} />
                    </button> */}
                    </div>
                    <div className="cursor-pointer">
                      <Outline onClick={removeVehicle} />
                    </div>
                  </div>
                  {/* {isOpen && (
                    <div
                      className={`rounded-[8px] bg-[#FFFFFF] pl-[4px] py-[8px] border border-[#D0D5DD] mt-[-1px] transition-all duration-500 ease-in-out transform ${
                        isOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-2"
                      }`}
                    >
                      <div className="flex items-center cursor-pointer">
                        <EditSVG />
                        <span className={`${groteskText.className}`}>
                          Edit Vehicle
                        </span>
                      </div>
                      <div className="flex items-center mt-[10px] cursor-pointer">
                        <DeleteSVG />
                        <span
                          className={`text-[#D42620] text-[1rem] ${groteskText.className}`}
                        >
                          Remove Vehicle
                        </span>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>

              <div className="flex-col flex md:flex md:flex-row  mt-[14px] items-center relative">
                                <div className="order-2 flex flex-col max-w-[253px] w-full md:order-2">
                                <div className="flex flex-col w-full max-w-[140px] self-end mt-[-14px] absolute right-0 top-0">
                           
                         {
                            isOpenVehicle && (
                                <div
                                style={{
                                    boxShadow: '0px 2px 6px 2px #00000026, 0px 1px 2px 0px #0000004D'
                                }}
                                className={`w-full rounded-[8px] bg-[#FFFFFF] pl-[4px] py-[8px] border border-[#D0D5DD] mt-[-1px] transition-all duration-500 ease-in-out transform ${isOpenVehicle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                                    }`}
                            >
                                <div className="flex items-center cursor-pointer">
                                    <EditSVG />
                                    <span className={`${groteskText.className}`}>Edit Vehicle</span>
                                </div>
                                <div className="flex items-center mt-[10px] cursor-pointer">
                                    <DeleteSVG />
                                    <span onClick={handleConfirmDelete} className={`text-[#D42620] text-[1rem] ${groteskText.className}`}>Remove Vehicle</span>
                                </div>
                            </div>
                            )
                         }
                    
                     {confirmDelete && (
                        
                           <div
                               className="flex flex-row items-center justify-between"
                           >
                               <div className="flex items-center cursor-pointer">
                                   <UndoDelete onClick={() => handleUndoConfirm()}  />
                               </div>
                               <div className="flex items-center cursor-pointer">
                                   <ConfirmDeleteSVG onClick={() => handleDelete(car.id)} />
                               </div>
                           </div>
                     )}
                   
                  </div>
                                    <Image
                                        src={require(`@/assets/images/${car.imageUrl}`).default}
                                        alt=""
                                        // sizes="max-width: 222px"
                                        // className="max-w-[222px] "
                                    />

                                </div>
                             
                                <div className="order-1 border border-solid border-[#C5D5F8] rounded-[12px] pb-[6px] w-full max-w-[359px] md:order-1 ">
                                    <div className="border border-b-[#C5D5F8] py-[8px] px-[8px]">
                                        <h1
                                            className={`text-[#212121] text-[20px] ${groteskTextMedium.className}`}
                                        >
                                            Car Details
                                        </h1>
                                    </div>
                                    <div className="py-[4px] px-[8px]">
                                        <h2
                                            className={`flex items-center gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                                        >
                                            <div className="flex items-center ">
                                                <span>
                                                    <NumberSVG />
                                                </span>
                                                <span className="text-[13px]">Registration number: </span>
                                            </div>
                                            <span className="text-[#212121] text-[13px] self-end">
                                                {car.registrationNumber}
                                            </span>
                                        </h2>
                                        <h2
                                            className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                                        >
                                            <div className="flex items-center">
                                                <span>
                                                    <UserProfileSVG />
                                                </span>
                                                <span className="text-[13px]">Owner: </span>
                                            </div>
                                            <span className="text-[#212121] text-[13px] self-end">
                                                {car.owner}
                                            </span>
                                        </h2>
                                        {/* <h2
                                            className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                                        >
                                            <div className="flex items-center">
                                                <span>
                                                    <GroupUserSVG />
                                                </span>
                                                <span className="text-[13px]">Ownership status: </span>
                                            </div>
                                            <button className="text-[#212121] text-[13px] bg-[#B5E3C4] rounded-[6.25rem] w-[68px] h-[28px] self-end">
                                                Verified
                                            </button>
                                        </h2> */}

                                        <h2
                                            className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                                        >
                                            <div className="flex items-center">
                                                <span>
                                                    <TicketSVG />
                                                </span>
                                                <span className="text-[13px]">
                                                    Verification Status:{" "}
                                                </span>
                                            </div>
                                            <button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[6.25rem] w-[68px] h-[28px] self-end">
                                            {car.status} 
                                            </button>
                                        </h2>

                                        <h2
                                            className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                                        >
                                            <div className="flex items-center">
                                                <span>
                                                    <GroupUserSVG />
                                                </span>
                                                <span className="text-[13px]">
                                                   Notification Recipient:{" "}
                                                </span>
                                            </div>
                                            <span className="text-[#212121] text-[13px]  self-end">
                                                {car.thirdPartyNominee}
                                            </span>
                                        </h2>

                                        <h2
                                            className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                                        >
                                            <div className="flex items-center">
                                                <span>
                                                    <CarFilter />
                                                </span>
                                                <span className="text-[13px]">
                                                    Color
                                                </span>
                                            </div>
                                            <span className="text-[#212121] text-[13px]  self-end">
                                                {car.color}
                                            </span>
                                        </h2>
                                        <h2
                                            className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                                        >
                                            <div className="flex items-center">
                                                <span>
                                                    <CarMake />
                                                </span>
                                                <span className="text-[13px]">
                                                    Make
                                                </span>
                                            </div>
                                            <span className="text-[#212121] text-[13px]  self-end">
                                                {car.make}
                                            </span>
                                        </h2>

                                    </div>

                                </div>
                            </div>
              <div className="w-full flex justify-between mt-[11px] lg:w-[250px]">
                <button className=" w-[87px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
                 onClick={goToPrevious}
                >
                    <ChevronLeft size={20} style={{display: 'inline-flex', marginBottom: 3}} />
                  Previous
                </button>
                <div className="flex items-center space-x-2  ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`w-[8px] h-[8px] rounded-full ${currentSlide === index ? 'bg-gray-500' : 'bg-gray-200'}`}
            ></span>
          ))}
        </div>
                <button className="w-[64px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
                 onClick={goToNext}
                >
                  Next
                  <ChevronRight size={20} style={{display: 'inline-flex', marginBottom: 3}} />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </article>
  );
};

export default CarProfileSlider;
