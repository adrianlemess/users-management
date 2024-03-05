import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, Icon, Skeleton, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";

import { CardSkeleton } from "@/components/CardSkeleton/CardSkeleton";
import { CardUser } from "@/components/CardUser/CardUser";
import { ReactIcons } from "@/components/Icons/Icons";
import { PaginationControl } from "@/components/PaginationControl/PaginationControl";
import { ITEMS_PER_PAGE } from "@/constants";
import { useAuthStore } from "@/state";
import { useUsersStore } from "@/state/users";
import { User } from "@/types";

export const Dashboard = () => {
  const { getUsers, requestStatus, users, pagination } = useUsersStore();

  const userSession = useAuthStore(state => state.userSession);

  useEffect(() => {
    getUsers(1, ITEMS_PER_PAGE);
  }, []);

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
                <Skeleton h={10} w={40} borderRadius="md" />
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
            <>
              <Wrap justify="flex-end" mb={5}>
                <Button colorScheme="green">
                  <Icon as={ReactIcons.Add} w={6} h={6} mr={2} />
                  Create a User
                </Button>
              </Wrap>

              <Flex
                w={"100%"}
                maxW={"1200px"}
                justify="space-between"
                wrap={"wrap"}
              >
                {users.map((user: User) => (
                  <Box key={user.id}>
                    <CardUser user={user} />
                  </Box>
                ))}
              </Flex>
            </>
          )}
          <Flex mt={10} justify="center">
            <PaginationControl
              disabled={requestStatus === "pending"}
              totalPages={pagination.total_pages}
              itemsPerPage={pagination.per_page}
              initialPage={pagination.page}
              onPageChange={getUsers}
            />
          </Flex>
        </>
      )}
    </>
  );
};
