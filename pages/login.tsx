import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import style from "../styles/Login.module.css";

interface FormDataInputsForSignIn {
  password: string;
  email: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<FormDataInputsForSignIn>({
    password: "",
    email: "",
  });
  const toast = useToast();
  const clearForm = () => {
    setFormData({
      password: "",
      email: "",
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post("https://reqres.in/api/register", {
        ...formData,
      });
      if (result) {
        toast({
          title: "Account created",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem("token", result.data.token);
        Router.push("/userlist");
      }
    } catch (error: any) {
      toast({
        title: "Server Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      clearForm();
    }
  };
  const setFromDataValues = (type: string, value: string | number) => {
    setFormData((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };
  return (
    <div className={style.container}>
      <Head>
        <title>Login</title>
      </Head>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: "10px" }}>Login </h1>
        <FormControl mb={7} isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={formData.email}
            onChange={(e: any) => setFromDataValues("email", e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={formData.password}
            onChange={(e: any) => setFromDataValues("password", e.target.value)}
          />
        </FormControl>
        <Button mt={10} type="submit">
          submit
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
