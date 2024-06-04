// pages/UserPosts.js
"use client";
import { useEffect, useState } from "react";
import styles from "./myPosts.module.css"; // Import CSS module
import Skeleton from "@mui/material/Skeleton";

const UserPosts = ({ email }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/posts?email=${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [email]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="rectangular" width={210} height={118} />
        <Skeleton variant="text" />
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>User Posts</h1>
      <ul>
        {posts.map((post) => (
          <li className={styles.post} key={post.id}>
            {post.image ? (
              <img src={post.image} alt="Post Image" className={styles.image} />
            ) : null}
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;
