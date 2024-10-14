// app/signup/page.tsx
"use client"
import InputField from "@/components/InputField";
import { useState } from "react";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import { groteskText, groteskTextMedium } from '@/app/fonts'

import { AuthPrompt } from "@/components/AuthPrompt";

const CorporateAdminSignupPage = ({onContinue}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    position: '',
   
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



  const validateEmail = (email)=> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email format';
  };


 const validatePassword =(value)=>{
    return value.length >= 6 ? null : 'Password must be at least 6 characters';

 }

  const handleConfirmPasswordBlur = (value)=> {
    if (formData.confirmPassword !== formData.password) {
        return 'Passwords do not match';
    } else {
        return null;
    }
};

const validatePosition = (value)=> {
    return value.length >= 6 ? null : 'Position must be at least 6 characters';

}


  return (
    <div className="max-w-[400px] w-full">
      <div className="flex flex-col justify-center w-full ">
    
      <div className='justify-center items-center flex flex-col'>
      
      <h1 className={`text-[28px] text-[#000000] lg:text-[40px] ${groteskTextMedium.className} leading-[2.5rem]`}>Create your account</h1>
      <p className={`text-[#667185] text-[16px] mt-[0] ${groteskText.className} lg:text-[18px] xl:text-[18px] 2xl:text-[18px] leading-[1.25rem] mt-[8px]` }>Enter the details of an authorized user</p>
    </div>
        <form className="mt-[24px] lg:mt-[2.5rem] 4 ">
          <div>
            <InputField
              type="text"
              placeholder="Enter your name"
              label="Full Name"
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
              type="text"
              placeholder="Enter your current position"
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              validationRules={validatePosition}
              variant="individual"
              className="mt-[16px]"
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
              type="password"
              placeholder="Enter your password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              validationRules={validatePassword}
              variant="individual"
              className="mt-[16px] "
            />
          </div>
          <div>
            <InputField
              type="password"
              placeholder="Enter your password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              validationRules={handleConfirmPasswordBlur}
              variant="individual"
              className="mt-[16px] "
            />
          </div>

          <div>

          <Button
            type="submit"
            className="w-full lg:mt-[40px]"
            variant='primary'
            onClick={onContinue}
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

// const PageWithLayout = () => (
//   <SignupLayout>
//     <CorporateAdminSignupPage />
//   </SignupLayout>
// );

export default CorporateAdminSignupPage;

