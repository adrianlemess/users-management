import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CustomTheme } from "@/style/theme";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

import("./reset.scss").then(() => {
  root.render(
    <StrictMode>
      <ChakraProvider theme={CustomTheme}>
        <App />
      </ChakraProvider>
    </StrictMode>,
  );
});
