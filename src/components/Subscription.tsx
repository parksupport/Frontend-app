"use client";

import React from "react";
import { Button } from "@/components";
import { groteskTextMedium } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore"; // Assume this is your auth store

const SubscriptionPlans = ({ onClick}) => {
  const isAuthenticated = useAuthStore((state) => state.token !== null); // Check authentication status

  const plans = [
    {
      name: "Starter Plan",
      price: "Free",
      features: [
        "Free vehicle check on the website",
        "Details of the contravention",
        "Email notifications",
        "SMS notification",
        "One-time payment per vehicle",
        "Sync to personal calendar",
        "Access to educational materials",
        "Access to customer support",
      ],
      isHighlighted: false,
    },
    {
      name: "Personal Plan",
      price: "£5/month",
      features: [
        "Free vehicle check on the website",
        "Details of the contravention",
        "Email notifications",
        "SMS notification",
        "Number of vehicles to add: 2",
        "Number of nominees per vehicle: 1",
        "Sync to personal calendar",
        "Sync to nominee calendar",
        "Access to educational materials",
        "Access to customer support",
      ],
      isHighlighted: false,
    },
    {
      name: "Family Plan",
      price: "£9/month",
      features: [
        "Designed for families to manage multiple vehicles",
        "Free vehicle check on the website",
        "Details of the contravention",
        "Email notifications",
        "SMS notification",
        "Number of vehicles to add: 5",
        "Number of nominees per vehicle: 3",
        "Sync to personal calendar",
        "Sync to nominee calendar",
        "Access to educational materials",
        "Access to customer support",
      ],
      isHighlighted: false,
    },
    {
      name: "Corporate plan ",
      price: "£15/month",
      features: [
        "Free vehicle check on the website",
        "Details of the contravention",
        "Email notifications",
        "SMS notification",
        "Number of vehicles to add: Unlimited",
        "Vehicle bulk upload",
        "Number of nominees per vehicle: Unlimited",
        "Sync to personal calendar",
        "Sync to nominee calendar",
        "Access to educational materials",
        "Access to customer support",
      ],
      isHighlighted: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-100" id="subscription">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Subscription Plans
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Simple pricing for all your needs.
          </p>
        </div>

        {/* Plans Container */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg shadow-lg overflow-hidden w-full md:w-1/4 transition transform hover:scale-105 hover:cursor-pointer ${
                plan.isHighlighted
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-900"
              }`}
              style={{ minHeight: "450px" }}
            >
              <div className="px-6 py-8 flex flex-col flex-grow">
                {/* Plan Name */}
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>

                {/* Price */}
                <div className="flex items-center mb-6">
                  <p className="text-3xl font-bold mr-4">{plan.price}</p>
                </div>

                {/* Get Started Button */}
                <div className="flex items-center mb-6">
                  <Button
                    onClick={onClick}
                    variant={plan.isHighlighted ? "secondary" : "primary"}
                    className={`px-4 py-2 rounded ${
                      plan.isHighlighted
                        ? "bg-white text-gray-800 hover:bg-gray-200"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  </Button>
                </div>

                {/* Features List */}
                <ul className="mb-8 space-y-3 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className={`h-5 w-5 flex-shrink-0 mr-2 ${
                          plan.isHighlighted ? "text-white" : "text-green-500"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
