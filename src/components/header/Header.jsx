"use client"
import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/themeToggle/themeToggle";
import AuthLink from "../auth/AuthLink";
import Cookies from "js-cookie";

const Header = () => {
   


  return (
    <div className={styles.container}>
      <div className={styles.logo}>Dev Sama Blog</div>
      <div className={styles.links}>
        <Link href="/" className={styles.link}>
          Homepage
        </Link>
        <Link href="/" className={styles.link}>
          Contact
        </Link>
        <Link href="/" className={styles.link}>
          About
        </Link>
        <AuthLink className={styles.link} />
        
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
