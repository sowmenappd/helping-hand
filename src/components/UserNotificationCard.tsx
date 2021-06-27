import React from "react";
import {
  HStack,
  Center,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import {
  IoMdNotifications as NotificationsIcon,
  IoMdSettings as SettingsIcon,
} from "react-icons/io";
import { AiFillMessage as MessagesIcon } from "react-icons/ai";

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
        <IconButton
          aria-label="notifications"
          size="lg"
          rounded="full"
          icon={<NotificationsIcon fontSize={28} color="#4267B2" />}
        />
        <IconButton
          aria-label="messages"
          size="lg"
          rounded="full"
          icon={<MessagesIcon fontSize={28} color="#1DA1F2" />}
        />
        <IconButton
          aria-label="settings"
          size="lg"
          rounded="full"
          icon={<SettingsIcon fontSize={28} color="rgb(0,0,0,0.85)" />}
        />
      </HStack>
    </Center>
  );
};

export default UserNotificationCard;
