// app/signup/page.tsx
"use client"
import InputField from "@/components/InputField";
import { useEffect, useState } from "react";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import { AuthPrompt } from "@/components/AuthPrompt";
import { FcGoogle } from "react-icons/fc";
import { useSignupStore } from "@/lib/stores/authStore";


const CorporateSignupPage = ({onContinue}) => {
  const { formData, updateFormData } = useSignupStore();

  let isFormValid =
    formData.company_name &&
    formData.company_email &&
    formData.address &&
    formData.company_phone_number &&
    formData.company_registration_number &&
    formData.company_registered_address;



  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onContinue();
    }
  };



  const validateCompanyEmail = (email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email format';
  };



  const validateRegNumber = (value) => {
    const phoneNumberPattern = /^\d{10}$/;
    
    return null;
  };

  const validateCompanyNumber = (value) => {
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return 'Company number must be 10 digits.';
    }
    return null;
  };


  const validateBusinessAddress = (value) => {
    if (value.trim() === '') {
      return 'Business address cannot be empty.';
    }
    return null;
  };

  
  const validateCompanyRegAddress = (value) => {
    if (value?.trim() === '') {
      return 'Company registered address cannot be empty.';
    }
    return null;
  };



  return (
    <div className="max-w-[400px] w-full lg:mt-[32px]">
      <div className="flex flex-col justify-center w-full">
    
        <CreateAccountText />
        <form className="mt-[24px] lg:mt-[2.5rem] 4 ">
          <div>
            <InputField
              type="text"
              placeholder="Enter your company name"
              label="Company Name"
              variant="individual"
              className=""
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              validationRules={(value) => value ? null : 'Name is required'}
            />
          </div>
          {/* <div>
            <InputField
            
              type="text"
              placeholder="Enter your business address"
              // icon={
              //   <FcGoogle />
              // }
              label="Business Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              validationRules={validateBusinessAddress}
              variant="individual"
              className="mt-[16px]"
             
            />
          </div> */}
          <div>
            <InputField
            
              type="text"
              placeholder="Enter your company registered address"
              // icon={
              //   <FcGoogle />
              // }
              label="Company Registered Address"
              name="company_registered_address"
              value={formData.company_registered_address}
              onChange={handleChange}
              validationRules={validateCompanyRegAddress}
              variant="individual"
              className="mt-[16px]"
             
            />
          </div>
          <div>
            <InputField
              type="number"
              placeholder="Enter your company registration number"
            
              label="Company Registration Number"
              name="company_registration_number"
              value={formData.company_registration_number}
              onChange={handleChange}
              validationRules={validateRegNumber}
              variant="individual"
              className="mt-[16px] "
            />
          </div>

          <div>
            <InputField
              type="email"
              placeholder="Enter your company email"
              label="Company Email"
              name="company_email"
              value={formData.company_email}
              onChange={handleChange}
              validationRules={validateCompanyEmail}
              variant="individual"
              className="mt-[16px]"
            />
          </div>
          <div>
            <InputField
              type="number"
              placeholder="Enter your company number"
              label="Company Number"
              name="company_phone_number"
              value={formData.company_phone_number}
              onChange={handleChange}
              validationRules={validateCompanyNumber}
              variant="individual"
              className="mt-[16px]"
            />
          </div>

          <div>

          <Button
            type="submit"
            className="w-full lg:mt-[40px]"
            variant='primary'
            onClick={handleSubmit}
            disabled={!isFormValid}
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

// const PageWithLayout = () => (
//   <SignupLayout>
//     <CorporateSignupPage />
//   </SignupLayout>
// );

export default CorporateSignupPage;


