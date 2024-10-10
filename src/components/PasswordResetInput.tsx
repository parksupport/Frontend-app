import { groteskText } from '@/app/fonts';
import React, { useState } from 'react'

 const PasswordResetEmailInput = () => {

    const [email, setEmail] = useState('');

    const handleChange = (e:any) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
    }
  
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className={`${groteskText.className}`}>
              <label htmlFor="email" className={`block text-[#000000] text-[16px] ${groteskText.className}` }>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className={`max-w-[400px] w-full  rounded-[6px] border-[#D0D5DD] border-solid border text-[#667185]  text-[14px]  focus:outline-none px-[16px] py-[16px] ${groteskText.className}`}
                placeholder="Enter your email address"
                required
              />
            </div>
          
          </form>
        </div>
      );
}
export default PasswordResetEmailInput
