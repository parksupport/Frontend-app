"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/owner.svg";
import NumberSVG from "@/assets/svg/regNo.svg";
import GroupUserSVG from "@/assets/svg/nominee.svg";
import TicketSVG from "@/assets/svg/ticket-status.svg";
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
import EditSVG from "@/assets/svg/edit-vehicle.svg";
import DeleteSVG from "@/assets/svg/delete-vehicle.svg";
import CarFilter from "@/assets/svg/color.svg";
import CarMake from "@/assets/svg/carMake.svg";
import UndoDelete from "@/assets/svg/undoDelete.svg";
import ConfirmDeleteSVG from "@/assets/svg/confirmDelete.svg";
import queryClient from "@/lib/tanstack-query/queryClient";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDeleteCar } from "@/lib/tanstack-query/useDelete";
import vehicle from "@/api/vehicle";
import SearchSortModal from "./SearchSortModal";
import useDeleteRow from "@/hooks/useDeleteRow";
import { MdHistory } from "react-icons/md";
import DeleteRowModal from "./DeleteRowModal";
import SliderButton from "./SliderButton";
interface CarProfileSliderProps {
  vehicles: any;
  addVehicle: () => void;
  onVehicleChange?: any;
  user?: "User" | "Corporate";
  setForm: any;
  scrollToForm: any;
}

// const deleteCar = async (carId: string): Promise<void> => {
//   // await axios.delete(`/api/cars/${carId}`);
// };

const CarProfileSlider: React.FC<CarProfileSliderProps> = ({
  vehicles,
  addVehicle,
  onVehicleChange,
  user,
  setForm,
  scrollToForm,
}) => {
  const {
    openDropdownIndex,
    data,
    showConfirmButton,
    selectedDataIndex,
    toggleDropdown,
    handleDelete,
    showDeleteConfirmation,
    cancelDelete,
    setData,
    setOpenDropdownIndex,
  } = useDeleteRow(vehicles?.carDetails);

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const totalPages = data?.length;
  const settings = {
    dots: true,
    infinite: false,
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
      sliderRef.current.slickPrev();
    }
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleSliderChange = (index: number) => {
    onVehicleChange(index); // Notify the parent about the vehicle change
  };

  return (
    <article className="max-w-[428px] w-full md:max-w-[580px]">
      {user === "Corporate" && (
        <div className="flex justify-end ">
          <SearchSortModal data={data} setData={setData} />
          <button
            onClick={() => console.log("hi")}
            className=" ml-4  w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center mt-8"
          >
            <MdHistory size={20} />
          </button>
        </div>
      )}
      {data?.length >= 1 && (
        <div className="bg-[#FFFFFF] rounded-[20px] border border-solid border-[#C5D5F8] px-[8px] pt-[20px] pb-[13px] mt-[8px]">
          <Slider ref={sliderRef} {...settings}>
            {data?.map((car, index) => (
              <div key={car.id}>
                {/* Header */}
                <div className="flex justify-between">
                  <h1
                    className={`text-[20px] text-[#000000] ${groteskTextMedium.className}`}
                  >
                    My Vehicle
                  </h1>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div
                        className="flex items-center gap-[11px]"
                        onClick={addVehicle}
                      >
                        <button className="bg-[#3957D7] flex items-center text-white cursor-pointer rounded-[8px] py-[0.2rem] px-[8px] text-[16px]">
                          Add vehicle
                          <Plus className="inline-block" size={20} />
                        </button>
                      </div>
                      <div className="cursor-pointer">
                        <Outline onClick={() => toggleDropdown(index)} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-col flex md:flex-row mt-[14px] items-center relative">
                  {/* Image Section */}
                  <div className="order-2 flex flex-col max-w-[253px] w-full">
                    {openDropdownIndex === index && (
                      <DeleteRowModal
                        showConfirmButton={showConfirmButton}
                        onEdit={() => {}}
                        onRemove={() => showDeleteConfirmation(index)}
                        onCancelDelete={cancelDelete}
                        onConfirmDelete={() => handleDelete(index)}
                        selectedDataIndex={selectedDataIndex}
                        index={index}
                        customStyles={`${groteskText.className} text-[14px]`}
                        position={{ right: 0, top: -15 }}
                        isVehicle
                        onClose={() => setOpenDropdownIndex(null)}
                        onAddNominee={() => {
                          setForm(true);
                          setTimeout(scrollToForm, 125);
                          setOpenDropdownIndex(null);
                        }}
                      />
                    )}
                    <Image
                      src={require(`@/assets/images/${car.imageUrl}`).default}
                      alt=""
                    />
                  </div>

                  {/* Car Details Section */}
                  <div className="order-1 border border-solid border-[#C5D5F8] rounded-[12px] pb-[6px] w-full max-w-[359px]">
                    <div className="border-b border-[#C5D5F8] py-[8px] px-[8px]">
                      <h1
                        className={`text-[#212121] text-[20px] ${groteskTextMedium.className}`}
                      >
                        Car Details
                      </h1>
                    </div>
                    <div className="py-[4px] px-[8px]">
                      {[
                        {
                          icon: <NumberSVG />,
                          label: "Registration number:",
                          value: car.registrationNumber,
                        },
                        {
                          icon: <UserProfileSVG />,
                          label: "Owner:",
                          value: car.owner,
                        },
                        {
                          icon: <TicketSVG />,
                          label: "Verification Status:",
                          value: (
                            <button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[6.25rem] w-[68px] h-[28px] self-end">
                              {car.status}
                            </button>
                          ),
                        },
                        {
                          icon: <GroupUserSVG />,
                          label: "Notification Recipient:",
                          value: car.thirdPartyNominee,
                        },
                        {
                          icon: <CarFilter />,
                          label: "Color:",
                          value: car.color,
                        },
                        {
                          icon: <CarMake />,
                          label: "Make:",
                          value: car.make,
                        },
                      ].map((item, idx) => (
                        <h2
                          key={idx}
                          className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575] justify-between ${groteskText.className}`}
                        >
                          <div className="flex items-center">
                            <span>{item.icon}</span>
                            <span className="text-[13px]">{item.label}</span>
                          </div>
                          <span className="text-[#212121] text-[13px] self-end">
                            {item.value}
                          </span>
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="w-full flex justify-between mt-[11px] gap-5 px-5 md:px-0 lg:w-[55%]">
                  <SliderButton
                    direction="previous"
                    isDisabled={currentSlide === 0}
                    onClick={goToPrevious}
                  />

                  <div className="flex items-center space-x-2">
                    {totalPages <= 2 ? (
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
      )}
    </article>
  );
};

export default CarProfileSlider;
