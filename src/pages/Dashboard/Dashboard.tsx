import { Box, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { USER_SESSION_KEY } from "@/constants";

export default function Dashboard() {
  const { state } = useLocation();
  let user = state?.first_name || state?.email;
  if (!user) {
    // grab user from local storage
    const userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY) || "{}");
    user = userData?.first_name || userData?.email;
  }
  return (
    <Box>
      <Heading data-testid="title">Welcome {user}</Heading>
    </Box>
  );
}
