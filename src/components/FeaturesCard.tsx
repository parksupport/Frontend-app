import React from "react";
import Button from "./Buttons";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  button?: boolean;
}

const FeatureCard = ({
  icon,
  title,
  description,
  button,
}: FeatureCardProps) => {
  return (
    <div className="w-full w-[380px] ">
      <div className="border border-[#9EBBF2] rounded-[12px] p-4 shadow-md  h-[258px] flex flex-col ">
        <div className="text-4xl py-1">{icon}</div>
        <h3 className="text-[28px] font-semibold mb-2 ">{title}</h3>
        <p className="text-[20px] text-gray-600">{description}</p>
      </div>
      {button && (
        <div className="hidden md:flex w-[100px] h-12">
          <Button
            type="button"
            className=" rounded-xlwhitespace-nowrap"
            variant="primary"
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;

{
  /* <div>
<div className="border border-gray-200 rounded-lg p-4 md:text-center shadow-md max-w-xs">
  <div className="text-4xl mb-4">{icon}</div>
  <h3 className="text-[28px] font-semibold mb-2">{title}</h3>
  <p className="text-[20px] text-gray-600">{description}</p>
</div>
{button && (
  <div className="hidden md:block">
    <Button
      type="button"
      className="md:w-1/2  rounded-xl px-6 py-3 whitespace-nowrap"
      variant="primary"
    >
      Sign up
    </Button>
  </div>
)}
</div> */
}
