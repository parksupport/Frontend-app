import React from 'react'
import Image from 'next/image'
import carAlertImage from '@/assets/images/logo.jpg'
import diploSVG from '@/assets/svg/diploSVG.svg'

const HeaderImage = () => {
  return (
    <div className='flex justify-center'>
        <Image
       className="self-center "
       src={carAlertImage}
      
       alt="signup carAlert"
        />
    </div>
  )
}

export default HeaderImage
