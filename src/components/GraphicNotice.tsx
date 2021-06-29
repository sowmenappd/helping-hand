import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const GraphicNotice: React.FC<{
  img?: any;
  title?: string;
  subtitle?: string;
}> = (props) => {
  return (
    <Box
      w="full"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      {props.img && <Image src={props.img} boxSize="250px" py={10} />}
      <Heading py={10} textAlign="center">
        {props.title && <Text fontSize="3xl">{props.title}</Text>}
        {props.subtitle && (
          <Text fontSize="lg" fontWeight="thin" pt={3}>
            {props.subtitle}
          </Text>
        )}
      </Heading>
    </Box>
  );
};

export default GraphicNotice;
