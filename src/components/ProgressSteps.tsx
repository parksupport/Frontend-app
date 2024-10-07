import React, { useState } from 'react';
import './ProgressSteps.css'
import { TiTick } from 'react-icons/ti';
import Button from './Buttons';
import { groteskText } from '@/app/fonts';

const ProgressSteps = () => {
    const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete] = useState(false);
    const [step, setStep] = useState(0);

    const handleButtonClick = () => {
      setStep((prevStep) => (prevStep < 4 ? prevStep + 1 : prevStep));
    };

    return (
      <>
    <div className={`flex flex-col justify-center max-w-[400px] w-full items-center mt-10 lg:hidden xl:hidden ${groteskText.className}`} >
      <div className='flex justify-center w-full'>
      <div className='w-full justify-center flex flex-col max-w-[400px]'>

        
<div className="flex w-full  mb-4 justify-between">
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 1 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 2 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 3 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 4 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  
</div>
<span className="mb-4  text-lg font-medium block">
  {step}/4
</span>
</div>
      </div>
      <Button
            className=""
            onClick={handleButtonClick}
            variant='primary'
          >
            Continue
          </Button>
    </div>


       <div className='hidden lg:flex xl:flex flex-col'>
       <div className=" flex flex-row  justify-center">
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`step-item ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              } `}
            >
              <div className="step">
              {(i + 1 < currentStep || currentStep) && (
                <TiTick
                  size={24}
                  color={i + 1 === currentStep ? 'white' : currentStep ? '#D0D5DD' :  'white'  }
                />
              )}
              </div>
              <p className="text-black">{step}</p>
            </div>
          ))}
        </div>
       
         <div className='flex justify-center mt-20 w-ful'>
         <Button
            className=""
            variant='primary'
            onClick={() => {
                setCurrentStep((prev) => prev +1)
            }}
          >
            Continue
          </Button>
         </div>
       </div>
    
      </>
    );
};

export default ProgressSteps;



