import { Box, Heading } from "@chakra-ui/react";

interface DashboardProps {
  msg: string;
}

export default function Dashboard(props: DashboardProps) {
  return (
    <Box>
      <Heading data-testid="title">{props.msg}</Heading>
    </Box>
  );
}
