import { Box, Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user-session");
    navigate("/signin");
  };
  return (
    <Box p={4}>
      <Input placeholder="Search..." mb={4} />
      <Button colorScheme="red" variant="outline" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
