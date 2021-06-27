import React, { useEffect, useState } from "react";
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
  Input,
  useBreakpointValue,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoMdClose as CloseIcon, IoMdSend as SendIcon } from "react-icons/io";
import {
  addPostMessage,
  fetchPostMessages,
  hideViewPost,
  usePostsContext,
} from "../store/posts";
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
    fetchPostMessages(post.id, dispatch, token);
  }, [post]);

  const modalSize = useBreakpointValue({
    base: "xs",
    xs: "xs",
    sm: "full",
    md: "full",
  });

  const showTitleInHeader = useBreakpointValue({
    xs: false,
    sm: false,
    md: true,
  });
  if (!post) return null;

  const Title = () => (
    <Heading mt={"20px"} fontSize="4xl" px={2}>
      {post.title}
    </Heading>
  );

  return (
    <Modal
      onClose={() => {
        hideViewPost(dispatch);
      }}
      isOpen={isOpen}
      isCentered
      size={modalSize}
    >
      <ModalOverlay />
      <ModalContent w="full">
        {showTitleInHeader && (
          <ModalHeader w="full">
            <Title />
            <ModalCloseButton size="lg" mt={10} mr={4} />
          </ModalHeader>
        )}
        <ModalBody px={10}>
          <Stack direction="column">
            {!showTitleInHeader && (
              <Box
                w="full"
                h="fit-content"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="40"
              >
                <Title />
                <CloseIcon size={30} onClick={() => hideViewPost(dispatch)} />
              </Box>
            )}
            <Box px={2}>{post.description}</Box>
            <Divider pt={2} orientation="horizontal" />
            <Box
              display="flex"
              w="full"
              justifyContent={
                post.username === username || post.friends
                  ? "flex-end"
                  : "space-between"
              }
              alignItems="flex-start"
              pt={4}
            >
              <MakeFriendsNotice
                hidden={post.username === username || post.friends}
                onMakeFriends={() => {
                  // TODO: add function that adds an entry to connections table with the users
                  // TODO: add a notifications table entry
                }}
              />
              <PostedAtMessage
                datetimeISO={post.datetimeISO}
                hidden={username === post.username ? false : !post.friends}
                username={
                  username === post.username
                    ? "You"
                    : post.friends
                    ? post.username
                    : "Someone"
                }
                onUserPress={() => null}
              />
            </Box>
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
          <ChatPanel
            onClose={() => hideViewPost(dispatch)}
            onSendMessage={(message) => {
              if (message.length < 3 || !post.id || !post.username) return;

              console.log(post.id);
              console.log(post.username);
              console.log(message, "sent");
              addPostMessage(
                post.id,
                post.username,
                username,
                message,
                false,
                dispatch,
                token
              );
              // TODO: add message to post_messages table
            }}
          />
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
    <Text as="code">
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

const MakeFriendsNotice: React.FC<{
  hidden: boolean;
  onMakeFriends: () => void;
}> = (props) => {
  return props.hidden ? null : (
    <Stack display="flex" alignItems="flex-start" justify="center">
      <Heading size={"sm"} maxW="full" pr={2}>
        You're not friends with this person.
      </Heading>
      <Button
        bg="green.100"
        color="green.600"
        size={"sm"}
        onClick={props.onMakeFriends}
      >
        Make friend
      </Button>
    </Stack>
  );
};

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
                  <b>{"@" + owner.toString()}</b>
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

const ChatPanel: React.FC<{
  onSendMessage: (msg: string) => void;
  onClose: () => void;
}> = (props) => {
  const [msg, setMessage] = useState("");

  return (
    <Stack direction={["row"]} w="full">
      <Box w="full">
        <InputGroup>
          <Input
            value={msg}
            onChange={({ currentTarget: { value } }) => setMessage(value)}
            variant="filled"
            placeholder="Send a message..."
          />
          <InputRightElement
            children={<SendIcon color="blue.500" />}
            onClick={() => {
              props.onSendMessage?.(msg.trim());
              setMessage("");
            }}
          />
        </InputGroup>
      </Box>
      <Box>
        <Button colorScheme="red" onClick={props.onClose}>
          Close
        </Button>
      </Box>
    </Stack>
  );
};

export default PostView;
