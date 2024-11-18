import React from "react";
import Image from "next/image";

import carAlertImage from "@/assets/images/logo.jpg";

interface LogoProps {
  className?: React.ReactNode;
}

export const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div className="flex flex-col items-center ml-[11px]">
      <Image
        className="self-center "
        src={carAlertImage}
        alt="signup carAlert"
      />
    </div>
  );
};
