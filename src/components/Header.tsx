import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Button from "./Buttons";

import NavLinkComponent from "./NavLinkComponent";
import { groteskText, groteskTextMedium } from "@/app/fonts";
import { Logo } from "./logo";

interface HeaderProps {
  scrollToSection: any;
  homeRef: any;
  searchRef: any;
  featuresRef: any;
  faqRef: any;
  router: any;
}

const Header = ({
  scrollToSection,
  homeRef,
  searchRef,
  featuresRef,
  faqRef,
  router,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`${groteskText.className} bg-[#FFFFFF]  w-full py-5  flex justify-between items-center border-b border-gray-300 `}
    >
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
              className="cursor-pointer hover:text-blue-500"
              onClick={() => scrollToSection(homeRef)}
            >
              Home
            </div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => scrollToSection(searchRef)}
            >
              Search
            </div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => scrollToSection(featuresRef)}
            >
              Features
            </div>
            <div
              className="cursor-pointer hover:text-blue-500"
              onClick={() => scrollToSection(faqRef)}
            >
              FAQ
            </div>
          </div>
        )}

        <div className="hidden md:flex space-x-4">
          <Button
          style={{ paddingTop: 0, paddingBottom: 0}}
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
