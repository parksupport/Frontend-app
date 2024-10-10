import React from "react";
import Image from "next/image";

import carAlertImage from '@/assets/images/logo.jpg'



export const Logo = ({ className, ...props }) => {
  return (
    <div className="flex flex-col items-center ">
    
        <Image
       className="self-center "
       src={carAlertImage}
      
       alt="signup carAlert"
        />
  </div>
  
  );
};

// Example usage:
<Logo className="pt-[138px]" />
