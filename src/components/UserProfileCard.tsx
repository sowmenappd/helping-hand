import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Image,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

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

const UserProfileCard: React.FC<Props> = (props) => {
  return (
    <Center py={6}>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        {props.user.imgB64 ? (
          <Box display="flex" justifyContent="center">
            <Image
              src={props.user.imgB64}
              boxSize="20"
              w="20"
              h="20"
              _after={{
                content: '""',
                w: 6,
                h: 6,
                bg: "green.300",
                border: "2px solid white",
                rounded: "full",
                pos: "absolute",
                bottom: 0,
                right: 1,
                zIndex: 10,
              }}
            />
          </Box>
        ) : (
          <Avatar
            size={"xl"}
            alt={props.user.name}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 2,
            }}
          />
        )}

        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {props.user.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {"@" + props.user.username}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {props.user.bio}
        </Text>

        <Stack direction={"row"} mt={6}>
          <Box>
            {props.user.tags.map((t, i) => {
              return (
                <Badge
                  px={3}
                  py={2}
                  m={1}
                  bg={TAG_COLORS[i % TAG_COLORS.length]}
                  fontWeight={"bold"}
                  key={t}
                  rounded="2xl"
                >
                  #{t}
                </Badge>
              );
            })}
          </Box>
        </Stack>

        <Stack mt={4} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"red.300"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "red.400",
            }}
            _focus={{
              bg: "red.400",
            }}
          >
            Settings
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default UserProfileCard;
