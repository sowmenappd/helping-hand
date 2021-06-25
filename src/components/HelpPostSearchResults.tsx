import React from "react";
import {
  VStack,
  Heading,
  Box,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import SearchSkeleton from "./SearchSkeleton";

const HelpPostSearchResults: React.FC<{
  searchText: string;
  loading: boolean;
  results?: any;
}> = (props) => {
  const { searchText, loading, results } = props;

  return (
    <VStack spacing={4} alignItems="flex-start">
      <Box
        w={["100%", "100%", "100%", "100%", "4xl"]}
        maxW={["xl", "xl", "xl", "2xl", "4xl"]}
      >
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
          Searching for: {searchText}
        </Heading>
      </Box>
      <Box
        w="100%"
        maxW={["xl", "xl", "xl", "2xl", "4xl"]}
        alignItems="flex-start"
      >
        <SearchSkeleton loading={loading} />
      </Box>

      {/* <HStack pl="8" pt="4">
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
      </HStack> */}
      {/* {posts.map(({ author, title, datetimeISO, description, tags }) => (
        <HelpPost
          author={author}
          title={title}
          description={description}
          tags={tags}
          datetimeISO={datetimeISO}
        />
      ))} */}
    </VStack>
  );
};

export default HelpPostSearchResults;
