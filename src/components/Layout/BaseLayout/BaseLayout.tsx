import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Header } from "../../Header/Header";
import { RootLayout } from "../RootLayout/RootLayout";

export const BaseLayout = () => {
  return (
    <RootLayout>
      <Header />
      <Box flex="1" p="4">
        <Outlet />
      </Box>
    </RootLayout>
  );
};
