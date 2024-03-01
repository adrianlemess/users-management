import { Box, Button, Input } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Box p={4}>
      <Input placeholder="Search..." mb={4} />
      <Button colorScheme="red" variant="outline">
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
