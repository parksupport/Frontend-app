import { groteskText } from "@/app/fonts";
import DownloadTemplate from "@/assets/images/DownloadTemplate.png";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";
import Button from "../Buttons";
import InputField from "../InputField";
import DrawerHeader from "./DrawerHeader";

type VehicleDetailsDrawerProps = {
  back: any;
  CheckVehicleOwner: () => void;
  userRole?: any;
};

const AddVehicleDetailsDrawer: React.FC<VehicleDetailsDrawerProps> = ({
  back,
  CheckVehicleOwner,
  userRole,
}) => {
  const [formData, setFormData] = useState({
    vegRegNumber: "",
    license_number: "",
    car_model: "",
    car_color: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mt-5">
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
          <InputField
            type="text"
            placeholder="Enter your car model"
            label="Car Model"
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
            className={`${groteskText.className} pb-4 w-full`}
          />
          <Button
            variant="quinary"
            className="py-[10px] px-[12px] w-full"
            icon={<IoMdCheckmark size={25} />}
            iconPosition="right"
            onClick={CheckVehicleOwner}
          >
            Save Vehicle
          </Button>
          {userRole === "Corporate" && (
            <div className="flex flex-col gap-4 items-center pb-12 cursor-pointer w-full">
              <div className="w-full">
                <div className="flex-shrink-0">
                  <Image
                    src={DownloadTemplate}
                    alt="Download Template for CSV"
                    width={600}
                    height={642}
                    className="rounded-lg object-cover h-full cursor-pointer"
                    onClick={handleImageClick}
                  />
                </div>
                <div
                  className="cursor-pointer text-[#039BB7] underline self-start mt-2"
                  onClick={handleButtonClick}
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
                onClick={CheckVehicleOwner}
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
