import { IconButton, useColorMode } from "@chakra-ui/react";

import { ReactIcons } from "../Icons/Icons";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      size="lg"
      variant={"toggle"}
      aria-label={
        colorMode === "light" ? "toggle dark mode" : "toggle light mode"
      }
      icon={colorMode === "light" ? <ReactIcons.Moon /> : <ReactIcons.Sun />}
      onClick={toggleColorMode}
    />
  );
};
