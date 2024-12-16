import React from "react";
import Image from "next/image";

import carAlertImage from "@/assets/images/logo.jpg";

interface LogoProps {
  className?: React.ReactNode;
  onClick?: () => void;
}

export const Logo = ({onClick, className, ...props }: LogoProps) => {
  return (
    <div className="flex flex-col cursor-pointer items-center ml-[11px]">
      <Image
        className="self-center "
        src={carAlertImage}
        alt="signup carAlert"
        onClick={onClick}
      />
    </div>
  );
};
