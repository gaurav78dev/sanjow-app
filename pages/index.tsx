import { Button, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { NextPage } from "next";
import Router from "next/router";

const Home: NextPage = () => {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast({
    title: "Error",
    description: "No more info available",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
  // State

  // Hooks

  // Handlers
  const messageHandler = () => {
    onToggle();
    if (!isOpen) {
      toast({
        title: "Cool",
        description: "You clicked info button!",
        status: "success",
      });
    }
  };
  // Template
  return (
    <div>
      <Flex alignItems="center" justifyContent="center">
        <Flex direction="column" mt={100}>
          <h1>MY SANJOW APP</h1>
          <Text align="center">Click here to see the userlist</Text>
          <Button
            onClick={() => {
              Router.push("/userlist");
            }}
          >
            User list
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
