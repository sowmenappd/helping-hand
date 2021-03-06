import React from "react";
import {
  Image,
  Container,
  Heading,
  Box,
  Link,
  Text,
  HStack,
  IconButton,
  SpaceProps,
  Tag,
  useColorModeValue,
  Avatar,
} from "@chakra-ui/react";
import { TiArrowForward as ForwardIcon } from "react-icons/ti";
import { MdReport as ReportIcon } from "react-icons/md";
import { BsThreeDots as DotsIcon } from "react-icons/bs";
import {
  notifyDeleteActionForPost,
  usePostsContext,
  viewPost,
} from "../store/posts";
import { getRelativeTimestring } from "../util/time";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../store/auth";

interface PostTagsProps {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const PostTags: React.FC<PostTagsProps> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags?.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface PostAuthorProps {
  datetimeISO: Date;
  name: string;
  username: string;
  imgUrl: string;
  hidden: boolean;
}

export const PostAuthor: React.FC<PostAuthorProps> = (props) => {
  return (
    <HStack marginTop={2} marginRight={4} display="flex" alignItems="start">
      {props.hidden ? (
        <Avatar bg="teal.500" />
      ) : (
        <Image
          borderRadius="full"
          boxSize="40px"
          src={props.imgUrl}
          alt="img"
        />
      )}

      <Box paddingLeft={2}>
        <Text textAlign="end" fontWeight="bold">
          {props.hidden ? <i>Someone</i> : props.name}
        </Text>

        <Text textAlign="end" fontWeight="black" color="gray.500">
          {getRelativeTimestring(props.datetimeISO)}
        </Text>
      </Box>
    </HStack>
  );
};

// export interface HelpPostProps {
//   id: string;
//   author: {
//     name: string; // combine first_name, last_name
//     img: string;
//   };
//   username: string;
//   datetimeISO: string;
//   title: string;
//   description: string;
//   tags: string[];
//   hidden: boolean;
// }

const HelpPost: React.FC<any> = (post) => {
  const {
    id,
    username,
    hidden,
    author,
    title,
    description,
    datetimeISO,
    tags,
  } = post;

  const [{ token, username: myUsername }] = useAuthContext();
  const [_, dispatch] = usePostsContext();
  const { push } = useHistory();

  return (
    <Container maxW={"4xl"}>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        p="8"
        borderRadius="2xl"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        bg={useColorModeValue("white", "gray.700")} //
        boxShadow="md"
        transition=".1s ease-in"
        _hover={{
          boxShadow: "xl",
        }}
      >
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <Heading
            marginTop="1"
            marginBottom="2"
            display="flex"
            justifyContent="space-between"
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {title}
            </Link>
            {myUsername === username && (
              <IconButton
                aria-label="delete-post"
                rounded="full"
                color="blackAlpha.700"
                bgColor="transparent"
                onClick={() => {
                  notifyDeleteActionForPost(post, dispatch);
                }}
              >
                <DotsIcon size={24} />
              </IconButton>
            )}{" "}
          </Heading>
          <PostTags tags={tags} />

          <Text
            as="p"
            marginTop="6"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
            maxH="lg"
            noOfLines={3}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            {description}
          </Text>
          <Box
            display="flex"
            flex="1"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
          >
            <PostAuthor
              hidden={hidden}
              imgUrl={author.img}
              name={author.name}
              username={username}
              datetimeISO={new Date(datetimeISO)} //TODO: add date to post
            />
            <Box display="flex" flexDirection="row">
              {/* {username != myUsername && (
                <IconButton
                  aria-label="view-post"
                  rounded="2xl"
                  color="red.400"
                  bgColor="transparent"
                >
                  <ReportIcon size={28} />
                </IconButton>
              )} */}
              <IconButton
                aria-label="view-post"
                rounded="2xl"
                color="blue.400"
                bgColor="transparent"
                onClick={() => {
                  viewPost(
                    post,
                    post.username === myUsername ? null : myUsername,
                    dispatch,
                    token
                  );
                  push(`/home/post/${id}`);
                }}
              >
                <ForwardIcon size={36} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HelpPost;
