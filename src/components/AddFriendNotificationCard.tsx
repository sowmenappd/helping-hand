import React from "react";
import { VStack, Box, Heading, Stack, Button } from "@chakra-ui/react";
import { getRelativeTimestring } from "../util/time";

const AddFriendNotificationCard: React.FC<{
  id: string;
  read: boolean;
  content: any;
  onRead: (id: string) => void;
}> = (props) => {
  const { id, read, content } = props;
  return (
    <VStack>
      <Box
        display="flex"
        flexDir={["column", "row"]}
        justifyContent="space-between"
        alignItems={["flex-end", "center"]}
        maxH="full"
        w="full"
      >
        <Heading fontSize="2xl">
          <li>
            <span style={{ color: "grey" }}>
              <a href="#">{content.sentFrom}</a>
            </span>{" "}
            added you as a friend!
          </li>
        </Heading>
        <Heading fontSize="lg" fontWeight="light" pr={3} color="gray.500">
          {getRelativeTimestring(content.time)}
        </Heading>
      </Box>
      <Stack
        display="flex"
        flexDir="column"
        alignItems="flex-end"
        h="50px"
        w="100%"
      >
        <Button
          size="md"
          w={["fit-content", "150px"]}
          colorScheme="messenger"
          bg="blue.300"
          onClick={() => props.onRead(id)}
        >
          {read ? "Notification read" : "Mark as read"}
        </Button>
      </Stack>
    </VStack>
  );
};

export default AddFriendNotificationCard;
