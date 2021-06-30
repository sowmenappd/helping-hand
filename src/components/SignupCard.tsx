import {
  Stack,
  Heading,
  Box,
  Input,
  Button,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { signup, useAuthContext } from "../store/auth";
import { AUTH_ACTIONS } from "../store/types";
import ImageUploader from "./ImageUploader";

const SignupCard: React.FC<{
  onActivateLogin: any;
}> = (props) => {
  const { onActivateLogin } = props;
  const [state, dispatch] = useAuthContext();
  const {
    username,
    email,
    first_name,
    last_name,
    password,
    imgB64,
    confirm_password,
    loading,
    error,
  } = state;

  const toast = useToast();
  const handleSignup = async () => {
    signup(
      {
        username,
        email,
        password,
        confirm_password,
        first_name,
        last_name,
        imgB64,
      },
      dispatch,
      () => {
        toast({
          title: "Account creation successful.",
          description:
            "Your account has been created. You can now login with your username and password.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        onActivateLogin();
      }
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
            isRequired
            placeholder="First name"
            bg={"gray.100"}
            borderWidth={error.first_name ? 2 : 0}
            borderColor={error.first_name ? "red.400" : "white"}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "first_name", value: e.currentTarget.value },
              })
            }
          />
          <Input
            isRequired
            placeholder="Last name"
            bg={"gray.100"}
            borderWidth={error.last_name ? 2 : 0}
            borderColor={error.last_name ? "red.400" : "white"}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "last_name", value: e.currentTarget.value },
              })
            }
          />
          <Input
            isRequired
            placeholder="Email"
            type="email"
            bg={"gray.100"}
            borderWidth={error.email ? 2 : 0}
            borderColor={error.email ? "red.400" : "white"}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: { field: "email", value: e.currentTarget.value },
              })
            }
          />
          <Input
            isRequired
            placeholder="Username (can contain only alphabets and numbers)"
            bg={"gray.100"}
            borderWidth={error.username ? 2 : 0}
            borderColor={error.username ? "red.400" : "white"}
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
          />

          <Input
            isRequired
            placeholder="Password"
            type="password"
            bg={"gray.100"}
            borderWidth={error.password ? 2 : 0}
            borderColor={error.password ? "red.400" : "white"}
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
          />

          <Input
            isRequired
            placeholder="Confirm password"
            type="password"
            bg={"gray.100"}
            borderWidth={error.password ? 2 : 0}
            borderColor={error.password ? "red.400" : "white"}
            color={"gray.500"}
            _placeholder={{
              color: "gray.500",
            }}
            onChange={(e) =>
              dispatch({
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
              dispatch({
                type: AUTH_ACTIONS.FIELD,
                payload: {
                  field: "imgB64",
                  value: imgB64,
                },
              });
            }}
          />
          {error && (
            <Text color={"red.500"} fontSize={{ base: "sm", sm: "md" }}>
              {error.message || error}
            </Text>
          )}
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
