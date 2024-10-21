"use client"
import './AnimateButton.css'

import React, { useEffect } from 'react'

interface ButtonProps {
    text: string;
    onClick?: ()=> void
  }
const AniminateButton: React.FC<ButtonProps> = ({ text, onClick }) => {
      
      
        useEffect(() => {
          const button = document.querySelector('.button');
      
          const createSlidingOverlay = () => {
            const overlay = document.createElement('span');
            overlay.classList.add('overlay');
            button?.appendChild(overlay);
      
            overlay.addEventListener('animationend', () => {
              overlay.remove();
            });
          };
      
          const interval = setInterval(createSlidingOverlay, 1000); // Adjust interval time as needed
      
          return () => clearInterval(interval);
        }, []);
      
        return (
          <button className="buttons">
            <a className="button" href="#">
              {text}
            </a>
          </button>
        );
    };


export default AniminateButton
