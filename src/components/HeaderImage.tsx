import React from 'react'
import Image from 'next/image'
import CarAlertImage from '@/assets/svg/car-alert.svg'
import diploSVG from '@/assets/svg/diploSVG.svg'

const HeaderImage = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className='flex justify-center cursor-pointer'>
      <CarAlertImage onClick={onClick} />
        {/* <Image
       className="self-center "
       src={carAlertImage}
      
       alt="signup carAlert"
        /> */}
    </div>
  )
}

export default HeaderImage
