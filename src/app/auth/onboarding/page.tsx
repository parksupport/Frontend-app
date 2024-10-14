"use client";

import React, { useState } from "react";
import CardProfile from "@/components/CardProfile";
import TextBlock from "@/components/TextBlock";
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
import IndividualStepFour from "@/components/IndividualStepFour";
import { Logo } from "@/components/logo";
import Step from "@/components/Steps";
import CorporateStepFour from "@/components/CorporateStepFour";

const CreateProfilePage = () => {
  const [selectedType, setSelectedType] = useState<"user" | "corporate" | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const isCorporate = true; // Replace this with your actual condition

const steps = [
  { label: "Step 1", component: '' },
  { 
    label: "Step 2", 
    component: isCorporate 
      ? <CorporateStepTwo onContinue={() => handleContinueClick()} /> 
      : <IndividualStepTwo onContinue={() => handleContinueClick()} /> 
  },
  { 
    label: "Step 3", 
    component: isCorporate 
      ? <CorporateStepThree onContinue={() => handleContinueClick()} /> 
      : <IndividualStepThree onContinue={() => handleContinueClick()} combinedData={undefined} /> 
  },
  { 
    label: "Step 4", 
    component: isCorporate 
      ? <CorporateStepFour /> 
      : <IndividualStepFour /> 
  },
];

  const handleCardClick = (type: "user" | "corporate") => {
    setSelectedType(type);
    
    // setCurrentStep(2); // Move to the first step after selection
  };

  const handleContinueClick = () => {
    if (currentStep === 1 && selectedType) {
      setCurrentStep(2);
    } else if (currentStep > 1 && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center max-w-[500px] w-full lg:max-w-[637px] ">
        <Logo className="pt-[138px] pb-[46px]"  />
      <div className='hidden lg:flex xl:flex flex-col mt-[25px]'>
        <div className="flex flex-row justify-center">
        {steps.map((step, i) => (
          <Step
            key={i}
            label={step.label}
            index={i + 1}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
           
          />
        ))}
        </div>
      </div>

      {currentStep === 1 ? (
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
        <>{selectedType === "user" && currentStep === 2 && <IndividualStepTwo onContinue={handleContinueClick}  />}
        {selectedType === "corporate" && currentStep === 2 && <CorporateStepTwo onContinue={handleContinueClick}/>}
        
        {selectedType === "user" && currentStep === 3 && <IndividualStepThree onContinue={handleContinueClick} combinedData={undefined}  />}
        {selectedType === "corporate" && currentStep === 3 && <CorporateStepThree onContinue={handleContinueClick}/>}
        {selectedType === "user" && currentStep === 4 && <IndividualStepFour   />}
        {selectedType === "corporate" && currentStep === 4 && <CorporateStepFour   />}
        </>
      )}

      <div className="w-full justify-center flex mt-[8px]">
       {currentStep === 1 && (
         <Button
         type="button"
         className="mt-[24px] w-full lg:mt-[40px]"
         variant="primary"
         disabled={!selectedType} // Disable button if no type is selected
         onClick={handleContinueClick}
       >
         Continue
       </Button>
       )}
      </div>
    </div>
  );
};



export default CreateProfilePage;
