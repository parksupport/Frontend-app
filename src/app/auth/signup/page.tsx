// app/signup/page.tsx
"use client"
import { useState } from "react";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import InputField from "@/components/InputField";
import { AuthPrompt } from "@/components/AuthPrompt";
import SignupLayout from "@/app/SignupLayout";
import { registerIndividual } from "@/api/register";


const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
    dob: '',
    homeAddress: '',
  });

  console.log("this is the form data" + formData);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      return updatedData;
    });
  };





  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email format';
  };



  const validateNumber = (value) => {
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return 'Phone number must be 10 digits.';
    }
    return null;
  };
  const validateDOB = (value) => {
    const dobPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobPattern.test(value)) {
      return 'Date of Birth must be in the format YYYY-MM-DD.';
    }
    // Additional checks can be added, such as checking if the date is a valid date
    return null;
  };
  const validateHomeAddress = (value) => {
    if (value.trim() === '') {
      return 'Home address cannot be empty.';
    }
    return null;
  };



  return (
    <div className="max-w-[400px] w-full">
      <div className="flex flex-col justify-center w-full">
    
        <CreateAccountText />
        <form className="mt-[24px] lg:mt-[2.5rem] 4 ">
          <div>
            <InputField
              type="text"
              placeholder="Enter your name"
              label="Name"
              variant="individual"
              className=""
              name="name"
              value={formData.name}
              onChange={handleChange}
              validationRules={(value) => value ? null : 'Name is required'}
            />
          </div>
          <div>
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
          </div>
          <div>
            <InputField
              type="number"
              placeholder="Enter your phone number"
              label="Phone Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              validationRules={validateNumber}
              variant="individual"
              className="mt-[16px] lg:mt-[24px] xl:mt-[24px] 2xl:mt-[24px]"
            />
          </div>

          <div>
            <InputField
              type="number"
              placeholder="Enter your DOB"
              label="Date of Birth"
              name="dob"
              value={formData.dob}
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
              name="homeAddree"
              value={formData.homeAddress}
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

const PageWithLayout = () => (
  <SignupLayout>
    <SignupPage />
  </SignupLayout>
);

export default PageWithLayout;

