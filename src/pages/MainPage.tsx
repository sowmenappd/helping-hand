import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Box, Stack, StackDivider } from "@chakra-ui/react";

import Layout from "../components/Layout";

import HelpPostListings from "../components/HelpPostListings";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

import HelpPostSearchResults from "../components/HelpPostSearchResults";
import PostHelpSection from "../components/PostHelpSection";
import { useAuthContext } from "../store/auth";
import PostView from "./PostView";
import { searchPosts, usePostsContext } from "../store/posts";
import Sidebar from "../components/Sidebar";
import SettingsPage from "./SettingsPage";
import MessagesPage from "./MessagesPage";
import NotificationsPage from "./NotificationsPage";

export default function Main() {
  return (
    <Layout>
      <MainView />
    </Layout>
  );
}

const MainView = () => {
  const [authState] = useAuthContext();

  return (
    <Stack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={5}
      justify="center"
      direction={["column", "column", "row"]}
    >
      <Router>
        <Switch>
          <Route path="/home">
            {authState.token ? (
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
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </Router>
      <Box mt={8} p={[3, 3, 6]} pr={[6]}>
        <Router>
          <Switch>
            <Route path="/home" exact>
              <AllPostsPage />
            </Route>
            <Route path="/home/settings">
              <SettingsPage />
            </Route>
            <Route path="/home/messages">
              <MessagesPage />
            </Route>
            <Route path="/home/notifications">
              <NotificationsPage />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Stack>
  );
};

const AllPostsPage: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const [{ isViewingPost, viewPost, posts }, dispatch] = usePostsContext();
  const [{ token }] = useAuthContext();

  console.log("viewPost", viewPost);

  useEffect(() => {
    searchPosts(searchText, dispatch, token);
  }, [searchText]);

  return (
    <>
      <SearchBar
        searchText={searchText}
        onSearch={(text: string) => {
          setSearchText(text);
        }}
      />
      {searchText?.length > 3 ? (
        <HelpPostSearchResults
          loading={posts.loading}
          results={posts.data}
          searchText={searchText}
        />
      ) : (
        <>
          <PostHelpSection />
          <HelpPostListings />
          <PostView post={viewPost} isOpen={isViewingPost} />
        </>
      )}
    </>
  );
};
