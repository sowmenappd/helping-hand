import React from "react";
import { Link } from "react-router-dom";
import { VStack, Box, Heading, Divider, Stack } from "@chakra-ui/react";
import { IoMdClose as CloseIcon } from "react-icons/io";

import PostedAtNotice from "../components/PostedAtNotice";
import MessageStack from "../components/MessageStack";
import ChatPanel from "../components/ChatPanel";
import MakeFriendsNotice from "../components/MakFriendsNotice";
import FirstTimeNotice from "../components/FirstTimeNotice";

import { useAuthContext } from "../store/auth";
import { addPostMessage, hideViewPost, usePostsContext } from "../store/posts";

const PostPage: React.FC<{
  isOpen?: boolean;
  post?: any;
  onOpen?: () => void;
  onClose?: () => void;
}> = () => {
  const [{ username, token }] = useAuthContext();
  const [{ viewPost: post, messages }, dispatch] = usePostsContext();

  const handleMessageUser = (msg: string, firsTime: boolean) => {
    console.log(post.id);
    addPostMessage(
      post.id,
      post.username,
      username,
      msg,
      firsTime,
      dispatch,
      token
    );
  };

  return (
    <VStack spacing={4} alignItems="flex-start">
      <Box
        w={["100%", "100%", "100%", "100%", "4xl"]}
        maxW={["xl", "xl", "xl", "2xl", "4xl"]}
      >
        <Box
          w="full"
          h="fit-content"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
            {post.title}
          </Heading>
          <Link to={"/home"}>
            <CloseIcon size={30} />
          </Link>
        </Box>
        <Stack
          direction="column"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          h="full"
        >
          <Box>
            <Box pt={2} pl={5} pr={1}>
              <Heading fontSize="2xl">{post.description}</Heading>
            </Box>
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
                hidden={post.username === username || post.friends} // TODO: right now all messages from people to a certain person will appear at once for the post owner, need to group them and use a select dropdown to show a specific person's reply
                onMakeFriends={() => {
                  // TODO: add function that adds an entry to connections table with the users
                  // addFriend(username);
                  // TODO: add a notifications table entry
                }}
              />
              <PostedAtNotice
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
                  onMessageUser={() =>
                    handleMessageUser(
                      "Hello there, I think I might be able to help you!",
                      true
                    )
                  }
                />
              ) : (
                <MessageStack
                  isConnected={post.friends}
                  username={username}
                  messages={messages.data}
                />
              ))}
          </Box>

          <Box w="full">
            <ChatPanel
              onClose={() => hideViewPost(dispatch)}
              onSendMessage={(message) => {
                if (message.length < 3 || !post.id || !post.username) return;
                console.log(post.id, post.username, message, "sent");
                handleMessageUser(message, false);
              }}
            />
          </Box>
        </Stack>
      </Box>
    </VStack>
  );
};

export default PostPage;
