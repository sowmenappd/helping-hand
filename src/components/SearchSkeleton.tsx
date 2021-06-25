import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

const SearchSkeleton: React.FC<{ loading: boolean }> = ({ loading }) => (
  <Box pt={4} w="100%" maxW="4xl">
    <Box borderTopRadius="3xl" padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" isLoaded={!loading} />
      <SkeletonText mt="4" noOfLines={5} spacing="4" isLoaded={!loading} />
    </Box>
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" isLoaded={!loading} />
      <SkeletonText mt="4" noOfLines={5} spacing="4" isLoaded={!loading} />
    </Box>
    <Box borderBottomRadius="3xl" padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" isLoaded={!loading} />
      <SkeletonText mt="4" noOfLines={5} spacing="4" isLoaded={!loading} />
    </Box>
  </Box>
);
export default SearchSkeleton;
