import React from "react";
import { Stack, Heading, Button } from "@chakra-ui/react";

export const MakeFriendsNotice: React.FC<{
  hidden: boolean;
  onMakeFriends: () => void;
}> = (props) => {
  return props.hidden ? null : (
    <Stack display="flex" alignItems="flex-start" justify="center">
      <Heading size={"sm"} maxW="full" pr={2}>
        You're not friends with this person.
      </Heading>
      <Button
        bg="green.100"
        color="green.600"
        size={"sm"}
        onClick={props.onMakeFriends}
      >
        Make friend
      </Button>
    </Stack>
  );
};

export default MakeFriendsNotice;
