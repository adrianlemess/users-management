import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";

import { getUsers } from "@/api/users";
import { CardSkeleton } from "@/components/CardSkeleton/CardSkeleton";
import { CardUser } from "@/components/CardUser/CardUser";
import { Pagination, User } from "@/types";

export const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data: Pagination<User>) => {
        setUsers(data.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box>
      <Heading data-testid="title">Welcome to Dashboard</Heading>
      {error ? (
        <Flex w={"100%"} maxW={"1200px"} justify="space-between" wrap={"wrap"}>
          <Heading>Something went wrong</Heading>
        </Flex>
      ) : (
        <>
          {loading ? (
            <Flex
              w={"100%"}
              maxW={"1200px"}
              justify="space-between"
              wrap={"wrap"}
            >
              {new Array(6).fill(<CardSkeleton />)}
            </Flex>
          ) : (
            <Flex
              w={"100%"}
              maxW={"1200px"}
              justify="space-between"
              wrap={"wrap"}
            >
              {users.map((user: User) => (
                <>
                  <CardUser key={user.id} user={user} />
                </>
              ))}
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};
