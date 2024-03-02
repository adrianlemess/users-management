import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const colorsTheme = {
  gray: {
    200: "#EAEDEF",
  },
  blue: {
    800: "#111A31",
    600: "#243a71",
  },
};

const buttonTheme = defineStyleConfig({
  variants: {
    bluePrimary: {
      bg: "blue.800",
      color: "white",
      _hover: {
        bg: "blue.600",
      },
    },
  },
});

export const CustomTheme = extendTheme({
  components: { Button: buttonTheme },
  colors: colorsTheme,
});
