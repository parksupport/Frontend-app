"use client";

import React, { useState } from "react";
import CardProfile from "@/components/CardProfile";
import TextBlock from "@/components/TextBlock";

export default function CreateProfilePage() {
  const [selectedType, setSelectedType] = useState<"user" | "corporate" | null>(
    null
  );

  const handleCardClick = (type: "user" | "corporate") => {
    setSelectedType(type);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <TextBlock
          header="How are you planning to use Car Alert?"
          content="We’ll streamline your experience accordingly."
        />
      </div>

      <div className="flex space-x-4 pt-10" >
        <CardProfile
          type="user"
          selected={selectedType === "user"}
          onClick={() => handleCardClick("user")}
        />
        <CardProfile
          type="corporate"
          selected={selectedType === "corporate"}
          onClick={() => handleCardClick("corporate")}
        />
      </div>
    </div>
  );
}
