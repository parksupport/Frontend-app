"use client"
import { groteskText, groteskTextMedium } from '@/app/fonts'
import React, { useState } from 'react'
import Button from './Buttons'

const IndividualStepFour = () => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const isFilled = otp.every((value) => value !== ""); // Check if all fields are filled

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    // Allow only numbers or empty string
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value; // Update OTP value at specific index
      setOtp(newOtp); // Update state
    }
  };
const handleSubmit = (e: any) => {
  e.preventDefault();

  if(isFilled){
      otp.join('')
  }

 
};

  return (
    <div className='justify-center flex flex-col items-center max-w-[460px] w-full'>
     <div className='justify-center flex flex-col items-center mt-8'>
     <h1 className={` text-[40px] text-[#000000]  ${groteskTextMedium.className}`}>Verification required</h1>
      <p className={` text-[18px] text-[#667185] text-center  ${groteskText.className} block`}>Enter 6-digit code sent to your email {''} <span className={` text-[18px] text-[#667185]  ${groteskTextMedium.className}`}>Odiliwisdom2@gmail.com</span></p>
     </div>
     <div className='mt-[24px] w-full'>
          <form onSubmit={handleSubmit}>


              <div className='flex flex-row max-w-[460px] justify-between' >
                  {otp.map((value, index) => (
                      <input
                          key={index}
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(e, index)}
                          className={`w-[47px] h-[47px] sm:w-[47px] sm:h-[47px] md:w-[60px] md:h-[60px]  rounded-[8px] border-[#98A2B3] border-solid border text-center text-[40px]  focus:outline-none ${groteskText.className}`}
                          maxLength={1}
                      />
                  ))}
              </div>



          </form>
          <div className='justify-center flex flex-col items-center'>
          <Button 
          type="submit" 
          className="w-full lg:mt-[40px]"
          variant='primary'
          disabled={!isFilled}
        
          >
            Continue
          </Button> 
        </div>
      </div>
    </div>
  )
}

export default IndividualStepFour

