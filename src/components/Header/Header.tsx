import {
  Button,
  Flex,
  Heading,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/state";

import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const Header = () => {
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
      position={"fixed"}
      align="center"
      top={0}
      justify="space-between"
      wrap={"wrap"}
      p={6}
      w={"100%"}
      zIndex={100}
      borderWidth="1px"
      bg={COLORS.bg}
      color={COLORS.color}
      shadow="md"
    >
      <Heading fontSize={["1em", "2em"]}>User Management</Heading>
      <HStack spacing={5}>
        <ThemeToggle />
        <Button colorScheme="red" variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
    </Flex>
  );
};
