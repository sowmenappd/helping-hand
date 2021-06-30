import React, { useState } from "react";
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
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { logout, useAuthContext } from "../store/auth";
import { AUTH_ACTIONS } from "../store/types";

import authController from "../controller/auth";

const SettingsPage = () => {
  const [disabled, setEditable] = useState(true);
  const [changed, setChanged] = useState(false);

  const history = useHistory();

  const [state, dispatch] = useAuthContext();
  const { first_name, last_name, bio, username, imgB64, id } = state;
  const changeable = { first_name, last_name, bio };
  const [edittedState, setEdits] = useState(changeable) as any;

  console.log("state", state);

  const handleFieldEdit = (field: string, value: string) => {
    if (field === "tags") {
    } else setEdits({ ...edittedState, [field]: value });
    console.log(field, value);

    setChanged(true);
  };

  const updateProfile = async (id: string) => {
    setEditable(false);
    try {
      await authController.updateProfile(id, edittedState, state.token);

      Object.keys(changeable).forEach((field: string) => {
        dispatch({
          type: AUTH_ACTIONS.FIELD,
          payload: {
            field: field,
            value: edittedState[field],
          },
        });
      });

      toast({
        title: "Action successful.",
        description: "Your profile has been updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (err) {
      setChanged(false);
      toast({
        title: "Action failed.",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setEdits({ first_name, last_name, bio });
    }
  };

  const handleSignout = () => {
    logout(dispatch);
    history.push("/");
  };

  // alert dialog control
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  return (
    <>
      <VStack spacing={4} alignItems="flex-start">
        <Box w={["full", "full", "full", "2xl", "4xl"]}>
          <Heading
            as="h1"
            fontSize={["4xl", "6xl"]}
            display="flex"
            alignItems="baseline"
          >
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
            <Text
              color="blue.300"
              textDecorationLine="underline"
              _hover={{
                cursor: "pointer",
              }}
              onClick={() => {
                if (!disabled && changed) updateProfile(id);
                setEditable(!disabled);
              }}
            >
              {disabled ? "Edit" : changed ? "Save" : "Close"}
            </Text>
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
                value={edittedState.first_name}
                disabled={disabled}
                onChange={handleFieldEdit}
              />
              <SettingsInputField
                label="last_name"
                labelDisplay="Last name"
                placeholder="Loading.."
                value={edittedState.last_name}
                disabled={disabled}
                onChange={handleFieldEdit}
              />
            </Stack>
            <Stack direction={["column", "column", "row"]} px={2} pt={4}>
              <SettingsInputField
                label="username"
                labelDisplay="Username"
                placeholder="Loading.."
                value={username}
                disabled={true}
                small
              />
              <SettingsPhotoField img={imgB64} />
            </Stack>

            <Stack direction={["column", "column", "row"]} px={2} pt={4}>
              <SettingsInputField
                label="bio"
                labelDisplay="Personal biography"
                placeholder=""
                value={edittedState.bio || ""}
                disabled={disabled}
                textArea
                onChange={handleFieldEdit}
              />
            </Stack>
            <Box my={5} px={2} pt={4}>
              <Heading size="lg" pt={10} pb={4}>
                Account
              </Heading>
              <Button ml={1} bg="red.400" textColor="white" onClick={onOpen}>
                Sign out
              </Button>
            </Box>
          </Stack>
        </Box>
      </VStack>
      <QuitDialog
        onOpen={onOpen}
        onClose={onClose}
        onSignout={handleSignout}
        isOpen={isOpen}
      />
    </>
  );
};

const QuitDialog: React.FC<{
  onOpen: any;
  onClose: any;
  onSignout: any;
  isOpen: boolean;
}> = ({ onOpen, onClose, onSignout: onLogout, isOpen }) => {
  const cancelRef = React.useRef(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Sign out from account?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to sign out from your account on this device?
            <br />
            You'll have to sign in again from this device to use{" "}
            <b>HelpingHand</b>.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={onLogout}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
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
  onChange?: (field: string, value: any) => void;
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
            onChange={({ currentTarget: { value } }) =>
              props.onChange?.(props.label, value)
            }
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
          onChange={({ currentTarget: { value } }) =>
            props.onChange?.(props.label, value)
          }
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
        <Link href="/">
          <Button size="xs" colorScheme="linkedin">
            Change
          </Button>
        </Link>
      </Box>
    </HStack>
  );
};

export default SettingsPage;
