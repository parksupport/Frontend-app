// app/signup/page.tsx
"use client"
import InputField from "@/components/InputField";
import { useEffect, useState } from "react";
import Image from "next/image";
import CreateAccountText from "@/components/CreateAccountText";
import Button from "@/components/Buttons";
import { AuthPrompt } from "@/components/AuthPrompt";
import { useSignup } from "@/hooks/useRegister";

interface AdminSignupPageProps {
  onContinue: (formData: any) => void;
  combinedData: any;
}

const AdminSignupPage: React.FC<AdminSignupPageProps> = ({onContinue}) => {
  const [formData, setFormData] = useState({
 
    password: '',
    cvn: '',
    postalCode: '',
    confirmPassword: '',
 
  });

  const [signupFormData, setSignupFormData] = useState(null);
  const { signup, isError, error } = useSignup();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);


  useEffect(() => {
    const storedFormData = localStorage.getItem('signupFormData');
    if (storedFormData) {
      setSignupFormData(JSON.parse(storedFormData));
    }
  }, []);

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

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const combinedFormData = { ...signupFormData, ...formData };
    onContinue(formData)
    signup(combinedFormData)
  };


  const validatePassword = (value)=> {
    return value.length >= 6 ? null : 'Password must be at least 6 characters';
  };


const validatePostalCode = (value: string)=> {
    const postalCodePattern = /^\d{5}$/; // Pattern to match exactly 5 digits
    if (!postalCodePattern.test(value)) {
      return "Postal code must be exactly 5 digits.";
    }
    return null;
  };
  
  const validateCarVeriNum = (value: string)=> {
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
        <form onSubmit={handleContinue} className="mt-[24px] lg:mt-[2.5rem]  ">
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
          </div>
          <div>
            <Button 
            type="submit" 
            className="w-full lg:mt-[40px]"
            variant='primary'
            //  onClick={onContinue}
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

