import { Box } from "@chakra-ui/react";
import React from "react";
import UserNotificationCard from "./UserNotificationCard";
import UserProfileCard from "./UserProfileCard";
import UserStatsCard from "./UserStatsCard";

interface SidebarProps {
  user: {
    name: string;
    username: string;
    bio: string;
    tags: string[];
    imgB64: string;
  };
  stats: null;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { user } = props;

  return (
    <Box p={[6, 6, 6, 4]}>
      <UserNotificationCard user={user} />
      <UserProfileCard user={user} />
      <UserStatsCard />
    </Box>
  );
};

export default Sidebar;
