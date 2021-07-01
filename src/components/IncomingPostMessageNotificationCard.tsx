import React from "react";
import { VStack, Box, Heading, Stack, Button, Divider } from "@chakra-ui/react";
import { getRelativeTimestring } from "../util/time";

const IncomingPostMessageNotificationCard: React.FC<{
  id: string;
  read: boolean;
  content: any;
  onRead: (id: string) => void;
  onViewMessage: (postId: string) => void;
}> = (props) => {
  const { id, read, content } = props;
  return (
    <VStack>
      <Stack
        display="flex"
        flexDir={["column", "row"]}
        justifyContent={["center", "space-between"]}
        alignItems={["flex-end", "center"]}
        maxH="fit-content"
        h="full"
        w="full"
      >
        <Heading w="full" fontSize="2xl" noOfLines={4}>
          <Box
            display="flex"
            flexDirection={["column", "row"]}
            justifyContent="space-between"
            alignItems={["flex-end", "baseline"]}
          >
            <li>
              <span style={{ color: "grey" }}>
                <a href="#">{content.sentFrom}</a>
              </span>{" "}
              sent you a message
            </li>
            <Heading fontSize="lg" fontWeight="light" pr={3} color="gray.500">
              <li>{getRelativeTimestring(content.time)}</li>
            </Heading>
          </Box>
          <Stack
            mt={3}
            mb={2}
            mx={[3, 6]}
            direction="column"
            justifyContent="flex-start"
            spacing={1}
            py={5}
            px={[2, 7]}
            bg="whiteAlpha.700"
            borderRadius="2xl"
          >
            <Heading mb={2} as="h5">
              {content.postTitle}
            </Heading>
            <Divider />
            <code style={{ paddingTop: 20 }}>{content.message}</code>
          </Stack>
        </Heading>
      </Stack>
      <Box
        display="flex"
        w="full"
        flexDirection={["column", "row"]}
        justifyContent={["center", "flex-end"]}
        alignItems="flex-end"
        px={[3, 6]}
      >
        {/* <Button
          size="md"
          colorScheme="green"
          isFullWidth
          color="white"
          onClick={() => props.onViewMessage?.(props.content.postId)}
        >
          View message
        </Button> */}
        <Button
          size="md"
          isFullWidth
          colorScheme="messenger"
          ml={3}
          mt={[2, 0]}
          onClick={() => props.onRead(id)}
        >
          {read ? "Notification read" : "Mark as read"}
        </Button>
      </Box>
    </VStack>
  );
};

export default IncomingPostMessageNotificationCard;
