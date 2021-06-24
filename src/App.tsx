import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Layout from "./layout/Layout";

import AuthContextProvider from "./store/auth";

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthContextProvider>
      {/* <Box textAlign="center" fontSize="xl"> */}
      {/* <Grid minH="100vh" p={0}> */}
      {/* <VStack spacing={8}> */}
      <Layout />
      {/* </VStack> */}
      {/* </Grid> */}
      {/* </Box> */}
    </AuthContextProvider>
  </ChakraProvider>
);
