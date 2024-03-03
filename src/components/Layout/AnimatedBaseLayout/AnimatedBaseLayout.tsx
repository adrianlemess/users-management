import { Flex, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import { RootLayout } from "../RootLayout/RootLayout";

const AnimatedBaseLayout = () => {
  const { pathname } = useLocation();
  const pageMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { ease: "easeIn", duration: 1 } },
    exit: { opacity: 0, transition: { ease: "easeOut", duration: 0.5 } },
  };

  const bg = useColorModeValue("gray.200", "gray.800");

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor={bg}
      justifyContent="center"
      alignItems="center"
    >
      <RootLayout>
        <motion.div
          key={pathname}
          animate="animate"
          initial={"initial"}
          variants={pageMotion}
        >
          <Outlet />
        </motion.div>
      </RootLayout>
    </Flex>
  );
};

export default AnimatedBaseLayout;
