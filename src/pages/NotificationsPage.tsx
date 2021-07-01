import React from "react";
import { VStack, Box, Heading, Button } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import {
  readNotification,
  useNotificationsContext,
} from "../store/notifications";
import { useAuthContext } from "../store/auth";
import GraphicNotice from "../components/GraphicNotice";

import svg from "../images/no_notif.svg";
import AddFriendNotificationCard from "../components/AddFriendNotificationCard";
import IncomingPostMessageNotificationCard from "../components/IncomingPostMessageNotificationCard";
import { NOTIFICATION_TYPES } from "../store/types";
import { fetchPosts, usePostsContext, viewPost } from "../store/posts";

const NotificationsPage = () => {
  const history = useHistory();
  const [{ username, token }] = useAuthContext();
  const [{ posts }, pDispatch] = usePostsContext();
  const [notifications, nDispatch] = useNotificationsContext();

  const handleNotificationRead = (id: string) => {
    readNotification(id, username, nDispatch, token);
  };

  // const handleViewMessage = async (postId: string) => {
  //   console.log(postId);
  //   await fetchPosts("help", username, pDispatch, token);
  //   console.log(posts.data);
  //   const post = posts.data.find((p: any) => p.id === postId);
  //   viewPost(
  //     post,
  //     post.username === username ? null : username,
  //     pDispatch,
  //     token
  //   );
  //   history.push(`/home/post/${postId}`);
  // };

  return (
    <VStack spacing={4} alignItems="flex-start">
      <Box w={["full", "full", "full", "2xl", "4xl"]}>
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
          Notifications
        </Heading>
        <VStack
          mt={5}
          mx={4}
          maxH="fit-content"
          align="flex-start"
          borderRadius="xl"
          overflow="clip"
        >
          {!notifications.loading && notifications.data.length == 0 && (
            <GraphicNotice
              title="No unread notification"
              subtitle="You're all caught up"
              img={svg}
              bg="gray.100"
            >
              <Link to="/home">
                <Button
                  children="Go back"
                  variant="link"
                  fontSize="xl"
                  fontWeight="normal"
                  colorScheme="facebook"
                  mb={6}
                />
              </Link>
            </GraphicNotice>
          )}
          {!notifications.loading &&
            notifications.data.map(
              (n: {
                id: string;
                read: boolean;
                type: string;
                content: any;
              }) => {
                return (
                  <Box
                    w="full"
                    h="fit-content"
                    bg="gray.100"
                    p={6}
                    pl={[4, 6]}
                    key={n.id}
                  >
                    {n.type == NOTIFICATION_TYPES.ADD_FRIEND && (
                      <AddFriendNotificationCard
                        id={n.id}
                        read={n.read}
                        content={n.content}
                        onRead={handleNotificationRead}
                      />
                    )}
                    {n.type ==
                      NOTIFICATION_TYPES.INCOMING_POST_MESSAGE_NOTIFICATION && (
                      <IncomingPostMessageNotificationCard
                        id={n.id}
                        read={n.read}
                        content={n.content}
                        onRead={handleNotificationRead}
                        onViewMessage={(id) => null}
                      />
                    )}
                  </Box>
                );
              }
            )}
        </VStack>
      </Box>
    </VStack>
  );
};

export default NotificationsPage;
