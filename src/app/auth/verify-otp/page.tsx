// pages/auth/verify-otp.tsx
"use client";
import { useState } from 'react';
import { useVerifyOtp } from "@/hooks/mutations/auth";
import { useRouter } from 'next/navigation';

const VerifyOTPPage = () => {
  const [email_address, setEmail] = useState('');
  const [otp_code, setOtpCode] = useState('');
  const router = useRouter();

  const { verifyOtp, isPending, isError, error } = useVerifyOtp();

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Make sure the backend expects 'otp' or 'otp_code' field name and match it here
    verifyOtp({email_address, otp: otp_code });
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
      <button type="submit" disabled={isPending}>Verify OTP</button>
      {isError && <p>{error?.message || 'Verification failed'}</p>}
    </form>
  );
};

export default VerifyOTPPage;
