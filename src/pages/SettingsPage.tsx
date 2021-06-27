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
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Link,
} from "@chakra-ui/react";
import { logout, useAuthContext } from "../store/auth";
import { useHistory } from "react-router-dom";

const SettingsPage = () => {
  const disabled = true;

  const history = useHistory();

  const [state, dispatch] = useAuthContext();
  const { first_name, last_name, bio, username, imgB64 } = state;

  const handleSignout = () => {
    logout(dispatch);
    history.push("/");
  };

  // alert dialog control
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
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
            <Button ref={cancelRef as any} onClick={onClose}>
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
