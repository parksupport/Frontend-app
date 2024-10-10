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
    <div className={`flex flex-col justify-center max-w-[400px] w-full items-center mt-[24px] lg:hidden xl:hidden ${groteskText.className}`} >
      <div className='flex justify-center w-full'>
      <div className='w-full justify-center flex flex-col max-w-[400px]'>

        
<div className="flex w-full  mb-[8px] justify-between">
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 1 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 2 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 3 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  <div className={`flex-1 h-[6px] rounded-[21px] max-w-[86px] ${step >= 4 ? 'bg-[#3957D7]' : 'bg-gray-300'}`}></div>
  
</div>
<span className="mb-[24px] text-lg font-medium block ">
  {step}/4
</span>
</div>
      </div>
      {/* <Button
            className=""
            onClick={handleButtonClick}
            variant='primary'
          >
            Continue
          </Button> */}
    </div>


       <div className='hidden lg:flex xl:flex flex-col mt-[40px]'>
       <div className="flex flex-row justify-center">
  {steps?.map((step, i) => (
    <div
      key={i}
      className={`relative flex flex-col justify-center items-center w-36 step-item ${currentStep === i + 1 ? 'active' : ''} ${(i + 1 < currentStep || complete) ? 'complete' : ''}`}
    >
      <div
        className={`w-10 h-10 flex items-center justify-center z-10 relative border-[#D0D5DD] border-solid border rounded-full text-black step ${
          currentStep === i + 1 ? 'bg-[#3957D7] text-black' : ''
        } ${(i + 1 < currentStep || complete) ? 'bg-[#3957D7]' : ''}`}
      >
        {(i + 1 < currentStep || currentStep) && (
          <TiTick
            size={24}
            color={i + 1 === currentStep ? 'white' : currentStep ? '#D0D5DD' : 'white'}
          />
        )}
      </div>
      <p className={`${(i + 1 < currentStep || complete) ? 'text-black' : ''} text-black`}>{step}</p>
      {i !== 0 && (
        <div
          className={`content-[''] bg-[#D0D5DD] absolute w-full h-[3px] right-2/4 top-1/3 -translate-y-2/4 flex-row ${
            (i + 1 < currentStep || complete || currentStep === i + 1) ? 'bg-[#3957D7]' : ''
          }`}
        />
      )}
    </div>
  ))}
</div>

       
         {/* <div className='flex justify-center mt-20 w-ful'>
         <Button
            className=""
            variant='primary'
            onClick={() => {
                setCurrentStep((prev) => prev +1)
            }}
          >
            Continue
          </Button>
         </div> */}
       </div>
    
      </>
    );
};

export default ProgressSteps;



