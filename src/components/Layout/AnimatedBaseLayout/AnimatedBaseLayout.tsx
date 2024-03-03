import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const AnimatedBaseLayout = () => {
  const { pathname } = useLocation();
  const pageMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { ease: "easeIn", duration: 1 } },
    exit: { opacity: 0, transition: { ease: "easeOut", duration: 0.5 } },
  };
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <motion.div
        key={pathname}
        animate="animate"
        initial={"initial"}
        variants={pageMotion}
      >
        <Outlet />
      </motion.div>
    </Flex>
  );
};

export default AnimatedBaseLayout;
