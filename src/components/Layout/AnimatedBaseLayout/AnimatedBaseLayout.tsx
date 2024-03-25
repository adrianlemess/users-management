import { Box, Flex } from "@chakra-ui/layout";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

import { RootLayout } from "../RootLayout/RootLayout";

export const AnimatedBaseLayout = () => {
  const { pathname } = useLocation();
  const pageMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { ease: "easeIn", duration: 1 } },
    exit: { opacity: 0, transition: { ease: "easeOut", duration: 0.5 } },
  };

  return (
    <RootLayout>
      <motion.div
        key={pathname}
        animate="animate"
        initial={"initial"}
        variants={pageMotion}
      >
        <Box right={5} top={5} position={"fixed"}>
          <ThemeToggle />
        </Box>

        <Flex alignItems="center" height="100vh">
          <Outlet />
        </Flex>
      </motion.div>
    </RootLayout>
  );
};
