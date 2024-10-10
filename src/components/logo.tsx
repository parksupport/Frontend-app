import React from "react";
import Image from "next/image";

import carAlertImage from '@/assets/images/logo.jpg';
import diploSVG from '@/assets/svg/diploSVG.svg';



export const Logo = ({ className, ...props }) => {
  return (
    <div className={`flex flex-col items-center ${className}`} {...props}>
      <Image
        className="hidden self-center lg:flex"
        src={diploSVG}
        alt="signup carAlert"
      />
      <Image
        className="self-center lg:hidden xl:hidden 2xl:hidden"
        src={carAlertImage}
        alt="signup carAlert"
      />
    </div>
  );
};

// Example usage:
<Logo className="pt-[138px]" />
