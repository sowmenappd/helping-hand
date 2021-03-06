import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  VStack,
  Box,
  Heading,
  Divider,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { BsChevronDown as DownArrow } from "react-icons/bs";

import PostedAtNotice from "../components/PostedAtNotice";
import MessageStack from "../components/MessageStack";
import ChatPanel from "../components/ChatPanel";
import MakeFriendsNotice from "../components/MakFriendsNotice";
import FirstTimeNotice from "../components/FirstTimeNotice";

import {
  addFriend,
  addNotification,
  addPostMessage,
  hideViewPost,
  usePostsContext,
} from "../store/posts";

import { useAuthContext } from "../store/auth";
import { NOTIFICATION_TYPES, POST_ACTIONS } from "../store/types";

import noMessagesSvg from "../images/no_messages.svg";
import GraphicNotice from "../components/GraphicNotice";

const isMine = (post: any, username: string): boolean => {
  return post.username === username;
};

const isMyFriendsPost = (post: any): boolean => {
  return post.friends;
};

const hasMessages = (threadOrAllPostsMessage: any): boolean => {
  if (threadOrAllPostsMessage.data)
    return threadOrAllPostsMessage.data?.length > 0;
  return threadOrAllPostsMessage.messages?.length > 0;
};

const PostPage: React.FC = () => {
  let chatWindow = useRef(null) as any;
  const history = useHistory();
  const [{ username, token }] = useAuthContext();
  const [
    { viewPost: post, messages: allMessages, activeMessageThread },
    dispatch,
  ] = usePostsContext();

  const toast = useToast();

  const { messages, user1, user2 } = activeMessageThread;

  useEffect(() => {
    chatWindow.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessageThread]);

  const handleMessageUser = async (msg: string, firsTime: boolean) => {
    const senderUsername = username;
    const replyToUsername = username === user1 ? user2 : user1;
    await addPostMessage(
      post,
      senderUsername,
      replyToUsername,
      msg,
      firsTime,
      dispatch,
      token
    );
    addNotification(
      replyToUsername,
      {
        type: NOTIFICATION_TYPES.INCOMING_POST_MESSAGE_NOTIFICATION,
        content: {
          sentFrom: post.friends ? username : "Someone",
          postTitle: post.title,
          postId: post.id,
          message: msg,
          time: new Date().toISOString(),
        },
      },
      token
    );
  };

  return (
    <VStack spacing={4} alignItems="flex-start" w="full">
      <Box
        w={["full", "full", "full", "2xl", "4xl"]}
        maxW={["full", "full", "full", "2xl", "4xl"]}
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
          w="full"
        >
          <Box>
            <Box pt={2} pl={5} pr={1}>
              <Heading fontSize="2xl">{post.description}</Heading>
            </Box>
            <Divider pt={2} orientation="horizontal" w="full" />
            <Stack
              direction={["column", "row"]}
              display="flex"
              w="full"
              maxW="full"
              justifyContent={
                isMine(post, username) || isMyFriendsPost(post)
                  ? ["", "space-between"]
                  : "flex-end"
              }
              alignItems={["flex-start"]}
              pt={4}
            >
              {isMine(post, username) && (
                <Stack
                  direction={["column", "row"]}
                  align={["flex-start", "center"]}
                  spacing={2}
                >
                  {hasMessages(allMessages) && (
                    <ParticipatingPostUsers
                      post={post}
                      messages={allMessages.data}
                      myUsername={username}
                      token={token}
                    />
                  )}
                  {messages && !messages[0].friends && (
                    <MakeFriendsNotice
                      // TODO: right now all messages from people to a certain person will appear at once for the post owner, need to group them and use a select dropdown to show a specific person's reply
                      onMakeFriends={async () => {
                        const _u = messages[0].owner;
                        console.log(_u);
                        if (!_u) return;
                        // TODO: add function that adds an entry to connections table with the users
                        try {
                          await addFriend(
                            post.username,
                            _u,
                            post,
                            dispatch,
                            token
                          );
                          await addNotification(
                            _u,
                            {
                              type: NOTIFICATION_TYPES.ADD_FRIEND,
                              content: {
                                sentFrom: post.username,
                                time: new Date().toISOString(),
                              },
                            },
                            token
                          );
                          toast({
                            title: "Added to friends list!",
                            description: `You are now friends with ${_u}.`,
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                            position: "top-right",
                          });
                        } catch (err) {
                          toast({
                            title: "Cannot add friend.",
                            description: `Something went wrong. Please try again.`,
                            status: "error",
                            duration: 3000,
                            isClosable: true,
                            position: "top-right",
                          });
                        }
                        // TODO: add a notifications table entry
                      }}
                    />
                  )}
                </Stack>
              )}
              <PostedAtNotice
                datetimeISO={post.datetimeISO}
                hidden={post.hidden}
                username={post.username}
                onUserPress={() => null}
              />
            </Stack>
            {!isMine(post, username) && !hasMessages(activeMessageThread) && (
              <FirstTimeNotice
                onMessageUser={() =>
                  handleMessageUser(
                    "Hello there, I think I might be able to help you!",
                    true
                  )
                }
              />
            )}
            {hasMessages(activeMessageThread) && (
              <MessageStack
                _ref={chatWindow}
                username={username}
                messages={messages}
              />
            )}
          </Box>

          {(isMine(post, username) || hasMessages(activeMessageThread)) && (
            <Box w="full" my={0} p={0}>
              <Divider my={3} bg="gray.700" />
              {hasMessages(activeMessageThread) && (
                <ChatPanel
                  disabled={
                    isMine(post, username)
                      ? false
                      : !post.hidden
                      ? false
                      : messages && messages.length < 2
                  }
                  onClose={() => {
                    setTimeout(() => {
                      hideViewPost(dispatch);
                    }, 50);
                    history.goBack();
                  }}
                  onSendMessage={(message) => {
                    if (
                      (message && message.length < 3) ||
                      !post.id ||
                      !post.username
                    )
                      return;
                    console.log(post.id, post.username, message, "sent");
                    handleMessageUser(message, false);
                  }}
                />
              )}
              {messages && messages.length < 3 && (
                <Text color="gray.600" pl={2} pt={2}>
                  <i>
                    {post.username === username
                      ? "By replying to this message, you are allowing this person to continue on with this conversation."
                      : "The chatbox is only available after the post owner has replied back."}
                  </i>
                </Text>
              )}
            </Box>
          )}
          {isMine(post, username) && !hasMessages(allMessages) && (
            <GraphicNotice
              img={noMessagesSvg}
              title="We can't seem to find any messages yet."
              subtitle="Somebody will swing by surely!"
            />
          )}
        </Stack>
      </Box>
    </VStack>
  );
};

