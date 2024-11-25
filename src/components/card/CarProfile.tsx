"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/exportProfile.svg";
import NumberSVG from "@/assets/svg/numbers.svg";
import GroupUserSVG from "@/assets/svg/profile-2user.svg";
import TicketSVG from "@/assets/svg/ticket.svg";
import { Button } from "@/components";
import VehiclceInfoSVG from '@/assets/svg/infoOutline.svg'
import "@/components/Slider.css";
import cars from "@/data/data.json";
import { useAuthStore } from "@/lib/stores/useStore";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { AiOutlineExpand } from "react-icons/ai";
import { useRef, useState } from "react";
import { MoveDiagonal } from "lucide-react";
import UserTickSVG from "@/assets/svg/user-tick.svg"

interface CarProfileProps {
  openCarProfile: any;
  addVehicleDetails:any;
}

function CarProfile({ openCarProfile ,addVehicleDetails}: CarProfileProps) {
  const user = useAuthStore((state) => state.user);
  const [hovered, setHovered] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalPages = cars.carDetails.length;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current) => setCurrentSlide(current),
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

  const handleMouseEnter = (id) => {
    setHovered((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHovered((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <article className="flex justify-center">
      <div className="max-w-[396px] w-full lg:max-w-[680px] bg-[#FFFFFF] rounded-[20px] py-[20px] px-4 ">
        <Slider ref={sliderRef} {...settings}>
          {cars.carDetails.map((car, index) => (
            <div key={car.id} className="">
              <div className="flex justify-between">
                <h1
                  className={`text-[24px] md:text-[2rem] text-[#000000] ${groteskTextMedium.className} `}
                >
                  My Vehicle
                </h1>
                <div className="items-center flex gap-[11px]">
                  <Button variant="quinary" className=" py-[0.5rem] px-[12px]" onClick={addVehicleDetails}>
                    Add vehicle
                    <Plus className="inline-block" />
                  </Button>
                  <button>
                    <MoveDiagonal size={24} onClick={()=> openCarProfile(car)} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col  lg:flex lg:flex-row justify-center  mt-[14px] items-center">
              <div className="order-2 w-full lg:order-1 flex flex-col lg:w-[257px]">
              <div className=" self-center flex flex-col max-w-[253px] ">
                  <Image
                    src={require(`@/assets/images/${car.imageUrl}`).default}
                    alt=""
                    sizes="width: 222px"
                    // className="max-w-[222px] "
                  />
                
                </div>
                <div className="flex justify-between mt-auto items-center lg:hidden">
                    <button className=" w-[97px] h-[28px] rounded-[0.25rem] items-center border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
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
                    <button className="w-[74px] h-[28px] items-center rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
                     onClick={goToNext}
                    >
                       
                      Next
                      <ChevronRight size={20} style={{display: 'inline-flex', marginBottom: 3}} />
                    </button>
                  </div>
              </div>
              
                <div className="order-1 lg:order-2 border border-solid border-[#C5D5F8] rounded-[12px] pb-[6px] lg:w-[359px] ">
                  <div className="border border-b-[#C5D5F8] py-[12px] px-[16px]">
                    <h1
                      className={`text-[#212121] text-[20px] ${groteskTextMedium.className}`}
                    >
                      Car Details
                    </h1>
                  </div>
                  <div className="py-[12px] px-[13px]">
                    <h2
                      className={`flex items-center gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center gap-[5px]">
                        <span>
                          <NumberSVG />
                        </span>
                        <span className={`${groteskText.className} text-[16px] text-[#667185]`}>Registration number: </span>
                       

                      </div>
                      <span className={`${groteskText.className}text-[#212121] text-[11px] self-end`}>
                        {car.registrationNo}
                      </span>
                    </h2>
                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center gap-[5px]">
                        <span>
                          <UserProfileSVG />
                        </span>
                        <span className={`${groteskText.className} text-[16px] text-[#667185]`}>Owner: </span>
                      </div>
                      <span className={`${groteskText.className}text-[#212121] text-[11px] self-end`}>
                        {car.ownerName}
                      </span>
                    </h2>
                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center gap-[5px]">
                        <span>
                          <UserTickSVG />
                        </span>
                       <span className={`${groteskText.className} text-[16px] text-[#667185] mr-[3px]`}>Ownership status: </span>
                       
                       <div
                          className="relative cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(`${car.id}-ownership`)}
                          onMouseLeave={() => handleMouseLeave(`${car.id}-ownership`)}
                        >
                          <VehiclceInfoSVG />
                          {hovered[`${car.id}-ownership`] && (
                            <div className="absolute bottom-full left-1/2 cursor-pointer transform -translate-x-1/2 mb-2 w-48 bg-white text-black border border-[#667185] text-center rounded py-1">
                              Ownership status information
                            </div>
          )}
        </div>
     
                      </div>
                      <button className="text-[#099137] text-[11px] bg-[#B5E3C4] rounded-[6.25rem] w-[68px] h-[28px] self-end">
                        Verified
                      </button>
                    </h2>

                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center gap-[5px]">
                        <span>
                          <TicketSVG />
                        </span>
                       <span className={`${groteskText.className} text-[16px] text-[#667185] mr-[3px]`}>
                          Contravention Status:{" "}
                        </span>
                        <div
                          className="relative cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(`${car.id}-contravention`)}
                          onMouseLeave={() => handleMouseLeave(`${car.id}-contravention`)}
                        >
                          <VehiclceInfoSVG />
                          {hovered[`${car.id}-contravention`] && (
                            <div className="absolute bottom-full left-1/2 cursor-pointer transform -translate-x-1/2 border border-[#667185]  mb-2 w-48 bg-white text-black text-center rounded py-1">
                              Contravention status information
                            </div>
          )}
        </div>
                      </div>
                      <button className="text-[#099137] text-[11px] bg-[#B5E3C4] rounded-[2rem] w-[97px]  h-[28px] self-end">
                        {car.contraventionStatus}
                      </button>
                    </h2>

                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center gap-[3px]">
                        <span>
                          <UserTickSVG />
                        </span>
                        <span className={`${groteskText.className} text-[16px] text-[#667185] mr-[5px]`}>
                          Notification Recipient:{" "}
                        </span>
                        <div
                          className="relative cursor-pointer"
                          onMouseEnter={() => handleMouseEnter(`${car.id}-notification`)}
                          onMouseLeave={() => handleMouseLeave(`${car.id}-notification`)}
                        >
                          <VehiclceInfoSVG />
                          {hovered[`${car.id}-notification`] && (
                            <div className="absolute bottom-full left-1/2 border border-[#667185] transform -translate-x-1/2 mb-2 w-48 bg-white text-black text-center rounded py-1">
                              Notification recipient information
                            </div>
                          )}
        </div>
                      </div>
                      <button className="text-[#099137] text-[11px] bg-[#B5E3C4] rounded-[2rem]  w-[62px] h-[28px]  self-end">
                        {car.thirdPartyNominate}
                      </button>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex justify-between mt-[-28px] w-[270px] items-center">
                    <button className={`${groteskText.className} w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]`}
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
                    <button className={`${groteskText.className} w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]`}
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
}

export default CarProfile;
