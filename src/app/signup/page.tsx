// app/signup/page.tsx
"use client"
import InputField from "@/components/InputField";
import { useState } from "react";
import { AuthPrompt } from "@/components/authPrompt"


const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      console.log(updatedData);
      return updatedData;
    });
  };

  const validatePassword = (password: string): string | null => {
    return password.length >= 6 ? null : 'Password must be at least 6 characters';
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email format';
  };
  const handleConfirmPasswordBlur = (value: string): string | null => {
    if (formData.confirmPassword !== formData.password) {
        setConfirmPasswordError('Passwords do not match');
        return 'Passwords do not match';
    } else {
        setConfirmPasswordError(null);
        return null;
    }
};





  return (
    <div className="">
      <div className="">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form className="mt-8 space-y-4">
          <div>
            <InputField
              type="text"
              placeholder="Name"
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
              placeholder="Enter your email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              validationRules={validateEmail}
              variant="individual"
              className=""
            />
          </div>
          <div>
            <InputField
              type="password"
              placeholder="Password"
              label="Password"
              variant="individual"
              className=""
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
              className={""} 
              />
            {confirmPasswordError && <span style={{ color: 'red' }}>{confirmPasswordError}</span>}
          </div>
          <div>
            {/* <Button type="submit" className="w-full">
              Sign Up
            </Button> */}
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

export default SignupPage;

