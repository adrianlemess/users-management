import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import Logo from "@/assets/logo.png";
import { ReactIcons } from "@/components/Icons/Icons";
import { useSignIn } from "@/hooks";
import { UserSignInInput } from "@/types";
import { SignInSchema } from "@/utils";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // @TODO handle error
  const { requestStatus, error, handleSignIn } = useSignIn();
  const [userSignIn, setUserSignIn] = useState<UserSignInInput | null>(null);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (requestStatus === "rejected") {
      toast({
        title: "An error occurred.",
        description: error?.message || "Unable to sign in. Please try again.",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }

    if (requestStatus === "resolved") {
      navigate("/dashboard", {
        state: userSignIn,
      });
    }
  }, [error, requestStatus, navigate, toast, userSignIn]);

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
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignInSchema}
            onSubmit={values => {
              setUserSignIn(values);
              handleSignIn(values);
            }}
          >
            {() => (
              <Form>
                <Stack spacing={4}>
                  <Field name="email" type="email" label="Email">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ email: string }>;
                    }) => (
                      <FormControl
                        isInvalid={!!form.errors.email && form.touched.email}
                      >
                        <InputGroup size="md">
                          <InputLeftElement
                            children={<ReactIcons.Email color="gray.300" />}
                            pointerEvents="none"
                          />
                          <Input
                            {...field}
                            autoComplete="email"
                            placeholder="Email address"
                            type="email"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" type="password" label="Password">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ password: string }>;
                    }) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.password && !!form.touched.password
                        }
                      >
                        <InputGroup size="md">
                          <InputLeftElement
                            children={<ReactIcons.Password color="gray.300" />}
                            pointerEvents="none"
                          />
                          <Input
                            {...field}
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter password"
                            name="password"
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
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
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
                  >
                    Sign In
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
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
