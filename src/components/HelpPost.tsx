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

interface PostTagsProps {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const PostTags: React.FC<PostTagsProps> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
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
          {props.name}
        </Text>
        <Text textAlign="end" fontWeight="black" color="gray.500">
          {props.datetimeISO.toLocaleDateString()}
        </Text>
      </Box>
    </HStack>
  );
};

export interface HelpPostProps {
  author: {
    username: string;
    name: string; // combine first_name, last_name
    imgUrl: string;
  };
  datetimeISO: string;
  title: string;
  description: string;
  tags: string[];
}

const HelpPost: React.FC<HelpPostProps> = (props) => {
  const { author, title, description, datetimeISO, tags } = props;

  const hidden = true; // TODO: handle logic to show for friends only

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
          <Heading marginTop="1" marginBottom="2">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {title}
            </Link>
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
              imgUrl={author.imgUrl}
              name={author.name}
              datetimeISO={new Date(datetimeISO)} //TODO: add date to post
            />
            <Box display="flex" flexDirection="row">
              <div>
                <IconButton
                  aria-label="view-post"
                  rounded="2xl"
                  colorScheme="red"
                  mr={2}
                >
                  <ReportIcon size={28} />
                </IconButton>
              </div>
              <div>
                <IconButton
                  aria-label="view-post"
                  rounded="2xl"
                  colorScheme="twitter"
                >
                  <ForwardIcon size={28} />
                </IconButton>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default HelpPost;
