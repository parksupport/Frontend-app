"use client";
import SubscriptionPlans from "@/components/Subscription";
import React from "react";

const page = () => {
  return (
    <div>
      <SubscriptionPlans onClick={() => console.log("subcribed")} />
    </div>
  );
};

export default page;
