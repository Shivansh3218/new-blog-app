/* global google */

"use client";
import { useState, useEffect } from "react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useContext } from "react";
import {AuthContext} from "@/context/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useContext(AuthContext);

const handleCallbackResponse = async (response) => {
  let jwtToken = response.credential;
  let decodedToken = jwtDecode(jwtToken);

  const { name, email, picture } = decodedToken;
  console.log(name, email, picture);

  try {
    // Check if the user already exists in the database
    const userResponse = await fetch(`/api/users/user?email=${email}`);
    const userData = await userResponse.json();

    console.log(userData, "this is the data of the user");

    if (userData) {
      // If user data exists, store it in cookies
      Cookies.set("user", JSON.stringify(userData));
      setUser(userData);
      
      router.push("/home");
    } else {
      // If user doesn't exist, make a POST request to add the user
      const user = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          picture,
        }),
      });

      const userResponse = await user.json();
      console.log(userResponse, "this is the user response");

      // Store the new user data in cookies
      Cookies.set("user", JSON.stringify(userResponse));
      setUser(userResponse);

      router.push("/home");
    }
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    google?.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID,
      callback: handleCallbackResponse,
    });

    google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      width: 200,
      size: "large",
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.socialButton} id="signInDiv">
          Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
