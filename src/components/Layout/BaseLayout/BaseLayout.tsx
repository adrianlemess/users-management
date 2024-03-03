import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../Sidebar/Sidebar";
import { RootLayout } from "../RootLayout/RootLayout";

const BaseLayout = () => {
  return (
    <Flex>
      <RootLayout>
        <Sidebar />
        <Box flex="1" p="4">
          <Outlet />
        </Box>
      </RootLayout>
    </Flex>
  );
};

export default BaseLayout;
