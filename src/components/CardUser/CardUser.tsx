import { Button, ButtonGroup } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Divider, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { motion } from "framer-motion";

import { User } from "@/types";

import { ReactIcons } from "../Icons/Icons";

type ListItemProps = {
  user: User;
};

export const CardUser = (props: ListItemProps) => {
  const { user } = props;

  const COLORS = {
    color: useColorModeValue("gray.600", "gray.300"),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, scale: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 1.2 }}
      transition={{ duration: 1, type: "spring" }}
    >
      <Card maxW="sm" mb={10}>
        <CardBody>
          <Flex justify="center">
            <Image
              src={user.avatar}
              alt={`User avatar from ${user.first_name} ${user.last_name}`}
              borderRadius="full"
              boxSize="10em"
            />
          </Flex>
          <Stack mt="6" spacing="3">
            <Stack spacing="1" alignItems="center">
              <Heading
                size="md"
                fontWeight="semibold"
                lineHeight="short"
                mb={2}
              >
                {user.first_name} {user.last_name}
              </Heading>
              <Text color={COLORS.color}>Email: {user.email}</Text>
            </Stack>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="ghost" colorScheme="red">
              <Icon as={ReactIcons.Thrash} boxSize={4} mr={2} />
              Delete User
            </Button>

            <Button variant="solid" colorScheme="blue">
              Update user
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
