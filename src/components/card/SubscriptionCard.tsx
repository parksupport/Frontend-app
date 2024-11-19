"use client"
import React, { useState } from 'react'

const SubscriptionCard = () => {
    const [isActive, setIsActive] = useState(false);

    const handleCardClick = () => {
      setIsActive(!isActive);
    };
  
    return (
      <div
        className={`p-6 rounded-lg transition-colors duration-300 ease-in-out ${isActive ? 'bg-black text-white' : 'bg-white text-black'} hover:bg-black hover:text-white`}
        onClick={handleCardClick}
      >
        <h1 className="text-2xl font-bold mb-4">Card Title</h1>
        <p className="text-xl mb-4">Card Subtitle</p>
        <h1 className="text-xl mb-2">This is an H1 tag inside the card</h1>
        <p className="mb-4">This is a paragraph inside the card. It contains some text to demonstrate the card content.</p>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Button 1</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">Button 2</button>
        </div>
        <p className="mt-4">This is another paragraph inside the card. Click the card to activate it.</p>
      </div>
    );
}

export default SubscriptionCard
