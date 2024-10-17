import { useState } from "react";

import { FaBars } from "react-icons/fa";
import Button from "./Buttons";
import { Logo } from "./logo";
import NavLinkComponent from "./NavLinkComponent";

const Header = ({
  scrollToSection,
  homeRef,
  searchRef,
  featuresRef,
  faqRef,
  router
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className=" w-full py-5 px-4 md:px-[108px] flex justify-between items-center border-b border-gray-300">
      <Logo />

      <nav className={`hidden md:flex space-x-12 text-[#0C0E0F]  text-[16px]`}>
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

      <div  className=" flex items-center md:hidden space-x-4  ">
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
          type="button"
          className="rounded-xl whitespace-nowrap w-24 h-12"
          variant="secondary"
          onClick={() => router.push("/auth/signup")}
        >
          Sign up
        </Button>
        <Button
          type="button"
          className="rounded-xl whitespace-nowrap w-24 h-12"
          variant="primary"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
