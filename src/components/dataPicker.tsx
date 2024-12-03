import { groteskText } from "@/app/fonts";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

interface CustomDatePickerProps {
  label: string;
  placeholder?: string;
  iconRight?: React.ReactNode;
  textRight?: string;
  className?: string;
  error?: boolean;
  value?: any;
  onChange?: (date: Date | null) => void; // onChange callback to update parent state
  indefinite?: boolean;
  endDate?: any;
  handleEndDateChange?:any;
}

export const CustomDatePicker = ({
  label,
  placeholder,
  iconRight,
  textRight,
  className,
  error,
  indefinite = false,
  endDate,
  handleEndDateChange,
  value, // Value to bind to the parent state
  onChange, // Callback to handle date change
}: CustomDatePickerProps) => {
  const handleChange = (date: Date | null) => {
    if (onChange) {
      onChange(date); // Pass the selected date to the parent via onChange
    }
  };


  return (
    <div className={`${className}`}>
      <label
        htmlFor="start-date"
        className={`text-[#000000] text-[16px] ${groteskText.className} lg`}
      >
        {label}
      </label>
      <div className="relative">
        <DatePicker
          disabled={endDate}
          selected={value}
          onChange={handleChange}
          dateFormat="dd-MM-yyyy"
          placeholderText={placeholder || "Select a start date"}
          id="start-date"
          className={`${
            groteskText.className
          } w-full h-full px-4 py-4 rounded-[6px] text-[14px] mt-1 border border-solid text-gray-500 focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          } ${error ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
        />
        {textRight && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {textRight}
          </div>
        )}
        {iconRight && (
          <div className="absolute right-[132px] top-1/2 transform -translate-y-1/2 cursor-pointer">
            {iconRight}
          </div>
        )}
      </div>
      {indefinite && (
        <div className="flex items-center pt-[2px]">
          <input
            type="checkbox"
            className="form-checkbox"
            onChange={handleEndDateChange}
            checked={endDate}
          />

          <p className="text-[14px] text-[#667185] ml-2">Indefinite</p>
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
