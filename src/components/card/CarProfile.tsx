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
import VehiclceInfoSVG from "@/assets/svg/infoOutline.svg";
import "@/components/Slider.css";
import { useAuthStore } from "@/lib/stores/useStore";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { AiOutlineExpand } from "react-icons/ai";
import { useRef, useState } from "react";
import { MoveDiagonal } from "lucide-react";
import UserTickSVG from "@/assets/svg/user-tick.svg";
import InfoIconWithText from "../InfoIconWithText";

interface CarProfileProps {
  openCarProfile: any;
  addVehicleDetails: any;
  vehicles: any;
}

function CarProfile({
  openCarProfile,
  addVehicleDetails,
  vehicles,
}: CarProfileProps) {
  const user = useAuthStore((state) => state.user);
  const [hovered, setHovered] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalPages = vehicles.carDetails.length;

  console.log("Carprofile", vehicles.carDetails);

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
      sliderRef.current.slickPrev();
    }
    console.log("next");
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
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
          {vehicles.carDetails.map((car, index) => (
            <div key={car.id} className="">
              <div className="flex justify-between">
                <h1
                  className={`text-[24px] md:text-[2rem] text-[#000000] ${groteskTextMedium.className} `}
                >
                  My Vehicle
                </h1>
                <div className="items-center flex gap-[11px]">
                  <Button
                    variant="quinary"
                    className=" py-[0.5rem] px-[12px]"
                    onClick={addVehicleDetails}
                  >
                    Add vehicle
                    <Plus className="inline-block" />
                  </Button>
                  <button>
                    <MoveDiagonal
                      size={24}
                      onClick={() => openCarProfile(car)}
                    />
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
                    <button
                      className=" w-[97px] h-[28px] rounded-[0.25rem] items-center border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
                      onClick={goToPrevious}
                    >
                      <ChevronLeft
                        size={20}
                        style={{ display: "inline-flex", marginBottom: 3 }}
                      />
                      Previous
                    </button>
                    <div className="flex items-center space-x-2  ">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <span
                          key={index}
                          className={`w-[8px] h-[8px] rounded-full ${
                            currentSlide === index
                              ? "bg-gray-500"
                              : "bg-gray-200"
                          }`}
                        ></span>
                      ))}
                    </div>
                    <button
                      className="w-[74px] h-[28px] items-center rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]"
                      onClick={goToNext}
                    >
                      Next
                      <ChevronRight
                        size={20}
                        style={{ display: "inline-flex", marginBottom: 3 }}
                      />
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
                        <span
                          className={`${groteskText.className} text-[16px] text-[#667185]`}
                        >
                          Registration number:{" "}
                        </span>
                      </div>
                      <span
                        className={`${groteskText.className}text-[#212121] text-[11px] self-end`}
                      >
                        {car.registrationNumber}
                      </span>
                    </h2>
                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center gap-[5px]">
                        <span>
                          <UserProfileSVG />
                        </span>
                        <span
                          className={`${groteskText.className} text-[16px] text-[#667185]`}
                        >
                          Owner:{" "}
                        </span>
                      </div>
                      <span
                        className={`${groteskText.className}text-[#212121] text-[11px] self-end`}
                      >
                        {car.owner}
                      </span>
                    </h2>
                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <InfoIconWithText
                        icon={<UserTickSVG />}
                        text="Ownership status:"
                        identity={`${car.id}-ownership`}
                        infoText="Ownership status information"
                      />
                      <button className="text-[#099137] text-[11px] bg-[#B5E3C4] rounded-[6.25rem] w-[68px] h-[28px] self-end">
                        {car.status}
                      </button>
                    </h2>

                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <InfoIconWithText
                        icon={<TicketSVG />}
                        text="Contravention status:"
                        identity={`${car.id}-contravention`}
                        infoText="Contravention status information"
                      />

                      <button className="text-[#099137] text-[11px] bg-[#B5E3C4] rounded-[2rem] w-[97px]  h-[28px] self-end">
                        {/* {car.contraventionStatus} */}
                        {"No existing ticket"}
                      </button>
                    </h2>

                    <h2
                      className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <InfoIconWithText
                        icon={<UserTickSVG />}
                        text=" Notification Recipients:"
                        identity={`${car.id}-notification`}
                        infoText=" Notification recipient information"
                      />
                      <button className="text-[#099137] text-[11px] bg-[#B5E3C4] rounded-[2rem]  w-[62px] h-[28px]  self-end">
                        {car.nominees.length > 1 ? "Added" : "Not Added"}
                      </button>
                    </h2>
                  </div>
                </div>
              </div>
              <div className="hidden lg:flex justify-between mt-[-28px] w-[270px] items-center ">
                <button
                  className={`${groteskText.className} w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]`}
                  onClick={goToPrevious}
                >
                  <ChevronLeft
                    size={20}
                    style={{ display: "inline-flex", marginBottom: 3 }}
                  />
                  Previous
                </button>
                <div className="flex items-center space-x-2">
                  {totalPages <= 2 ? (
                    Array.from({ length: totalPages }).map((_, index) => (
                      <span
                        key={index}
                        className={`w-[8px] h-[8px] rounded-full ${
                          currentSlide === index ? "bg-gray-500" : "bg-gray-200"
                        }`}
                      ></span>
                    ))
                  ) : (
                    <>
                      {/* First dot */}
                      <span
                        className={`w-[8px] h-[8px] rounded-full ${
                          currentSlide === 0 ? "bg-gray-500" : "bg-gray-200"
                        }`}
                      ></span>

                      {/* Middle dot */}
                      <span
                        className={`w-[8px] h-[8px] rounded-full ${
                          currentSlide > 0 && currentSlide < totalPages - 1
                            ? "bg-gray-500"
                            : "bg-gray-200"
                        }`}
                      ></span>

                      {/* Last dot */}
                      <span
                        className={`w-[8px] h-[8px] rounded-full ${
                          currentSlide === totalPages - 1
                            ? "bg-gray-500"
                            : "bg-gray-200"
                        }`}
                      ></span>
                    </>
                  )}
                </div>
                <button
                  className={`${groteskText.className} w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]`}
                  onClick={goToNext}
                >
                  Next
                  <ChevronRight
                    size={20}
                    style={{ display: "inline-flex", marginBottom: 3 }}
                  />
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
