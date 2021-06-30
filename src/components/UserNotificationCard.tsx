import React, { useEffect } from "react";
import {
  HStack,
  Center,
  useColorModeValue,
  IconButton,
  Link,
  Text,
  AvatarBadge,
  Avatar,
} from "@chakra-ui/react";
import {
  IoMdNotifications as NotificationsIcon,
  IoMdSettings as SettingsIcon,
  IoMdHome as HomeIcon,
} from "react-icons/io";
import { AiFillMessage as MessagesIcon } from "react-icons/ai";
import {
  fetchNotifications,
  useNotificationsContext,
} from "../store/notifications";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../store/auth";

const TAG_COLORS = [
  "green.100",
  "orange.100",
  "blue.100",
  "red.100",
  "purple.100",
  "gray.100",
  "pink.100",
];

interface Props {
  user: {
    name: string;
    username: string;
    bio: string;
    tags: string[];
    imgB64: string;
  };
}

const UserNotificationCard: React.FC<Props> = (props) => {
  const [notifications, dispatch] = useNotificationsContext();
  const { data, loading, error } = notifications;

  const location = useLocation();
  const [{ token, username }, _] = useAuthContext();

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) fetchNotifications(username, dispatch, token);

    return () => {
      isSubscribed = false;
    };
  }, [location.pathname]);

  return (
    <Center py={6}>
      <HStack
        w="full"
        justify="center"
        maxW={"320px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        spacing={4}
      >
        <Link href="/home">
          <IconButton
            aria-label="home"
            size="lg"
            rounded="full"
            icon={<HomeIcon fontSize={28} color="#ED8936" />}
          />
        </Link>
        <Link href="/home/notifications">
          <ButtonWithCountBadge
            count={loading ? 0 : data.length}
            icon={<NotificationsIcon fontSize={28} color="#4267B2" />}
          />
        </Link>
        <Link href="/home/messages">
          <IconButton
            aria-label="messages"
            size="lg"
            rounded="full"
            icon={<MessagesIcon fontSize={28} color="#1DA1F2" />}
          />
        </Link>
        <Link href="/home/settings">
          <IconButton
            aria-label="settings"
            size="lg"
            rounded="full"
            icon={<SettingsIcon fontSize={28} color="rgb(0,0,0,0.85)" />}
          />
        </Link>
      </HStack>
    </Center>
  );
};

const ButtonWithCountBadge: React.FC<{
  count: Number;
  icon: any;
  badgeTintColor?: string;
  badgeBorderColor?: string;
  fontSize?: "sm" | "md" | "lg";
}> = (props) => {
  return (
    <Avatar bg="gray.100" icon={props.icon}>
      {props.count != 0 && (
        <AvatarBadge
          borderColor={props.badgeBorderColor || "white"}
          bg={props.badgeTintColor || "green.200"}
          boxSize="1.5em"
          padding={1}
        >
          <Text fontSize={props.fontSize || "sm"}>{props.count}</Text>
        </AvatarBadge>
      )}
    </Avatar>
  );
};

export default UserNotificationCard;
