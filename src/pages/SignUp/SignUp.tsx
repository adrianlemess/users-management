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

type ShowPasswordType = "password" | "confirmationPassword";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<
    Record<ShowPasswordType, boolean>
  >({
    password: false,
    confirmationPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const handleShowPassword = (type: ShowPasswordType) => {
    setShowPassword({
      ...showPassword,
      [type]: !showPassword[type],
    });
  };

  const handleSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
                    children={<ReactIcons.User color="gray.300" />}
                    pointerEvents="none"
                  />
                  <Input
                    autoComplete="given-name"
                    placeholder="Name"
                    name="first-name"
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup size="md">
                  <InputLeftElement
                    children={<ReactIcons.User color="gray.300" />}
                    pointerEvents="none"
                  />
                  <Input
                    autoComplete="last-name"
                    placeholder="Last Name"
                    type="text"
                    name="last-name"
                  />
                </InputGroup>
              </FormControl>
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
                    name="email"
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
                    autoComplete="new-password"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Enter password"
                    name="password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => handleShowPassword("password")}
                    >
                      {showPassword.password ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
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
                    autoComplete="new-password"
                    name="confirmation-password"
                    type={
                      showPassword.confirmationPassword ? "text" : "password"
                    }
                    placeholder="Retype password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      onClick={() => handleShowPassword("confirmationPassword")}
                    >
                      {showPassword.confirmationPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                isLoading={loading}
                loadingText="Signing Up"
                variant="bluePrimary"
                textAlign="center"
                borderWidth="1px"
                borderRadius="md"
                my={4}
                overflow="hidden"
                shadow="md"
                onClick={handleSignUp}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Stack>
      </Stack>
      <Flex justifyContent="end">
        Already have an account?{" "}
        <Link color="teal.500" as={ReactRouterLink} to="/signin" ml={2}>
          Sign In
        </Link>
      </Flex>
    </Box>
  );
}
