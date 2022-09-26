import { Box, Image } from "@chakra-ui/react";
import Router from "next/router";
import React from "react";

const User = ({ data }: any) => {
  return (
    <Box
      maxW="sm"
      width={"200px"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      onClick={() => Router.push(`/userlist/${data.id}`)}
    >
      <Image src={data.avatar} alt={data.avatar} width="100%" />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {data.first_name + data.last_name}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {data.email}
        </Box>
      </Box>
    </Box>
  );
};

export default User;
