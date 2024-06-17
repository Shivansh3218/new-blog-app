import React from "react";
import RecentPosts from "@/components/recentPosts/Recent";
import styles from "./page.module.css"; // Import CSS module
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
function page() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Our Articles</h1>
        <p className={styles.description}>
          This is a melting point of insights, tips, and innovative ways to use
          DevSama blogs tailored for people who thrive on web innovation.
        </p>
        <TextField
          className={styles.searchInput}
          style={{ color: "white", border: "2px solid white" }}
                  placeholder="Search"
        
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ color: "white" }}>
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <RecentPosts />
    </>
  );
}

export default page;
