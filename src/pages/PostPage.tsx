import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "@chakra-ui/react";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { BsChevronDown as DownArrow } from "react-icons/bs";

import PostedAtNotice from "../components/PostedAtNotice";
import MessageStack from "../components/MessageStack";
import ChatPanel from "../components/ChatPanel";
import MakeFriendsNotice from "../components/MakFriendsNotice";
import FirstTimeNotice from "../components/FirstTimeNotice";

import { useAuthContext } from "../store/auth";
import { addPostMessage, hideViewPost, usePostsContext } from "../store/posts";

const isMine = (post: any, username: string): boolean => {
  return post.username === username;
};

const isMyFriendsPost = (post: any): boolean => {
  return post.friends;
};

const PostPage: React.FC = () => {
  const [{ username, token }] = useAuthContext();
  const [{ viewPost: post, messages }, dispatch] = usePostsContext();

  const handleMessageUser = (msg: string, firsTime: boolean) => {
    console.log(post.id);
    addPostMessage(post, username, msg, firsTime, dispatch, token);
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
            <Stack
              direction={["column", "row"]}
              display="flex"
              w="full"
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
                  <ParticipatingPostUsers
                    post={post}
                    messages={messages.data}
                    myUsername={username}
                  />
                  {!post.friends && (
                    <MakeFriendsNotice
                      // TODO: right now all messages from people to a certain person will appear at once for the post owner, need to group them and use a select dropdown to show a specific person's reply
                      onMakeFriends={() => {
                        // TODO: add function that adds an entry to connections table with the users
                        // addFriend(username);
                        // TODO: add a notifications table entry
                      }}
                    />
                  )}
                </Stack>
              )}
              <PostedAtNotice
                datetimeISO={post.datetimeISO}
                hidden={isMine(post, username) ? false : !post.friends}
                username={
                  isMine(post, username)
                    ? "You"
                    : post.friends
                    ? post.username
                    : "Someone"
                }
                onUserPress={() => null}
              />
            </Stack>
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

          {messages.data && messages.data.length > 1 && (
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
}> = (props) => {
  const { post, messages, myUsername } = props;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  // this function is used only when the component is mounted
  // for the case of the author of the post viewing the post
  const getDistinctUsersFromMessage = (messages: any[], myUsername: string) => {
    const users: any[] = [];

    messages.forEach((msg, index: Number) => {
      const msgOwner = msg.owner;
      const exists =
        users.findIndex(({ username }: any) => username === msgOwner) !== -1;
      if (msgOwner != myUsername && !exists) {
        users.push({ username: msgOwner, hidden: true, index });
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
          <MenuItem key={user.index} onClick={() => props.onSelectUser?.(user)}>
            {user.hidden ? `User ${user.index}` : user.username}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default PostPage;
