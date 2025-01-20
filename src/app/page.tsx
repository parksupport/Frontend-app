"use client";

import ArrowToText from "@/assets/svg/Arrow.svg";
import landingPageImage1 from "@/assets/images/landingPageImage1.jpg";
import landingPageImage2 from "@/assets/images/landingPageImage2.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useRef, useState } from "react";

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
import SubscriptionPlans from "@/components/Subscription";
import useIsMobile from "@/hooks/useIsMobile";
import AnimationText from "@/components/AnimationText";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCheckVehicleTicket } from "@/hooks/queries/ticket";

export default function LandingPage() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const isMobile = useIsMobile();

  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.token !== null);

  const { hasTicket, isLoading, error, refetch } =
    useCheckVehicleTicket(vehicleNo);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVehicleNo(value);
    setHasSearched(false); // Reset search status if vehicleNo changes
  };

  // Handle search button click
  const handleSearch = () => {
    if (vehicleNo) {
      setHasSearched(true); // Mark that search has been initiated
      refetch(); // Trigger API call manually when search button is clicked
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const home = useRef(null);
  const search = useRef(null);
  const features = useRef(null);
  const faq = useRef(null);
  const subscriptionPlan = useRef(null);

  const scrollToSection = (elementRef) => {
    if (elementRef && elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className={`${groteskText.className} "bg-[#FFFFFF] mx-auto w-full overflow-hidden "`}
    >
      <Header
        scrollToSection={scrollToSection}
        homeRef={home}
        searchRef={search}
        featuresRef={features}
        faqRef={faq}
        subPlanRef={subscriptionPlan}
        router={router}
        isAuth={isAuthenticated}
      />

      <main className="pt-4 bg-[#FFFFFF]">
        <section
          ref={home}
          className="z-20 max-w-[1440px] mx-auto flex flex-col md:w-4/5 items-center  "
        >
          <div className="flex flex-col lg:flex lg:flex-row ">
            <div className="flex flex-col justify-center px-4">
              <TextSection
                title={
                  <div className="flex flex-col text-responsive-lg  font-bold  ">
                    <div className="flex items-center ">
                      <h1 className="mr-[10px]"> Never Forget a </h1>
                      <TextAnimation />
                    </div>
                    <span>Ticket Again!</span>
                  </div>
                }
                content="Stay ahead of your vehicle's parking and driving fines with instant notifications, easy payments, and seamless appeals – all in one place."
              />

              <div className=" flex mt-4 items-center cursor-pointer z-20">
                <Button
                  style={{ width: "116px", padding: 0, marginTop: 0 }}
                  className={`py-0 px-0 w-full mt-0 h-[40px] rounded-[0.75rem] mr-[18px] text-[#000000] text-[18px] ${groteskTextMedium.className} cursor-pointer`}
                  variant="secondary"
                  onClick={() => scrollToSection(search)}
                >
                  Search now
                </Button>

                {!isAuthenticated && (
                  <AniminateButton
                    text="Sign Up"
                    onClick={() => router.push("/auth/onboarding")}
                  />
                )}
              </div>

              <div className="relative -top-[50px] left-[35px] md:left-[45px] md:w-[360px] ">
                <ArrowToText style={{ height: 132 }} />
                <AnimationText />
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
          className="max-w-[1440px] mx-auto  flex flex-col  items-center py-9 md:py-[120px] px-4 lg:flex lg:flex-row "
        >
          <div className="order-2 flex-shrink-0 lg:order-1">
            <Image
              src={landingPageImage2}
              alt={"car"}
              width={600}
              height={642}
              className="rounded-lg shadow-md object-cover h-full "
            />
          </div>
          <div className="relative order-1 flex flex-col  md:pt-[143px] md:pl-24 md:flex md:flex-col justify-center p-4   lg:order-2 ">
            <TextSection
              title={
                <div className="text-5xl font-bold">
                  You may have an existing ticket. Check:
                </div>
              }
              content="Easily search for parking tickets and driving tickets by entering your vehicle registration number. "
            />
            <InputField
              type="text"
              name="search"
              label="Vehicle reg number"
              placeholder="Enter your vehicle registration number"
              value={vehicleNo}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              className="py-4 md:py-1 md:w-[400px]"
            />
            <div className="flex justify-between  ">
              <div className=" ">
                <Button
                  type="button"
                  className="rounded-[0.75rem] whitespace-nowrap h-[2.5rem] py-0 px-[23px]"
                  variant="primary"
                  onClick={handleSearch}
                  disabled={isLoading || !vehicleNo}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>

              {hasSearched && vehicleNo && hasTicket !== null && (
                <NotificationBox
                  position={
                    isMobile ? { right: 0, top: -10 } : { right: 300, top: 0 }
                  }
                  hasTicket={hasTicket}
                  onClick={() => router.push("/auth/onboarding")}
                />
              )}
            </div>
          </div>
        </section>
        <section
          ref={features}
          className=" max-w-[1440px] mx-auto flex flex-col  items-center  md:justify-between space-y-10 md:space-y-0 md:space-x-6 pb-8 px-4 md:pb-[120px] "
        >
          <div className=" text-center md:px-80 pt-2">
            <TextSection title="All-in-one vehicle contravention solution" />
          </div>
          <div className="flex flex-col space-y-4 lg:flex-row item-center md:justify-between lg:w-full md:py-10  ">
            <div className="flex flex-col ">
              <FeatureCard
                icon={<InstantNoficationIcon />}
                title="Instant Notifications"
                description="Get real-time alerts for parking tickets, driving fines, and vehicle-related contraventions directly to your phone or email. Never miss a deadline again."
                button={!isAuthenticated}
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
        {/* Subscription Plans Section */}
        <section ref={subscriptionPlan}>
          <SubscriptionPlans
            onClick={
              isAuthenticated
                ? () => router.push("/dashboard")
                : () => router.push("/auth/login")
            }
          />
          {/* onClick={() =>
                      isAuthenticated
                        ? router.push("/dashboard") // Redirect authenticated users
                        : router.push("/auth/login") // Redirect unauthenticated users
                    } */}
        </section>
        <section>
          <Footer
            scrollToSection={scrollToSection}
            homeRef={home}
            searchRef={search}
            featuresRef={features}
            faqRef={faq}
            subPlanRef={subscriptionPlan}
          />
        </section>
      </main>
    </div>
  );
}
