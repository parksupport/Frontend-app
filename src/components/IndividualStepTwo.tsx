// app/signup/page.tsx
"use client"
import { useEffect, useState } from "react";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import InputField from "@/components/InputField";
import { AuthPrompt } from "@/components/AuthPrompt";
import { useSignupStore } from "@/lib/stores/authStore";


interface SignupPageProps {
  onContinue: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({onContinue}) => {
  const { formData, updateFormData } = useSignupStore();

  const isFormValid =
    formData.full_name &&
    formData.email_address &&
    formData.phone_number &&
    formData.date_of_birth &&
    formData.address;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    console.log(formData,"formdata");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onContinue(); // Proceed to next step
    }
  };
  
  



// 1. Validate Email
const validateEmail = (email: string): string | null => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // For stricter validation, consider using a more robust regex
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return emailRegex.test(email?.trim()) ? null : 'Invalid email format';
};

// 2. Validate Phone Number (assuming 10 digits)
const validateNumber = (value: string): string | null => {
  const phoneNumberPattern = /^\d{10}$/;
  if (!phoneNumberPattern.test(value?.trim())) {
    return 'Phone number must be exactly 10 digits.';
  }
  return null;
};

// 3. Validate Date of Birth
const validateDOB = (value: string): string | null => {
  const trimmedValue = value?.trim();
  const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobPattern.test(trimmedValue)) {
    return 'Date of Birth must be in the format YYYY-MM-DD';
  }

  // Optional: Validate the date
  const dateParts = trimmedValue.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JS Date
  const day = parseInt(dateParts[2], 10);

  const date = new Date(year, month, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month ||
    date.getDate() !== day
  ) {
    return 'Invalid Date of Birth.';
  }

  return null;
};

// 4. Validate Home Address
const validateHomeAddress = (value: string): string | null => {
  if (!value || value.trim() === '') {
    return 'Home address cannot be empty.';
  }
  return null;
};




  return (
    <div className="max-w-[400px] w-full">
      <div className="flex flex-col justify-center w-full">
    
        <CreateAccountText />
        <form onSubmit={handleSubmit} className="mt-[24px] lg:mt-[2.5rem] 4 ">
          <div>
            <InputField
              type="text"
              placeholder="Enter your name"
              label="Name"
              variant="individual"
              className=""
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              validationRules={(value) => value ? null : 'Name is required'}
            />
          </div>
          <div>
            <InputField
              type="email"
              placeholder="Enter your email address"
              label="Email Address"
              name="email_address"
              value={formData.email_address}
              onChange={handleChange}
              validationRules={validateEmail}
              variant="individual"
              className="mt-[16px]"
            />
          </div>
          <div>
            <InputField
              type="number"
              placeholder="Enter your phone number"
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              validationRules={validateNumber}
              variant="individual"
              className="mt-[16px] lg:mt-[24px] xl:mt-[24px] 2xl:mt-[24px]"
            />
          </div>

          <div>
            <InputField
              type="date"
              placeholder="Enter your DOB"
              label="Date of Birth"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              validationRules={validateDOB}
              variant="individual"
              className="mt-[16px] lg:mt-[24px] xl:mt-[24px] 2xl:mt-[24px]"
            />
          </div>
          <div>
            <InputField
              type="text"
              placeholder="Enter your address"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              validationRules={validateHomeAddress}
              variant="individual"
              className="mt-[16px] lg:mt-[24px] xl:mt-[24px] 2xl:mt-[24px]"
            />
          </div>

          <div>

          <Button
            type="submit"
            className="w-full lg:mt-[40px] "
            variant='primary'
            disabled={!isFormValid}
            // onClick={onContinue}
          >
            Continue
          </Button>
        </div>
        </form>
        <div>
          <AuthPrompt
            text="Already have an account? "
            link="Login"
            url="/auth/login"
          />
        </div>
      
      </div>
    </div>
  );


};

 export default SignupPage;

