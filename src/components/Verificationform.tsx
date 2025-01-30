import React, { useEffect } from "react";
import { useState } from "react";
import DrawerHeader from "./Drawer/DrawerHeader";
import { useAddVehicle, useVerifyVehicle } from "@/hooks/mutations/vehicles";

const VehicleVerificationForm = ({
    back,
}) => {
  const [formData, setFormData] = useState({
    registration_number: "",
    postcode: "",
  });

const {verifyVehicle, status} = useVerifyVehicle();

useEffect(() => {
  if (status === "success") {
    back();
  }
}, [status]); 

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await verifyVehicle(formData); 
  } catch (error) {
    console.error(error);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  return (
    <>
          <DrawerHeader
        toggleDrawer={back}
        title="Verify your vehicle"
        subTitle="Make sure the registration number and the postcode is the one registered with DVLA"
      />
  
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Verify Your Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="registration_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vehicle Registration Number
          </label>
          <input
            type="text"
            id="registration_number"
            name="registration_number"
            value={formData.registration_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="e.g., AB12 CDE"
            required
          />
        </div>

        <div>
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Postcode
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            placeholder="e.g., SW1A 1AA"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          Verify Vehicle
        </button>
      </form>
    </div>
    </>
  );
};

export default VehicleVerificationForm;