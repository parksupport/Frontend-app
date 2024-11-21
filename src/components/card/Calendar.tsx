"use client"
import React, { useState } from 'react'
import Button from '../Buttons'
import { groteskText, groteskTextBold, groteskTextMedium, interNormal, interSemiBold } from '@/app/fonts'
import { ChevronDown, ChevronLeft, ChevronRight, MoveDiagonal, RefreshCcw } from 'lucide-react'


const Calendar = () => {
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    const monthsOfYear = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const currentDate = new Date()
    console.log(currentDate)

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrenYear] = useState(currentDate.getFullYear())

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay()

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

 const currentDayOfMonth = currentDate.getDate()
  

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (
            prevMonth === 0 ? 11 : prevMonth - 1
        ))
        setCurrenYear((prevYear) => (
            currentMonth === 0 ? prevYear - 1 : prevYear
        ))
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (
            prevMonth === 11 ? 0 : prevMonth + 1
        ))
        setCurrenYear((prevYear) => (
            currentMonth === 11 ? prevYear + 1 : prevYear
        ))
    }

    return (
        <div className='bg-[#FFFFFF] rounded-[1.25rem] max-w-[396px] lg:max-w-[680px] pt-[1.75rem] px-[1rem]'>
            <section className="flex justify-between">
                <h1 className={`md:text-[2rem] text-[24px]  text-[#000000] ${groteskTextMedium.className} `}>Calendar</h1>
                <div className={`items-center flex gap-[11px] `}>
                    <Button
                        variant="quinary"
                        className={`py-[9px] px-[12px] text-[16px] `}
                    >Sync Calendar <RefreshCcw size={20} className='ml-[8px]' /></Button>
                    
                    {/* <Button></Button> */}
                </div>

            </section>
            <section className='flex flex-col justify-center items-center lg:flex lg:flex-row rounded-[0.75rem] bg-[#FFFFFF]  mt-[1rem] mb-[1.875rem] '>
                <div className='bg-transparent h-[300px] max-w-[300px] w-full flex flex-col mr-[1.4375rem]'>
                    <div className="flex items-center justify-between">
                       <div className='flex gap-[5px]'>
                       <h2 className={`text-[#000000] text-[20px] ${groteskTextMedium.className} `}>{monthsOfYear[currentMonth]}</h2>
                       <h2 className={`text-[#000000] text-[20px] ${groteskTextMedium.className} `}>{currentYear}</h2>
                       <i className=" text-[#4169E1]" onClick={prevMonth}><ChevronDown /></i>
                       </div>
                        <div className="flex  ">
                            <i className=" text-[#4169E1]" onClick={prevMonth}><ChevronLeft /></i>
                            <i className="text-[#4169E1]" onClick={nextMonth}><ChevronRight /></i>
                        </div>
                    </div>
                <div>
                <div className={`weekdays flex w-full items-center justify-between ${interSemiBold.className} `}>
                        {weekdays.map((day) => (
                            <span key={day} className="flex text-[#000000] text-[12px] w-[40px] h-[40px] items-center justify-center">{day}</span>
                        ))}
                    </div>

                    <div className='flex flex-wrap gap-[5px]'>
                        {Array.from(Array(firstDayInMonth).keys()).map((_, index) => (
                            <span className='w-[38px] h-[38px] bg-[#F7F9FC] rounded-[0.625rem] text-[#000000] text-[12px]' key={`empty-${index}`} />
                        ))}

                        {Array.from(Array(daysInMonth).keys()).map((day) => (
                           <span
                           key={day + 1}
                           className={` w-[38px] h-[38px] rounded-[0.625rem] flex justify-center items-center text-[#000000] text-[12px] cursor-pointer ${
                               day + 1 === currentDate.getDate() &&
                               currentMonth === currentDate.getMonth() &&
                               currentYear === currentDate.getFullYear()
                                   ? `rounded-[0.625rem] border-2 border-[#4169E1] ${interSemiBold.className} text-[13px]`
                                   : interNormal.className
                           }`}
                       >
                           {day + 1}
                       </span>
                       
                        ))}
                    </div>
                </div>
                </div>

                <div className="bg-[#4169E1] pb-[63px] w-full flex flex-col  " style={{ borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}>

                    <h1 className={`text-white text-[5.625rem] leading-[58px] text-center mt-[4rem] ${groteskTextBold.className}` }>{currentDayOfMonth}</h1>
                    <h1 className={`text-white text-[24px] mx-auto  ${groteskText.className}`}>
                        {currentDayOfWeek}
                    
                    </h1>
                   <div className='mx-auto mt-[1rem]'>
                   <p className={`text-white text-[20px] text-start ${groteskTextMedium.className}`}>Upcoming Events</p>
                    <nav className='items-center'>
                        <ul className={`text-white text-[16px]  ${groteskText.className}`}>
                            <li className='list-disc'>14 days discount window expires</li>
                            <li className='list-disc'>Country court judgment data </li>
                        </ul>
                    </nav>
                   </div>
                </div>
            </section>
        </div>
    )
}

export default Calendar
