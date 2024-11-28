import { groteskText, groteskTextMedium } from '@/app/fonts';
import React, { useState } from 'react';
import DeleteRowModal from './DeleteRowModal';
import useDeleteRow from '@/hooks/useDeleteRow';


const ExpandedRow = ({ data }) => {
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [showAddRecipientForm, setShowAddRecipientForm] = useState(false);
  const [recipientData, setRecipientData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    startDate: '',
    endDate: '',
    isIndefinite: false,
  });

  const handleMenuClick = (index) => {
    setExpandedRowIndex(index === expandedRowIndex ? null : index);
  };

  const handleEndNomination = (nominationStatus, index) => {
    if (nominationStatus === 'Ended') {
      alert("Nomination has already ended.");
    } else {
      alert("Nomination ended.");
      // Logic for ending the nomination (e.g., API call)
    }
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox change for indefinite end date
  const handleIndefiniteChange = () => {
    setRecipientData((prevData) => ({
      ...prevData,
      isIndefinite: !prevData.isIndefinite,
      endDate: '', // Reset end date when switching to indefinite
    }));
  };

  // Submit the new recipient data (for example, update state or make an API call)
  const handleAddRecipientSubmit = () => {
    console.log("Adding recipient", recipientData);
    setShowAddRecipientForm(false);
    // Reset the form data after submission (optional)
    setRecipientData({
      name: '',
      email: '',
      phoneNo: '',
      startDate: '',
      endDate: '',
      isIndefinite: false,
    });
  };

  return (
    <div className="w-full rounded-[16px] border border-gray-200 mt-[40px]">
     <div>
         <h2 className="text-lg font-bold mb-2 text-center">Notification Recipient History for Vehicle 23456UK</h2>

      {/* Add Recipient Button */}
      <button
        onClick={() => setShowAddRecipientForm(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-[8px] hover:bg-blue-600 text-center"
      >
        Add Recipient
      </button>
     </div>

      {/* Overlay to disable table when form is shown */}
      {showAddRecipientForm && (
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-50 z-10"
          onClick={() => setShowAddRecipientForm(false)}
        />
      )}

      {/* Add Notification Recipient Form */}
      {showAddRecipientForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 z-20 relative">
          <h3 className="text-xl font-semibold mb-4">Add Notification Recipient for Vehicle 23456UK</h3>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={recipientData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={recipientData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone No.</label>
              <input
                type="text"
                id="phoneNo"
                name="phoneNo"
                value={recipientData.phoneNo}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Nomination Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={recipientData.startDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4 flex items-center">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Nomination End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={recipientData.endDate}
                onChange={handleInputChange}
                disabled={recipientData.isIndefinite}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="ml-2">
                <input
                  type="checkbox"
                  id="indefinite"
                  name="indefinite"
                  checked={recipientData.isIndefinite}
                  onChange={handleIndefiniteChange}
                  className="h-5 w-5 text-blue-500"
                />
                <label htmlFor="indefinite" className="text-sm text-gray-700 ml-1">Indefinite</label>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleAddRecipientSubmit}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Recipient
            </button>
          </form>
        </div>
      )}

      <div className="relative z-0">
        <table className={`min-w-full bg-white m-0 overflow-x-auto ${showAddRecipientForm ? 'pointer-events-none opacity-50' : ''}`}>
          <thead>
            <tr className="text-[17px]">
              <th className="py-1 px-2 bg-gray-100 text-right font-semibold text-gray-500 w-1/12"></th>
              <th className="py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">Name</th>
              <th className="py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">Nomination Status</th>
              <th className="py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">Start Date</th>
              <th className="py-1 px-4 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">End Date</th>
              <th className="py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">Email</th>
              <th className="py-1 px-6 bg-gray-100 text-left font-semibold text-gray-500 w-2/12">Phone No.</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((historyItem, historyIndex) => (
              <tr key={historyIndex}>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button onClick={() => handleMenuClick(historyIndex)} className="text-gray-500 hover:text-gray-900 px-4">&#8942;</button>
                  {expandedRowIndex === historyIndex && (
                    <div className="absolute bg-white shadow-lg rounded mt-2 w-48">
                      <button
                        onClick={() => handleEndNomination(historyItem.nominationStatus, historyIndex)}
                        disabled={historyItem.nominationStatus === 'Ended'}
                        className={`block px-4 py-2 text-sm text-gray-700 ${historyItem.nominationStatus === 'Ended' ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                      >
                        End nomination
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 leading-none  w-1/12 whitespace-nowrap">{historyItem.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 leading-none  w-1/12 whitespace-nowrap">{historyItem.nominationStatus}</td>
                <td className="px-6 py-4 text-sm text-gray-700 leading-none  w-1/12 whitespace-nowrap">{historyItem.startDate}</td>
                <td className="px-6 py-4 text-sm text-gray-700 leading-none  w-1/12 whitespace-nowrap">{historyItem.endDate}</td>
                <td className="px-6 py-4 text-sm text-gray-700 leading-none  w-1/12 whitespace-nowrap">{historyItem.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700 leading-none  w-1/12 whitespace-nowrap">{historyItem.phoneNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpandedRow;


