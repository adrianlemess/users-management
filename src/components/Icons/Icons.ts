import { chakra } from "@chakra-ui/react";
import {
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
};
