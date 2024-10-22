"use client";

import ArrowToText from "@/assets/images/ArrowToText.png";
import landingPageImage1 from "@/assets/images/landingPageImage1.jpg";
import landingPageImage2 from "@/assets/images/landingPageImage2.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button, InputField } from "@/components";
import AniminateButton from "@/components/AniminateButton";
import FAQAccordion from "@/components/Faqquestion";
import FeatureCard from "@/components/FeaturesCard";
import {
  CalenderIcon,
  DashboardIcon,
  InstantNoficationIcon,
} from "@/components/FontIcon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NotificationBox from "@/components/NotificationBox";
import TextAnimation from "@/components/TextAnimation";
import { TextSection } from "@/components/TextSection";
import { groteskText, groteskTextMedium } from "./fonts";



export default function LandingPage() {
  console.log(TextAnimation)
  const [vehicleNo, setVehicleNo] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log(value);

    setVehicleNo(value);

    if (value === "") {
      setSearchResult(null);
    }
  };

  const handleSearch = () => {
    const hasContraventions = false;

    if (hasContraventions) {
      setSearchResult(false);
    } else {
      setSearchResult(true);
    }
  };

  const home = useRef(null);
  const search = useRef(null);
  const features = useRef(null);
  const faq = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef && elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const coloredText = (
    <span className="text-blue-500 font-bold">Contravention</span>
  );

  return (
    <div
      className={`${groteskText.className} "bg-white mx-auto w-full overflow-hidden "`}
    >
      <Header
        scrollToSection={scrollToSection}
        homeRef={home}
        searchRef={search}
        featuresRef={features}
        faqRef={faq}
        router={router}
      />

      <main className="pt-4">
        <section
          ref={home}
          className="z-20 max-w-[1440px] mx-auto  flex flex-col md:flex-row items-center px-4 md:w-4/5"
        >
          <div className="flex flex-col md:flex-row md:h-[573px]">
            <div className="flex flex-col justify-center px-4">
              <TextSection
                title={
                  <div className="text-5xl font-bold flex">
                  <div className="max-w-[340px] w-full">
                  <h1> Never Forget a Ticket Again!</h1> 
                  </div><TextAnimation /> 
                  </div>
                }
                content="Stay ahead of your vehicle's parking and driving fines with instant notifications, easy payments, and seamless appeals – all in one place."
              />

              <div className=" flex mt-4 items-center ">
                <Button
                  style={{width: '116px'}}
                  className={`py-0 px-0 w-full mt-0 h-[40px] rounded-[0.75rem] mr-[18px] text-[#000000] text-[18px] ${groteskTextMedium.className} cursor-pointer`} 
                  variant="secondary"
                  onClick={() => scrollToSection(search)}
                >
                  Search now
                </Button>

                <AniminateButton
                
                  // className="rounded-xl px-6 py-3 whitespace-nowrap"
                  // variant="primary"
                  onClick={() => router.push("/auth/login")}
                
                 text="Sign in"
                />
              </div>

              <div className="relative -top-[50px] left-[35px] md:left-[45px] md:w-[360px] ">
                <Image
                  src={ArrowToText}
                  alt="car"
                  width={303}
                  height={278}
                  className="object-cover h-full"
                />
              </div>
            </div>
            <div className=" flex-shrink-0">
              <Image
                src={landingPageImage1}
                alt={"car"}
                width={553}
                height={573}
                className="rounded-lg shadow-md object-cover h-full"
              />
            </div>
          </div>
        </section>

        <section
          ref={search}
          className=" max-w-[1240px] mx-auto  flex flex-col md:flex-row items-center py-9 md:py-[120px] px-4"
        >
          <div className="flex-shrink-0 order-2 md:order-1">
            <Image
              src={landingPageImage2}
              alt={"car"}
              width={600}
              height={642}
              className="rounded-lg shadow-md object-cover h-full "
            />
          </div>
          <div className="  md:pt-[143px] md:pl-24 flex flex-col justify-center p-4 order-1 md:order-2 ">
            <TextSection
              title={
                <div className="text-5xl font-bold">
                  You may have an existing ticket check
                </div>
              }
              content="Easily search for parking tickets and driving contraventions by entering your vehicle registration number. "
            />
            <InputField
              type="text"
              name="search"
              label="Vehicle reg number"
              placeholder="Enter your vehicle registration number"
              value={vehicleNo}
              onChange={handleChange}
              className="py-4 md:py-3"
            />
            <div className="flex justify-between  ">
              <div className=" md:pt-4 ">
                <Button
                  type="button"
                  className="rounded-[0.75rem] whitespace-nowrap h-[2.5rem] py-0 px-[23px]"
                  variant="primary"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>

              {searchResult === true && vehicleNo && (
                <NotificationBox
                  isSuccess={true}
                  message="No contraventions assigned to this reg number"
                />
              )}

              {searchResult === false && vehicleNo && (
                <NotificationBox
                  isSuccess={false}
                  message="An error occurred while fetching the data"
                />
              )}
            </div>
          </div>
        </section>
        <section
          ref={features}
          className=" max-w-[1240px] mx-auto  flex flex-col  items-center  md:justify-between space-y-10 md:space-y-0 md:space-x-6 pb-8 px-4 md:pb-[120px] "
        >
          <div className=" text-center md:px-80 pt-2">
            <TextSection
              title="All-in-one vehicle contravention solution"
              content="We handle everything from notifications to payments and appeals, so you can focus on the road."
            />
          </div>
          <div className="flex flex-col lg:flex-row item-center md:justify-between gap-7 md:py-10  ">
            <div className="flex flex-col ">
              <FeatureCard
                icon={<InstantNoficationIcon />}
                title="Instant Notifications"
                description="Get real-time alerts for parking tickets, driving fines, and vehicle-related contraventions directly to your phone or email. Never miss a deadline again."
                button
              />
            </div>
            <FeatureCard
              icon={<CalenderIcon />}
              title="Calendar Sync"
              description="Automatically sync payment deadlines with your Google, Apple, or Microsoft calendar to avoid missing important due dates."
            />
            <FeatureCard
              icon={<DashboardIcon />}
              title="Comprehensive Dashboard"
              description="View all your fines, payment history, appeal status, and notifications in one easy-to-navigate dashboard."
            />
          </div>
        </section>
        <section ref={faq} id="faq-section" className="pb-8 md:pb-[120px]  ">
          <FAQAccordion />
        </section>
        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
}
