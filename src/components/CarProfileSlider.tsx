"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/owner.svg";
import NumberSVG from "@/assets/svg/regNo.svg";
import GroupUserSVG from "@/assets/svg/nominee.svg";
import TicketSVG from "@/assets/svg/ticket-status.svg";
import Outline from "@/assets/svg/outlined.svg";
import CarFilter from "@/assets/svg/color.svg";
import CarMake from "@/assets/svg/carMake.svg";
import Slider from "react-slick";
import Image from "next/image";
import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import DeleteRowModal from "./DeleteRowModal";
import useDeleteRow from "@/hooks/useDeleteRow";
import SliderButton from "./SliderButton";
import { groteskText as globalText } from "@/assets/fonts";
import SearchSortModal from "./SearchSortModal";
import { MdHistory } from "react-icons/md";

interface CarProfileSliderProps {
  vehicles: any[];
  openAddVehicleDetailsDrawer: () => void;
  onVehicleChange?: (index: number) => void;
  setForm: (form: boolean) => void;
  scrollToForm: () => void;
  user_type: string;
  full_name: string;
}

const CarProfileSlider = ({
  vehicles = [],
  openAddVehicleDetailsDrawer,
  onVehicleChange,
  setForm,
  scrollToForm,
  user_type,
  full_name,
}: CarProfileSliderProps) => {
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
  } = useDeleteRow(vehicles, "vehicle");

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const totalPages = data?.length || 0;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => {
      setCurrentSlide(current);
      if (onVehicleChange) {
        onVehicleChange(current);
      }
    },
  };

  const goToPrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <article className="max-w-[428px] w-full md:max-w-[900px] mx-auto">
      {user_type === "Corporate" && (
        <div className="flex justify-end">
          <SearchSortModal name={full_name} data={data} setData={setData} />
          <button
            onClick={() => console.log("hi")}
            className="ml-4 w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 flex items-center justify-center mt-8"
          >
            <MdHistory size={20} />
          </button>
        </div>
      )}

      {data?.length > 0 && (
        <div className="bg-white rounded-[20px] border border-solid border-[#C5D5F8] px-2 pt-5 pb-3 mt-2">
          <Slider ref={sliderRef} {...settings}>
            {data.map((car, index) => (
              <div key={car.id || index} className="px-2">
                {/* Header */}
                <div className="flex justify-between mb-2">
                  <h1
                    className={`text-[20px] md:text-[24px] text-black ${groteskTextMedium.className}`}
                  >
                    My Vehicle
                  </h1>

                  {/* (UPDATED) Wrap the entire button+icon+modal in a relative container */}
                  <div className="flex items-center space-x-3 relative">
                    <button
                      onClick={openAddVehicleDetailsDrawer}
                      className="bg-[#3957D7] flex items-center text-white rounded-[8px] py-[0.2rem] px-[8px] text-[16px] hover:opacity-90"
                    >
                      Add vehicle
                      <Plus size={20} className="ml-1" />
                    </button>

                    {/* The Outline icon - we toggle the dropdown here */}
                    <div
                      className="cursor-pointer"
                      onClick={() => toggleDropdown(index)}
                    >
                      <Outline />
                    </div>

                    {/* If openDropdownIndex matches index, show the modal here */}
                    {openDropdownIndex === index && (
                      <DeleteRowModal
                        showConfirmButton={showConfirmButton}
                        onEdit={() => {}}
                        onRemove={() => showDeleteConfirmation(index)}
                        onCancelDelete={cancelDelete}
                        onConfirmDelete={() => {
                          handleDelete(index);
                          if (
                            currentSlide >= data.length - 1 &&
                            data.length > 1
                          ) {
                            setCurrentSlide((s) => s - 1);
                          }
                        }}
                        selectedDataIndex={selectedDataIndex}
                        index={index}
                        customStyles={`${globalText.className} text-[14px]`}
                        // (UPDATED) shift it below the icon
                        position={{
                          top: "calc(100% + 6px)",
                          left: "auto",
                          right: 0,
                        }}
                        isVehicle
                        onClose={() => setOpenDropdownIndex(null)}
                        onAddNominee={() => {
                          setForm(true);
                          setTimeout(scrollToForm, 100);
                          setOpenDropdownIndex(null);
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row mt-3 items-center">
                  {/* Car Details: left box */}
                  <div className="border border-[#C5D5F8] rounded-[12px] pb-2 w-full max-w-[480px]">
                    <div className="border-b border-[#C5D5F8] py-2 px-2">
                      <h1
                        className={`text-black text-[20px] md:text-[24px] ${groteskTextMedium.className}`}
                      >
                        Car Details
                      </h1>
                    </div>
                    <div className="py-2 px-2">
                      {[
                        {
                          icon: <NumberSVG />,
                          label: "Registration number:",
                          value: car.registration_number,
                        },
                        {
                          icon: <UserProfileSVG />,
                          label: "Owner:",
                          value: full_name,
                        },
                        {
                          icon: <TicketSVG />,
                          label: "Verification Status:",
                          value: (
                            <button
                              className={`text-[11px] rounded-[6.25rem] px-2 py-1 self-end ${
                                car.verification_status === "Pending"
                                  ? "text-[#B38B00] bg-[#FFECB3]"
                                  : car.verification_status === "Verified"
                                  ? "text-[#099137] bg-[#B5E3C4]"
                                  : "text-[#B00020] bg-[#FFCDD2]"
                              }`}
                            >
                              {car.verification_status}
                            </button>
                          ),
                        },
                        {
                          icon: <GroupUserSVG />,
                          label: "Notification Recipient:",
                          value: (
                            <button
                              className={`text-[11px] rounded-[2rem] w-[62px] cursor-auto h-[18px] self-end ${
                                car.has_nominee
                                  ? "text-[#099137] bg-[#B5E3C4]"
                                  : "text-[#D9534F] bg-[#F2D1D1]"
                              }`}
                            >
                              {car.has_nominee ? "Added" : "Not Added"}
                            </button>
                          ),
                        },
                        {
                          icon: <CarFilter />,
                          label: "Color:",
                          value: car.color,
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between my-2 text-[#757575] ${groteskText.className}`}
                        >
                          <div className="flex items-center gap-[2.5px]">
                            {item.icon}
                            <span className="text-[13px] md:text-[16px]">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-[#212121] text-[13px] md:text-[16px]">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Car Image: right box */}
                  <div className="flex flex-col justify-center items-center">
                    <div className="mt-4 md:mt-0 md:ml-4 max-w-[359px]">
                      {car.make ? (
                        <Image
                          src={require(`@/assets/images/${car.make.toLowerCase()}.jpg`)}
                          alt="Car Type"
                          width={250}
                          height={150}
                          className="mx-auto"
                        />
                      ) : (
                        <Image
                          src={require(`@/assets/images/car.jpg`)}
                          alt="Default Car"
                          width={250}
                          height={150}
                          className="mx-auto"
                        />
                      )}
                    </div>
                    <div
                      className={`${groteskTextMedium.className} text-[36px]`}
                    >
                      {car.registration_number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Slider Nav Buttons */}
          <div className="w-full flex justify-between mt-4 gap-5 px-5 md:px-0 lg:w-[55%]">
            <SliderButton
              direction="previous"
              isDisabled={currentSlide === 0}
              onClick={goToPrevious}
            />
            {/* Dot indicators */}
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <span
                  key={idx}
                  className={`w-[8px] h-[8px] rounded-full ${
                    currentSlide === idx ? "bg-gray-500" : "bg-gray-200"
                  }`}
                ></span>
              ))}
            </div>
            <SliderButton
              direction="next"
              isDisabled={currentSlide === totalPages - 1}
              onClick={goToNext}
            />
          </div>
        </div>
      )}

      {data?.length === 0 && (
        <div className="bg-white rounded-[20px] border border-solid border-[#C5D5F8] p-4 mt-2 text-center">
          <p className="text-gray-700 mb-4">
            You have no vehicles yet. Add one to get started.
          </p>
          <button
            onClick={openAddVehicleDetailsDrawer}
            className="bg-[#3957D7] text-white px-4 py-2 rounded"
          >
            Add vehicle
          </button>
        </div>
      )}
    </article>
  );
};

export default CarProfileSlider;
