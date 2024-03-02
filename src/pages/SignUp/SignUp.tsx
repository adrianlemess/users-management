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

type ShowPasswordType = "password" | "retypePassword";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<
    Record<ShowPasswordType, boolean>
  >({
    password: false,
    retypePassword: false,
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
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
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
            <Image
              src={Logo}
              marginY={10}
              mx={5}
              alt="1Global Logo"
              loading="lazy"
            />
            <FormControl>
              <InputGroup size="md">
                <InputLeftElement
                  children={<ReactIcons.User color="gray.300" />}
                  pointerEvents="none"
                />
                <Input placeholder="Name" type="text" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup size="md">
                <InputLeftElement
                  children={<ReactIcons.User color="gray.300" />}
                  pointerEvents="none"
                />
                <Input placeholder="Last Name" type="text" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup size="md">
                <InputLeftElement
                  children={<ReactIcons.Email color="gray.300" />}
                  pointerEvents="none"
                />
                <Input placeholder="Email address" type="email" />
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
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
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
                  type={showPassword.retypePassword ? "text" : "password"}
                  placeholder="Retype password"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => handleShowPassword("retypePassword")}
                  >
                    {showPassword.retypePassword ? "Hide" : "Show"}
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
        </Stack>
        <Flex justifyContent="end">
          Already have an account?{" "}
          <Link color="teal.500" as={ReactRouterLink} to="/signin" ml={2}>
            Sign In
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}
