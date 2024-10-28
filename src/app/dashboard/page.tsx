// app/dashboard/page.tsx
"use client";
import HeaderImage from "@/components/HeaderImage";
import SearchSVG from "@/assets/svg/search-normal.svg";
import { useAuthStore } from "@/lib/stores/authStore";
import { IoNotifications,  } from "react-icons/io5";
import SettingSVG from '@/assets/svg/setting.svg'
import ProfileSVG from '@/assets/svg/Ellipse.svg'
import {  Plus } from "lucide-react";
import NumberSVG from '@/assets/svg/numbers.svg'
import UserProfileSVG from '@/assets/svg/exportProfile.svg'
import GroupUserSVG from '@/assets/svg/profile-2user.svg'
import TicketSVG from '@/assets/svg/ticket.svg'
import { Button } from "@/components";
import Image from "next/image";
import { groteskText, groteskTextMedium } from "../fonts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import cars from '@/data/data.json'
import ContraventionTable from "@/components/card/Contravention";
import '@/components/Slider.css'
import { MoveDiagonal } from "lucide-react";
import Calendar from "@/components/card/Calendar";
import FAQ from "@/components/card/FAQ";
export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <button className="slick-prev">prev</button>,
    // nextArrow: <button className="slick-next">next</button>,
  };

  return (
    <div className="flex flex-col">
      <header className="w-full flex bg-[#FFFFFF] h-[75px] border-solid pl-[44px] pr-[18px] pt-[11px] items-center justify-between">
        <div className="self-start flex">
          <HeaderImage />
        </div>

        <form className="relative max-w-[600px] w-full h-[36px] rounded-[6px]">
          <input type="text"

            placeholder="Find contravention "
            className="w-full h-full bg-[#F7F9FC] px-[44px] focus:outline-[#E0E0E0]" />

          <SearchSVG className="absolute left-4 top-2 cursor-pointer" />

        </form>

        <div className="max-w-[250px] w-full flex justify-between items-center ">
          <div>
            <button className="cursor-pointer">
              <IoNotifications size={24} color="grey" />

            </button>
          </div>
          <div>
            <button className="cursor-pointer">
              <SettingSVG size={24} color="grey" />

            </button>
          </div>
          <div className=" ">
            |
          </div>
          <div>
            <button className="cursor-pointer">
              <ProfileSVG />
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="mx-[30px] flex flex-col justify-center items-center w-full">

        <section className="flex flex-col max-w-[1380px] w-full justify-between pt-[1.5rem] ">
          <div className="mt-p24px] flex self-start"><h1 className={`text-[2rem] text-[#000000] ${groteskTextMedium.className} `}>Welcome Back, Orobosa</h1><button
            className="rounded-[37px] bg-[#CEFDFF] h-[22px] px-[12px] text-[#039BB7] text-[12px] mt-[6px] ml-[4px]"
            >Free plan</button>
          </div>

          <div className="flex justify-between mt-[1.5rem]">
            <article >
            <div className="w-full max-w-[680px] bg-[#FFFFFF] rounded-[20px] py-6 px-4 md:py-8 md:px-6 lg:px-8">
            <Slider {...settings}>
                  {cars.carDetails.map((car, index) => (
                    <div key={car.id} className="">

                      <div className="flex justify-between">
                        <h1 className={`text-[2rem] text-[#000000] ${groteskTextMedium.className} `}>My Vehicle</h1>
                        <div className="items-center flex gap-[11px]">
                          <Button
                            variant="quinary"
                            className=" py-[0.5rem] px-[12px]"
                          >Add vehicle<Plus className="inline-block" /></Button>
                          <button><MoveDiagonal /></button>
                          {/* <Button></Button> */}
                        </div>

                      </div>

                      <div className="flex justify-between mt-[14px]">
                 <div className="flex flex-col max-w-[253px] w-full">
                 <Image src={require(`@/assets/images/${car.imageUrl}`).default} alt='' sizes="max-width: 222px" className="max-w-[222px] " />
                        <div className="flex justify-between mt-auto">
               <button className=" w-[97px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">Previous</button>
               <button className="w-[74px] h-[28px] rounded-[0.25rem] border border-[#D0D5DD] text-[1rem] text-[#1C1B1B]">Next</button>
               </div>
                 </div>
                        <div className="border border-solid border-[#C5D5F8] rounded-[12px] pb-[6px] w-full max-w-[359px]">
                          <div className="border border-b-[#C5D5F8] py-[12px] px-[16px]">
                            <h1 className={`text-[#212121] text-[20px] ${groteskTextMedium.className}`}>Car Details</h1>
                          </div>
                          <div className="py-[12px] px-[16px]">
                            <h2 className={`flex items-center gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}><div className="flex items-center "><span><NumberSVG /></span><span className="text-[16px]">Registration No: </span></div><span className="text-[#212121] text-[13px] self-end">{car.registrationNo}</span></h2>
                            <h2 className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}><div className="flex items-center"><span><UserProfileSVG /></span><span  className="text-[16px]">Owner Name:  </span></div><span className="text-[#212121] text-[13px] self-end">{car.ownerName}</span></h2>
                            <h2 className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}><div className="flex items-center"><span><GroupUserSVG /></span><span className="text-[16px]">Ownership status:  </span></div><button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[6.25rem] w-[68px] h-[28px] self-end">Verified</button></h2>

                            <h2 className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}><div className="flex items-center"><span><TicketSVG /></span><span className="text-[16px]">Contravention Status:  </span></div><button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[2rem] w-[120px]  h-[28px] self-end">{car.contraventionStatus}</button></h2>

                            <h2 className={`flex items-center mt-[0.75rem] gap-[2.5px] text-[#757575]  justify-between ${groteskText.className}`}><div className="flex items-center"><span><GroupUserSVG /></span><span className="text-[16px]">Third Party Nominate:  </span></div><button className="text-[#099137] text-[13px] bg-[#B5E3C4] rounded-[2rem]  w-[62px] h-[28px]  self-end">{car.thirdPartyNominate }</button></h2>

                          </div>
                        </div>

                      </div>
                      
  
                    </div>
                    
                  
                  ))}
                </Slider>
           
               

              </div>
            </article>


            <article>
              <ContraventionTable invoices={undefined} />
            </article>
          </div>
        </section>


 <section className="flex flex-col max-w-[1380px] w-full justify-between pt-[1.5rem] ">
  
<Calendar />
 </section>
 <section className="flex max-w-[1380px] w-full  mt-[20px]">
  <FAQ />
 </section>

      </main>
    </div>
  );
}
