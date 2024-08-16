"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Updated import for useParams
import styles from "./postDetail.module.css";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const params = useParams(); // Use useParams instead of useRouter
  const { id } = params;

  useEffect(() => {
    // Retrieve the post from localStorage
    const storedPost = localStorage.getItem("selectedPost");
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    } else {
      // If no post is found, handle it (e.g., redirect or show an error)
      // Example: Redirecting to home (optional)
      window.location.href = "/";
    }
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.postHeader}>
        <h3 className={styles.authorName}>{post.authorName}</h3>
        <h3 className={styles.date}>{new Date(post.date).toLocaleString()}</h3>
      </div>
      {post.image ? (
        <img src={post.image} alt="Post Image" className={styles.image} />
      ) : null}
      <p className={styles.body}>{post.body}</p>
    </div>
  );
};

export default PostDetail;
