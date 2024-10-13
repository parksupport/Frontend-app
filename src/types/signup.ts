// types.ts
export interface SignupInput {
    company_name: string;
    company_registration_number: string;
    company_email: string;
    company_phone_number: string;
    full_name: string;
    position: string;
    phone_number: string;
    email_address: string;
    address: string;
    car_verification_number: string;
    password: string;
  }
  
  export interface SignupResponse {
    email_address: string;
    // Add other fields as returned by your backend
  }

  