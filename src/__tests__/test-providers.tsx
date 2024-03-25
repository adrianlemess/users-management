import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

type TestWrapperProps = {
  children: React.ReactNode;
};

export const TestWrapper = ({ children }: TestWrapperProps) => (
  <BrowserRouter>
    <ChakraProvider>{children}</ChakraProvider>
  </BrowserRouter>
);
