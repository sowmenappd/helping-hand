import React from "react";
import { Box, Input, Image, Button } from "@chakra-ui/react";
import { getBase64 } from "../util/image_converter";

const ImageUploader = (props: {
  imgB64: string;
  showImage: boolean;
  buttonText?: string;
  disabled?: boolean;
  onImage: (imgB64: string) => void;
}) => {
  const Base64Image = (props: { b64: string }) => {
    return <Image src={props.b64} height="100%" alignItems="center" />;
  };

  return (
    <>
      {props.showImage && props.imgB64 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h={150}
          bg="gray.100"
          rounded="xl"
          px={2}
        >
          <Base64Image b64={props.imgB64} />
        </Box>
      )}
      <Input
        id="fileUploader"
        type="file"
        style={{ display: "none" }}
        onChange={(e: any) => {
          getBase64(e.target.files[0], (b64: string) => {
            props.onImage?.(b64);
          });
        }}
      />
      <Button
        colorScheme="linkedin"
        onClick={() => {
          document.getElementById("fileUploader")?.click();
        }}
        isDisabled={props.disabled}
      >
        {props.buttonText ||
          (props.imgB64 ? "Photo selected" : "Upload a photo")}
      </Button>
    </>
  );
};

export default ImageUploader;
