import { Box, Heading, Image, Button, Text } from "@chakra-ui/react";
import React from "react";

import svg1 from "../images/new_friend.svg";

export const FirstTimeNotice: React.FC<{ onMessageUser: () => void }> = (
  props
) => (
  <Box
    w="full"
    pt={10}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Image src={svg1} boxSize={["130px", "220px", "250px"]} />
    <Heading textAlign="center" px={4} maxW={["sm", "lg", "xl"]}>
      <Text fontSize="3xl">Think you can help?</Text>
      <Text fontSize="xl" fontWeight="normal">
        This person reserves her person right to deny any co-operations you may
        facilitate.
      </Text>
    </Heading>
    <Button
      my={4}
      size="lg"
      bg="green.50"
      color="green.500"
      onClick={props.onMessageUser}
    >
      Message user
    </Button>
  </Box>
);

export default FirstTimeNotice;
