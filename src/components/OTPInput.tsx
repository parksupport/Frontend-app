"use client"

import React, { useState } from 'react';
import { groteskText } from '@/app/fonts';

interface OTPInputProps {
    onSubmit: any;

}
const OTPInput: React.FC<OTPInputProps> = ({ onSubmit }) => {
    const [otp, setOtp] = useState(Array(6).fill(''));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
       
    };

    return (
        <div className='mt-[24px]'>
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
        </div>
    );
};

export default OTPInput;
