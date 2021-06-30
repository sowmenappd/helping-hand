import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Layout from "./layout/Layout";

import AuthStoreProvider from "./store/auth";
import PostsStoreProvider from "./store/posts";
import NotificationsStoreProvider from "./store/notifications";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthStoreProvider>
        <NotificationsStoreProvider>
          <PostsStoreProvider>
            <Layout />
          </PostsStoreProvider>
        </NotificationsStoreProvider>
      </AuthStoreProvider>
    </ChakraProvider>
  );
};
