"use client";

import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IsAuthProps {
  children: React.ReactNode;
}

const IsAuth = ({ children }: IsAuthProps) => {
  const isAuth = useAuthStore((state) => state.token !== null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  if (!isAuth) {
    // Optionally, you can return a loader here while redirecting
    return null;
  }

  return <>{children}</>;
};

export default IsAuth;
