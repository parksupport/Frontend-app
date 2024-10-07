import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleNext();
    }, 5000); 

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval);
  }, [currentIndex]);


  const handleNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full  mx-auto"   >
      <div className="overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-64 object-cover rounded-lg"
          style={{ height: '954px' }}
        />
      </div>

    </div>
  );
};

export default ImageSlider;
