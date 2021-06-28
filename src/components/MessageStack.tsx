import { Box, Divider } from "@chakra-ui/react";
import React from "react";

export const MessageStack: React.FC<{
  isConnected: boolean;
  messages: any[];
  username: string;
}> = ({ isConnected, messages, username }) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      py={[2]}
      px={[1, 5]}
      h="xl"
      overflowY="scroll"
    >
      <Divider my={"4"} />
      {messages?.map(({ owner, message }) => (
        <Box
          key={message.id}
          w="full"
          display="flex"
          h="fit-content"
          justifyContent={username === owner ? "flex-end" : "flex-start"}
          my={2}
        >
          <Box
            bg="gray.100"
            rounded="3xl"
            flexDir={"row-reverse"}
            maxW={["xs", "sm", "md", "xl"]}
            w={"fit-content"}
            p={3}
            px={4}
          >
            {
              <>
                <div
                  style={{
                    padding: 0,
                    margin: 0,
                    textAlign: username === owner ? "right" : "left",
                  }}
                >
                  <b>
                    {username === owner || isConnected
                      ? "@" + owner.toString()
                      : "postee"}
                  </b>
                  <br />
                </div>
                <p style={{ paddingLeft: 5 }}>{" " + message}</p>
              </>
            }
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MessageStack;