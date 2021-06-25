import React from "react";
import { VStack, Heading, Box } from "@chakra-ui/react";
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
    </VStack>
  );
};

export default HelpPostSearchResults;
