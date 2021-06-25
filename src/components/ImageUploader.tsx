import React, { useState } from "react";
import { Box, Input, Image } from "@chakra-ui/react";
import { AUTH_ACTIONS } from "../store/types";
import { getBase64 } from "../util/image_converter";

const ImageUploader = (props: { dispatch: any }) => {
  const [imageB64, setImage] = useState("");

  const Base64Image = (props: { b64: string }) => {
    return <Image src={props.b64} height="100%" alignItems="center" />;
  };

  return (
    <>
      {imageB64 && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h={150}
          bg="gray.100"
          rounded="xl"
          px={2}
        >
          <Base64Image b64={imageB64} />
        </Box>
      )}
      <Input
        fontFamily={"heading"}
        bg={"gray.200"}
        color={"gray.800"}
        type="file"
        onChange={async (e) => {
          getBase64(e.target.files[0], (b64: string) => {
            setImage(b64);
            props.dispatch({
              type: AUTH_ACTIONS.FIELD,
              payload: {
                field: "imgB64",
                value: b64,
              },
            });
          });
        }}
      />
    </>
  );
};

export default ImageUploader;
