"use client";

import { TextSection } from "@/components/TextSection";
import React from "react";
import Image from "next/image";
import carocelCar1 from "@/assets/images/carocelCar1.jpg";
import { Button, ButtonText, InputField } from "@/components";
import { Logo } from "@/components/logo";
import FeatureCard from "@/components/FeaturesCard";
import { FaBell, FaCalendarAlt, FaTh } from "react-icons/fa";
import Header from "@/components/Header";
import Faq from "@/components/faq";
import FAQAccordion from "@/components/Faqquestion";
import ComparisonTable from "@/components/ComparisonTable";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const coloredText = (
    <span className="text-blue-500 font-bold">Contravention</span>
  );

  const scrollToNextSection = () => {
    const headerOffset = document.querySelector("header").offsetHeight; // Get the height of the header
    const element = document.getElementById("next-section");

    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset; // Get the element's position relative to the document
      const offsetPosition = elementPosition - headerOffset; // Subtract the header height from the position

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto bg-white">
      <Header scrollToNextSection={scrollToNextSection} />

      <main className="max-w-[1240px] mx-auto pt-4">
        <section className="flex flex-col md:flex-row items-center  px-4">
          <div className="flex flex-col md:flex-row md:h-[573px]">
            <div className="flex flex-col justify-center p-4">
              <TextSection
                title={
                  <div className="text-5xl font-bold">
                    Never Forget a {coloredText} Ticket Again!
                  </div>
                }
                content="Stay ahead of your vehicle's parking and driving fines with instant notifications, easy payments, and seamless appeals – all in one place."
              />
              <div className="flex space-x-5 mt-4 w-[230px]">
                <Button
                  type="button"
                  className="rounded-xl px-6 py-3 whitespace-nowrap"
                  variant="secondary"
                  onClick={scrollToNextSection}
                >
                  Search now
                </Button>
                <Button
                  type="button"
                  className="rounded-xl px-6 py-3 whitespace-nowrap"
                  variant="primary"
                >
                  Sign in
                </Button>
              </div>
            </div>
            <div className=" flex-shrink-0">
              <Image
                src={carocelCar1}
                alt={"car"}
                width={553}
                height={573}
                className="rounded-lg shadow-md object-cover h-full"
              />
            </div>
          </div>
        </section>

        <section
          id="next-section"
          className="flex flex-col md:flex-row items-center py-9 md:pt-52 px-4"
        >
          <div className="md:w-[553px] md:h-[573px] flex-shrink-0 order-2 md:order-1">
            <Image
              src={carocelCar1}
              alt={"car"}
              width={553}
              height={573}
              className="rounded-lg shadow-md object-cover h-full"
            />
          </div>
          <div className="flex flex-col justify-center p-4 order-1 md:order-2">
            <TextSection
              title={
                <div className="text-5xl font-bold">
                  You may have an existing ticket check
                </div>
              }
              content="Easily search for parking tickets and driving contraventions by entering your vehicle registration number. "
            />
            <InputField
              label="Vehicle reg number"
              placeholder="Enter your vehicle registration number"
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
        <section className="flex flex-col  items-center  md:justify-between space-y-10 md:space-y-0 md:space-x-6 pb-8 md:pt-52  px-4 ">
          <div className=" text-center md:px-80">
            <TextSection
              title="All-in-one vehicle contravention solution"
              content="We handle everything from notifications to payments and appeals, so you can focus on the road."
            />
          </div>
          <div className="flex flex-col md:flex-row item-center md:justify-between md:space-x-18 gap-7 md:py-10  ">
            <div className="flex flex-col ">
              <FeatureCard
                icon={<FaBell />}
                title="Instant Notifications"
                description="Get real-time alerts for parking tickets, driving fines, and vehicle-related contraventions directly to your phone or email. Never miss a deadline again."
                button
              />
            </div>
            <FeatureCard
              icon={<FaCalendarAlt />}
              title="Calendar Sync"
              description="Automatically sync payment deadlines with your Google, Apple, or Microsoft calendar to avoid missing important due dates."
            />
            <FeatureCard
              icon={<FaTh />}
              title="Comprehensive Dashboard"
              description="View all your fines, payment history, appeal status, and notifications in one easy-to-navigate dashboard."
            />
          </div>
        </section>
        <section className="pb-8 md:pb-[120px]">
          <FAQAccordion />
        </section>
        <section className="">
          <Footer/>
        </section>
      </main>
    </div>
  );
}
