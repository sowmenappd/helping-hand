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
import {
  addPostMessage,
  fetchPostMesssages,
  usePostsContext,
} from "../store/posts";
import { POST_ACTIONS } from "../store/types";
import { getRelativeTimestring } from "../util/time";

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
    fetchPostMesssages(post.id, dispatch, token);
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
              hidden={username === post.username ? false : !post.friends}
              username={post.friends ? post.username : "Someone"}
              onUserPress={() => null}
            />
            {!messages.loading &&
              (messages.data.length == 0 ? (
                <FirstTimeNotice
                  onMessageUser={() => {
                    console.log(post.id);
                    const firstMsg =
                      "Hello there, I think I might be able to help you!";
                    addPostMessage(
                      post.id,
                      post.username,
                      username,
                      firstMsg,
                      true,
                      dispatch,
                      token
                    );
                  }}
                />
              ) : (
                <MessageStack username={username} messages={messages.data} />
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
  hidden: boolean;
  username?: string;
  datetimeISO: string;
  onUserPress: (username: string) => void;
}> = (props) => (
  <Box px={4} display="flex" justifyContent="flex-end">
    <Text as="code" pt={6}>
      {!props.hidden ? (
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

const MessageStack: React.FC<{ messages: any[]; username: string }> = ({
  messages,
  username,
}) => {
  return (
    <Box display="flex" flexDir="column" py={[2]} px={[1, 5]} h="xl">
      <Divider my={"4"} />
      {messages?.map(({ owner, message }) => (
        <Box
          key={message.id}
          w="full"
          display="flex"
          h="fit-content"
          justifyContent={username === owner ? "flex-end" : "flex-start"}
        >
          <Box
            bg="gray.100"
            rounded="3xl"
            flexDir={"row-reverse"}
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
