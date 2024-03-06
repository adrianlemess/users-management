import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

type DeleteConfirmationDialogProps = {
  isOpen: boolean;
  userEmail: string;
  onClose: () => void;
  userId: number;
  deleteUser: (id: number) => void;
};
export const DeleteConfirmationDialog = (
  props: DeleteConfirmationDialogProps,
) => {
  const { isOpen, onClose, userEmail, userId, deleteUser } = props;
  const cancelRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <AlertDialog
        isCentered
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        data-testid="delete-confirmation-dialog"
        motionPreset="slideInBottom"
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete the user {userEmail}? You
              can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                data-testid={`delete-confirmation-button-${userEmail}`}
                colorScheme="red"
                ml={3}
                onClick={() => deleteUser(userId)}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
