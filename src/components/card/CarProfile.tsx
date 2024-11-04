"use client";

import { groteskText, groteskTextMedium } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/exportProfile.svg";
import NumberSVG from "@/assets/svg/numbers.svg";
import GroupUserSVG from "@/assets/svg/profile-2user.svg";
import TicketSVG from "@/assets/svg/ticket.svg";
import { Button } from "@/components";

import "@/components/Slider.css";
import cars from "@/data/data.json";
import { useAuthStore } from "@/lib/stores/useStore";
import { Plus } from "lucide-react";
import Image from "next/image";
import { AiOutlineExpand } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface CarProfileProps {
  openCarProfile: (car: any) => void;

}

function CarProfile({ openCarProfile }: CarProfileProps) {
  const user = useAuthStore((state) => state.user);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <article>
      <div className="w-full max-w-[680px] bg-[#FFFFFF] rounded-[20px] py-[24px] px-4 ">
        <Slider {...settings}>
          {cars.carDetails.map((car, index) => (
            <div key={car.id} className="">
              <div className="flex justify-between">
                <h1
                  className={`text-[2rem] text-[#000000] ${groteskTextMedium.className} `}
                >
                  My Vehicle
                </h1>
                <div className="items-center flex gap-[11px]">
                  <Button variant="quinary" className=" py-[0.5rem] px-[12px]">
                    Add vehicle
                    <Plus className="inline-block" />
                  </Button>
                  <button>
                    <AiOutlineExpand size={24} onClick={()=> openCarProfile(car)} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between mt-[14px]">
                <div className="flex flex-col max-w-[253px] w-full">
                  <Image
                    src={require(`@/assets/images/${car.imageUrl}`).default}
                    alt=""
                    sizes="max-width: 222px"
                    className="max-w-[222px] "
                  />
                  <div className="flex justify-between mt-auto">
                    <button className=" w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">
                      Previous
                    </button>
                    <button className="w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">
                      Next
                    </button>
                  </div>
                </div>
                <div className="border border-solid border-[#C5D5F8] rounded-[12px] pb-[6px] w-full max-w-[359px]">
                  <div className="border border-b-[#C5D5F8] py-[12px] px-[16px]">
                    <h1
                      className={`text-[#212121] text-[20px] ${groteskTextMedium.className}`}
                    >
                      Car Details
                    </h1>
                  </div>
                  <div className="py-[12px] px-[16px]">
                    <h2
                      className={`flex items-center gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center ">
                        <span>
                          <NumberSVG />
                        </span>
                        <span className="text-[16px]">Registration number: </span>
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
                        <span className="text-[16px]">Owner: </span>
                      </div>
                      <span className="text-[#212121] text-[13px] self-end">
                        {car.ownerName}
                      </span>
                    </h2>
                    <h2
                      className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center">
                        <span>
                          <GroupUserSVG />
                        </span>
                        <span className="text-[16px]">Ownership status: </span>
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
                          <TicketSVG />
                        </span>
                        <span className="text-[16px]">
                          Contravention Status:{" "}
                        </span>
                      </div>
                      <button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[2rem] w-[120px]  h-[28px] self-end">
                        {car.contraventionStatus}
                      </button>
                    </h2>

                    <h2
                      className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}
                    >
                      <div className="flex items-center">
                        <span>
                          <GroupUserSVG />
                        </span>
                        <span className="text-[16px]">
                          Third Party Nominate:{" "}
                        </span>
                      </div>
                      <button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[2rem]  w-[62px] h-[28px]  self-end">
                        {car.thirdPartyNominate}
                      </button>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </article>
  );
}

export default CarProfile;