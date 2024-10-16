"use client";

import { LandingText } from "@/components/LandingText";
import React from "react";
import Image from "next/image";
import carocelCar1 from "@/assets/images/carocelCar1.jpg";
import { Button, ButtonText } from "@/components";
import { Logo } from "@/components/logo";

export default function LandingPage() {
    const coloredText = (
      <span className="text-blue-500 font-bold">Contravention</span>
    );
  
    const scrollToNextSection = () => {
        const headerOffset = document.querySelector("header").offsetHeight; // Get the height of the header
        const element = document.getElementById("next-section");
        
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset; // Get the element's position relative to the document
          const offsetPosition = elementPosition - headerOffset; // Subtract the header height from the position
      
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };
      
  
    return (
      <div className="max-w-[1440px] mx-auto bg-white">
        <header className="w-full py-5 px-[108px] flex justify-between items-center border-b border-gray-300">
          <Logo className={undefined} />
          <nav className="flex space-x-12 text-[#0C0E0F] text-[16px]">
            <div className="cursor-pointer hover:text-blue-500">Home</div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={scrollToNextSection}
            >
              Search
            </div>
            <div className="cursor-pointer hover:text-blue-500">Features</div>
            <div className="cursor-pointer hover:text-blue-500">FAQ</div>
          </nav>
          <div className="flex space-x-4">
            <Button
              type="button"
              className="rounded-xl px-6 py-[8px] whitespace-nowrap"
              variant="secondary"
            >
              Sign up
            </Button>
            <Button
              type="button"
              className="rounded-xl px-6 py-[8px] whitespace-nowrap"
              variant="primary"
            >
              Login
            </Button>
          </div>
        </header>
  
        <main className="max-w-[1240px] mx-auto py-4">
          <section className="flex flex-col md:flex-row items-center">
            <div className="flex flex-col md:flex-row md:h-[573px]">
              <div className="flex flex-col justify-center p-4">
                <LandingText
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
                    variant="secondary"
                  >
                    Sign up
                  </Button>
                </div>
              </div>
              <div className="md:w-[553px] md:h-[573px] flex-shrink-0">
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
  
          {/* Next Section */}
          <section id="next-section" className="flex flex-col md:flex-row items-center pt-[300px]">
            <div className="md:w-[553px] md:h-[573px] flex-shrink-0">
              <Image
                src={carocelCar1}
                alt={"car"}
                width={553}
                height={573}
                className="rounded-lg shadow-md object-cover h-full"
              />
            </div>
            <div className="flex flex-col justify-center p-4">
              <LandingText
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
                >
                  Search now
                </Button>
                <Button
                  type="button"
                  className="rounded-xl px-6 py-3 whitespace-nowrap"
                  variant="secondary"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  
