import { defineStyleConfig, extendTheme, ThemeConfig } from "@chakra-ui/react";

const colorsTheme = {
  gray: {
    200: "#EAEDEF",
  },
  blue: {
    800: "#111A31",
    600: "#243a71",
  },
  _dark: {
    gray: {
      200: "#2C2C2C",
    },
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
      _dark: {
        bg: "blue.600",
        _hover: {
          bg: "blue.800",
        },
      },
    },

    toggle: {
      bg: "transparent",
      color: "gray.700",
      border: "1px gray.800 solid",
      _hover: {
        bg: "rgba(0,0,0,0.3)",
      },
      _dark: {
        bg: "transparent",
        color: "orange",
        border: "1px gray.400 solid",
        _hover: {
          bg: "rgba(0,0,0,0.6)",
        },
      },
    },
  },
});

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

export const CustomTheme = extendTheme({
  config,
  components: { Button: buttonTheme },
  colors: colorsTheme,
});
