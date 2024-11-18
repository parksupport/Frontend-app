"use client"
import { useRouter } from "next/navigation";
import './AnimateButton.css'

import React, { useEffect } from 'react'

interface ButtonProps {
    text: string;
    onClick?: ()=> void
    className: string;
  }
const AniminateButton: React.FC<ButtonProps> = ({ text, onClick,  }) => {
      const router = useRouter()

        useEffect(() => {
      
          const createSlidingOverlay = () => {
            const overlay = document.createElement('span');
            overlay.classList.add('overlay');
            button?.appendChild(overlay);
      
            overlay.addEventListener('animationend', () => {
              overlay.remove();
            });
          };
      
          const interval = setInterval(createSlidingOverlay, 2000); // Adjust interval time as needed
      
          return () => clearInterval(interval);
        }, []);
        const button = document.querySelector('.buttons');

        const handleClick = () => {
          router.push("/auth/onboarding");
        };
    
        if (button) {
          button.addEventListener('click', handleClick);
        }


        return (
          <button className="buttons cursor-pointer"

          >
            <a className="button cursor-pointer" href="#">
              {text}
            </a>
          </button>
        );
    };


export default AniminateButton
