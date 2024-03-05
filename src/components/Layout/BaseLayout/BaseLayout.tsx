import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { Header } from "@/components/Header/Header";
import { RootLayout } from "@/components/Layout/RootLayout/RootLayout";

export const BaseLayout = () => {
  return (
    <RootLayout>
      <Header />
      <Box py={10} h="100%" px="4" overflowX={"hidden"}>
        <Outlet />
      </Box>
    </RootLayout>
  );
};
