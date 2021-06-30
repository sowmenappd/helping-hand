import React from "react";
import { VStack, Box, Heading } from "@chakra-ui/react";

const NotificationsPage = () => {
  return (
    <VStack spacing={4} alignItems="flex-start">
      <Box w={["full", "full", "full", "2xl", "4xl"]}>
        <Heading as="h1" fontSize={["4xl", "6xl"]}>
          <span
            style={{
              color: "#272727",
              opacity: 0.15,
              paddingLeft: 20,
              paddingRight: 10,
            }}
          >
            <b>#</b>
          </span>
          Notifications
        </Heading>
      </Box>
    </VStack>
  );
};

export default NotificationsPage;
