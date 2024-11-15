"use client";
import { groteskText, groteskTextMedium } from '@/app/fonts';
import React, { useRef, useState, useEffect } from 'react';
import Button from './Buttons';
import axios from 'axios';
import { useAuthStore } from '@/lib/stores/authStore';
import { useSignupStore } from '@/lib/stores/authStore'; // Correct import
import { useRouter } from 'next/navigation';

const IndividualStepFour = () => {
  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('paste', handlePaste);
    const inputs = document.querySelectorAll('.code_input');
  
    inputs.forEach((input, index, arr) => {
      (input as HTMLInputElement).addEventListener('input', function (e) {
        (arr[index + 1] as HTMLInputElement)?.focus();
      });
    });
    console.log(inputs);
  });
  


  const { formData } = useSignupStore();
  const email = formData.email_address;
  const firstInputRef = useRef(null)

  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const [otp, setOtp] = useState(Array(6).fill(''));
  const isFilled = otp.every((value) => value !== ""); // Check if all fields are filled

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value; // Update OTP value at specific index
      setOtp(newOtp); // Update state

      // Automatically focus the next input field
      if (value !== "" && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus(); 
    }
  }, []);


  const handlePaste = (e)=>{
    if(e.target.localName !== 'input') return;
    e.preventDefault()
    let pastedData = e.clipboardData.getData('text')
    pastedData = pastedData.toUpperCase()
    if (pastedData.length === otp.length) {
      const newOtp = pastedData.split("").slice(0, otp.length);
      setOtp(newOtp);
    }

  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFilled) {
      const otpCode = parseInt(otp.join(''));
      try {
        const response = await axios.post('http://localhost:8000/api/accounts/verify-otp/', {
          email_address: email,
          otp: otpCode,
        });
        const data = response.data;
        setToken(data.access);
        setUser(data.user);
        router.push('/dashboard');
      } catch (error) {
        console.error('OTP Verification failed:', error);
        // Handle error (e.g., display error message)
      }
    } else {
      console.error('Please enter the full 6-digit OTP.');
    }

  };

  return (
    <div className='justify-center flex flex-col items-center max-w-[460px] w-full'>
      <div className='justify-center flex flex-col items-center mt-8'>
        <h1 className={` text-[40px] text-[#000000]  ${groteskTextMedium.className}`}>Verification required</h1>
        <p className={` text-[18px] text-[#667185] text-center  ${groteskText.className} block`}>
          Enter 6-digit code sent to your email{' '}
          <span className={` text-[18px] text-[#667185]  ${groteskTextMedium.className}`}>{email}</span>
        </p>
      </div>
      <div className='mt-[24px] w-full'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-row max-w-[460px] justify-between'>
            {otp.map((value, index) => (
              <input
                key={index}
                ref={index === 0 ? firstInputRef : null}
                id={`otp-${index}`}
                type="text"
                value={value}
                onPaste={handlePaste}
                onChange={(e) => handleChange(e, index)}
                className={` code_input w-[47px] h-[47px] sm:w-[47px] sm:h-[47px] md:w-[60px] md:h-[60px]  rounded-[8px] border-[#98A2B3] border-solid border text-center text-[40px]  focus:outline-none ${groteskText.className}`}
                maxLength={1}
              />
            ))}
          </div>
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
        </form>
      </div>
    </div>
  );
};

export default IndividualStepFour;
