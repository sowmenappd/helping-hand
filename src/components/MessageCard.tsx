import { VStack, Stack, Heading, Box, Divider, Button } from "@chakra-ui/react";
import React from "react";
import { getRelativeTimestring } from "../util/time";

const MessageCard: React.FC<{
  id: string;
  datetimeISO: string;
  username: string;
  title: string;
  description: string;
  onViewPost: (id: string) => void;
}> = (props) => {
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
        <Heading w="full" fontSize="2xl" noOfLines={5}>
          <Box
            display="flex"
            flexDirection={["column", "row"]}
            justifyContent="space-between"
            alignItems={["flex-end", "baseline"]}
          >
            <li>
              <span style={{ color: "grey" }}>
                <a href="#">{props.username}</a>
              </span>
            </li>
            <Heading fontSize="lg" fontWeight="light" pr={3} color="gray.500">
              <li>{getRelativeTimestring(props.datetimeISO)}</li>
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
              {props.title}
            </Heading>
            <Divider />
            <code style={{ paddingTop: 20 }}>{props.description}</code>
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
        <Button
          size="md"
          colorScheme="green"
          isFullWidth
          color="white"
          onClick={() => props.onViewPost?.(props.id)}
        >
          View post
        </Button>
      </Box>
    </VStack>
  );
};

export default MessageCard;
