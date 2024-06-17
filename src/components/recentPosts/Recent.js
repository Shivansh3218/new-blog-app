// pages/index.js
"use client";
import { useEffect, useState } from "react";
import styles from "./recent.module.css"; // Import CSS module
import Skeleton from "@mui/material/Skeleton";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/posts`);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    return date.toLocaleString("en-US", options);
  }

  console.log(formatDateTime("2024-06-17T09:58:24.621Z")); // Outputs: "June 17, 2024, 09:58:24"

  if (loading) {
    return (
      <>
        <div className={styles.container}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
        <div className={styles.container}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
        <div className={styles.container}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={118} />
        </div>
      </>
    );
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>; // Apply error class
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Recent Posts</h1>
      <ul>
        {posts.length > 0 &&
          posts.map((post) => (
            <li className={styles.post} key={post.id}>
              <div className={styles.postHeader}>
                <h3 className={styles.authorName}>{post.authorName}</h3>
                <h3 className={styles.date}>{formatDateTime(post.date)}</h3>
              </div>
              {post.image ? (
                <img
                  src={post.image}
                  alt="Post Image"
                  className={styles.image}
                />
              ) : null}
              <h2 className={styles.title}>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
