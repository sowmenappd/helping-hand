import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Heading,
} from "@chakra-ui/react";
import { hideNotifyAlertForPost, usePostsContext } from "../store/posts";
import { deletePost as deletePostFunction } from "../store/posts";
import { useAuthContext } from "../store/auth";

const DeletePostAlert: React.FC = () => {
  const [{ token }] = useAuthContext();
  const [{ deletePost }, dispatch] = usePostsContext();

  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={!!deletePost}
      leastDestructiveRef={cancelRef}
      onClose={() => {
        hideNotifyAlertForPost(dispatch);
      }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Heading as="h1">Delete Post?</Heading>
            <Heading as="h3" fontSize="larger" width="fit-content" py="4px">
              {deletePost?.title}
            </Heading>
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                hideNotifyAlertForPost(dispatch);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                deletePostFunction(deletePost, dispatch, token);
              }}
              disabled={!deletePost}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeletePostAlert;
