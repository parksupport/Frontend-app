"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/owner.svg";
import NumberSVG from "@/assets/svg/regNo.svg";
import GroupUserSVG from "@/assets/svg/profile-2user.svg";
import TicketSVG from "@/assets/svg/ticket-status.svg";
import { Button } from "@/components";
import VehiclceInfoSVG from "@/assets/svg/infoOutline.svg";
import "@/components/Slider.css";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import { AiOutlineExpand } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { MoveDiagonal } from "lucide-react";
import UserTickSVG from "@/assets/svg/nominee.svg";
import InfoIconWithText from "../InfoIconWithText";
import SliderButton from "../SliderButton";
import { useAuthStore } from "@/lib/stores/authStore";
import "./CarProfile.css";
import { useDisclosure } from "@chakra-ui/react";
import ModalComponent from "../Drawer/ModalComponent";
import { MdClose } from "react-icons/md";
import SubscriptionPlans from "../Subscription";
import AddVehicleSubscription from "../VehicleNomineeRestriction";

interface CarProfileProps {
  openCarProfile: any;
  openAddVehicleDetailsDrawer: any;
  vehicles: any;
  verify: any;
  plan_id: any;
  openAddBillingMethod?: any;
}

const CarProfile = ({
  openCarProfile,
  openAddVehicleDetailsDrawer,
  vehicles,
  verify,
  plan_id,
  openAddBillingMethod,
}: CarProfileProps) => {
  const user = useAuthStore((state) => state.user);
  const { full_name } = user || {};
  const [hovered, setHovered] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalPages = vehicles?.length || 0;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };

  const goToPrevious = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const AddVehicleWithPlan = (plan_id, vehicles) => {
    console.log(plan_id, vehicles.length);
    if (plan_id === 1) {
      onOpen();
    } else if (plan_id === 2 && vehicles === 2) {
      onOpen();
    } else if (plan_id === 3 && vehicles === 5) {
      onOpen();
    } else {
      openAddVehicleDetailsDrawer();
    }
  };

  return (
    <div>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        display={
          <AddVehicleSubscription
            plan={plan_id}
            closeModal={onClose}
            openAddBillingMethod={openAddBillingMethod}
          />
        }
      />
      {/* Show this if there are no vehicles */}
      {totalPages === 0 ? (
        <div className="max-w-[396px]  w-full lg:max-w-[680px] bg-[#FFFFFF] rounded-[20px] py-[20px] px-4">
          <div className="flex justify-center items-center flex-col">
            <div className="flex flex-col justify-center items-center  text-4xl">
              <h2
                className={` ${groteskTextMedium.className} leading-none mt-4 text-[28px]`}
              >
                Lets Get Started With Your First Vehicle
              </h2>
              <div className="self-center flex flex-col max-w-[253px]">
                <Image
                  src={require(`@/assets/images/Essential illustrations.jpg`)}
                  alt=""
                  sizes="width: 222px"
                />
              </div>
            </div>

            <Button
              variant="quinary"
              className=" py-[9px] px-[12px] text-[16px]"
              onClick={() => AddVehicleWithPlan(plan_id, vehicles.length)}
            >
              Add vehicle
              <Plus className="inline-block ml-[8px]" />
            </Button>
          </div>
        </div>
      ) : (
        /* Show the article if vehicles exist */
        <article className="flex justify-center">
          <div className="max-w-[396px] w-full lg:max-w-[680px] bg-[#FFFFFF] rounded-[20px] py-[20px] px-4 ">
            <Slider ref={sliderRef} {...settings}>
              {vehicles?.map((car, index) => (
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
                        className={`py-[9px] px-[12px] text-[16px] `}
                        onClick={() =>
                          AddVehicleWithPlan(plan_id, vehicles.length)
                        }
                      >
                        Add vehicle
                        <Plus className="inline-block" />
                      </Button>
                      <button>
                        <MoveDiagonal size={24} onClick={openCarProfile} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col  lg:flex lg:flex-row justify-center  mt-[14px] items-center">
                    <div className="order-2 w-full lg:order-1 flex flex-col lg:w-[257px]">
                      <div className=" self-center flex flex-col max-w-[253px] ">
                        {car?.make ? (
                          <Image
                            src={require(`@/assets/images/${car.make.toLowerCase()}.jpg`)}
                            alt=""
                            sizes="width: 222px"
                            // className="max-w-[222px] "
                          />
                        ) : (
                          <Image
                            src={require(`@/assets/images/car.jpg`)}
                            alt=""
                            sizes="width: 222px"
                            // className="max-w-[222px] "
                          />
                        )}
                      </div>
                      <div className="flex justify-between  mt-auto items-center lg:hidden">
                        <SliderButton
                          direction="previous"
                          isDisabled={currentSlide === 0}
                          onClick={goToPrevious}
                        />
                        <div className="flex items-center space-x-2">
                          {totalPages <= 3 ? (
                            Array.from({ length: totalPages }).map(
                              (_, index) => (
                                <span
                                  key={index}
                                  className={`w-[8px] h-[8px] rounded-full ${
                                    currentSlide === index
                                      ? "bg-gray-500"
                                      : "bg-gray-200"
                                  }`}
                                ></span>
                              )
                            )
                          ) : (
                            <>
                              {/* First dot */}
                              <span
                                className={`w-[8px] h-[8px] rounded-full ${
                                  currentSlide === 0
                                    ? "bg-gray-500"
                                    : "bg-gray-200"
                                }`}
                              ></span>

                              {/* Middle dot */}
                              <span
                                className={`w-[8px] h-[8px] rounded-full ${
                                  currentSlide > 0 &&
                                  currentSlide < totalPages - 1
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
                        <SliderButton
                          direction="next"
                          isDisabled={currentSlide === totalPages - 1}
                          onClick={goToNext}
                        />
                      </div>
                    </div>

                    <div className="order-1 lg:order-2 border border-solid border-[#C5D5F8] rounded-[12px] pb-[6px] lg:w-[359px] ">
                      <div className="border border-b-[#C5D5F8] py-[0.4rem] px-[16px]">
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
                              className={`${groteskText.className} text-[1rem] text-[#667185]`}
                            >
                              Registration number:{" "}
                            </span>
                          </div>
                          <span
                            className={`${groteskText.className} text-[#212121] md:text-[16px] text-[11px] self-end`}
                          >
                            {car.registration_number}
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
                              className={`${groteskText.className} text-[1rem] text-[#667185]`}
                            >
                              Owner:{" "}
                            </span>
                          </div>
                          <span
                            className={`${groteskText.className} text-[#212121] md:text-[16px] text-[11px] self-end`}
                          >
                            {full_name}
                          </span>
                        </h2>

                        <h2
                          className={`flex items-center mt-[10px] gap-[2.5px] text-[#757575] justify-between ${groteskText.className}`}
                        >
                          <InfoIconWithText
                            icon={<UserTickSVG />}
                            text="Ownership status:"
                            identity={`${car.id}-ownership`}
                            infoText="Ownership status information"
                          />

                          <div className="relative w-[68px] h-[18px]">
                            <button
                              onClick={
                                car.verification_status === "Pending"
                                  ? () => verify(car)
                                  : undefined
                              }
                              className={`absolute inset-0 flex items-center justify-center text-[11px] rounded-[6.25rem] overflow-hidden ${
                                car.status === "Pending"
                                  ? "text-[#B38B00] bg-[#FFECB3]"
                                  : car.status === "Verified"
                                  ? "text-[#099137] bg-[#B5E3C4]"
                                  : "text-[#B00020] bg-[#FFCDD2]"
                              }`}
                            >
                              {car.verification_status === "Pending" && (
                                <>
                                  <div className="absolute inset-0">
                                    <div
                                      className="absolute w-[9999px] h-[9999px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
                                      style={{
                                        backgroundImage: `conic-gradient(rgba(0, 0, 0, 0), #FFD700, rgba(0, 0, 0, 0) 25%)`,
                                        animation: "glow 5s linear infinite",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="absolute inset-0 blur-2xl"
                                    style={{
                                      backgroundImage: `conic-gradient(rgba(0, 0, 0, 0), #FFD700, rgba(0, 0, 0, 0) 25%)`,
                                      animation: "glow 5s linear infinite",
                                    }}
                                  />
                                </>
                              )}
                              <div
                                className="absolute inset-[2px] rounded-[6.25rem]"
                                style={{
                                  background:
                                    car.verification_status === "Pending"
                                      ? "#FFECB3"
                                      : car.status === "Verified"
                                      ? "#B5E3C4"
                                      : "#FFCDD2",
                                }}
                              />
                              <span className="relative z-10">
                                {car.verification_status}
                              </span>
                            </button>
                          </div>
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

                          <button className="text-[#099137] text-[11px] bg-[#B5E3C4]  cursor-auto rounded-[2rem] w-[97px]  h-[18px] self-end">
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
                          <button
                            className={`text-[11px] rounded-[2rem] w-[62px] cursor-auto h-[18px] self-end ${
                              car.has_nominee
                                ? "text-[#099137] bg-[#B5E3C4]"
                                : "text-[#D9534F] bg-[#F2D1D1]"
                            }`}
                          >
                            {car.has_nominee ? "Added" : "Not Added"}
                          </button>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:flex justify-between mt-[-28px] w-[270px] items-center md:w-[40%] ">
                    <SliderButton
                      direction="previous"
                      isDisabled={currentSlide === 0}
                      onClick={goToPrevious}
                    />
                    <div className="flex items-center space-x-2">
                      {totalPages <= 3 ? (
                        Array.from({ length: totalPages }).map((_, index) => (
                          <span
                            key={index}
                            className={`w-[8px] h-[8px] rounded-full ${
                              currentSlide === index
                                ? "bg-gray-500"
                                : "bg-gray-200"
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
                    <SliderButton
                      direction="next"
                      isDisabled={currentSlide === totalPages - 1}
                      onClick={goToNext}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </article>
      )}
    </div>
  );
};

export default CarProfile;

