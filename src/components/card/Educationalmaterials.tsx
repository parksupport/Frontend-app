import { groteskText, groteskTextMedium } from "@/app/fonts";
import { useState } from "react";

const TopicList = [
  {
    id: 1,
    topic: "Driving rules",
    description:
      "Access resources on driving rules, road and driving safety, and rules for different vehicles. Learn key topics like traffic laws, managing violations, and best practices for vehicle and fleet management. ",
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
      <h1
        className={`text-[24px] text-black ${groteskTextMedium.className} mb-4"`}
      >
        Resources
      </h1>

      <div className="md:flex md:gap-8 ">
        {" "}
        <div className="flex flex-wrap text-black  items-start gap-2 mb-4 md:flex-col md:w-[38%]">
          {TopicList.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelect(topic)}
              className={`inline-flex items-center md:justify-start ${
                groteskText.className
              } px-4 py-2 border rounded-[12px] text-[16px] ${
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
            className={` ${groteskText.className} text-[14px]  text-black`}
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
