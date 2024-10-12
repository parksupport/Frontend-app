import { groteskText, groteskTextMedium } from '@/app/fonts'
import React from 'react'

const CreateAccountText = () => {
  return (
    <div className='justify-center items-center flex flex-col lg:mt-[32px]'>
      
      <h1 className={`text-[28px] text-[#000000] lg:text-[40px] ${groteskTextMedium.className} leading-[2.5rem]`}>Create your account</h1>
      <p className={`text-[#667185] text-[16px] mt-[0] ${groteskText.className} lg:hidden xl:hidden 2xl:hidden leading-[1.25rem] mt-[8px]` }>We’ll streamline your experience accordingly.</p>

      <p className={`hidden lg:flex xl:flex 2xl:flex text-[#667185] text-[16px] ${groteskText.className} leading-[1.25rem] mt-[8px]`}>Enter your email and password to get you started</p>
    </div>
  )
}

export default CreateAccountText

