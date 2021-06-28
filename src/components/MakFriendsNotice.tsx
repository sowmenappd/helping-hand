import React from "react";
import { Stack, Heading, Button } from "@chakra-ui/react";

export const MakeFriendsNotice: React.FC<{
  onMakeFriends: () => void;
}> = (props) => {
  return (
    <Button
      bg="green.100"
      color="green.600"
      size={"md"}
      onClick={props.onMakeFriends}
    >
      Make friend
    </Button>
  );
};

export default MakeFriendsNotice;
