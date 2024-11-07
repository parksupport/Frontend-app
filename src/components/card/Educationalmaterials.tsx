import { groteskText, groteskTextMedium } from "@/app/fonts";
import React, { useState } from "react";

const EducationalMaterials = () => {
  const [selected, setSelected] = useState("Driving rules");

  const handleSelect = (topic) => {
    setSelected(topic);
  };

  return (
    <div className="bg-white p-6  md:p-4 rounded-[16px] shadow-md max-w-[396px] sm:max-w-md md:max-w-[680px] w-full">
      <h1 className={`text-[24px] ${groteskTextMedium.className} mb-4"`}>
        Educational Materials
      </h1>

      <div className="md:flex md:gap-8 ">
        {" "}

        <div className="flex flex-wrap gap-2 mb-4 md:flex-col md:w-[38%]">
          {[
            "Driving rules",
            "Road and driving safety",
            "Rules for different vehicles",
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => handleSelect(topic)}
              className={`inline-flex items-center md:justify-start ${
                groteskText.className
              } px-4 py-2 border rounded-[12px] text-sm font-medium ${
                selected === topic
                  ? "bg-[#CEFDFF] text-[#039BB7]"
                  : "bg-white text-black"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div
          className={`md:w-[53.5%] ${groteskText.className} border py-4 px-3 rounded-[16px] text-black text-[16px]`}
        >
          <p>
            Access resources on driving rules, road and driving safety, and
            rules for different vehicles. Learn key topics like traffic laws,
            managing violations, and best practices for vehicle and fleet
            management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationalMaterials;
