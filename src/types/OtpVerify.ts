export interface VerifyOtpRequest {
    email_address: string; // The email address of the user
    otp_code: string; // The OTP code entered by the user
  }