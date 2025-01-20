import LogoReal from "@/assets/images/Logo2.png";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import { FontIcon } from "./FontIcon";
import NavLinkComponent from "./NavLinkComponent";
import { HeaderProps } from "./Header";

export default function Footer({
  scrollToSection,
  homeRef,
  searchRef,
  featuresRef,
  faqRef,
  subPlanRef,


}:HeaderProps) {
  return (
    <footer className="bg-[#DFE7FA] text-[#475367] ">
      <div className=" container mx-auto pt-6 border-t border-blue-200 flex flex-col md:flex-row items-center justify-between md:space-x-6 md:pb-[15px] md:pt-[100px]">
        <div className="flex flex-col md:flex-row items-center md:space-x-6 w-full justify-between">
          <div className="w-[171px] h-[48px]  order-1 md: ">
            <Image src={LogoReal} alt="logo" />
          </div>

          <nav className="flex space-x-8 md:space-x-20 order-2  pt-8 md:py-0 justify-between md:text-[20px]">
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
          {/* this is the desktop icons */}
          <div className="hidden md:flex space-x-4 order-3 text-[20px]">
            <FontIcon icon={faTwitter} url="#" />
            <FontIcon icon={faFacebook} url="#" />
            <FontIcon icon={faInstagram} url="#" />
            <FontIcon icon={faGithub} url="#" />
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-[32px] pb-10 border-t border-[#3957D7] text-center text-sm text-gray-500 ">
        <div className="pb-5 flex gap-[20px] text-[#1D224E] justify-center text-lg md:hidden space-x-4 order-3">
          <FontIcon icon={faTwitter} url="#" />
          <FontIcon icon={faFacebook} url="#" />
          <FontIcon icon={faInstagram} url="#" />
          <FontIcon icon={faGithub} url="#" />
        </div>
        <div className=" flex flex-col md:flex-row justify-between items-center " >
          <nav className="text-[12px] hover:underline md:text-[16px] flex space-x-6 mb-3 md:mt-0 md:order-1">
            <NavLinkComponent url="/privacy" name=" Privacy Policy" />
            <NavLinkComponent url="/privacy" name="Terms & Conditions" />
          </nav>
          <div className="flex md:text-[16px]">
            © Copyright 2024, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
