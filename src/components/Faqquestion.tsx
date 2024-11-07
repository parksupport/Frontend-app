import { groteskText, groteskTextMedium } from "@/app/fonts";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Faq() {
 

  const faqs = [
    {
      question: "How do I register my vehicle?",
      answer: "A FAQ section is most commonly found on websites.",
    },
    {
      question: "Can I appeal fines through the platform?",
      answer: "yes.",
    },
    {
      question: "What payment options are available?",
      answer: "Credit and Debit.",
    },
    {
      question: "What happens if I miss a payment deadline?",
      answer: "You will pay double the price.",
    },
    {
      question: "Can I track multiple vehicles on my account?",
      answer: "yes.",
    },
  ];

  return (
    <div className="bg-blue-600 flex justify-center items-center ">
      <div className="w-full max-w-2xl px-2 md:pb-[81px] pb-7">
        <div className="text-white text-[28px] md:text-[44px] font-bold text-center mt-7 mb-2 md:mt-10">
          Frequently asked questions
        </div>
        {/* <div className="bg-white  rounded-[12px] px-2 mx-4 shadow-lg">
          <div className="border-b">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 ">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between w-full py-4 text-left text-[14px] font-medium text-[#98A2B3] md:text-[20px]"
                >
                  {faq.question}
                  <span className="ml-2">
                    {openQuestion === index ? (
                      <FontAwesomeIcon
                        icon={faCaretUp}
                        className="h-3 w-3 text-[#98A2B3] md:h-5 w-5"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className="h-3 w-3 text-[#98A2B3] md:h-5 w-5"
                      />
                    )}
                  </span>
                </button>
                {openQuestion === index && (
                  <div className="px-4 text-[14px] md:text-[16px]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}
        <Questions  faqs={faqs}/>
      </div>
    </div>
  );
}


export function Questions({ faqs }) {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  return (
    <div className="bg-white  rounded-[12px] px-2  border ">
    <div className="">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-300 ">
          <button
            onClick={() => toggleQuestion(index)}
            className={`flex justify-between w-full py-3 md:py-4 text-left text-[14px]  text-[#667185] md:text-[18px]  ${groteskText.className}`}
          >
            {faq.question}
            <span className="ml-2">
              {openQuestion === index ? (
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className="h-3 w-3 text-[#D0D5DD] md:h-5 w-5"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="h-3 w-3 text-[#D0D5DD] md:h-5 w-5"
                />
              )}
            </span>
          </button>
          {openQuestion === index && (
            <div className={` px-4 text-[14px] md:text-[15px]   text-[#98A2B3] ${groteskText.className}`}>
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
  )
}