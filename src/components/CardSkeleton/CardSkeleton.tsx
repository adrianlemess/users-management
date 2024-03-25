import { ButtonGroup } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Divider, Flex, Stack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";

export const CardSkeleton = () => {
  return (
    <Card maxW="sm" mb={10} data-testid="card-skeleton">
      <CardBody>
        <Flex justify="center">
          <SkeletonCircle size="10em" alignSelf={"center"} />
        </Flex>
        <Stack mt="3" spacing="3">
          <Stack spacing="1" alignItems="center">
            <SkeletonText
              mb={2}
              mt={4}
              noOfLines={1}
              spacing="4"
              width={"8em"}
              alignSelf={"center"}
              skeletonHeight="4"
            />

            <SkeletonText
              mb="4"
              noOfLines={1}
              spacing="4"
              width={"15em"}
              alignSelf={"center"}
              skeletonHeight="4"
            />
          </Stack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Skeleton borderRadius="md" height="40px" width="130px" />
          <Skeleton borderRadius="md" height="40px" width="130px" />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
