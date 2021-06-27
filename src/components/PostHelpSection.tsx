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
  HStack,
  Stack,
} from "@chakra-ui/react";

import { BiImageAdd as AddImageIcon } from "react-icons/bi";
import { MdDone as DoneIcon } from "react-icons/md";
import { addPost, POST_TYPE, usePostsContext } from "../store/posts";
import { POST_ACTIONS } from "../store/types";

import PostController from "../controller/posts";
import { useAuthContext } from "../store/auth";
import { PostTypeSelector } from "./HelpPostListings";

const PostHelpSection = () => {
  const [btnVisible, setBtnVisible] = useState(false);

  const [{ token, username, first_name, last_name, imgB64: img }] =
    useAuthContext();
  const [state, dispatch] = usePostsContext();

  const { currentPost, currentPostsType } = state;
  const { title, tags, description } = currentPost;

  const handleTextFocus = (visible: boolean) => {
    setBtnVisible(visible);
    if (visible) {
      dispatch({
        type: POST_ACTIONS.SET_POST_AUTHOR,
        payload: {
          username,
          author: {
            name: first_name + " " + last_name,
            img,
          },
        },
      });
      if (!currentPost.type) {
        dispatch({
          type: POST_ACTIONS.SET_POST_TYPE,
          payload: POST_TYPE.HELP,
        });
      }
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    dispatch({
      type: POST_ACTIONS.EDIT_CURRENT_POST,
      payload: {
        field,
        value,
      },
    });
    dispatch({
      type: POST_ACTIONS.EDIT_CURRENT_POST,
      payload: {
        field: "datetimeISO",
        value: new Date().toISOString(),
      },
    });
  };

  const handleSubmitPost = async () => {
    addPost(currentPost, currentPost.type, token, dispatch);
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
          {!currentPost.type || currentPost.type === POST_TYPE.HELP
            ? "Need help?"
            : "What's on your mind?"}
        </Heading>
        <VStack spacing="4" align="start" px={[2, 2, 8]}>
          <Input
            value={title}
            onChange={(e) => handleFieldChange("title", e.currentTarget.value)}
            borderWidth="2px"
            placeholder="Add a subject"
            onFocus={() => handleTextFocus(true)}
          />
          <Textarea
            value={description}
            onChange={(e) =>
              handleFieldChange("description", e.currentTarget.value)
            }
            borderWidth="2px"
            placeholder="What do you need help with?"
            onFocus={() => handleTextFocus(true)}
          />
          <Input
            value={tags}
            onChange={(e) =>
              handleFieldChange(
                "tags",
                e.currentTarget.value
                  .toString()
                  .split(",")
                  .map((t) => t.trim())
              )
            }
            borderWidth="0px"
            fontSize="larger"
            placeholder="Add tags.."
            onFocus={() => handleTextFocus(true)}
          />
          {btnVisible && (
            <Stack
              direction={["column", "row"]}
              w="100%"
              align="center"
              justify="space-between"
            >
              <Box
                pt={[1, 1]}
                pb={[1, 1]}
                display="flex"
                style={{ transition: ".4s ease-in" }}
              >
                <PostTypeSelector
                  type={currentPost.type}
                  dispatch={(type: string) => {
                    dispatch({
                      type: POST_ACTIONS.EDIT_CURRENT_POST,
                      payload: {
                        field: "type",
                        value: type,
                      },
                    });
                  }}
                />
              </Box>
              <Box
                pt={[1, 4]}
                display="flex"
                style={{ transition: ".4s ease-in" }}
              >
                <PostSectionButtonPanel
                  title={title}
                  description={description}
                  onSubmit={handleSubmitPost}
                />
              </Box>
            </Stack>
          )}
        </VStack>
      </Box>
    </Center>
  );
};

const PostSectionButtonPanel: React.FC<{
  title: string;
  description: string;
  onSubmit: any;
}> = (props) => {
  return (
    <ButtonGroup fontSize={["xl", "5xl"]} spacing={0}>
      <Button
        colorScheme="twitter"
        borderRightRadius="0"
        rounded="3xl"
        borderRightWidth="thin"
        borderRightColor="whiteAlpha.100"
        rightIcon={<DoneIcon size={20} />}
        disabled={props.title?.length < 4 || props.description?.length < 6}
        onClick={props.onSubmit}
      >
        Post
      </Button>
      <Button
        colorScheme="messenger"
        borderLeftRadius="0"
        rightIcon={<AddImageIcon size={20} />}
        disabled={props.title?.length < 4 || props.description?.length < 6}
      >
        Image
      </Button>
    </ButtonGroup>
  );
};

export default PostHelpSection;
