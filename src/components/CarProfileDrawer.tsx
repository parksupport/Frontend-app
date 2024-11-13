"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/exportProfile.svg";
import NumberSVG from "@/assets/svg/numbers.svg";
import GroupUserSVG from "@/assets/svg/profile-2user.svg";
import TicketSVG from "@/assets/svg/ticket.svg";
import { Button } from "@/components";

import "@/components/Slider.css";
import cars from "@/data/data.json";
import { useAuthStore, useDrawerStore } from "@/lib/stores/useStore";
import { Plus } from "lucide-react";
import Image from "next/image";
import { AiOutlineExpand } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Outline from '@/assets/svg/outlined.svg'
import { useState } from "react";
import EditSVG from '@/assets/svg/edit-vehicle.svg'
import DeleteSVG from '@/assets/svg/delete-vehicle.svg'
import CarFilter from '@/assets/svg/colorfilter.svg'
import CarMake from '@/assets/svg/carMake.svg'
import UndoDelete from '@/assets/svg/undoDelete.svg'
import ConfirmDeleteSVG from '@/assets/svg/confirmDelete.svg'
import { IoArrowBack } from "react-icons/io5";
interface CarProfileDrawerProps {
    car: {
        imageUrl: string;
        registrationNo: string;
        ownerName: string;
        contraventionStatus: string;
        thirdPartyNominate: string;
        // Add any other properties you need from the car object
    };
}

const CarProfileDrawer: React.FC<CarProfileDrawerProps> = ({ car }) => {
    // const [isOpen, setIsOpen] = useState(false)
    const [isOpenVehicle, setIsOpenVehicle] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const { isOpen, setIsOpen } = useDrawerStore()
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    // const handleDelete = (carId) => {
    //     mutation.mutate(carId);
    //   };

    const removeVehicle = () => {
        setIsOpenVehicle((prevOpen) => !prevOpen)
    }

    const handleConfirmDelete = () => {
        setConfirmDelete((prevDelete) => !prevDelete)
    }
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <article>
            {isOpen && (
                <div
                    className="fixed "
                    onClick={toggleDrawer}
                ></div>
            )}
            <div className=" flex  ">
                <div className=" flex flex-row ">
                    <div className='cursor-pointer'> <IoArrowBack size={24} onClick={toggleDrawer} /></div>
                    <div className="flex justify-center ">
                        <div className="flex flex-col justify-center items-center max-w-[451px] w-full ">
                            <h1 className={`text-[22px] leading-[25px] ${groteskTextMedium.className}`}>Vehicle Overview</h1>
                            <p className={`text-[#667185] text-center leading-[18px]  ${groteskText.className}`}>Here’s a quick summary of your vehicle’s key details. Keep this information up to date to stay in sync with your account.</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full max-w-[580px] bg-[#FFFFFF] rounded-[20px] border border-solid border-[#C5D5F8] px-[8px] pt-[20px] pb-[13px] mt-[40px] ">
                <Slider {...settings}>
                    {cars.carDetails.map((car, index) => (
                        <div key={car.id} className="">
                            <div className="flex justify-between ">
                                <h1
                                    className={`text-[20px] text-[#000000] ${groteskTextMedium.className} `}
                                >
                                    My Vehicle
                                </h1>
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <div className="items-center flex gap-[11px]">
                                            <button className="bg-[#3957D7] text-white cursor-pointer rounded-[8px]  py-[0.2rem] px-[8px] text-[16px]">
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
                              
                                </div>
                            </div>


                            <div className="flex  mt-[14px] items-center">
                                <div className="flex flex-col max-w-[253px] w-full order-2">
                                <div className="flex flex-col w-full max-w-[140px] self-end mt-[-14px]">
                           
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
                                   <UndoDelete />
                               </div>
                               <div className="flex items-center cursor-pointer">
                                   <ConfirmDeleteSVG  />
                               </div>
                           </div>
                     )}
                   
                  </div>
                                    <Image
                                        src={require(`@/assets/images/${car.imageUrl}`).default}
                                        alt=""
                                        sizes="max-width: 222px"
                                        className="max-w-[222px] "
                                    />

                                </div>
                             
                                <div className="border border-solid border-[#C5D5F8] rounded-[12px] pb-[6px] w-full max-w-[359px] order-1 ">
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
                                                {car.registrationNo}
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
                                                {car.ownerName}
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
                                                    Contravention Status:{" "}
                                                </span>
                                            </div>
                                            <button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[6.25rem] w-[68px] h-[28px] self-end">
                                                Verified
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
                                                    Third Party Nominate:{" "}
                                                </span>
                                            </div>
                                            <span className="text-[#212121] text-[13px]  self-end">
                                                {car.thirdPartyNominate}
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
                                                {car.thirdPartyNominate}
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
                                                {car.thirdPartyNominate}
                                            </span>
                                        </h2>

                                    </div>

                                </div>
                            </div>
                            <div className="flex justify-between mt-[11px] w-[250px]">
                                <button className=" w-[87px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">
                                    Previous
                                </button>
                                <button className="w-[64px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">
                                    Next
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </article>
    );
}

export default CarProfileDrawer
