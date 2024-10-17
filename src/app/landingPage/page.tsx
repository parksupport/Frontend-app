"use client";

import ArrowToText from "@/assets/images/ArrowToText.png";
import landingPageImage1 from "@/assets/images/landingPageImage1.jpg";
import landingPageImage2 from "@/assets/images/landingPageImage2.jpg";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, InputField } from "@/components";
import FAQAccordion from "@/components/Faqquestion";
import FeatureCard from "@/components/FeaturesCard";
import {
  CalenderIcon,
  DashboardIcon,
  InstantNoficationIcon,
} from "@/components/FontIcon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TextSection } from "@/components/TextSection";

export default function LandingPage() {
  const [vehicleNo, setVehicleNo] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleNo(value);
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
    <div className="bg-white mx-auto max-w-[1440px] overflow-hidden">
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
          className="z-20 max-w-[1240px] mx-auto  flex flex-col md:flex-row items-center px-4"
        >
          <div className="flex flex-col md:flex-row md:h-[573px]">
            <div className="flex flex-col justify-center px-4">
              <TextSection
                title={
                  <div className="text-5xl font-bold">
                    Never Forget a {coloredText} Ticket Again!
                  </div>
                }
                content="Stay ahead of your vehicle's parking and driving fines with instant notifications, easy payments, and seamless appeals – all in one place."
              />

              <div className="z-10 flex space-x-5 mt-4 w-[230px] ">
                <Button
                  type="button"
                  className="rounded-xl px-6 py-3 whitespace-nowrap"
                  variant="secondary"
                  onClick={() => scrollToSection(search)}
                >
                  Search now
                </Button>

                <Button
                  type="button"
                  className="rounded-xl px-6 py-3 whitespace-nowrap"
                  variant="primary"
                  onClick={() => router.push("/auth/login")}
                >
                  Sign in
                </Button>
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
          <div className="  md:pt-[143px] md:pl-24 flex flex-col justify-center p-4 order-1 md:order-2 gap-8">
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
            />
            <div className="flex space-x-5 mb-9 w-[100px] h-12">
              <Button
                type="button"
                className="rounded-xl whitespace-nowrap  "
                variant="primary"
              >
                Search
              </Button>
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
