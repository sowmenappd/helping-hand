import { Box, Container, Heading } from "@chakra-ui/react";
import React from "react";

const NotFoundNotice = () => {
  return (
    <Container maxW="100%" bg="gray.100" my={6}>
      <Heading textAlign="center" fontSize="5xl">
        Error occured
      </Heading>
    </Container>
  );
};

export default NotFoundNotice;
