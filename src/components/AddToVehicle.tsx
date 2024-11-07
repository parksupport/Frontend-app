import { groteskText, groteskTextMedium } from '@/app/fonts';
import React, { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import InputField from './InputField';
import Button from './Buttons';
import { useDrawerStore } from '@/lib/stores/useStore';
import { useVehicleStore } from '@/lib/stores/vehicleStore';
import { Check } from 'lucide-react';
const AddToVehicle = () => {
    // const [isOpen, setIsOpen] = useState(false)
    const { formData, setFormData, resetFormData, submitVehicle, error } = useVehicleStore(); // Use the Zustand store
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, setIsOpen } = useDrawerStore()
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await submitVehicle()
        resetFormData()
        setIsOpen(false)
    }
    return (
        <div className='w-full max-w-[400px]'>
            {isOpen && (
                <div
                    className="fixed"
                    onClick={toggleDrawer}
                ></div>
            )}
            <div className=" flex flex-row ">
                <div className='cursor-pointer'> <IoArrowBack size={24} onClick={toggleDrawer} /></div>
                <div className="flex justify-center ">
                    <div className="flex flex-col justify-center items-center max-w-[451px] w-full ">
                        <h1 className={`text-[22px] leading-[29px] ${groteskTextMedium.className}`}>Add Your Vehicle Details</h1>
                        <p className={`text-[#667185] text-center leading-[18px]   ${groteskText.className}`}>Lets get your vehicle set up for tracking contraventions and staying on top of payments.</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='mt-[48px]'>
                <InputField
                    type="text"
                    name="reg_num"
                    label="Vehicle Registration Number"
                    placeholder="Enter your vehicle registration number"
                    value={formData.reg_num}
                    onChange={handleChange}
                    className=""
                />
                <span className={`text-[#667185] text-[14px] ${groteskText.className}`}>Well use your registration number to pull any available
                contravention information and keep you updated</span>
                <InputField
                    type="text"
                    name="license_num"
                    label="Drivers License Number"  
                    placeholder="Enter your drivers license number"
                    value={formData.license_num}
                    onChange={handleChange}
                    className="py-4 md:py-3"
                />
                <InputField
                    type="text"
                    name="car_model"
                    label="Car Model"
                    placeholder="Enter your car model"
                    value={formData.car_model}
                    onChange={handleChange}
                    className="py-4 md:py-3"
                />
                <InputField
                    type="text"
                    name="color"
                    label="Color"
                    placeholder="Enter your vehicle registration number"
                    value={formData.color}
                    onChange={handleChange}
                    className="py-4 md:py-3"
                />
                <Button
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center flex-row py-[12.5px]"
                >
                    {isLoading ? (
                        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-white motion-reduce:animate-spin_1.5s_linear_infinite">
                            <span className="absolute m-0 h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 clip-rect(0,0,0,0)">
                                Loading...
                            </span>
                        </div>
                    ) : (
                        <>
                            <span>Save Vehicle</span>
                            <Check className="inline-block" size={20} />
                        </>
                    )}
                </Button>
            </form>
        </div>
    )
}
export default AddToVehicle