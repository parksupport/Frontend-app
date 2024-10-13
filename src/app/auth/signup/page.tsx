"use client";
import { useState } from "react";
import { useSignup } from "@/hooks/useRegister";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import InputField from "@/components/InputField";
import { AuthPrompt } from "@/components/AuthPrompt";
import SignupLayout from "@/app/SignupLayout";

const SignupPage: React.FC = () => {
  const { signup, isSigningUp, isError, error } = useSignup();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    dob: '',
    homeAddress: '',
  });

  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError(null);
    }

    // Create the user data to be sent to the backend
    const userData = {
      full_name: formData.name,                            // From form input
      email_address: formData.email,                      // From form input
      password: formData.password,                        // From form input
      phone_number: formData.number,                      // From form input
      address: formData.homeAddress,                      // From form input
      company_name: "Hardcoded Company Name",             // Hardcoded value
      company_registration_number: "1234567890",          // Hardcoded value
      company_email: "hardcodedcompany@gmail.com",        // Hardcoded value
      company_phone_number: "1234455666",                 // Hardcoded value
      position: "Employee",                               // Hardcoded value
      car_verification_number: "12345567",                // Hardcoded value
    };

    // Call the signup mutation function
    signup(userData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validation functions
  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email format';
  };

  const validateNumber = (value: string): string | null => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(value) ? null : 'Phone number must be 10 digits';
  };

  const validateDOB = (value: string): string | null => {
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    return dobPattern.test(value) ? null : 'Date of Birth must be in the format YYYY-MM-DD';
  };

  const validateHomeAddress = (value: string): string | null => {
    return value.trim() !== '' ? null : 'Home address cannot be empty';
  };

  return (
    <div className="max-w-[400px] w-full">
      <div className="flex flex-col justify-center w-full">
        <CreateAccountText />
        <form onSubmit={handleSubmit} className="mt-[24px] lg:mt-[2.5rem]">
          {/* Name field */}
          <InputField
            type="text"
            placeholder="Enter your name"
            label="Name"
            variant="individual"
            name="name"
            value={formData.name}
            onChange={handleChange}
            validationRules={(value) => value ? null : 'Name is required'}
          />

          {/* Email field */}
          <InputField
            type="email"
            placeholder="Enter your email address"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            validationRules={validateEmail}
            variant="individual"
            className="mt-[16px]"
          />

          {/* Phone number field */}
          <InputField
            type="number"
            placeholder="Enter your phone number"
            label="Phone Number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            validationRules={validateNumber}
            variant="individual"
            className="mt-[16px]"
          />

          {/* Date of Birth field */}
          <InputField
            type="text"
            placeholder="Enter your DOB"
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            validationRules={validateDOB}
            variant="individual"
            className="mt-[16px]"
          />

          {/* Address field */}
          <InputField
            type="text"
            placeholder="Enter your address"
            label="Address"
            name="homeAddress"
            value={formData.homeAddress}
            onChange={handleChange}
            validationRules={validateHomeAddress}
            variant="individual"
            className="mt-[16px]"
          />

          {/* Password field */}
          <InputField
            type="password"
            placeholder="Enter your password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            validationRules={(value) => value.length >= 6 ? null : 'Password must be at least 6 characters'}
            variant="individual"
            className="mt-[16px]"
          />

          {/* Confirm Password field */}
          <InputField
            type="password"
            placeholder="Confirm your password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            validationRules={(value) => value.length >= 6 ? null : 'Password must be at least 6 characters'}
            variant="individual"
            className="mt-[16px]"
          />

          {confirmPasswordError && (
            <p className="text-red-500 text-sm">{confirmPasswordError}</p>
          )}
          {isError && <p>{error?.message || 'An error occurred during signup'}</p>}

          <Button type="submit" className="w-full lg:mt-[40px]" variant="primary">
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>

        <AuthPrompt text="Already have an account? " link="Login" url="/auth/login" />
      </div>
    </div>
  );
};

const PageWithLayout = () => (
  <SignupLayout>
    <SignupPage />
  </SignupLayout>
);

export default PageWithLayout;
