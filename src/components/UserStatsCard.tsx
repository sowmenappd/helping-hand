import React from "react";
import {
  Box,
  Center,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  useColorModeValue,
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
          <Stack direction={["column", "row", "row"]}>
            <Stat align="center" pt="5">
              <StatLabel>Posts</StatLabel>
              <StatNumber>5</StatNumber>
            </Stat>
            <Stat align="center">
              <StatLabel fontSize="2xl">
                <b>Friends</b>
              </StatLabel>
              <StatNumber fontSize="4xl">67</StatNumber>
            </Stat>
            <Stat align="center" pt="5">
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
