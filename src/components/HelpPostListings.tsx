import React, { useState } from "react";
import { HStack, VStack, Heading, Button } from "@chakra-ui/react";

import HelpPost, { HelpPostProps } from "./HelpPost";

export interface HelpPostsProps {
  posts?: HelpPostProps[];
}

const HelpPostListings: React.FC<HelpPostsProps> = (props) => {
  const { posts } = props;
  const [postType, setPostType] = useState("help");

  const handlePostType = (type: "help" | "friends") => {
    setPostType(type);
  };

  if (!posts) return null;
  return (
    <VStack maxW={"4xl"} alignItems="flex-start">
      <Heading as="h1" fontSize={["4xl", "6xl"]}>
        <span
          style={{
            color: "#272727",
            opacity: 0.15,
            paddingLeft: 20,
            paddingRight: 10,
          }}
        >
          <b>#</b>
        </span>
        Right now
      </Heading>
      <HStack pl="8" pt="4">
        <Button
          rounded="3xl"
          color={postType == "help" ? "green.600" : ""}
          bg={postType == "help" ? "green.50" : ""}
          onClick={() => handlePostType("help")}
        >
          Help
        </Button>
        <Button
          rounded="3xl"
          color={postType == "friends" ? "green.600" : ""}
          bg={postType == "friends" ? "green.50" : ""}
          onClick={() => handlePostType("friends")}
        >
          Friends
        </Button>
      </HStack>
      {posts.map(({ author, title, datetimeISO, description, tags }) => (
        <HelpPost
          author={author}
          title={title}
          description={description}
          tags={tags}
          datetimeISO={datetimeISO}
        />
      ))}
    </VStack>
  );
};

export default HelpPostListings;
