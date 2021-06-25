import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Box,
  Container as Center,
  Heading,
  Stack,
  StackDivider,
  Textarea,
  VStack,
  ButtonGroup,
  Button,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

import Layout from "../components/Layout";

import UserProfileCard from "../components/UserProfileCard";
import UserStatsCard from "../components/UserStatsCard";
import HelpPostListings from "../components/HelpPostListings";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

import { HelpPostProps } from "../components/HelpPost";
import HelpPostSearchResults from "../components/HelpPostSearchResults";
import PostHelpSection from "../components/PostHelpSection";
import { useAuthContext } from "../store/auth";

export default function Main() {
  const [authState] = useAuthContext();

  return (
    <Layout>
      <Stack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={5}
        justify="center"
        direction={["column", "column", "row"]}
      >
        <Sidebar
          user={{
            name: authState.first_name + authState.last_name,
            username: authState.username,
            imgB64: authState.imgB64,
            bio: authState.bio,
            tags: ["Fullstack", "Games", "Books", "React", "Typescript"],
          }}
          stats={null}
        />
        <MainView />
      </Stack>
    </Layout>
  );
}

const dummyPosts: HelpPostProps[] = [
  {
    author: {
      username: "sowmenr1",
      name: "Sowmen Rahman",
      img: "https://100k-faces.glitch.me/random-image",
    },
    title: "Help wanted! Dog lost 😔",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the of the printing and typesetting industry. of the of the printing and typesetting industry.of the of the printing and typesetting industry.of the of the printing and typesetting industry.",
    tags: ["Product", "Engineering", "Question"],
    datetimeISO: "2021-05-14T20:12:09.134Z",
  },
  {
    author: {
      username: "sowmenr1",
      name: "Sowmen Rahman",
      img: "https://100k-faces.glitch.me/random-image",
    },
    title: "Help wanted! Sore throat 😢",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the of the printing and typesetting industry. of the of the printing and typesetting industry.of the of the printing and typesetting industry.of the of the printing and typesetting industry.",
    tags: ["Product", "Engineering", "Question"],
    datetimeISO: "2021-06-13T20:12:09.134Z",
  },
];

const MainView = () => {
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // TODO: fetch search results from API
  }, [searchText]);

  return (
    <Box mt={8} p={[3, 3, 6]} pr={[6]}>
      <SearchBar
        searchText={searchText}
        onSearch={(text: string) => {
          setSearchText(text);
        }}
      />
      <Router>
        <Switch>
          <Route exact path="/h">
            {searchText?.length > 3 ? (
              <HelpPostSearchResults
                loading={true || searchLoading}
                results={searchResults}
                searchText={searchText} //TODO: implement component
              />
            ) : (
              <>
                <PostHelpSection />
                <HelpPostListings />
              </>
            )}
          </Route>
          {/* <Route>
            
          </Route> */}
        </Switch>
      </Router>
    </Box>
  );
};

interface SidebarUserProps {
  name: string;
  username: string;
  bio: string;
  tags: string[];
  imgB64: string;
}

interface SidebarProps {
  user: SidebarUserProps;
  stats: null;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { user } = props;

  return (
    <Box p={[6, 6, 6, 12]}>
      <UserProfileCard user={user} />
      <UserStatsCard
        stats={{
          name: "Lindsey James",
          username: "@lindsey_jam3s",
          description:
            "Actress, musician, songwriter and artist. PM for work inquires or #tag me in your posts",
          tags: ["art", "photography", "music"],
        }}
      />
    </Box>
  );
};
