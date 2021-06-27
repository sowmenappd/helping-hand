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
      <UserStatsCard
        stats={{
          name: "Lindsey James",
          username: "@lindsey_jam3s",
          description:
            "Actress, musician, songwriter and artist. PM for work inquires or #tag me in your posts",
          tags: ["art", "photography", "music"],
        }}
      />
    </Box>
  );
};

export default Sidebar;
