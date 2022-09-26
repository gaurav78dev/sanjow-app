import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleUser from "../../../components/users/SingleUsers";
import style from "../../../styles/Singleuser.module.css";
import { Button } from "@chakra-ui/react";
import Router from "next/router";

const index = () => {
  const router = useRouter();
  const { id } = router.query;
  //state
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const fetchSigleUserData = async () => {
      try {
        const result = await axios.get(`https://reqres.in/api/users/${id}`);
        setData(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchSigleUserData();
    }
  }, [id]);
  return (
    <div className={style.mainContainer}>
      {data !== null && <SingleUser data={data} />}
      <Button onClick={() => Router.back()}>go back</Button>
    </div>
  );
};

export default index;
