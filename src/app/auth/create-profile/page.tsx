"use client";

import React, { useState } from "react";
import CardProfile from "@/components/CardProfile";
import TextBlock from "@/components/TextBlock";
import SignupLayout from "@/app/SignupLayout";
import Button from "@/components/Buttons";
import { FcGoogle } from "react-icons/fc";

const CreateProfilePage =()=> {
  const [selectedType, setSelectedType] = useState<"user" | "corporate" | null>(
    null
  );

  const handleCardClick = (type: "user" | "corporate") => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] w-full lg:max-w-[637px]" >
      <div>
        <TextBlock
          header="How are you planning to use Car Alert?"
          content="We’ll streamline your experience accordingly."
        />
      </div>

      <div className="flex space-x-4 pt-10" >
        <CardProfile
          type="user"
          selected={selectedType === "user"}
          onClick={() => handleCardClick("user")}
        />
        <CardProfile
          type="corporate"
          selected={selectedType === "corporate"}
          onClick={() => handleCardClick("corporate")}
        />
      </div>
      <div className="w-full justify-center flex">
      <Button
            type="submit"
            className="mt-[24px] w-full lg:mt-[40px]"
            variant='primary'
         
          >
            Continue
          </Button>
      </div>
    </div>
  );

 


}
const PageWithLayout = () => (
  <SignupLayout>
    <CreateProfilePage />
  </SignupLayout>
);

export default PageWithLayout;
