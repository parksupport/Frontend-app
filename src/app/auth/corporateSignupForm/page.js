// app/signup/page.tsx
"use client"
import InputField from "@/components/InputField";
import { useState } from "react";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import SignupLayout from "../../SignupLayout";
import { AuthPrompt } from "@/components/AuthPrompt";
import { FcGoogle } from "react-icons/fc";


const CorporateSignupPage = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    company_email: '',
  
    business_address: '',
    company_number: '',
    reg_number: '',
   
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      return updatedData;
    });
  };



  const validateCompanyEmail = (email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email format';
  };



  const validateRegNumber = (value) => {
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(value)) {
      return 'Phone number must be 10 digits.';
    }
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
          <div>
            <InputField
            
              type="text"
              placeholder="Enter your business address"
              // icon={
              //   <FcGoogle />
              // }
              label="Business Address"
              name="business_address"
              value={formData.business_address}
              onChange={handleChange}
              validationRules={validateBusinessAddress}
              variant="individual"
              className="mt-[16px]"
             
            />
          </div>
          <div>
            <InputField
              type="number"
              placeholder="Enter your company registration number"
              label="Company Registration Number"
              name="reg_number"
              value={formData.reg_number}
              onChange={handleChange}
              validationRules={validateRegNumber}
              variant="individual"
              className="mt-[16px] lg:mt-[24px] xl:mt-[24px] 2xl:mt-[24px]"
            />
          </div>

          <div>
            <InputField
              type="email"
              placeholder="Enter your general company email"
              label="General Company Email"
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
              placeholder="Enter your general company number"
              label="General Company Number"
              name="company_number"
              value={formData.company_number}
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
          >
            Continue
          </Button>
        </div>
        </form>
        <div>
          <AuthPrompt
            text="Already have an account? "
            link="Login"
            url="/login"
          />
        </div>
      
      </div>
    </div>
  );


};

const PageWithLayout = () => (
  <SignupLayout>
    <CorporateSignupPage />
  </SignupLayout>
);

export default PageWithLayout;


