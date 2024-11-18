"use client"

import React from "react";
import Button from "./Buttons";
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  return (
    <div className="w-[380px]  ">
      <div className="border border-[#9EBBF2] rounded-[12px] p-4 shadow-md  h-[263px] flex flex-col ">
        <div className="text-4xl py-1">{icon}</div>
        <h3 className="text-[28px] font-semibold mb-2 ">{title}</h3>
        <p className="text-[19px] text-gray-600">{description}</p>
      </div>
      {button && (
        <div className="hidden md:flex w-[100px]">
          <Button
            type="button"
            className="rounded-[0.75rem] whitespace-nowrap h-[2.5rem] py-0 px-[23px]"
            variant="primary"
            onClick={() => router.push("/auth/onboarding")}

          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
