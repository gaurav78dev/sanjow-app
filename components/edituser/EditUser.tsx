import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface EditUser {
  isOpen: boolean;
  setOpen: (data: boolean) => void;
  data: any;
}

function EditUser({ isOpen, setOpen, data }: EditUser) {
  //out side hooks
  const toast = useToast();

  const [editForm, setEditForm] = useState({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    confirmEmail: "",
  });
  const onClose = () => {
    setOpen(false);
  };
  const onChangeHandler = (type: string, value: string) => {
    setEditForm((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };
  const updateDataToServer = async () => {
    try {
      const result = await axios.patch(
        `https://reqres.in/api/users/${data.id}`,
        { ...editForm }
      );
      if (result) {
        console.log(result.data.data, "->>", "server response");
        onClose();
      }
    } catch (error) {
      console.log(error, "<<-", "server response");
      onClose();
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (editForm.email.trim() !== editForm.confirmEmail.trim()) {
      return toast({
        title: "Email mismatched",
        description: "please write the same email in both input",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    toast({
      title: "details Sucessfully changed",
      description: JSON.stringify(editForm),
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    updateDataToServer();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit your details</ModalHeader>
          <Box p={30}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="name"
                  value={editForm.first_name}
                  onChange={(e) =>
                    onChangeHandler("first_name", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="name"
                  value={editForm.last_name}
                  onChange={(e) => onChangeHandler("last_name", e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => onChangeHandler("email", e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirmation email</FormLabel>
                <Input
                  type="email"
                  value={editForm.confirmEmail}
                  onChange={(e) =>
                    onChangeHandler("confirmEmail", e.target.value)
                  }
                />
              </FormControl>
              <Button type="submit" mt={5}>
                Submit
              </Button>
            </form>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditUser;
