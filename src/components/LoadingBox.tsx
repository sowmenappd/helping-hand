import { Box, LayoutProps, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingBox: React.FC<LayoutProps> = (props) => {
  return (
    <Box
      display="flex"
      w="full"
      h={"md"}
      borderRadius="2xl"
      bg="gray.100"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default LoadingBox;
