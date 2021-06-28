import React from "react";
import { Button } from "@chakra-ui/react";

export const MakeFriendsNotice: React.FC<{
  onMakeFriends: (username: string) => void;
}> = (props) => {
  return (
    <Button
      bg="green.100"
      color="green.600"
      size={"md"}
      onClick={() => props.onMakeFriends?.("")}
    >
      Make friend
    </Button>
  );
};

export default MakeFriendsNotice;
