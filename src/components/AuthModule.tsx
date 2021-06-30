import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import { useAuthContext } from "../store/auth";
import LoginCard from "./LoginCard";
import SignupCard from "./SignupCard";
import AuthScreenBlurComponent from "./AuthScreenBlurComponent";

const AuthModule = () => {
  const [mode, setMode] = useState("login");
  const toast = useToast();

  const [state, dispatch] = useAuthContext();

  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading lineHeight={1.1}>
            <Text
              as={"span"}
              fontSize={{ base: "5xl", sm: "6xl", md: "7xl", lg: "8xl" }}
            >
              Helping{" "}
            </Text>
            <br />
            <div style={{ zIndex: 10 }}>
              <Text
                as="span"
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
                fontSize={{ base: "5xl", sm: "6xl", md: "7xl", lg: "8xl" }}
              >
                Hand
              </Text>{" "}
              <span>👋</span>
            </div>
          </Heading>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "2xl", md: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              color="white"
              bgColor="black"
              bgGradient="linear(to-r, red.400,pink.400)"
            >
              The platform where you help friends and make them too!
            </Text>
          </Heading>
        </Stack>
        {mode == "login" ? (
          <LoginCard
            onActivateSignup={() => setMode("signup")}
            dispatch={dispatch}
            state={state}
          />
        ) : (
          <SignupCard
            onActivateLogin={() => setMode("login")}
            onSignupSuccess={() => {
              setMode("login");
              toast({
                title: "Account creation successful.",
                description:
                  "Your account has been created. You can now login with your username and password.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "bottom",
              });
            }}
          />
        )}
      </Container>
      <AuthScreenBlurComponent
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)", zIndex: -1 }}
      />
    </Box>
  );
};

export default AuthModule;
