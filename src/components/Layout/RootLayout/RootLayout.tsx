import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";

type RootLayoutProps = {
  children: React.ReactNode;
};
export const RootLayout = ({ children }: RootLayoutProps) => {
  const bg = useColorModeValue("gray.200", "gray.800");

  return (
    <>
      <Flex
        flexDirection="column"
        minHeight="100vh"
        width="full"
        backgroundColor={bg}
        overflowX={"hidden"}
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </>
  );
};
