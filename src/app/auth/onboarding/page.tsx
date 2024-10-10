"use client";

import React, { useState } from "react";
import CardProfile from "@/components/CardProfile";
import TextBlock from "@/components/TextBlock";
import SignupLayout from "@/app/SignupLayout";
import Button from "@/components/Buttons";
import { FcGoogle } from "react-icons/fc";
import { HiMiniUser, HiUserGroup } from "react-icons/hi2";
import { TiTick } from "react-icons/ti";
import { groteskText } from "@/app/fonts";
import '@/components/ProgressSteps.css'
import CorporateStepThree from "@/components/CorporateStepThree";
import IndividualStepThree from "@/components/IndividualStepThree";
import CorporateStepTwo from "@/components/CorporateStepTwo";
import IndividualStepTwo from "@/components/IndividualStepTwo";

const CreateProfilePage = () => {
  const [selectedType, setSelectedType] = useState<"user" | "corporate" | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    
    { label: " Step 1", component: <IndividualStepTwo /> },
    { label: " Step 2", component: <CorporateStepTwo /> },
    { label: "Step 3", component: <IndividualStepThree /> },
    { label: "Step 4", component: <CorporateStepThree /> },
  ];

  const handleCardClick = (type: "user" | "corporate") => {
    setSelectedType(type);
    // setCurrentStep(1); // Move to the first step after selection
  };

  const handleContinueClick = () => {
    if (currentStep === 0 && selectedType) {
      setCurrentStep(1); // Move to the first step after selection
    } else if (currentStep > 0 && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }

  };

  return (
    <div className="flex flex-col items-center justify-center max-w-[400px] w-full lg:max-w-[637px]">
      <div className='hidden lg:flex xl:flex flex-col'>
        <div className="flex flex-row justify-center">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i && "active"} ${(i < currentStep) && "complete"} `}
            >
              <div className="step">
                {(i < currentStep) && (
                  <TiTick
                    size={24}
                    color={'white'}
                  />
                )}
              </div>
              <p className="text-black">{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {currentStep === 0 ? (
        <>
          <TextBlock
            header="How are you planning to use Car Alert?"
            content="We’ll streamline your experience accordingly."
          />
          <div className="flex space-x-4 pt-10">
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
        </>
      ) : (
        <>{selectedType === "user" && currentStep === 1 && <IndividualStepTwo />}
        {selectedType === "corporate" && currentStep === 1 && <CorporateStepTwo />}
        
        {selectedType === "user" && currentStep === 2 && <IndividualStepThree />}
        {selectedType === "corporate" && currentStep === 2 && <CorporateStepThree />}
        </>
      )}

      <div className="w-full justify-center flex mt-8">
        <Button
          type="button"
          className="mt-[24px] w-full lg:mt-[40px]"
          variant="primary"
          disabled={!selectedType && currentStep === 0} // Disable button if no type is selected
          onClick={handleContinueClick}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};




const PageWithLayout = () => (
  <SignupLayout>
    <CreateProfilePage />
  </SignupLayout>
);

export default PageWithLayout;
