import {
  Stack,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { IoMdSend as SendIcon } from "react-icons/io";

export const ChatPanel: React.FC<{
  onSendMessage: (msg: string) => void;
  onClose: () => void;
  disabled: boolean;
}> = (props) => {
  const [msg, setMessage] = useState("");

  return (
    <Stack direction={["row"]} w="full">
      <Box w="full">
        <InputGroup>
          <Input
            value={msg}
            onChange={({ currentTarget: { value } }) => setMessage(value)}
            variant="filled"
            placeholder="Send a message..."
            isDisabled={props.disabled}
          />
          <InputRightElement
            children={<SendIcon color="blue.500" />}
            onClick={() => {
              props.onSendMessage?.(msg.trim());
              setMessage("");
            }}
          />
        </InputGroup>
      </Box>
      <Box>
        <Button colorScheme="red" onClick={props.onClose}>
          Close
        </Button>
      </Box>
    </Stack>
  );
};

export default ChatPanel;
