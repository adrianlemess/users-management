import { chakra } from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";

export const ReactIcons = {
  User: chakra(FaUser),
  Password: chakra(FaLock),
  Email: chakra(FaEnvelope),
};
