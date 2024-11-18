"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./AnimateButton.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const AnimateButton: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) return;

    const createSlidingOverlay = () => {
      const overlay = document.createElement("span");
      overlay.classList.add("overlay");
      button.appendChild(overlay);

      overlay.addEventListener("animationend", () => {
        overlay.remove();
      });
    };

    const interval = setInterval(createSlidingOverlay, 2000); // Adjust interval time as needed

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/auth/onboarding");
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`buttons cursor-pointer ${className || ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default AnimateButton;
