import { MyCard } from "@/components/Card";
import { CarouselDemo } from "@/components/Carousel";
import { Card as UiCard } from "@/components/ui/card";

import React from "react";
import SignupPage from "./signup/page";

export default function Home() {
  return (
    <main className="justify-center flex flex-col w-full items-center">
      <SignupPage />
      <UiCard />
      <MyCard />
      <CarouselDemo />
    </main>
  );
}
