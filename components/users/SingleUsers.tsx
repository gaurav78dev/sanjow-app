import { Box, Button, Image } from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";
import EditUser from "../edituser/EditUser";
import call from "../../utils/localStorage/index";
import Auth from "../../utils/authorization";

const SingleUser = ({ data }: any) => {
  // state
  const [open, setOpen] = useState(false);
  const token = call.get("token");
  return (
    <Box
      maxW="sm"
      key={data.id}
      width={"300px"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image src={data.avatar} alt={data.avatar} width="100%" />

      <Box p="6" display={"flex"} flexDirection={"column"} gap={"7px"}>
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
        {token && <Button onClick={() => setOpen(true)}>Edit</Button>}
      </Box>
      <EditUser isOpen={open} setOpen={setOpen} data={data} />
    </Box>
  );
};

export default SingleUser;
