import { groteskText, groteskTextMedium } from '@/app/fonts';
import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import InputField from './InputField';
import Button from './Buttons';
import { useDrawerStore } from '@/lib/stores/useStore';
import { useVehicleStore } from '@/lib/stores/vehicleStore';
import { Check } from 'lucide-react';
import DrawerHeader from './Drawer/DrawerHeader';
import { GrDocumentDownload } from 'react-icons/gr';
const AddToVehicle = ({ toggleDrawer, status }) => {
    const { formData, setFormData, resetFormData, submitVehicle } = useVehicleStore(); 
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, setIsOpen } = useDrawerStore();
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
  
    useEffect(() => {
      // Check if all fields are valid
      const allFieldsValid = Object.values(formData).every(value => value.trim() !== '');
      setIsFormValid(allFieldsValid);
    }, [formData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ [name]: value });
  
      // Validate the field
      setFormErrors(prevState => ({
        ...prevState,
        [name]: value.trim() === '' ? 'This field is required' : ''
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!isFormValid) {
        setFormErrors(prevState => ({
          ...prevState,
          form: 'Please fill in all fields'
        }));
        return;
      }
      setIsLoading(true);
      await submitVehicle();
      resetFormData();
      setIsOpen(false);
    };
  
    return (
      <div className='w-full max-w-[400px]'>
        {/* <DrawerHeader
          toggleDrawer={toggleDrawer}
          title="Add Your Vehicle Details"
          subTitle="Let’s get your vehicle set up for tracking contraventions and staying on top of payments."
        /> */}
  
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
          {/* {formErrors.reg_num && <span className="text-red-500">{formErrors.reg_num}</span>} */}
          <span className={`text-[#667185] text-[14px] ${groteskText.className}`}>
          We&apos;ll use your registration number to pull any available contravention information and keep you updated.
          </span>
          {/* <InputField
            type="text"
            name="license_num"
            label="Driver's License Number"
            placeholder="Enter your driver's license number"
            value={formData.license_num}
            onChange={handleChange}
            className="py-4 md:py-3"
          /> */}
          {/* {formErrors.license_num && <span className="text-red-500">{formErrors.license_num}</span>} */}
          <InputField
            type="text"
            name="car_model"
            label="Car Model"
            placeholder="Enter your car model"
            value={formData.car_model}
            onChange={handleChange}
            className="py-4 md:py-3"
          />
          {/* {formErrors.car_model && <span className="text-red-500">{formErrors.car_model}</span>} */}
          <InputField
            type="text"
            name="color"
            label="Color"
            placeholder="Enter your vehicle color"
            value={formData.color}
            onChange={handleChange}
            className="py-4 md:py-3"
          />
          {/* {formErrors.color && <span className="text-red-500">{formErrors.color}</span>} */}
  
          <div className="mt-4">
            <div
              className="w-full h-[240px] border border-dashed border-gray-400 p-4 flex flex-col justify-center items-center cursor-pointer"
              onClick={() => console.log('clicked')}
            >
              <GrDocumentDownload size={50} color="#4169E1" />
              <p className="text-[28px]">CSV and XLS</p>
              <p className="text-[22px]">Click to browse</p>
            </div>
  
            <div className="cursor-pointer text-[#039BB7] underline self-start mt-2">
              Download CSV template
            </div>
          </div>
  
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid || isLoading}
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
          {/* {formErrors.form && <span className="text-red-500">{formErrors.form}</span>} */}
        </form>
      </div>
    );
  };
export default AddToVehicle