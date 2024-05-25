/* global google */

"use client";
import { useState, useEffect } from "react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const router = useRouter();

  const handleCallbackResponse = async (response) => {
    let jwtToken = response.credential;
    let decodedToken = jwtDecode(jwtToken);

    const { name, email, picture } = decodedToken;
    console.log(name, email, picture);

    try {
      // Check if the user already exists in the database
      const userResponse = await fetch(`/api/users/user?email=${email}`);
      const userData = await userResponse.json();

      if (!userData) {
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
        console.log(user);
        router.push("/");
      } else {
        // If user exists, log a message
        console.log("User already exists in the database");
         router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
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
