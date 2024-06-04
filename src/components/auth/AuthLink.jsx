import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import styles from "./auth.module.css";
import { useRouter } from "next/navigation";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CreateIcon from "@mui/icons-material/Create";
import Image from "next/image";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ThemeToggle from "@/components/themeToggle/themeToggle";
function AuthLink() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    Cookies.remove("user");
    router.push("/");
    setUser(null);
    handleClose();
  };

  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {user ? (
        <>
          <Link href="/write" className={styles.link}>
            <CreateIcon /> &nbsp; Write
          </Link>
          <Image
            src={user?.picture}
            alt="Avatar"
            width={50}
            height={50}
            className={styles.avatar}
            onClick={handleClickOpen}
          />

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link href="/myPosts" className={styles.link}>
                My Posts
              </Link>
            </MenuItem>
            <MenuItem>
              Swtich Modes &nbsp;
              <ThemeToggle />
            </MenuItem>
            <MenuItem onClick={logout}>
              <ExitToAppIcon /> &nbsp; Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
          <ThemeToggle />
        </>
      )}
    </>
  );
}

export default AuthLink;
