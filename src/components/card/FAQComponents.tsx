import React from "react";
import { Questions } from "../Faqquestion";
import { groteskTextMedium } from "@/app/fonts";

const FAQComponents = () => {
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
    <div className="bg-white p-4  md:p-4 rounded-[16px] shadow-md max-w-[396px] sm:max-w-md md:max-w-[680px] w-full">
      <h2 className={`pt-5 text-[30px]  ${groteskTextMedium.className}`}>
        FAQs
      </h2>
      <Questions faqs={faqs} />
    </div>
  );
};

export default FAQComponents;
