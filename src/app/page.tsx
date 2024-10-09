

import React from "react";
import SignupPage from "./auth/signup/page";
import CardProfile from "@/components/CardProfile";
import CreateProfilePage from "./auth/create-profile/page";

export default function Home() {
  return (
    <main className="justify-center flex flex-col w-full items-center">
      <SignupPage />
     <CreateProfilePage/>

    </main>
  );
}
