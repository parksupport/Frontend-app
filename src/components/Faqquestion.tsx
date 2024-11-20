import { groteskText, groteskTextMedium } from "@/app/fonts";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Faq() {
  const faqs = [
    {
      question: "How do I register my vehicle?",
      answers: [
        "To register your vehicle, you can simply visit the registration page and fill out the required details.",
        "You can register your vehicle by entering your vehicle information and uploading the necessary documents.",
        "Go to the registration section on the dashboard, and follow the on-screen instructions to complete your vehicle registration.",
        "Registration can be done through the mobile app or website by providing your vehicle details and proof of ownership.",
        "Simply navigate to the registration page, fill in your vehicle's details, and submit your application.",
      ],
    },
    {
      question: "Can I appeal fines through the platform?",
      answers: [
        "Yes, you can appeal fines directly through the platform by submitting a dispute form.",
        "You can file an appeal for fines by visiting the fines section and clicking on 'Appeal' next to the fine.",
        "Yes, our platform allows you to challenge fines by submitting an appeal request with your supporting evidence.",
        "Appeals for fines can be made online through our platform. Please provide all relevant information for review.",
        "Fines can be contested through the platform. Just click on the 'Appeal' option and follow the steps provided.",
      ],
    },
    {
      question: "What payment options are available?",
      answers: [
        "We accept payments via Credit Cards, Debit Cards, and PayPal.",
        "You can pay using your Credit or Debit card, or choose from various payment providers.",
        "Payments can be made through major Credit and Debit cards, as well as mobile payment options like Apple Pay.",
        "We support multiple payment methods including Credit and Debit cards, PayPal, and bank transfers.",
        "You can pay for services via Credit Cards, Debit Cards, or third-party platforms like Stripe.",
      ],
    },
    {
      question: "What happens if I miss a payment deadline?",
      answers: [
        "If you miss a payment deadline, you may incur additional late fees, and your service may be suspended.",
        "Late payments will attract a penalty, and you will need to pay double the original fee to reinstate your account.",
        "Missing the payment deadline may result in a fine or suspension of services until payment is made.",
        "Failure to make a payment on time could lead to extra charges, and your access to certain features might be restricted.",
        "If you miss a payment, you will be charged a late fee, and you may need to reapply for services.",
      ],
    },
    {
      question: "Can I track multiple vehicles on my account?",
      answers: [
        "Yes, you can track multiple vehicles under one account and manage them easily.",
        "You can add and track as many vehicles as you like from a single account.",
        "Our platform allows users to monitor and manage multiple vehicles simultaneously from their account dashboard.",
        "Yes, the account supports tracking for multiple vehicles. You can add and view them in one place.",
        "You are able to track and manage multiple vehicles under your account for convenience.",
      ],
    },
  ];

  return (
    <div className="bg-[#3957D7]  flex justify-center items-center ">
      <div className="w-full max-w-2xl px-2 md:pb-[81px] pb-7">
        <div className="text-white text-[28px] md:text-[44px] font-bold text-center mt-7 mb-2 md:mt-10">
          Frequently asked questions
        </div>

        <Questions faqs={faqs} />
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
    <div className=" bg-white h-[300px] overflow-y-scroll rounded-[12px] px-2 border">
      <div>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                onClick={() => toggleQuestion(index)}
                className={`${groteskText.className} flex justify-between w-full py-3 md:py-4 text-left text-[14px] text-[#667185] md:text-[18px]`}
              >
                {faq.question}
                <span className="ml-2">
                  {openQuestion === index ? (
                    <FontAwesomeIcon
                      icon={faCaretUp}
                      className="h-3 w-3 text-[#D0D5DD] md:h-5 md:w-5"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className="h-3 w-3 text-[#D0D5DD] md:h-5 md:w-5"
                    />
                  )}
                </span>
              </button>
              {openQuestion === index &&
                faq.answers &&
                faq.answers.length > 0 && (
                  <div className="px-4 text-[14px] md:text-[15px] text-[#98A2B3]">
                    {faq.answers.map((answer, answerIndex) => (
                      <p
                        key={answerIndex}
                        className={` ${groteskText.className} mb-2`}
                      >
                        {answer}
                      </p>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
