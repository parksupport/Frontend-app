"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ImageSlider = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentIndex,handleNext]);

  return (
    <div className="relative w-full mx-auto rounded-[32px] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out relative w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full relative">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
