import React, { useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  IconProps,
  Icon,
  Link,
} from "@chakra-ui/react";
import AuthController from "../controller/auth";
import { login, signup, useAuthContext } from "../store/auth";
import { useHistory } from "react-router-dom";
import { AUTH_ACTIONS } from "../store/types";
import ImageUploader from "./ImageUploader";

const AuthModule = () => {
  const [mode, setMode] = useState("login");

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
            dispatch={dispatch}
            state={state}
          />
        )}
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)", zIndex: -1 }}
      />
    </Box>
  );
};

const LoginCard: React.FC<{
  onActivateSignup: any;
  state: any;
  dispatch: any;
}> = (props) => {
  const { state, dispatch, onActivateSignup } = props;

  const { username, password, loading, error } = state;
  const history = useHistory();

  const handleLogin = async () => {
    login({ username, password }, dispatch, () => {
      history.push("/home");
    });
  };

  return (
    <Stack
      bg={"gray.50"}
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
    >
      <Stack spacing={4}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          Ready to meet new{" "}
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            friends?
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Become a part of the next wave of social revolution and boost your
          social life!
        </Text>
      </Stack>
      <Box as={"form"} mt={10}>
        <Stack spacing={4}>
          <Input
            value={username}
            type="text"
            placeholder="Username"
            bg={"gray.100"}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "username", value: e.currentTarget.value },
              })
            }
            border="2px"
            borderColor={error ? "red.400" : "transparent"}
          />
          <Input
            value={password}
            type="password"
            placeholder="Password"
            bg={"gray.100"}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "password", value: e.currentTarget.value },
              })
            }
            border="2px"
            borderColor={error ? "red.400" : "transparent"}
          />
          <Text color={"red.500"} fontSize={{ base: "sm", sm: "md" }}>
            {error}
          </Text>
        </Stack>
        <Button
          fontFamily={"heading"}
          mt={8}
          w={"full"}
          isLoading={loading}
          loadingText="Logging in.."
          bgGradient="linear(to-r, red.400,pink.400)"
          color={"white"}
          _hover={{
            bgGradient: "linear(to-r, red.400,pink.400)",
            boxShadow: "xl",
          }}
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          type="submit"
        >
          Login
        </Button>
        <Text color={"gray.500"} mt={5} fontSize={{ base: "sm", sm: "md" }}>
          Don't have an account?{" "}
          <Link color="red.400" onClick={onActivateSignup}>
            Sign up now!
          </Link>
        </Text>
      </Box>
    </Stack>
  );
};

const SignupCard: React.FC<{
  onActivateLogin: any;
  state: any;
  dispatch: any;
}> = (props) => {
  const { state, dispatch, onActivateLogin } = props;
  const {
    username,
    first_name,
    last_name,
    password,
    imgB64,
    confirm_password,
    loading,
    error,
  } = state;

  const handleSignup = async () => {
    signup(
      { username, password, confirm_password, first_name, last_name, imgB64 },
      dispatch,
      () => {}
    );
  };

  return (
    <Stack
      bg={"gray.50"}
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
    >
      <Stack spacing={4}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          Join the community
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            !
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Become a part of the next wave of social revolution and boost your
          social life!
        </Text>
      </Stack>
      <Box as={"form"} mt={10}>
        <Stack spacing={4}>
          <Input
            placeholder="First name"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              props.dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "first_name", value: e.currentTarget.value },
              })
            }
          />
          <Input
            placeholder="Last name"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              props.dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "last_name", value: e.currentTarget.value },
              })
            }
          />
          <Input
            placeholder="Username"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              props.dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "username", value: e.currentTarget.value },
              })
            }
          />

          <Input
            placeholder="Password"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              props.dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "password", value: e.currentTarget.value },
              })
            }
          />

          <Input
            placeholder="Confirm password"
            bg={"gray.100"}
            border={0}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              props.dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: {
                  field: "confirm_password",
                  value: e.currentTarget.value,
                },
              })
            }
          />
          <ImageUploader
            onImage={(imgB64: string) => {
              props.dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: {
                  field: "imgB64",
                  value: imgB64,
                },
              });
            }}
          />
          <Text color={"red.500"} fontSize={{ base: "sm", sm: "md" }}>
            {error}
          </Text>
        </Stack>
        <Button
          isLoading={loading}
          loadingText={"Signing you up.."}
          fontFamily={"heading"}
          mt={8}
          w={"full"}
          bgGradient="linear(to-r, red.400,pink.400)"
          color={"white"}
          _hover={{
            bgGradient: "linear(to-r, red.400,pink.400)",
            boxShadow: "xl",
          }}
          type={"submit"}
          onClick={(e) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          Create your account!
        </Button>
        <Text color={"gray.500"} mt={5} fontSize={{ base: "sm", sm: "md" }}>
          Already have an account?{" "}
          <Link color="red.400" onClick={onActivateLogin}>
            Login here
          </Link>
        </Text>
      </Box>
    </Stack>
  );
};

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

export default AuthModule;
