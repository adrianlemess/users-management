import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { ReactIcons } from "../Icons/Icons";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue("gray.800", "orange");
  const borderColor = useColorModeValue("gray.800", "gray.400");
  return (
    <IconButton
      size="lg"
      color={color}
      border="1px solid"
      borderColor={borderColor}
      aria-label={
        colorMode === "light" ? "toggle dark mode" : "toggle light mode"
      }
      icon={colorMode === "light" ? <ReactIcons.Moon /> : <ReactIcons.Sun />}
      onClick={toggleColorMode}
    />
  );
};
