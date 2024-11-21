import React, { useEffect } from 'react';
import './TextAnimation.css';
import LandingPage from '@/app/page';

const TextAnimation = () => {
    useEffect(() => {
        const txts = document.querySelectorAll<HTMLElement>(".animate-text span");
        const txtsLen = txts.length;
        let index = 0;
        const textInTimer = 3000;
        const textOutTimer = 2800;
    
        function animateText() {
          for (let i = 0; i < txtsLen; i++) {
            txts[i].classList.remove("text-in", "text-out");
          }
    
          // Add the 'text-in' class to the current text
          txts[index].classList.add("text-in");
    
          // Set timeout for the text out animation
          setTimeout(() => {
            txts[index].classList.add("text-out");
          }, textOutTimer);
    
          // Prepare for the next text
          setTimeout(() => {
            index = (index + 1) % txtsLen; // Cycle through texts
            animateText(); // Call the animation again
          }, textInTimer);
        }
    
        animateText(); // Start the animation
      }, []);

  return (
<>
<section className="home ">
    
          
            <p className="animate-text text-responsive-lg">
              <span className=' '>Contravention</span>
              <span>Parking</span>
              <span>Speed</span>
         
            </p>
     
     
    </section>
</>
  );
};

export default TextAnimation;
