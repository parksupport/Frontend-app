"use client";

import React from "react";
import { BaseLayout} from "@/components/ui/baseLayout";
import { LoginComponent } from "@/components/ui/Login";

const LoginFormPage: React.FC = () => {
  return (
    <BaseLayout>
      <LoginComponent />
    </BaseLayout>
  );
};

export default LoginFormPage;

