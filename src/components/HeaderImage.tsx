import React from 'react'
import Image from 'next/image'
import carAlertImage from "@/assets/images/Layer_1.jpg"

const HeaderImage = () => {
  return (
    <div className='flex justify-center'>
        <Image
       className="self-center"
       src={carAlertImage}
      
       alt="signup carAlert"
        />
    </div>
  )
}

export default HeaderImage
