import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.jpg"; // Adjust the path as needed


export const Logo = () => {
  return (
    <div className="flex flex-col items-center ">
    <Image
      src={logo}
      alt="logo"
      className="object-cover rounded-lg"
      width={200}
      height={200}
    />
  </div>
  
  );
};