const ParticipatingPostUsers: React.FC<{
  post: any;
  messages: any[];
  myUsername: string;
  token: string;
}> = (props) => {
  const { post, messages, myUsername, token } = props;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [_, dispatch] = usePostsContext();
  // this function is used only when the component is mounted
  // for the case of the author of the post viewing the post
  const getDistinctUsersFromMessage = (messages: any[], myUsername: string) => {
    const users: any[] = [];

    messages.forEach((msg, index: Number) => {
      const msgOwner = msg.owner;
      const exists =
        users.findIndex(({ username }: any) => username === msgOwner) !== -1;
      if (msgOwner != myUsername && !exists) {
        users.push({ username: msgOwner, hidden: !msg.friends, index });
      }
    });

    return users;
  };

  useEffect(() => {
    if (!messages) return;
    const _us = getDistinctUsersFromMessage(messages, myUsername);
    setUsers(_us as any);
    setSelectedUser(_us[0]);
  }, [messages]);

  return (
    <>
      <UserList
        users={users}
        selected={selectedUser}
        onSelectUser={(user) => {
          setSelectedUser(user);
          dispatch({
            type: POST_ACTIONS.SET_ACTIVE_MESSAGE_THREAD,
            payload: {
              user1: user.username,
              user2: myUsername,
              postId: post.id,
              messages,
            },
          });
          // fetchPostMessagesForParticipatingUser(post, user, dispatch, token);
        }}
      />
    </>
  );
};

const UserList: React.FC<{
  users: any[];
  selected: any;
  onSelectUser: (user: any) => void;
}> = (props) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<DownArrow size={20} />}>
        Viewing:{" "}
        {props.selected?.hidden
          ? `User ${props.selected?.index}`
          : props.selected?.username}
      </MenuButton>
      <MenuList>
        {props.users?.map((user: any) => (
          <MenuItem
            key={user.index}
            onClick={() => {
              props.onSelectUser?.(user);
            }}
          >
            {user.hidden ? `User ${user.index} ???` : user.username}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PostPage;
