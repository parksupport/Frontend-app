"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const ImageSlider = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, [images.length, currentIndex]);

  return (
    <div className="relative w-full mx-auto rounded-lg">
      <div>
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageSlider;
