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
import { signup } from "../store/auth";
import { AUTH_ACTIONS } from "../store/types";
import ImageUploader from "./ImageUploader";

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
          <Link to="/" color="red.400" onClick={onActivateLogin}>
            Login here
          </Link>
        </Text>
      </Box>
    </Stack>
  );
};

export default SignupCard;
