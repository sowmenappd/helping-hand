import React, { useEffect } from "react";
import {
  Box,
  Center,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useMediaQuery,
} from "@chakra-ui/react";
import { fetchUserStats, useAuthContext } from "../store/auth";

import { FaUserFriends as FriendsIcon } from "react-icons/fa";
import { BsFilePost as PostIcon } from "react-icons/bs";
import { BiMessageCheck as MessagesIcon } from "react-icons/bi";

const UserStatsCard: React.FC = () => {
  const [row] = useMediaQuery("(min-width: 320px)");

  const [state, dispatch] = useAuthContext();
  const stats = state.stats;

  useEffect(() => {
    fetchUserStats(state.username, dispatch, state.token);
  }, []);

  if (!stats) return null;

  return (
    <Center py={1}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={3}
        textAlign={"center"}
      >
        <StatGroup>
          <Stack
            direction={row ? "row" : "column"}
            flex="1"
            align="flex-start"
            justify="center"
          >
            <Stat align="center" pt="5" px={4}>
              <PostIcon size={24} />
              <StatNumber pt={2}>{stats.data.posts}</StatNumber>
            </Stat>
            <Stat
              align="center"
              justifyContent="center"
              bg="gray.100"
              borderRadius="xl"
              p={2}
            >
              <StatLabel fontSize="2xl" p={3} pb={0}>
                <FriendsIcon size={24} />
              </StatLabel>
              <StatNumber fontSize="3xl" mb={1}>
                {stats.data.friends}
              </StatNumber>
            </Stat>
            <Stat align="center" pt="5" px={4}>
              <StatLabel>
                <MessagesIcon size={24} />
              </StatLabel>
              <StatNumber pt={2}>{stats.data.messages}</StatNumber>
            </Stat>
          </Stack>
        </StatGroup>
      </Box>
    </Center>
  );
};

export default UserStatsCard;
