import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header/Header";
import { RootLayout } from "@/components/Layout/RootLayout/RootLayout";

export const BaseLayout = () => {
  return (
    <RootLayout>
      <Header />
      <Box
        minHeight="100vh"
        mt={20}
        pt={10}
        px="4"
        mx="auto"
        overflow={"hidden"}
      >
        <Outlet />
      </Box>
    </RootLayout>
  );
};
