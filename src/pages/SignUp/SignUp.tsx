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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import Logo from "@/assets/logo.png";
import { ReactIcons } from "@/components/Icons/Icons";
import { useSignUp } from "@/hooks";
import { useAuthStore } from "@/state";
import { SignUpSchema } from "@/utils";

type ShowPasswordType = "password" | "confirmation_password";

export const SignUp = () => {
  const toast = useToast();
  const { userSession, requestStatus, error, handleSignUp } = useSignUp();
  const { setUserSession } = useAuthStore();
  const navigate = useNavigate();

  const COLORS = {
    bg: useColorModeValue("white", "gray.600"),
    color: useColorModeValue("gray.700", "gray.200"),
    link: useColorModeValue("blue.500", "blue.300"),
    icon: useColorModeValue("gray.500", "gray.300"),
  };

  const [showPassword, setShowPassword] = useState<
    Record<ShowPasswordType, boolean>
  >({
    password: false,
    confirmation_password: false,
  });

  useEffect(() => {
    if (requestStatus === "rejected") {
      toast({
        title: "An error occurred.",
        description: error?.message || "Unable to sign up. Please try again.",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
    if (requestStatus === "resolved" && userSession) {
      setUserSession(userSession);
      navigate("/dashboard");
    }
  }, [error, requestStatus, navigate, toast, userSession, setUserSession]);

  const handleShowPassword = (type: ShowPasswordType) => {
    setShowPassword({
      ...showPassword,
      [type]: !showPassword[type],
    });
  };

  return (
    <Box maxW="sm">
      <Stack mb={4}>
        <Stack
          spacing={4}
          bg={COLORS.bg}
          color={COLORS.color}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          shadow="md"
        >
          <Image src={Logo} marginY="1em" mx={5} alt="User Logo" />
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmation_password: "",
              first_name: "",
              last_name: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={values => {
              // Delete the confirmation_password field before sending the data to the API
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { confirmation_password, ...userSignUpInput } = values;
              handleSignUp(userSignUpInput);
            }}
          >
            {() => (
              <Form>
                <Stack spacing={4}>
                  <Field name="first_name" type="text" label="First Name">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ first_name: string }>;
                    }) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.first_name && !!form.touched.first_name
                        }
                      >
                        <InputGroup size="md">
                          <InputLeftElement
                            children={<ReactIcons.User color={COLORS.icon} />}
                            pointerEvents="none"
                          />
                          <Input
                            {...field}
                            autoComplete="given-name"
                            placeholder="First Name"
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.first_name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="last_name" type="text" label="Last Name">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ last_name: string }>;
                    }) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.last_name && !!form.touched.last_name
                        }
                      >
                        <InputGroup size="md">
                          <InputLeftElement
                            children={<ReactIcons.User color={COLORS.icon} />}
                            pointerEvents="none"
                          />
                          <Input
                            {...field}
                            autoComplete="last-name"
                            placeholder="Last Name"
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.last_name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email" type="email" label="email">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ email: string }>;
                    }) => (
                      <FormControl
                        isInvalid={!!form.errors.email && !!form.touched.email}
                      >
                        <InputGroup size="md">
                          <InputLeftElement
                            children={<ReactIcons.Email color={COLORS.icon} />}
                            pointerEvents="none"
                          />
                          <Input
                            {...field}
                            placeholder="Email address"
                            autoComplete="email"
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" label="Enter Password">
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
                            children={
                              <ReactIcons.Password color={COLORS.icon} />
                            }
                            pointerEvents="none"
                          />
                          <Input
                            {...field}
                            type={showPassword.password ? "text" : "password"}
                            pr="4.5rem"
                            autoComplete="new-password"
                            placeholder="Enter password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              colorScheme="teal"
                              data-testid="show-password-button"
                              variant="outline"
                              onClick={() => handleShowPassword("password")}
                            >
                              {showPassword.password ? "Hide" : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="confirmation_password" label="Confirmation Name">
                    {({
                      field,
                      form,
                    }: {
                      field: FieldInputProps<string>;
                      form: FormikProps<{ confirmation_password: string }>;
                    }) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.confirmation_password &&
                          !!form.touched.confirmation_password
                        }
                      >
                        <InputGroup size="md">
                          <InputLeftElement
                            children={
                              <ReactIcons.Password color={COLORS.icon} />
                            }
                            pointerEvents="none"
                          />
                          <Input
                            {...field}
                            type={
                              showPassword.confirmation_password
                                ? "text"
                                : "password"
                            }
                            autoComplete="new-password"
                            pr="4.5rem"
                            placeholder="Enter confirmation password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              colorScheme="teal"
                              variant="outline"
                              data-testid="show-confirmation-password-button"
                              onClick={() =>
                                handleShowPassword("confirmation_password")
                              }
                            >
                              {showPassword.confirmation_password
                                ? "Hide"
                                : "Show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.confirmation_password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    isLoading={requestStatus === "pending"}
                    loadingText="Signing Up"
                    variant="bluePrimary"
                    textAlign="center"
                    borderWidth="1px"
                    borderRadius="md"
                    my={4}
                    overflow="hidden"
                    shadow="md"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Stack>
      <Flex justifyContent="end">
        Already have an account?{" "}
        <Link color={COLORS.link} as={ReactRouterLink} to="/signin" ml={2}>
          Sign In
        </Link>
      </Flex>
    </Box>
  );
};

export default SignUp;
