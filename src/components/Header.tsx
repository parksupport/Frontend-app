import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Import a hamburger icon from react-icons
import Button from "./Buttons";
import { Logo } from "./logo";
import NavLinkComponent from "./NavLink";

const Header = ({ scrollToNextSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-5 px-4 md:px-[108px] flex justify-between items-center border-b border-gray-300">
      <Logo />

      <nav className={`hidden md:flex space-x-12 text-[#0C0E0F] text-[16px]`}>
        <NavLinkComponent
          url="#"
          name="Home"
          className="cursor-pointer hover:text-blue-500"
        />
        <NavLinkComponent
          url="#"
          name="Search"
          className="cursor-pointer hover:text-blue-500"
        />
        <NavLinkComponent
          url="#"
          name="Features"
          className="cursor-pointer hover:text-blue-500"
        />
        <NavLinkComponent
          url="#"
          name="FAQ"
          className="cursor-pointer hover:text-blue-500"
        />
      </nav>

      <div className="flex items-center md:hidden space-x-4 ">
        <Button
          type="button"
          className="rounded-xl px-8 py-[8px] whitespace-nowrap mb-3"
          variant="primary"
        >
          Login
        </Button>
        <button className="text-2xl cursor-pointer" onClick={toggleMenu}>
          <FaBars />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 z-50 md:hidden">
          <div className="cursor-pointer hover:text-blue-500">Home</div>
          <div
            className="cursor-pointer hover:text-blue-500"
            onClick={scrollToNextSection}
          >
            Search
          </div>
          <div className="cursor-pointer hover:text-blue-500">Features</div>
          <div className="cursor-pointer hover:text-blue-500">FAQ</div>
        </div>
      )}

      <div className="hidden md:flex space-x-4 ">
        <Button
          type="button"
          className="rounded-xl whitespace-nowrap w-24 h-12 "
          variant="secondary"
        >
          Sign up
        </Button>
        <Button
          type="button"
          className="rounded-xl  whitespace-nowrap w-24 h-12 "
          variant="primary"
        >
          Login
        </Button>
      </div>
    </header>
  );
};

export default Header;
