"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from '@/lib/tanstack-query/queryClient';
import { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers