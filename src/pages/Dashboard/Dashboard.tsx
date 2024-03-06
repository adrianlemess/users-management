import { Box, Flex, Heading, Stack, WrapItem } from "@chakra-ui/layout";
import { Button, Icon, Skeleton, useDisclosure, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";

import { CardSkeleton } from "@/components/CardSkeleton/CardSkeleton";
import { CardUser } from "@/components/CardUser/CardUser";
import { ReactIcons } from "@/components/Icons/Icons";
import { PaginationControl } from "@/components/PaginationControl/PaginationControl";
import { UserFormDrawer } from "@/components/UserFormDrawer/UserFormDrawer";
import { ITEMS_PER_PAGE } from "@/constants";
import { useAuthStore } from "@/state";
import { useUsersStore } from "@/state/users";
import { NewUser, User } from "@/types";

export const Dashboard = () => {
  const {
    getInitialUsers,
    changePage,
    createUser,
    requestStatus,
    users,
    pagination,
  } = useUsersStore();

  // Hook to control the modal form for updating an user
  const userSession = useAuthStore(state => state.userSession);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getInitialUsers(1, ITEMS_PER_PAGE);
  }, [getInitialUsers]);

  const handlerCreateUser = async (user: NewUser) => {
    createUser({ ...user });
    onClose();
  };

  return (
    <Stack>
      <Heading mb={10} data-testid="title">
        Welcome {userSession?.first_name || userSession?.email}
      </Heading>

      {requestStatus === "rejected" ? (
        <Flex w={"100%"} justify="space-between" wrap={"wrap"}>
          <Heading>Something went wrong</Heading>
        </Flex>
      ) : (
        <>
          {requestStatus === "pending" ? (
            <>
              {/* Create button skeleton */}
              <Wrap justify="center" mb={5}>
                <Skeleton h={10} w={"200px"} borderRadius="md" />
              </Wrap>
              <Flex
                w={"100%"}
                maxW={"1200px"}
                justify="space-between"
                wrap={"wrap"}
              >
                <Wrap maxW={"1200px"} minH="64vh">
                  {Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
                    <WrapItem
                      key={i}
                      flex={["1 1 100%", "1 1 32%"]}
                      justifyContent={"center"}
                    >
                      <CardSkeleton />
                    </WrapItem>
                  ))}
                  {
                    <Flex w={"100%"} justify="center" mt={10}>
                      <Skeleton h={10} w={40} borderRadius="md" />
                    </Flex>
                  }
                </Wrap>
              </Flex>
            </>
          ) : (
            // If there is no user in the list, show a message to create a new user
            <>
              <Wrap justify="center" mb={5}>
                <Button colorScheme="green" onClick={onOpen}>
                  <Icon as={ReactIcons.Add} w={6} h={6} mr={2} />
                  Create a new user
                </Button>
              </Wrap>
              {users.length === 0 && (
                <Box maxW={"1200px"} mt={10}>
                  <Heading textAlign="center" size="md">
                    There are no users, create a new one
                  </Heading>
                </Box>
              )}
              <Wrap maxW={"1200px"} minH="64vh" overflow={"hidden"} spacing={0}>
                {users.map((user: User) => (
                  <WrapItem
                    key={user.id}
                    flex={["1 1 100%", "1 1 32%"]}
                    justifyContent={"center"}
                  >
                    <CardUser user={user} />
                  </WrapItem>
                ))}
              </Wrap>
            </>
          )}
          <Flex mt={5} mb={5} justify="center">
            <PaginationControl
              disabled={requestStatus === "pending"}
              totalPages={pagination.total_pages}
              itemsPerPage={pagination.per_page}
              initialPage={pagination.page}
              onPageChange={changePage}
            />
          </Flex>
          <UserFormDrawer
            isOpen={isOpen}
            heading="Create a new user"
            calToAction="Create"
            onClose={onClose}
            onSubmit={(user: NewUser) => handlerCreateUser(user)}
          />
        </>
      )}
    </Stack>
  );
};
