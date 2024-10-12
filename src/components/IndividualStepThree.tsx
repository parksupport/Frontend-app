// app/signup/page.tsx
"use client"
import InputField from "@/components/InputField";
import { useState } from "react";
import Image from "next/image";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import { AuthPrompt } from "@/components/AuthPrompt";


const AdminSignupPage = ({onContinue}) => {
  const [formData, setFormData] = useState({
 
    password: '',
    cvn: '',
    postalCode: '',
    confirmPassword: '',
 
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

  const validatePassword = (value)=> {
    return password.length >= 6 ? null : 'Password must be at least 6 characters';
  };

  const handleConfirmPasswordBlur = ()=> {
    if (formData.confirmPassword !== formData.password) {
        setConfirmPasswordError('Passwords do not match');
        return 'Passwords do not match';
    } else {
        setConfirmPasswordError(null);
        return null;
    }
};


const validatePostalCode = (value)=> {
    const postalCodePattern = /^\d{5}$/; // Pattern to match exactly 5 digits
    if (!postalCodePattern.test(value)) {
      return "Postal code must be exactly 5 digits.";
    }
    return null;
  };
  
  const validateCarVeriNum = (value)=> {
    const carVeriNumPattern = /^[A-Za-z0-9]{7,10}$/; // Pattern to match 7 to 10 alphanumeric characters
    if (!carVeriNumPattern.test(value)) {
      return "Car verification number must be 7 to 10 alphanumeric characters.";
    }
    return null;
  };
  



  return (
    <div className="max-w-[400px] w-full">
      <div className="flex flex-col justify-center">
     
       
        <CreateAccountText />
        <form className="mt-[24px] lg:mt-[2.5rem]  ">
        <div>
            <InputField
              type="number"
              placeholder="Enter your postal code"
              label="Postal Code"
              variant="individual"
              
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              validationRules={validatePostalCode}
            />
          </div>
            <div>
            <InputField
              type="text"
              placeholder="Enter your car verification number"
              label="Car Verification Number"
              name="cvn"
              value={formData.cvn}
              onChange={handleChange}
              validationRules={validateCarVeriNum}
              variant="individual"
              className="mt-[16px] "
            />
            </div>
        
          <div>
            <InputField
              type="password"
              placeholder="Password"
              label="Password"
              variant="individual"
               className="mt-[16px] "
              name="password"
              value={formData.password}
              onChange={handleChange}
              validationRules={validatePassword}
            />
          </div>
          <div className={`input-field individual`}>
            <InputField
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              validationRules={handleConfirmPasswordBlur} 
              label={"Confirm Password"} 
              variant={"individual"} 
              className="mt-[16px]"
              />
            {/* {confirmPasswordError && <span style={{ color: 'red' }}>{confirmPasswordError}</span>} */}
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
//     <AdminSignupPage />
//   </SignupLayout>
// );

export default AdminSignupPage;

function setConfirmPasswordError(arg0: null) {
  throw new Error("Function not implemented.");
}

