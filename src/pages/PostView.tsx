import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Heading,
  Box,
  Stack,
  Text,
  Divider,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import { usePostsContext } from "../store/posts";
import { POST_ACTIONS } from "../store/types";
import { getRelativeTimestring } from "../util/time";

import svg1 from "../images/new_friend.svg";

const PostView: React.FC<{
  isOpen: boolean;
  post?: any;
  onOpen?: () => void;
  onClose?: () => void;
}> = (props) => {
  const { isOpen, onOpen, onClose, post } = props;

  const [_, dispatch] = usePostsContext();

  if (!post) return null;

  return (
    <Modal
      onClose={() => {
        dispatch({
          type: POST_ACTIONS.HIDE_VIEW_POST,
        });
      }}
      isOpen={isOpen}
      isCentered
      size="full"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader px={10}>
          <Heading mt={"50"} fontSize="5xl">
            {post.title}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={10}>
          <Stack direction="column">
            <Box>{post.description}</Box>
            <Divider pt={2} orientation="horizontal" />
            <Box px={4} display="flex" justifyContent="flex-end">
              <Text as="code" pt={6}>
                <Tooltip
                  hasArrow
                  label="You can only know about someone's identity if they find you helpful"
                  bg="blue.400"
                  zIndex="modal"
                  p={4}
                  borderRadius="xl"
                >
                  <Button>
                    <u>Someone</u>
                  </Button>
                </Tooltip>{" "}
                posted this{" "}
                <code> {getRelativeTimestring(post.datetimeISO)} </code>
              </Text>
            </Box>
            <Box
              w="full"
              pt={10}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={svg1} boxSize={["130px", "220px", "250px"]} />
              <Heading px={4} maxW={["sm", "lg", "xl"]}>
                <Text fontSize="3xl">Think you can help?</Text>
                <Text fontSize="xl" fontWeight="normal">
                  This person reserves her person right to deny any
                  co-operations you may facilitate.
                </Text>
              </Heading>
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() =>
              dispatch({
                type: POST_ACTIONS.HIDE_VIEW_POST,
              })
            }
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostView;
