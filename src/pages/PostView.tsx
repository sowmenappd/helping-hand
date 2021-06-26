import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Box,
  Stack,
  Text,
  Divider,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import { usePostsContext } from "../store/posts";
import { POST_ACTIONS } from "../store/types";
import { getRelativeTimestring } from "../util/time";
import PostController from "../controller/posts";

import svg1 from "../images/new_friend.svg";
import { useAuthContext } from "../store/auth";

const PostView: React.FC<{
  isOpen: boolean;
  post?: any;
  onOpen?: () => void;
  onClose?: () => void;
}> = (props) => {
  const { isOpen, onOpen, onClose, post } = props;

  const [{ token, username }] = useAuthContext();
  const [{ messages }, dispatch] = usePostsContext();

  useEffect(() => {
    if (!post) return;

    PostController.fetchPostMessages(post.id, token)
      .then(({ data }) => {
        dispatch({
          type: POST_ACTIONS.FETCH_VIEW_POST_MESSAGES_SUCCESS,
          payload: data,
        });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: POST_ACTIONS.FETCH_VIEW_POST_MESSAGES_ERROR,
        });
      });
  }, [post]);
  if (!post) return null;

  return (
    <Modal
      onClose={() => {
        dispatch({
          type: POST_ACTIONS.HIDE_VIEW_POST,
        });
      }}
      isOpen={isOpen}
      isCentered
      size="full"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader px={10}>
          <Heading mt={"50"} fontSize="5xl">
            {post.title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={10}>
          <Stack direction="column">
            <Box>{post.description}</Box>
            <Divider pt={2} orientation="horizontal" />
            <PostedAtMessage
              datetimeISO={post.datetimeISO}
              // username={"sowmenrahman"}
              onUserPress={() => null}
            />
            {!messages.loading &&
              (messages.data.length == 0 ? (
                <FirstTimeNotice
                  onMessageUser={() => {
                    console.log(post.id);
                    PostController.addPostMessage(
                      post.id,
                      "Hello there, I think I might be able to help you!",
                      username,
                      token
                    )
                      .then(() => {
                        dispatch({
                          type: POST_ACTIONS.HIDE_VIEW_POST,
                        });
                      })
                      .catch((err) => console.log(err));
                    // post.id --> postId
                    // message --> "Hello there, I think I might be able to help you!"
                    // owner   --> authstate.username
                  }}
                />
              ) : (
                <MessageStack messages={messages.data} />
              ))}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() =>
              dispatch({
                type: POST_ACTIONS.HIDE_VIEW_POST,
              })
            }
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PostedAtMessage: React.FC<{
  username?: string;
  datetimeISO: string;
  onUserPress: (username: string) => void;
}> = (props) => (
  <Box px={4} display="flex" justifyContent="flex-end">
    <Text as="code" pt={6}>
      {props.username ? (
        <Button onClick={() => props.onUserPress?.(props.username || "")}>
          <u>{props.username}</u>
        </Button>
      ) : (
        <Tooltip
          hasArrow
          label="You can only know about someone's identity if they find you helpful"
          bg="blue.400"
          zIndex="modal"
          p={4}
          borderRadius="xl"
        >
          <Button>
            <u>Someone</u>
          </Button>
        </Tooltip>
      )}{" "}
      posted this <code> {getRelativeTimestring(props.datetimeISO)} </code>
    </Text>
  </Box>
);

const FirstTimeNotice: React.FC<{ onMessageUser: () => void }> = (props) => (
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

const MessageStack: React.FC<{ messages: any[] }> = ({ messages }) => {
  return (
    <Box display="flex" py={[2]} px={[0, 5]}>
      {messages?.map(({ owner, message }) => (
        <Box w="full" display="flex" justifyContent="flex-start">
          <Box
            bg="gray.100"
            rounded="3xl"
            flexDir="row-reverse"
            w="fit-content"
            p={3}
            px={4}
          >
            {
              <>
                <b>{"@" + owner.toString()}</b>
                <br />
                <p style={{ paddingLeft: 5 }}>{" " + message}</p>
              </>
            }
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PostView;
