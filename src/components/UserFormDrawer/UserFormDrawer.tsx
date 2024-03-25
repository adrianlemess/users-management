import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Field, FieldInputProps, Form, Formik, FormikProps } from "formik";

import { NewUser, User } from "@/types";
import { createUpdateUserSchema } from "@/utils";

import { ReactIcons } from "../Icons/Icons";

type UserFormDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser | User) => void;
  callToAction: string;
  user?: User;
  heading: string;
};

export const UserFormDrawer = (props: UserFormDrawerProps) => {
  const { isOpen, onClose, callToAction, onSubmit, user, heading } = props;
  const COLORS = {
    bg: useColorModeValue("white", "gray.600"),
    color: useColorModeValue("gray.700", "gray.200"),
    link: useColorModeValue("blue.500", "blue.300"),
    icon: useColorModeValue("gray.500", "gray.300"),
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <Formik
          initialValues={{
            email: user?.email || "",
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
          }}
          validationSchema={createUpdateUserSchema}
          onSubmit={values => {
            if (user) {
              onSubmit({ id: user.id, ...values });
            }

            onSubmit(values);
          }}
        >
          {() => (
            <Form>
              <DrawerContent data-testid="user-drawer-form">
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">{heading}</DrawerHeader>
                <DrawerBody mt={10}>
                  <Stack spacing="24px">
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
                              !!form.errors.first_name &&
                              !!form.touched.first_name
                            }
                          >
                            <InputGroup size="md">
                              <InputLeftElement
                                children={
                                  <ReactIcons.User color={COLORS.icon} />
                                }
                                pointerEvents="none"
                              />
                              <Input
                                {...field}
                                data-testid={
                                  "input-first-name-" + user?.first_name
                                }
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
                              !!form.errors.last_name &&
                              !!form.touched.last_name
                            }
                          >
                            <InputGroup size="md">
                              <InputLeftElement
                                children={
                                  <ReactIcons.User color={COLORS.icon} />
                                }
                                pointerEvents="none"
                              />
                              <Input
                                {...field}
                                data-testid={
                                  "input-last-name-" + user?.last_name
                                }
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
                            isInvalid={
                              !!form.errors.email && !!form.touched.email
                            }
                          >
                            <InputGroup size="md">
                              <InputLeftElement
                                children={
                                  <ReactIcons.Email color={COLORS.icon} />
                                }
                                pointerEvents="none"
                              />
                              <Input
                                {...field}
                                data-testid={"input-email-" + user?.email}
                                placeholder="Email address"
                                autoComplete="email"
                              />
                            </InputGroup>
                            <FormErrorMessage>
                              {form.errors.email}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Stack>
                  </Stack>
                </DrawerBody>

                <DrawerFooter borderTopWidth="1px">
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="blue"
                    data-testid={`button-${callToAction.toLocaleLowerCase()}`}
                    type="submit"
                  >
                    {callToAction}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
};
