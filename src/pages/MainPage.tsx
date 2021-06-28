import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Box, Stack, StackDivider } from "@chakra-ui/react";

import Layout from "../components/Layout";

import { useAuthContext } from "../store/auth";
import Sidebar from "../components/Sidebar";
import SettingsPage from "./SettingsPage";
import MessagesPage from "./MessagesPage";
import NotificationsPage from "./NotificationsPage";
import AllPostsPage from "./AllPostsPage";
import PostPage from "./PostPage";

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
              <Redirect path="/home" to="/" exact />
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
            <Redirect path="/home/post" exact to="/home" />
            <Route path="/home/post/:id" exact>
              <PostPage />
            </Route>
            <Route path="/home/settings" exact>
              <SettingsPage />
            </Route>
            <Route path="/home/messages" exact>
              <MessagesPage />
            </Route>
            <Route path="/home/notifications" exact>
              <NotificationsPage />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Stack>
  );
};
