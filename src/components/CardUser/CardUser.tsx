import { Button, ButtonGroup } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";

import { DeleteConfirmationDialog } from "@/components/DeleteDialog/DeleteConfirmationDialog";
import { ReactIcons } from "@/components/Icons/Icons";
import { UserFormDrawer } from "@/components/UserFormDrawer/UserFormDrawer";
import { useUsersStore } from "@/state/users";
import { NewUser, User } from "@/types";

type ListItemProps = {
  user: User;
};

export const CardUser = (props: ListItemProps) => {
  const { user } = props;

  const { deleteUser, updateUser } = useUsersStore();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const toast = useToast();

  const COLORS = {
    color: useColorModeValue("gray.600", "gray.300"),
  };

  const handlerDeleteUser = (userId: number) => {
    deleteUser(userId).then(() => {
      onDeleteClose();
      toast({
        title: "User Deleted.",
        description: "We've Deleted the user for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    });
  };

  const handlerUpdateUser = (user: User | NewUser) => {
    if ("id" in user) {
      // handle logic for existing user
      updateUser(user as User).then(() => {
        onUpdateClose();
        toast({
          title: "User Updated.",
          description: "We've updated the user for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, scale: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 1.2 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <Card maxW="sm" mb={10}>
        <CardBody>
          <Flex justify="center">
            <Image
              src={user.avatar}
              alt={`User avatar from ${user.first_name} ${user.last_name}`}
              borderRadius="full"
              boxSize="10em"
            />
          </Flex>
          <Stack mt="6" spacing="3">
            <Stack spacing="1" alignItems="center">
              <Heading
                size="md"
                fontWeight="semibold"
                lineHeight="short"
                mb={2}
              >
                {user.first_name} {user.last_name}
              </Heading>
              <Text color={COLORS.color}>Email: {user.email}</Text>
            </Stack>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="ghost" colorScheme="red" onClick={onDeleteOpen}>
              <Icon as={ReactIcons.Thrash} boxSize={4} mr={2} />
              Delete User
            </Button>

            <Button variant="solid" colorScheme="blue" onClick={onUpdateOpen}>
              Update user
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
      <UserFormDrawer
        isOpen={isUpdateOpen}
        heading={`Update user ${user.first_name}`}
        callToAction="Update"
        user={user}
        onClose={onUpdateClose}
        onSubmit={(user: User | NewUser) => handlerUpdateUser(user)}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteOpen}
        userId={user.id}
        deleteUser={handlerDeleteUser}
        userEmail={user.email}
        onClose={onDeleteClose}
      />
    </motion.div>
  );
};
