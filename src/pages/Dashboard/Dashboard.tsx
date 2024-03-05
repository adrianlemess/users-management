import { Box, Flex, Heading, WrapItem } from "@chakra-ui/layout";
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
    <>
      <Heading mb={10} data-testid="title">
        Welcome {userSession?.first_name || userSession?.email}
      </Heading>

      {requestStatus === "rejected" ? (
        <Flex w={"100%"} maxW={"1200px"} justify="space-between" wrap={"wrap"}>
          <Heading>Something went wrong</Heading>
        </Flex>
      ) : (
        <>
          {requestStatus === "pending" ? (
            <>
              {/* Create button skeleton */}
              <Wrap justify="flex-end" mb={5}>
                <Skeleton h={10} w={"200px"} borderRadius="md" />
              </Wrap>
              <Flex
                w={"100%"}
                maxW={"1200px"}
                justify="space-between"
                wrap={"wrap"}
              >
                {/* Fill with ITEMS_PER_PAGE amount of skeleton cards */}
                {Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
                  <CardSkeleton key={i} />
                ))}
                {/* Pagination Skeleton */}
                {users.length === 0 && (
                  <Flex mt="10" w={"100%"} justify="center">
                    <Skeleton h={10} w={40} borderRadius="md" />
                  </Flex>
                )}
              </Flex>
            </>
          ) : (
            // If there is no user in the list, show a message to create a new user
            <>
              <Wrap justify="flex-end" mb={5}>
                <Button colorScheme="green" onClick={onOpen}>
                  <Icon as={ReactIcons.Add} w={6} h={6} mr={2} />
                  Create a new user
                </Button>
              </Wrap>
              {users.length === 0 && (
                <Box w={"100%"} maxW={"1200px"} mt={10}>
                  <Heading textAlign="center" size="md">
                    There are no users, create a new one
                  </Heading>
                </Box>
              )}
              <Wrap w={"100%"} maxW={"1200px"} spacingX="138px" minH="64vh">
                {users.map((user: User) => (
                  <WrapItem key={user.id}>
                    <CardUser user={user} />
                  </WrapItem>
                ))}
              </Wrap>
            </>
          )}
          <Flex mt={10} justify="center">
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
    </>
  );
};
