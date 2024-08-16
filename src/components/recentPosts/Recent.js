"use client"

import { useEffect, useState } from "react";
import styles from "./recent.module.css";
import Skeleton from "@mui/material/Skeleton";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/posts`);

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

  function truncateText(text, length) {
    if (text.length <= length) {
      return text;
    }
    return text.slice(0, length) + "...";
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.container}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={300} height={118} />
        </div>
        <div className={styles.container}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={300} height={118} />
        </div>
        <div className={styles.container}>
          <Skeleton variant="text" />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={300} height={118} />
        </div>
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  const handleReadMore = (post) => {
    // Store the entire post in localStorage
    localStorage.setItem("selectedPost", JSON.stringify(post));

    // Navigate to the detail page
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Recent Posts</h1>
      <ul>
        {currentPosts.map((post) => (
          <li className={styles.post} key={post.id}>
            <div className={styles.postHeader}>
              <h3 className={styles.authorName}>{post.authorName}</h3>
              <h3 className={styles.date}>{formatDateTime(post.date)}</h3>
            </div>
            {post.image ? (
              <img src={post.image} alt="Post Image" className={styles.image} />
            ) : null}
            <h2 className={styles.title}>{post.title}</h2>
            <p>
              {truncateText(post.body, 100)} &nbsp;
              <button onClick={() => handleReadMore(post)}>
                <a href={`/post/${post.id}`} className={styles.readMore}>
                  Read More
                </a>
              </button>
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(posts.length / postsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentPosts;
