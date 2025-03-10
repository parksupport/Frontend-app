"use client";
import React, { useState } from 'react';
import SignupPage from './IndividualStepTwo';
import AdminSignupPage from './IndividualStepThree';


const ParentComponent: React.FC = () => {
  const [step, setStep] = useState(1);
  const [combinedData, setCombinedData] = useState<any>({});

  const handleSignupContinue = (data: any) => {
    setCombinedData((prevData) => ({
      ...prevData,
      ...data,
    }));
    setStep(2);
  };

  const handleAdminSignupContinue = (data: any) => {
    const finalData = {
      ...combinedData,
      ...data,
    };
    // Submit finalData to the backend
  };

  return (
    <div>
     
    </div>
  );
};

export default ParentComponent;
