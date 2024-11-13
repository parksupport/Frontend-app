"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import queryClient from "@/lib/tanstack-query/queryClient";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers