import { Box, Heading } from "@chakra-ui/react";

import { useAuthStore } from "@/state";

export const Dashboard = () => {
  const userSession = useAuthStore(state => state.userSession);

  return (
    <Box>
      <Heading data-testid="title">
        Welcome {userSession?.first_name || userSession?.email || ""}
      </Heading>
    </Box>
  );
};
