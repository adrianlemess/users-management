import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import Logo from "@/assets/logo.png";
import { ReactIcons } from "@/components/Icons/Icons";
import { useSignIn } from "@/hooks";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  // @TODO handle error
  const { requestStatus, handleSignIn } = useSignIn();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box maxW="sm">
      <Stack mb={4}>
        <Stack
          spacing={4}
          bgColor="white"
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
        >
          <Image src={Logo} marginY={10} mx={5} alt="1Global Logo" />
          <form>
            <Stack spacing={4}>
              <FormControl>
                <InputGroup size="md">
                  <InputLeftElement
                    children={<ReactIcons.Email color="gray.300" />}
                    pointerEvents="none"
                  />
                  <Input
                    autoComplete="email"
                    placeholder="Email address"
                    type="email"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup size="md">
                  <InputLeftElement
                    children={<ReactIcons.Password color="gray.300" />}
                    pointerEvents="none"
                  />
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                isLoading={requestStatus === "pending"}
                loadingText="Signing In"
                variant="bluePrimary"
                textAlign="center"
                borderWidth="1px"
                borderRadius="md"
                my={4}
                overflow="hidden"
                shadow="md"
                type="submit"
                onClick={() =>
                  handleSignIn({
                    email: "eve.holt@reqres.in",
                    password: "pistol",
                  })
                }
              >
                Sign In
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
      <Flex justifyContent="end">
        New to us?{" "}
        <Link color="teal.500" as={ReactRouterLink} to="/signup" ml={2}>
          Sign Up
        </Link>
      </Flex>
    </Box>
  );
}
