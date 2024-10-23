"use client";

import { groteskTextMedium, groteskText } from "@/app/fonts";
import UserProfileSVG from "@/assets/svg/exportProfile.svg";
import NumberSVG from "@/assets/svg/numbers.svg";
import GroupUserSVG from "@/assets/svg/profile-2user.svg";
import TicketSVG from "@/assets/svg/ticket.svg";
import { Button } from "@/components";

import "@/components/Slider.css";
import cars from "@/data/data.json";
import { useAuthStore } from "@/lib/stores/useStore";
import { MoveDiagonal, Plus } from "lucide-react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Drawer from "./Drawer";

interface CarProfileProps {
  openCarProfile: any;
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
    <div className="max-w-[680px] bg-[#FFFFFF] rounded-[20px] py-[1.5rem] pr-[2rem] pl-[2rem]">
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
                <Button variant="quinary" className=" py-[0.20rem] px-[12px]">
                  Add vehicle
                  <Plus className="inline-block" />
                </Button>
                <button>
                  <MoveDiagonal onClick={openCarProfile} />
                </button>
                {/* <Button></Button> */}
              </div>
            </div>

            <div className="flex justify-between mt-[14px]">
              <Image
                src={require(`@/assets/images/${car.imageUrl}`).default}
                alt=""
                sizes="max-width: 222px"
                className="max-w-[222px] "
              />
              <div className="border border-solid border-[#C5D5F8] rounded-[12px] pb-[0.75rem]">
                <div className="border border-b-[#C5D5F8] py-[12px] px-[16px]">
                  <h1
                    className={`text-[#212121] text-[20px] ${groteskTextMedium.className}`}
                  >
                    Car Details
                  </h1>
                </div>
                <div className="py-[12px] px-[16px]">
                  <h2
                    className={`flex items-center gap-[2.5px] text-[#757575] text-[18px] justify-between ${groteskText.className}`}
                  >
                    <div className="flex items-center ">
                      <span>
                        <NumberSVG />
                      </span>
                      <span>Registration No: </span>
                    </div>
                    <span className="text-[#212121] text-[16px] self-end">
                      {car.registrationNo}
                    </span>
                  </h2>
                  <h2
                    className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575] text-[18px] justify-between ${groteskText.className}`}
                  >
                    <div className="flex items-center">
                      <span>
                        <UserProfileSVG />
                      </span>
                      <span>Owner Name: </span>
                    </div>
                    <span className="text-[#212121] text-[16px] self-end">
                      {car.ownerName}
                    </span>
                  </h2>
                  <h2
                    className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575] text-[18px] justify-between ${groteskText.className}`}
                  >
                    <div className="flex items-center">
                      <span>
                        <TicketSVG />
                      </span>
                      <span>Contravention Status: </span>
                    </div>
                    <span className="text-[#212121] text-[16px] self-end">
                      {car.contraventionStatus}
                    </span>
                  </h2>

                  <h2
                    className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575] text-[18px] justify-between ${groteskText.className}`}
                  >
                    <div className="flex items-center">
                      <span>
                        <GroupUserSVG />
                      </span>
                      <span>Third Party Nominate: </span>
                    </div>
                    <span className="text-[#212121] text-[16px] self-end">
                      {car.thirdPartyNominate ? "Yes" : "No"}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarProfile;
