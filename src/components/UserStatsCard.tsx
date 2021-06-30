import React from "react";
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

interface UserStatsProps {
  name: string;
  username: string;
  description: string;
  tags: string[];
}

interface Props {
  stats: UserStatsProps;
}

const UserStatsCard: React.FC<Props> = (props) => {
  const [row] = useMediaQuery("(min-width: 320px)");

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
              <StatNumber>5</StatNumber>
            </Stat>
            <Stat
              align="center"
              justifyContent="center"
              bg="gray.100"
              borderRadius="xl"
            >
              <StatLabel fontSize="2xl" p={3}>
                <b>Friends</b>
              </StatLabel>
              <StatNumber fontSize="3xl" mt={-2} mb={1}>
                67
              </StatNumber>
            </Stat>
            <Stat align="center" pt="5" px={4}>
              <StatLabel>
                <b>Hands</b>
              </StatLabel>
              <StatNumber>23</StatNumber>
            </Stat>
          </Stack>
        </StatGroup>
      </Box>
    </Center>
  );
};

export default UserStatsCard;
