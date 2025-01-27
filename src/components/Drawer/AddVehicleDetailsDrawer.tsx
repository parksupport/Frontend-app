import { groteskText } from "@/app/fonts";
import DownloadTemplate from "@/assets/images/DownloadTemplate.png";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import Button from "../Buttons";
import InputField from "../InputField";
import DrawerHeader from "./DrawerHeader";
import { useUploadVehicles } from "@/hooks/mutations/vehicles";
import DropdownInputField from "../DropdownInputField";

import { saveAs } from 'file-saver';
import { downloadCSV } from "@/api/vehicle";

type VehicleDetailsDrawerProps = {
  back: any;
  CheckVehicleOwner: (formData: any) => void;
  openCarProfile?: any;
  user_type?: string;
};

const AddVehicleDetailsDrawer: React.FC<VehicleDetailsDrawerProps> = ({
  back,
  CheckVehicleOwner,
  user_type,
  openCarProfile,
}) => {
  const [formData, setFormData] = useState({
    vegRegNumber: "",
    car_model: "",
    car_color: "",
    postcode: "", // Add postcode if needed for verification
    year: "", // Add year if needed for verification
    type: "", // Add type if needed
  });

  const [file, setFile] = useState<File | null>(null);
  const [isBulk, setIsBulk] = useState(false);

  const { uploadVehicles, error, isLoading ,status} = useUploadVehicles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle form submission if needed
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "vegRegNumber" ? value.toUpperCase() : value, 
    }));
  };
  
  

  // For dropdown
  const handleSelectChange = (
    selected: { value: string; label: string } | null,
    fieldName: keyof typeof formData
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: selected?.value || "",
    }));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile); // Set the selected file in the state
      setIsBulk(true);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
    
  };
  const handleBulkUpload = () => {
    if (file) {
      uploadVehicles(file);
      openCarProfile();
    } else {
      console.error("No file selected");
    }
  };

  

  return (
    <div className="mx-auto ">
      <DrawerHeader
        toggleDrawer={back}
        title="Add Your Vehicle Details"
        subTitle="Let’s get your vehicle set up for tracking contraventions and staying on top of payments."
      />
      <form onSubmit={handleSubmit} className="pt-12 px-6 md:px-0 lg:px-10">
        <div className="flex flex-col gap-4 items-center w-full md:w-[75%] lg:w-[75%] sm:w-[100%]  mx-auto">
          <div className="flex flex-col items-center w-full">
            <InputField
              type="text"
              placeholder="Enter your vehicle registration number"
              label="Vehicle Registration Number"
              name="vegRegNumber"
              value={formData.vegRegNumber}
              onChange={handleChange}
              variant="individual"
              className={`${groteskText.className} w-full`}
            />
            <p
              className={`text-[12px] text-[#98A2B3] w-full ${groteskText.className}`}
            >
              We will use your registration number to pull any available
              contravention information and keep you updated.
            </p>
          </div>
          <div className="flex flex-col items-center w-full">
            <DropdownInputField
              options={[
                { value: "Car", label: "Car" },
                { value: "Truck", label: "Truck" },
                { value: "Motorcycle", label: "Motorcycle" },
                { value: "Bus", label: "Bus" },
                { value: "Jeep", label: "Jeep" },
              ]}
              label="Vehicle Type"
              onChange={(selected) => handleSelectChange(selected, "type")}
              selectedValue={formData.type}
              placeholder="Select vehicle type"
              className={`${groteskText.className} w-full  `}
            />
          </div>

          <InputField
            type="text"
            placeholder="Enter your vehicle model"
            label="Vehicle Model"
            name="car_model"
            value={formData.car_model}
            onChange={handleChange}
            variant="individual"
            className={`${groteskText.className} w-full`}
          />
          <InputField
            type="text"
            placeholder="Enter your vehicle color"
            label="Vehicle Color"
            name="car_color"
            value={formData.car_color}
            onChange={handleChange}
            variant="individual"
            className={`${groteskText.className} w-full`}
          />

          {/* Add other necessary fields like Postcode, Year, Type if required by backend */}
          <InputField
            type="text"
            placeholder="Enter your postcode"
            label="Postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            variant="individual"
            className={`${groteskText.className} w-full`}
          />
          <InputField
            type="text"
            placeholder="Enter vehicle year"
            label="Year of manufacture"
            name="year"
            value={formData.year}
            onChange={handleChange}
            variant="individual"
            className={`${groteskText.className} w-full`}
          />

          {user_type === "individual" && (
            <div className="mt-4 w-full">
              <Button
                variant="quinary"
                className="py-[10px] px-[12px] w-full"
                icon={<IoMdCheckmark size={25} />}
                iconPosition="right"
                onClick={() => CheckVehicleOwner(formData)}
              >
                Save Vehicle
              </Button>
            </div>
          )}

          {user_type === "corporate" && (
            <div className="flex flex-col gap-4 items-center pb-12 cursor-pointer w-full">
              <div className="w-full">
                <div className="flex-shrink-0">
                  <Image
                    src={DownloadTemplate}
                    alt="Download Template for CSV"
                    width={300}
                    height={342}
                    className="rounded-lg object-cover h-full cursor-pointer"
                    onClick={handleImageClick}
                  />
                </div>
                <div
                  className="cursor-pointer text-[#039BB7] underline self-start mt-2"
                  onClick={downloadCSV}
                >
                  Download CSV template
                </div>
                {fileName && (
                  <div className="mt-2 text-gray-700 text-sm">
                    Selected file:{" "}
                    <span className="font-medium">{fileName}</span>
                  </div>
                )}
              </div>
              <Button
                variant="quinary"
                className="py-[10px] px-[12px] w-full"
                icon={<IoMdCheckmark size={25} />}
                iconPosition="right"
                // onClick={() => CheckVehicleOwner(formData)}
                onClick={
                  isBulk ? handleBulkUpload : () => CheckVehicleOwner(formData)
                }
              >
                Save Vehicle
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddVehicleDetailsDrawer;
