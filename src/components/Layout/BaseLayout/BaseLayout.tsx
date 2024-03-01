import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

const BaseLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p="4">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default BaseLayout;
