import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Button from "./Buttons";

import NavLinkComponent from "./NavLinkComponent";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import { Logo } from "./logo";

export interface HeaderProps {
  scrollToSection: any;
  homeRef: any;
  searchRef: any;
  featuresRef: any;
  faqRef: any;
  subPlanRef: any;
  router: any;
}

const Header = ({
  scrollToSection,
  homeRef,
  searchRef,
  featuresRef,
  faqRef,
  subPlanRef,
  router,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`pr-2 md:pr-0 ${groteskText.className} bg-[#FFFFFF]  w-full py-5  flex justify-between items-center border-b border-gray-300 `}
    >"use client";

    import React from "react";
    import Link from "next/link";
    import { groteskText } from "@/app/fonts";
    import TruncatedText from "../ToggleComponent/TruncatedText";
    
    const ContraventionRow = ({ invoice, handleRowClick }) => {
      return (
        
        <tr
          className="flex flex-col pl-[1rem] lg:flex lg:flex-row lg:border-b-[#D0D5DD] lg:border cursor-pointer hover:bg-[#FFFFFF] lg:w-full items-center justify-between "
          onClick={() => handleRowClick(invoice)}
        >
          <td className={`py-2 w-full text-sm  text-end text-gray-700 w-2/12 leading-none whitespace-nowrap  ${groteskText.className}`}>
          <TruncatedText
                      text={invoice.ticket}
                      maxLength={15}
                      className={`${groteskText.className}`}
                    />
           
          </td>
          <td className={`py-2  w-full text-end lg:pl-[1.5rem] text-sm text-gray-700 leading-none lg:w-[3%] whitespace-nowrap  ${groteskText.className}`}>
            {invoice.date}
          </td>
          <td className={`py-2 w-full text-end  lg:pl-[1.5rem] text-sm text-gray-700 leading-none lg:w-2/12 whitespace-nowrap  ${groteskText.className}`}>
            {invoice.fine_amount}
          </td>
          <td className="w-full items-end justify-end flex lg:w-0">
          <span className="bg-[#B5E3C4] sm:self-end  rounded-[22px]    my-[0.75rem] lg:text-left flex justify-center w-[44px] h-[22px] ">
    
    <td
      className={`text-center text-[#099137] text-[13px] text-left   ${groteskText.className}`}
    >
      {invoice.status}
    </td>
    </span>
          </td>
     
        </tr>
      );
    };
    
    export default ContraventionRow;
    
      <div className="max-w-[1440px] mx-auto flex justify-between items-center w-full md:w-4/5">
        <Logo className="pt-[138px] pb-[46px]  " />

        <nav
          className={`hidden md:flex space-x-12 text-[#0C0E0F]  text-base lg:text-lg `}
        >
          <NavLinkComponent
            name="Home"
            className="cursor-pointer hover:text-blue-500"
            onClick={() => scrollToSection(homeRef)}
          />
          <NavLinkComponent
            name="Search"
            className="cursor-pointer hover:text-blue-500"
            onClick={() => scrollToSection(searchRef)}
          />
          <NavLinkComponent
            name="Features"
            className="cursor-pointer hover:text-blue-500"
            onClick={() => scrollToSection(featuresRef)}
          />
          <NavLinkComponent
            name="FAQ"
            className="cursor-pointer hover:text-blue-500"
            onClick={() => scrollToSection(faqRef)}
          />
          <NavLinkComponent
            name="Pricing"
            className="cursor-pointer hover:text-blue-500"
            onClick={() => scrollToSection(subPlanRef)}
          />
        </nav>

        <div className="pl-[20px] flex items-center  md:hidden space-x-4  ">
          <Button
            type="button"
            className="rounded-xl px-8 py-[8px] whitespace-nowrap mb-3"
            variant="primary"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
          <button className="text-2xl cursor-pointer" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 z-50 md:hidden">
            <div
              className="cursor-pointer focus:bg-blue-700 bg-red-500 hover:text-blue-500"
              // tabIndex={0}
              onClick={() => {
                scrollToSection(homeRef), toggleMenu();
              }}
            >
              Home
            </div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                scrollToSection(searchRef), toggleMenu();
              }}
            >
              Search
            </div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                scrollToSection(featuresRef), toggleMenu();
              }}
            >
              Features
            </div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                scrollToSection(faqRef), toggleMenu();
              }}
            >
              FAQ
            </div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => {
                scrollToSection(subPlanRef), toggleMenu();
              }}
            >
              Pricing
            </div>
          </div>
        )}

        <div className="hidden md:flex space-x-4">
          <Button
            style={{ paddingTop: 0, paddingBottom: 0 }}
            type="button"
            className="rounded-[0.75rem] whitespace-nowrap h-[2.5rem] py-0 px-[17px]"
            variant="secondary"
            onClick={() => router.push("/auth/onboarding")}
          >
            Sign up
          </Button>
          <Button
            type="button"
            className="rounded-[0.75rem] whitespace-nowrap h-[2.5rem] py-0 px-[17px]"
            variant="primary"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
