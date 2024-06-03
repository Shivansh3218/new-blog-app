import React from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import styles from "./auth.module.css"
import { useRouter } from "next/navigation";

function AuthLink() {
  const router = useRouter();
  // const user = Cookies.get("user");
  const { user, setUser } = useContext(AuthContext);
  console.log(user, "user");
    const logout = () => {
      Cookies.remove("user");
      // Use your router library to redirect to homepage
      // For example, with Next.js router:
        router.push("/");
        setUser(null);
    };
  return (
    <>
      {user ? (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <button onClick={logout} className={styles.link}>
            Logout
          </button>
        </>
      ) : (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      )}
    </>
  );
}

export default AuthLink;
