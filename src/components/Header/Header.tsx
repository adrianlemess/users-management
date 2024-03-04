import { Button, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/state";

import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Header = () => {
  const navigate = useNavigate();
  const { removeUserSession } = useAuthStore();

  const handleLogout = () => {
    removeUserSession();
    navigate("/signin");
  };

  const COLORS = {
    bg: useColorModeValue("teal.200", "teal.800"),
    color: useColorModeValue("gray.700", "gray.200"),
  };

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap={"wrap"}
      p={6}
      w={"100%"}
      borderWidth="1px"
      bg={COLORS.bg}
      color={COLORS.color}
      shadow="md"
    >
      <Heading fontSize={["1em", "2em"]}>User Management</Heading>
      <Button colorScheme="red" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
      <ThemeToggle />
    </Flex>
  );
};

export default Header;
