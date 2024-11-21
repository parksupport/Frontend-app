import { groteskText, groteskTextMedium } from "@/app/fonts";
import { MoveDiagonal } from "lucide-react";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import TruncatedText from "../ToggleComponent/TruncatedText";

const TopicList = [
  {
    id: 1,
    topic: "Driving rules",
    description: [
      "Access resources on driving rules and regulations.",
      "Learn about traffic laws applicable in different regions.",
      "Understand the consequences of traffic violations.",
      "Discover best practices for vehicle and fleet management.",
    ],
  },
  {
    id: 2,
    topic: "Road and driving safety",
    description: [
      "Understand the importance of road safety measures.",
      "Learn defensive driving techniques.",
      "Explore tips for ensuring pedestrian safety.",
      "Understand the impact of weather conditions on driving.",
      "Understand the importance of road safety measures.",
      "Learn defensive driving techniques.",
      "Explore tips for ensuring pedestrian safety.",
      "Understand the impact of weather conditions on driving.",
      "Understand the importance of road safety measures.",
      "Learn defensive driving techniques.",
      "Explore tips for ensuring pedestrian safety.",
      "Understand the impact of weather conditions on driving.",
    ],
  },
  {
    id: 3,
    topic: "Rules for different vehicles",
    description: [
      "Learn about regulations for motorcycles and scooters.",
      "Understand the safety standards for heavy vehicles.",
      "Discover guidelines for electric and hybrid vehicles.",
      "Explore rules for bicycles and non-motorized vehicles.",
    ],
  },
  {
    id: 4,
    topic: "Traffic signs and signals",
    description: [
      "Learn to interpret various traffic signs.",
      "Understand the meaning of road markings.",
      "Get familiar with traffic light rules.",
      "Discover how to identify and respond to warning signs.",
    ],
  },
  {
    id: 5,
    topic: "Accident prevention and response",
    description: [
      "Learn strategies to avoid road accidents.",
      "Understand the importance of vehicle maintenance for safety.",
      "Explore steps to take immediately after an accident.",
      "Discover resources for emergency response training.",
    ],
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
    <div className="bg-white p-6  md:p-4 rounded-[16px] shadow-md max-w-[396px] md:h-[360px] sm:max-w-md md:max-w-[680px] w-full">
      <div className="flex items-center justify-between">
        <h1
          className={`text-[24px] md:text-[32px] text-black ${groteskTextMedium.className} mb-4"`}
        >
          Resources
        </h1>
        <MoveDiagonal
          size={24}
          onClick={openEducationalMaterials}
          className="cursor-pointer"
        />
      </div>

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
  className={`overflow-y-auto h-[300px] md:w-[53.5%] ${groteskText.className} border py-4 px-3 rounded-[16px] text-black text-[16px]`}
>
  {TopicList.find((topic) => topic.id === selected)?.description.map(
    (desc, index) => (
      <p
        key={index}
        className={`flex items-center gap-2 ${groteskText.className} text-[14px] text-black cursor-pointer underline py-1`}
        onClick={() => console.log(desc)}
      >
        <FiExternalLink size={16} />
        <TruncatedText text={desc} maxLength={40} showFullOnHover={false}  className={`${groteskText.className} text-[14px]`}/>
      </p>
    )
  )}
</div>

      </div>
    </div>
  );
};

export default EducationalMaterials;
