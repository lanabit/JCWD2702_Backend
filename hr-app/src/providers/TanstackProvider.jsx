"use client";
import { QueryClient, QueryClientProvider } from "react-query";

const queryCLient = new QueryClient();

export default function TanstackProvider({ children }) {
  return (
    <QueryClientProvider client={queryCLient}>{children}</QueryClientProvider>
  );
}