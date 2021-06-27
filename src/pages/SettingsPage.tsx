import React from "react";
import {
  VStack,
  Box,
  Heading,
  Stack,
  Text,
  Input,
  Textarea,
  HStack,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useAuthContext } from "../store/auth";

const SettingsPage = () => {
  const disabled = true;

  const [state] = useAuthContext();
  const { first_name, last_name, bio, username, imgB64 } = state;

  return (
    <VStack spacing={4} alignItems="flex-start">
      <Box
        w={["100%", "100%", "100%", "100%", "4xl"]}
        maxW={["xl", "xl", "xl", "2xl", "4xl"]}
      >
        <Heading as="h1" fontSize={["4xl", "6xl"]}>
          <span
            style={{
              color: "#272727",
              opacity: 0.15,
              paddingLeft: 20,
              paddingRight: 10,
            }}
          >
            <b>#</b>
          </span>
          Settings
        </Heading>
        <Stack direction={["column"]} mt={2} mx={4}>
          <Heading size="xl" pt={10} px={2}>
            Personal Information
          </Heading>
          <Stack direction={["column", "column", "row"]} px={2} pt={4}>
            <SettingsInputField
              label="first_name"
              labelDisplay="First name"
              placeholder="Loading.."
              value={first_name}
              disabled={disabled}
            />
            <SettingsInputField
              label="last_name"
              labelDisplay="Last name"
              placeholder="Loading.."
              value={last_name}
              disabled={disabled}
            />
          </Stack>
          <Stack direction={["column", "column", "row"]} px={2} pt={4}>
            <SettingsInputField
              label="username"
              labelDisplay="Username"
              placeholder="Loading.."
              value={username}
              disabled={disabled}
              small
            />
            <SettingsPhotoField img={imgB64} />
          </Stack>

          <Stack direction={["column", "column", "row"]} px={2} pt={4}>
            <SettingsInputField
              label="bio"
              labelDisplay="Personal biography"
              placeholder="Loading.."
              value={bio}
              disabled={disabled}
              textArea
            />
          </Stack>
        </Stack>
      </Box>
    </VStack>
  );
};

const SettingsInputField: React.FC<{
  label: string;
  labelDisplay: string;
  placeholder: string;
  value: any;
  disabled: boolean;
  textArea?: boolean;
  small?: boolean;
}> = (props) => {
  return (
    <VStack maxW="full" w="full" spacing={2} align="flex-start">
      <Text fontSize="lg" fontWeight="extrabold">
        {props.labelDisplay}
      </Text>
      {props.textArea ? (
        <>
          <Textarea
            variant="filled"
            placeholder={props.placeholder}
            value={props.value}
            isDisabled={props.disabled}
            size="lg"
            fontSize="xl"
          />
        </>
      ) : (
        <Input
          variant="filled"
          placeholder={props.placeholder}
          value={props.value}
          isDisabled={props.disabled}
          size="lg"
          fontSize="xl"
          maxW={props.small ? "sm" : "-moz-initial"}
        />
      )}
    </VStack>
  );
};

const SettingsPhotoField: React.FC<{ img: any }> = (props) => {
  return (
    <HStack
      maxW="full"
      w="full"
      spacing={2}
      pt={2}
      align={"center"}
      justify={["center", "flex-end"]}
    >
      <Box display="flex" flexDir="column" alignItems="center">
        <Avatar src={props.img} size={"lg"} alt={"Avatar"} mb={2} />
        <Button size="xs" colorScheme="linkedin">
          Change
        </Button>
      </Box>
    </HStack>
  );
};

export default SettingsPage;
