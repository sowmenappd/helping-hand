import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { getRelativeTimestring } from "../util/time";

export const PostedAtNotice: React.FC<{
  hidden: boolean;
  username?: string;
  datetimeISO: string;
  onUserPress: (username: string) => void;
}> = (props) => (
  <Box px={[1, 4]} display="flex" justifyContent="flex-end" w="full">
    <Text as="code" fontSize={["sm", "initial"]}>
      {!props.hidden ? (
        <Button onClick={() => props.onUserPress?.(props.username || "")}>
          <u>{props.username}</u>
        </Button>
      ) : (
        <Tooltip
          hasArrow
          label="You can only know about someone's identity if they find you helpful"
          bg="blue.400"
          zIndex="modal"
          p={[2, 4]}
          borderRadius="xl"
        >
          <Button>
            <u>Someone</u>
          </Button>
        </Tooltip>
      )}{" "}
      posted this <code> {getRelativeTimestring(props.datetimeISO)} </code>
    </Text>
  </Box>
);

export default PostedAtNotice;
