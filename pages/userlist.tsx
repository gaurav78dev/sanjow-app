import React from "react";
import Router from "next/router";
import axios from "axios";
import { Box, Button, Container, Image, useToast } from "@chakra-ui/react";
import User from "../components/users/User";
import { UserList } from "../types/globalTypes";

interface UserListProps {
  userList: Array<UserList>;
  page: any;
}

const userlist = (props: UserListProps) => {
  // taking userlist from props
  const { userList, page } = props;
  const toast = useToast();
  // functions
  const changePage = (number: number) => {
    Router.push(`/userlist?page=${parseInt(page) + number}&per_page=4`);
  };
  return (
    <Container
      display="flex"
      flexWrap={"wrap"}
      gap="12px"
      cursor={"pointer"}
      maxWidth={"80ch"}
      style={{ alignItems: "center" }}
    >
      {/* pagination */}
      <Box w="100%" p={4} color="black" display={"flex"} gap={"20px"}>
        <Button
          colorScheme="teal"
          variant="outline"
          disabled={page <= 1}
          onClick={() => changePage(-1)}
        >
          Prev
        </Button>
        {page}
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            if (page >= 3) {
              return toast({
                title: "dont have more then 12 users in database",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
            changePage(1);
          }}
        >
          Next
        </Button>
      </Box>
      {/* userLists */}
      {userList.length > 0 &&
        userList.map((data: any, key: number) => {
          return (
            <div key={data.id}>
              <User data={data} />
            </div>
          );
        })}
    </Container>
  );
};

// userlist.getInitialProps = async ({ query: { page = 1 } }) => {
//   try {
//     const result = await axios.get(
//       `https://reqres.in/api/users?page=${page}&per_page=4`
//     );
//     return {
//       userList: result.data.data,
//       page: page,
//     };
//   } catch (error) {
//     console.log(error, "error");
//   }
// };

//for SEO optimazation
export async function getServerSideProps({ query: { page = 1 } }) {
  try {
    const result = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=4`
    );
    return {
      props: {
        userList: result.data.data,
        page: page,
      },
    };
  } catch (error) {
    console.log(error, "error");
  }
}

export default userlist;
