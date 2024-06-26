"use client"
import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
// import ThemeToggle from "@/components/themeToggle/themeToggle";
import AuthLink from "../auth/AuthLink";
import Cookies from "js-cookie";
const Header = () => {
   
const user = Cookies.get("user");

  return (
    <div className={styles.container}>
      <Link href= {user?"/home":"/"}>
        <div className={styles.logo}>Dev Sama Blog</div>
      </Link>
      <div className={styles.links}>
        {/* <Link href="/" className={styles.link}>
          Homepage
        </Link>
        <Link href="/" className={styles.link}>
          Contact
        </Link>
        <Link href="/" className={styles.link}>
          About
        </Link> */}
        <AuthLink className={styles.link} />

        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
};

export default Header;
