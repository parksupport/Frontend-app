"use client";

import React from "react";
import DrawerHeader from "./DrawerHeader";
import Button from "../Buttons";
import Link from "next/link";
import { educationalMaterials } from "@/data/educationMaterials"; // Adjust the path as necessary
import { groteskTextMedium } from "@/app/fonts";

const EducationalMaterialsDrawer = ({ toggleDrawer }) => {
  return (
    <div className="w-full h-full bg-white p-6 overflow-y-auto">
      {/* Drawer Header */}
      <DrawerHeader
        toggleDrawer={toggleDrawer}
        title="Educational Materials"
        subTitle="Access a wide range of educational resources to better understand contraventions, traffic rules, and how to manage violations effectively."
      />

      {/* Contextual Information */}
      <div className="mt-12 mb-6">
        <p className="text-gray-700">
          Explore the sections below to find helpful resources on safe driving,
          contraventions, and road safety guidelines.
        </p>
      </div>

      {/* Educational Sections */}
      {educationalMaterials.map((material, index) => (
        <div key={index} className="mt-6">
          <h2 className={`${groteskTextMedium.className} text-xl mb-4`}>
            {material.category}
          </h2>
          <ul className="space-y-2">
            {material.topics.map((topic, idx) => (
              <li key={idx}>
                <Link href="#">
                  <span className="text-blue-600 text-base hover:underline">{topic}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      
    </div>
  );
};

export default EducationalMaterialsDrawer;
