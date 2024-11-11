"use client"
import React from 'react';
import { TiTick } from 'react-icons/ti';
import { CheckIcon } from 'lucide-react';

const Step = ({ label, index, currentStep, setCurrentStep }) => {
    const isClickable = index <= currentStep;

  return (
    <div
      onClick={() => isClickable && setCurrentStep(index)}
      className={`step-item  ${currentStep === index && "active"} ${(index < currentStep) && "complete"} ${isClickable ? 'cursor-pointer' : ''}`}
      style={{ borderColor: isClickable ? 'transparent' : 'initial' }}

    >
        <div className='flex-auto border-t-2 '></div>
      <div className="step">
      {(index > 0 || currentStep) && (
                 <CheckIcon
                   size={24}
                   color={index + 1 === currentStep ? 'white' : currentStep ? '#D0D5DD' :  'white'  }
                 />
               )}
      </div>
      <p className="text-black">{label}</p>
    </div>
  );
};

export default Step;
