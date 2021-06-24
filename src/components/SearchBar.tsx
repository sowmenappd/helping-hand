import React from "react";
import { Center, Input } from "@chakra-ui/react";

const SearchBar: React.FC<{ searchText: string; onSearch: any }> = (props) => (
  <Center mb="8" maxW={["xs", "xl", "3xl", "4xl"]} ml={3}>
    <Input
      placeholder="Search tags, topics, etc..."
      variant="filled"
      size="lg"
      value={props.searchText}
      onChange={(e) => props.onSearch(e.currentTarget.value)}
    />
  </Center>
);

export default SearchBar;
