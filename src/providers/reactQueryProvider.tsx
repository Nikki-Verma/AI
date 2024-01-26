"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  // Provide the client to your App
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
