import React from "react";
import {
  VStack,
  Box,
  Heading,
  Stack,
  Text,
  Input,
  Textarea,
} from "@chakra-ui/react";

const SettingsPage = () => {
  const disabled = true;

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
              value=""
              disabled={disabled}
            />
            <SettingsInputField
              label="last_name"
              labelDisplay="Last name"
              placeholder="Loading.."
              value=""
              disabled={disabled}
            />
          </Stack>
          <Stack direction={["column", "column", "row"]} px={2} pt={4}>
            <SettingsInputField
              label="bio"
              labelDisplay="Personal biography"
              placeholder="Loading.."
              value="..."
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
}> = (props) => {
  return (
    <VStack maxW="full" w="full" spacing={2} align="self-start">
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
        />
      )}
    </VStack>
  );
};

export default SettingsPage;
