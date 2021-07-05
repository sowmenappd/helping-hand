import {
  Stack,
  Heading,
  Box,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { login } from "../store/auth";
import { AUTH_ACTIONS } from "../store/types";

const LoginCard: React.FC<{
  onActivateSignup: any;
  state: any;
  dispatch: any;
}> = (props) => {
  const { state, dispatch, onActivateSignup } = props;

  const { username, password, refresh_token, loading, error } = state;
  const history = useHistory();

  const handleLogin = async () => {
    login({ username, password, refresh_token }, dispatch, () => {
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
            borderWidth={error.username ? 2 : 0}
            borderColor={error.username ? "red.400" : "white"}
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
            borderWidth={error.password ? 2 : 0}
            borderColor={error.password ? "red.400" : "white"}
          />
          <Text color={"red.500"} fontSize={{ base: "sm", sm: "md" }}>
            {typeof error === "string" ? error : error.message}
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

export default LoginCard;
