import { chakra } from "@chakra-ui/react";
import {
  MdAdd,
  MdDelete,
  MdEmail,
  MdNightsStay,
  MdOutlineWbSunny,
  MdPassword,
  MdPerson,
} from "react-icons/md";

export const ReactIcons = {
  User: chakra(MdPerson),
  Password: chakra(MdPassword),
  Email: chakra(MdEmail),
  Sun: chakra(MdOutlineWbSunny),
  Moon: chakra(MdNightsStay),
  Thrash: chakra(MdDelete),
  Add: chakra(MdAdd),
};
