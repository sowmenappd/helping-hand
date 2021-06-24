import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Layout from "./layout/Layout";

import AuthStoreProvider from "./store/auth";
import PostsStoreProvider from "./store/posts";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthStoreProvider>
        <PostsStoreProvider>
          <Layout />
        </PostsStoreProvider>
      </AuthStoreProvider>
    </ChakraProvider>
  );
};
