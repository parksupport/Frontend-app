import React from 'react';

interface ButtonTextProps {
  icon?: React.ReactNode; 
  text: string; 
}

const ButtonText: React.FC<ButtonTextProps> = ({ icon, text }) => {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default ButtonText;
