import React, { useState } from "react";
import {
  Center,
  Box,
  useColorModeValue,
  Heading,
  VStack,
  Input,
  Textarea,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

import { BiImageAdd as AddImageIcon } from "react-icons/bi";
import { MdDone as DoneIcon } from "react-icons/md";

const PostHelpSection = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [btnVisible, setBtnVisible] = useState(false);

  const handleTextFocus = (visible: boolean) => {
    setBtnVisible(visible);
  };

  return (
    <Center w="100%" maxW={["xl", "xl", "3xl", "4xl"]} mb={8} mt={8} p={0}>
      <Box
        p={2}
        pb={6}
        bg={useColorModeValue("white", "gray.700")} //
        boxShadow="md"
        transition=".1s ease-in"
        _hover={{
          boxShadow: "xl",
        }}
        rounded="xl"
        w="100%"
      >
        <Heading
          as="h1"
          fontSize={["4xl", "6xl"]}
          mt={2}
          mb={[4, 4, 8]}
          ml={3}
          noOfLines={1}
        >
          <span style={{ color: "#272727", opacity: 0.15, paddingRight: 10 }}>
            <b>#</b>
          </span>
          Need help?
        </Heading>
        <VStack spacing="4" align="start" px={[2, 2, 8]}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            borderWidth="2px"
            placeholder="Add a subject"
            onFocus={() => handleTextFocus(true)}
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            borderWidth="2px"
            placeholder="What do you need help with?"
            onFocus={() => handleTextFocus(true)}
          />
          {btnVisible && (
            <Box
              w="100%"
              pt={[1, 4]}
              display="flex"
              justifyContent="flex-end"
              style={{ transition: ".4s ease-in" }}
            >
              <ButtonGroup fontSize={["xl", "5xl"]} spacing={0}>
                <Button
                  colorScheme="twitter"
                  borderRightRadius="0"
                  rounded="3xl"
                  borderRightWidth="thin"
                  borderRightColor="whiteAlpha.100"
                  rightIcon={<DoneIcon size={20} />}
                  disabled={title.length < 4 || description.length < 6}
                >
                  Post
                </Button>
                <Button
                  colorScheme="messenger"
                  borderLeftRadius="0"
                  rightIcon={<AddImageIcon size={20} />}
                  disabled={title.length < 4 || description.length < 6}
                >
                  Image
                </Button>
              </ButtonGroup>
            </Box>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

export default PostHelpSection;
