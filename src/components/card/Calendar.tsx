"use client"
import React, { useState } from 'react'
import Button from '../Buttons'
import {
  groteskText,
  groteskTextBold,
  groteskTextMedium,
  interNormal,
  interSemiBold,
} from '@/app/fonts'
import { ChevronDown, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react'

interface DateEvent {
  date: Date            // a real JS Date object
  events: string[]      // or any structure you prefer
}

interface CalendarProps {
  /** 
   * An array of date-based events. Each object contains:
   *  - date: a JavaScript Date
   *  - events: an array of strings (or any relevant structure)
   */
  dateEvents?: DateEvent[]
}

/**
 * Returns an array of events for a given date by matching date strings.
 */
const getEventsForDate = (date: Date, dateEvents?: DateEvent[]): string[] => {
  if (!dateEvents) return []
  const found = dateEvents.find(
    (item) => item.date.toDateString() === date.toDateString()
  )
  return found?.events || []
}

const Calendar: React.FC<CalendarProps> = ({ dateEvents = [] }) => {
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentDate = new Date()
  
  // Track visible month and year
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

  // Instead of defaulting to today's date, we start with no selected date.
  // This makes the right pane show upcoming events by default.
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Number of days in the current displayed month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  // Weekday of first day in the current displayed month (0-based, Sunday = 0)
  const firstDayInMonth = new Date(currentYear, currentMonth, 1).getDay()

  // For the selected date view (when a date is clicked), compute details:
  const selectedDayOfWeek = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long' })
    : ''
  const selectedDayOfMonth = selectedDate ? selectedDate.getDate() : null

  // Handlers for month navigation
  const prevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev))
  }

  const nextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev))
  }

  // Retrieve the events for the selected date (if one is selected)
  const eventsForSelectedDate = selectedDate
    ? getEventsForDate(selectedDate, dateEvents)
    : []

  // Compute upcoming events: events with dates after the current date
  const upcomingEvents = dateEvents
    .filter(item => item.date.getTime() > currentDate.getTime())
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="bg-[#FFFFFF] rounded-[1.25rem] w-full max-w-[396px] lg:max-w-[680px] pt-[1.75rem] px-[1rem] h-full">
      {/* Header */}
      <section className="flex justify-between">
        <h1 className={`md:text-[2rem] text-[24px] text-[#000000] ${groteskTextMedium.className}`}>
          Calendar
        </h1>
        {/* Optionally, include a sync button or other controls here */}
      </section>

      {/* Calendar + Right Pane */}
      <section className="flex flex-col justify-center items-center lg:flex lg:flex-row rounded-[0.75rem] bg-[#FFFFFF] mt-[1rem] mb-[1.875rem]">
        {/* Left (Calendar) */}
        <div className="bg-transparent h-[300px] max-w-[300px] w-full flex flex-col mr-[1.4375rem]">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-[5px] items-center">
              <h2 className={`text-[#000000] text-[20px] ${groteskTextMedium.className}`}>
                {monthsOfYear[currentMonth]}
              </h2>
              <h2 className={`text-[#000000] text-[20px] ${groteskTextMedium.className}`}>
                {currentYear}
              </h2>
              <i className="text-[#4169E1] cursor-pointer" onClick={prevMonth}>
                <ChevronDown />
              </i>
            </div>
            {/* Navigation arrows */}
            <div className="flex">
              <i className="text-[#4169E1] cursor-pointer" onClick={prevMonth}>
                <ChevronLeft />
              </i>
              <i className="text-[#4169E1] cursor-pointer" onClick={nextMonth}>
                <ChevronRight />
              </i>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className={`weekdays flex w-full items-center justify-between ${interSemiBold.className}`}>
            {weekdays.map((day) => (
              <span
                key={day}
                className="flex text-[#000000] text-[12px] w-[40px] h-[40px] items-center justify-center"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex flex-wrap gap-[5px]">
            {/* Empty squares to offset days before the first of the month */}
            {Array.from(Array(firstDayInMonth).keys()).map((_, index) => (
              <span
                key={`empty-${index}`}
                className="w-[38px] h-[38px] bg-[#F7F9FC] rounded-[0.625rem] text-[#000000] text-[12px]"
              />
            ))}

            {/* Actual days of the month */}
            {Array.from(Array(daysInMonth).keys()).map((_, dayIndex) => {
              const dayNum = dayIndex + 1
              const date = new Date(currentYear, currentMonth, dayNum)

              // Check if day has events
              const hasEvents = getEventsForDate(date, dateEvents).length > 0
              // Check if it's the current system date
              const isToday = date.toDateString() === currentDate.toDateString()
              // Check if it's the selected date (if any)
              const isSelected = selectedDate
                ? date.toDateString() === selectedDate.toDateString()
                : false

              return (
                <span
                  key={dayNum}
                  className={`w-[38px] h-[38px] rounded-[0.625rem] flex justify-center items-center text-[12px] cursor-pointer ${
                    isSelected
                      ? `border-2 border-[#4169E1] ${interSemiBold.className} text-[13px]`
                      : isToday
                      ? `border border-[#4169E1] ${interSemiBold.className}`
                      : interNormal.className
                  } ${hasEvents ? 'bg-[#FFE4E6]' : 'bg-[#F7F9FC]'} `}
                  onClick={() => setSelectedDate(date)}
                >
                  {dayNum}
                </span>
              )
            })}
          </div>
        </div>

        {/* Right Pane */}
        <div
          className="bg-[#4169E1] pb-[63px] w-full flex flex-col"
          style={{
            borderTopRightRadius: '12px',
            borderBottomRightRadius: '12px',
          }}
        >
          {selectedDate ? (
            // When a specific date is selected, show its details:
            <>
              <h1 className={`text-white text-[5.625rem] leading-[58px] text-center mt-[4rem] ${groteskTextBold.className}`}>
                {selectedDayOfMonth}
              </h1>
              <h1 className={`text-white text-[24px] mx-auto ${groteskText.className}`}>
                {selectedDayOfWeek}
              </h1>

              <div className="mx-auto mt-[1rem] px-4">
                <p className={`text-white text-[20px] text-start ${groteskTextMedium.className}`}>
                  Events
                </p>
                <nav className="items-center">
                  {eventsForSelectedDate.length > 0 ? (
                    <ul className={`text-white text-[16px] ${groteskText.className}`}>
                      {eventsForSelectedDate.map((event, i) => (
                        <li className="list-disc" key={i}>
                          {event}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-white text-[16px]">No events scheduled</p>
                  )}
                </nav>
              </div>
            </>
          ) : (
            // Default view: show a scrollable list of upcoming events
            <>
              <h2 className="text-white text-[24px] mx-auto mt-[1rem] mb-[1rem]">
                Upcoming Events
              </h2>
              <div className="overflow-y-auto max-h-[300px] px-4">
                {upcomingEvents.length > 0 ? (
                  <ul className={`text-white text-[16px] ${groteskText.className}`}>
                    {upcomingEvents.map((item, index) => (
                      <li key={index} className="mb-4">
                        <div className="font-bold">
                          {item.date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <ul className="list-disc ml-4">
                          {item.events.map((event, i) => (
                            <li key={i}>{event}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white text-[16px]">No upcoming events</p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default Calendar
