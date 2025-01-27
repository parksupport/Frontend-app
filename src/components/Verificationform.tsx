import React from "react";
import { useState } from "react";
import DrawerHeader from "./Drawer/DrawerHeader";

const VehicleVerificationForm = ({
    back,
}) => {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    postcode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form Data Submitted:", formData);
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
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vehicle Registration Number
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
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