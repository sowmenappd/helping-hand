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

const UserStatsCard: React.FC = () => {
  const [row] = useMediaQuery("(min-width: 320px)");

  const [state, dispatch] = useAuthContext();
  const stats = state.stats;

  useEffect(() => {
    fetchUserStats(state.username, dispatch, state.token);
  }, []);

  if (!stats) return null;

  return (
    <Center py={3}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <StatGroup>
          <Stack direction={row ? "row" : "column"}>
            <Stat align="center" pt="5" px={4}>
              <StatLabel>Posts</StatLabel>
              <StatNumber>{stats.data.posts}</StatNumber>
            </Stat>
            <Stat
              align="center"
              justifyContent="center"
              bg="gray.100"
              borderRadius="xl"
            >
              <StatLabel fontSize="2xl" pt={2} pb={0} mb={-1} px={3}>
                <b>Friends</b>
              </StatLabel>
              <StatNumber fontSize="3xl" mb={1}>
                {stats.data.friends}
              </StatNumber>
            </Stat>
            <Stat align="center" pt="5" px={4}>
              <StatLabel>
                <b>Hands</b>
              </StatLabel>
              <StatNumber>{stats.data.hands}</StatNumber>
            </Stat>
          </Stack>
        </StatGroup>
      </Box>
    </Center>
  );
};

export default UserStatsCard;
