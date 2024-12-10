"use client";
import { groteskText, groteskTextMedium } from '@/app/fonts';
import React, { useRef, useState, useEffect } from 'react';
import Button from './Buttons';
import { useSignupStore } from '@/lib/stores/authStore';
import { useVerifyOtp } from '@/hooks/mutations/auth';

const IndividualStepFour = () => {
  // Set up OTP input handling when component mounts
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if ((e.target as HTMLElement)?.localName !== 'input') return;
      e.preventDefault();
      let pastedData = e.clipboardData?.getData('text') || '';
      pastedData = pastedData.toUpperCase();
      if (pastedData.length === otp.length) {
        const newOtp = pastedData.split("").slice(0, otp.length);
        setOtp(newOtp);
      }
    };

    const inputs = document.querySelectorAll('.code_input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input, index, arr) => {
      input.addEventListener('input', () => {
        arr[index + 1]?.focus();
      });
    });

    document.addEventListener('paste', handlePaste);

    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  const { formData } = useSignupStore();
  const email = formData.email_address;

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const isFilled = otp.every((value) => value !== "");

  const { verifyOtp, isPending, isError, error } = useVerifyOtp();

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus next input if filled
      if (value !== "" && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFilled) {
      verifyOtp({ email_address: email, otp: otp.join('') });
    } else {
      console.error('Please enter the full 6-digit OTP.');
    }
  };

  return (
    <div className='justify-center flex flex-col items-center max-w-[460px] w-full'>
      <div className='justify-center flex flex-col items-center mt-8'>
        <h1 className={`text-[40px] text-[#000000] ${groteskTextMedium.className}`}>Verification required</h1>
        <p className={`text-[18px] text-[#667185] text-center ${groteskText.className} block`}>
          Enter the 6-digit code sent to your email{' '}
          <span className={`text-[18px] text-[#667185] ${groteskTextMedium.className}`}>{email}</span>
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
                onChange={(e) => handleChange(e, index)}
                className={`code_input w-[47px] h-[47px] sm:w-[47px] sm:h-[47px] md:w-[60px] md:h-[60px] rounded-[8px] border-[#98A2B3] border-solid border text-center text-[40px] focus:outline-none ${groteskText.className}`}
                maxLength={1}
              />
            ))}
          </div>
          <div className='justify-center flex flex-col items-center'>
            <Button
              type="submit"
              className="w-full lg:mt-[40px]"
              variant='primary'
              disabled={!isFilled || isPending}
            >
              {isPending ? 'Verifying...' : 'Continue'}
            </Button>
            {isError && <p className="text-red-500 mt-2">{error?.message || 'Verification failed. Try again.'}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualStepFour;
