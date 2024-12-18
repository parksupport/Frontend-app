import React from 'react'
import DrawerHeader from './DrawerHeader'
import ProfileSVG from "@/assets/images/Ellipse 154.jpg";
import EditIcon from '@/assets/svg/edit_icon.svg'
import { groteskText, groteskTextMedium } from '@/app/fonts';
import Image from 'next/image';

const ProfileSlider = ({ toggleDrawer }) => {

    return (
        <div>
            <DrawerHeader
                toggleDrawer={toggleDrawer}

                title="User Information"
                subTitle="This section is all about the user’s personal details."
            />
            <section className='border border-[#D0D5DD] rounded-[16px] mt-[48px] py-[27px] px-[20px]'>
                <div className='flex flex-row items-center w-full justify-between'>
                    <div className='flex  w-full items-center justify-between'>
                        <div className='flex flex-row items-center'>
                            <div className=''>
                                <Image
                                    src={ProfileSVG}
                                    alt='rounded-pic'
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className='flex flex-col ml-[24px]'>
                                <h1 className={`text-[28px] text-[#000000]  ${groteskTextMedium.className}`}>Wisdom Odili</h1>
                                <p className={`text-[20px] text-[#667185]  ${groteskText.className}`}>Lead’s United Kingdom</p>
                            </div>
                        </div>

                        <div>
                            <button className={`rounded-[30px] cursor-pointer border border-[#D0D5DD] py-[8px] px-[20px] items-center gap-[5px] flex text-[#000000] text-[20px] ${groteskText.className}`}>

                                Edit
                                <EditIcon style={{ display: 'inline-flex' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className='border border-[#D0D5DD] rounded-[16px] mt-[48px] py-[27px] px-[20px]'>
                <div className='w-[431px]'>
                    <h1 className={`text-[#000000] text-[28px]  ${groteskTextMedium.className}`}>Personal Information</h1>
                    <div className='flex flex-col mt-[20px]'>
                        <div className='flex flex-row justify-between'>

                            <div className='flex flex-col gap-[4px]'>
                                <h2 className={`text-[#667185] text-[20px]  ${groteskText.className} `}>First Name</h2>
                                <h1 className={`text-[#000000] text-[20px]  ${groteskText.className} `}>Wisdom</h1>
                            </div>

                            <div className='flex flex-col gap-[4px] mr-[60px] '>
                                <h2 className={`text-[#667185] text-[20px]  ${groteskText.className} `}>Last Name</h2>
                                <h1 className={`text-[#000000] text-[20px]  ${groteskText.className} `}>Odili</h1>
                            </div>

                        </div>

                        <div className='flex flex-row justify-between mt-[20px]'>

                            <div className='flex flex-col gap-[4px]'>
                                <h2 className={`text-[#667185] text-[20px]  ${groteskText.className} `}>Email Address</h2>
                                <a href="" className={`text-[#000000] text-[20px]  ${groteskText.className} `}>odiliwisdom5@gmail.com</a>
                            </div>

                            <div className='flex flex-col gap-[4px]'>
                                <h2 className={`text-[#667185] text-[20px]  ${groteskText.className} `}>Phone</h2>
                                <h1 className={`text-[#000000] text-[20px]  ${groteskText.className} `}>+2349177084425</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className='border border-[#D0D5DD] rounded-[16px] mt-[48px] py-[27px] px-[20px]'>
                <div className='w-[431px]'>
                    <h1 className={`text-[#000000] text-[28px]  ${groteskTextMedium.className}`}>Address</h1>
                    <div className='flex flex-col mt-[20px]'>
                        <div className='flex flex-row justify-between'>

                            <div className='flex flex-col gap-[4px]'>
                                <h2 className={`text-[#667185] text-[20px]  ${groteskText.className} `}>Country</h2>
                                <h1 className={`text-[#000000] text-[20px]  ${groteskText.className} `}>United Kingdom</h1>
                            </div>

                            <div className='flex flex-col gap-[4px]  '>
                                <h2 className={`text-[#667185] text-[20px]  ${groteskText.className} `}>City/State</h2>
                                <h1 className={`text-[#000000] text-[20px]  ${groteskText.className} `}>Birmingham, England</h1>
                            </div>

                        </div>

                        <div className='flex flex-row justify-between mt-[20px]'>

                            <div className='flex flex-col gap-[4px]'>
                                <h2 className={`text-[#667185] text-[20px]  ${groteskText.className} `}>Postal Code</h2>
                                <a href="" className={`text-[#000000] text-[20px]  ${groteskText.className} `}>ERT 63574</a>
                            </div>

                           
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileSlider
