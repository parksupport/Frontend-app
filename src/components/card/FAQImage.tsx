import Image from 'next/image'
import React from 'react'
import FaqImage from '@/assets/images/amico.png'

const FAQImage = () => {
  return (
    <div>
      <Image
      src={FaqImage}
      alt='faq image'
       />
    </div>
  )
}

export default FAQImage
