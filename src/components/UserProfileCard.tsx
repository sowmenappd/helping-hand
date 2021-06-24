import React from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

interface UserProfileProps {
  name: string;
  username: string;
  description: string;
  tags: string[];
  imgUrl?: string;
}

interface Props {
  user: UserProfileProps;
}

const UserProfileCard: React.FC<Props> = (props) => {
  const bg = useColorModeValue("gray.50", "gray.800");
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
        <Avatar
          size={"xl"}
          src={props.user.imgUrl}
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
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {props.user.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {props.user.username}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {props.user.description}
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          {props.user.tags.map((t) => {
            <Badge px={2} py={1} bg={bg} fontWeight={"400"} key={t}>
              #{t}
            </Badge>;
          })}
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
