import { groteskText, groteskTextMedium } from "@/app/fonts";
import { useState } from "react";

const TopicList = [
  {
    id: 1,
    topic: "Driving rules",
    description: "Learn the basics of road safety and driving rules.",
  },
  {
    id: 2,
    topic: "Road and driving safety",
    description: "Understand the importance of road safety and driving safety.",
  },
  {
    id: 3,
    topic: "Rules for different vehicles",
    description:
      "Learn about different types of vehicles and their safety standards.",
  },
];

interface EducationalMaterialsProps {
  openEducationalMaterials: (educationalMaterials: any) => void;
}

const EducationalMaterials = ({
  openEducationalMaterials,
}: EducationalMaterialsProps) => {
  const [selected, setSelected] = useState(TopicList[0].id);

  const handleSelect = (topic: { id: number }) => {
    setSelected(topic.id);
  };
  return (
    <div className="bg-white p-6  md:p-4 rounded-[16px] shadow-md max-w-[396px] sm:max-w-md md:max-w-[680px] w-full">
      <h1 className={`text-[24px] ${groteskTextMedium.className} mb-4"`}>
        Educational Materials
      </h1>

      <div className="md:flex md:gap-8 ">
        {" "}
        <div className="flex flex-wrap md:flex-col items-start gap-2 mb-4 md:flex-col md:w-[38%]">
          {TopicList.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic)}
              className={`inline-flex items-center md:justify-start ${
                groteskText.className
              } px-4 py-2 border rounded-[12px] text-sm font-medium ${
                selected === topic.id ? "border-[#4169E1]" : "border-[#D0D5DD]"
              }`}
            >
              {topic.topic}
            </button>
          ))}
        </div>
        <div
          className={`md:w-[53.5%] ${groteskText.className} border py-4 px-3 rounded-[16px] text-black text-[16px]`}
        >
          <p
            className="underline text-blue-600 cursor-pointer"
            onClick={openEducationalMaterials}
          >
            {TopicList.find((topic) => topic.id === selected)?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationalMaterials;
