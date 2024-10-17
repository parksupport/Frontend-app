import React, { useState } from "react";

export default function Faq() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

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
      <div className="w-full max-w-2xl px-2 pb-7">
        <div className="text-white text-[28px] md:text-[44px] font-bold text-center mt-7 mb-2">
          Frequently asked questions
        </div>
        <div className="bg-white  rounded-[12px] px-2 mx-4 shadow-lg">
          <div className="border-b">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 ">
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between w-full py-4 text-left text-[14px] font-medium text-[#98A2B3]"
                >
                  {faq.question}
                  <span>{openQuestion === index ? "▲" : "▼"}</span>
                </button>
                {openQuestion === index && (
                  <div className="px-4 text-[14px]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
