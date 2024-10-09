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
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, [images.length, currentIndex]);

  return (
    <div className="relative w-full mx-auto bg-red-200">
      <div>
        {/* <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className="object-cover rounded-lg"
        /> */}
             <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          // className="w-full object-cover rounded-lg"
          // style={{ height: '954px' }}
          layout="responsive"
          width={600}
          height={900}
          // fill
        />
      </div>
      
    </div>
  );
};

export default ImageSlider;
