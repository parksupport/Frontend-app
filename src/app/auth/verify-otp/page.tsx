// pages/auth/verify-otp.tsx
"use client";
import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/lib/stores/authStore';
import { useVerifyOtp } from "@/hooks/mutations/auth";
import { useRouter } from 'next/navigation';

const VerifyOTPPage = () => {
  const [email_address, setEmail] = useState('');
  const [otp_code, setOtpCode] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const { verifyOtp, isPending, isError, error } = useVerifyOtp();

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyOtp({ email_address, otp_code });
  };

  return (
    <form onSubmit={handleVerify}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email_address}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp_code}
        onChange={(e) => setOtpCode(e.target.value)}
        required
      />
      <button type="submit">Verify OTP</button>
    </form>
  );
};

export default VerifyOTPPage;
