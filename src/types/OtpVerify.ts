export interface VerifyOtpRequest {
    email_address: string; // The email address of the user
    otp: any; // The OTP code entered by the user
    password: any;
  }