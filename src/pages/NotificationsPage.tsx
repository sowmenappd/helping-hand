import React from "react";
import { VStack, Box, Heading, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  readNotification,
  useNotificationsContext,
} from "../store/notifications";
import { getRelativeTimestring } from "../util/time";
import { useAuthContext } from "../store/auth";
import GraphicNotice from "../components/GraphicNotice";

import svg from "../images/no_notif.svg";

const NotificationsPage = () => {
  const [{ token }] = useAuthContext();
  const [notifications, nDispatch] = useNotificationsContext();

  const handleNotificationRead = (id: string) => {
    readNotification(id, nDispatch, token);
  };

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
                    maxH="250px"
                    bg="gray.100"
                    p={6}
                    pl={[4, 6]}
                    key={n.id}
                  >
                    {n.type == "ADD_FRIEND" && (
                      <AddFriendNotification
                        id={n.id}
                        read={n.read}
                        content={n.content}
                        onRead={handleNotificationRead}
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

const AddFriendNotification: React.FC<{
  id: string;
  read: boolean;
  content: any;
  onRead: (id: string) => void;
}> = (props) => {
  const { id, read, content } = props;
  return (
    <VStack>
      <Box
        display="flex"
        flexDir={["column", "row"]}
        justifyContent="space-between"
        alignItems={["flex-end", "center"]}
        maxH="full"
        w="full"
      >
        <Heading fontSize="2xl">
          <li>
            <span style={{ color: "grey" }}>
              <a href="#">{content.sentFrom}</a>
            </span>{" "}
            added you as a friend!
          </li>
        </Heading>
        <Heading fontSize="lg" fontWeight="light" pr={3} color="gray.500">
          {getRelativeTimestring(content.time)}
        </Heading>
      </Box>
      <Stack
        display="flex"
        flexDir="column"
        alignItems="flex-end"
        h="50px"
        w="100%"
      >
        <Button
          size="md"
          w={["fit-content", "150px"]}
          variant="ghost"
          bg="blue.300"
          onClick={() => props.onRead(id)}
        >
          {read ? "Notification read" : "Mark as read"}
        </Button>
      </Stack>
    </VStack>
  );
};

export default NotificationsPage;
