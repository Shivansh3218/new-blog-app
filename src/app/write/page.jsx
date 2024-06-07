"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./writePage.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const categories = [
  "Lifestyle",
  "Fashion",
  "Food",
  "Travel",
  "Culture",
  "Coding",
  "Technology",
  "Health",
  "Fitness",
  "Finance",
  "Business",
  "Education",
  "Entertainment",
  "Sports",
  "Music",
  "Movies",
  "Books",
  "Photography",
  "DIY",
  "Home Decor",
  "Parenting",
  "Pets",
  "Beauty",
  "Science",
  "Environment",
  "History",
  "Politics",
  "Psychology",
  "Relationships",
  "Self-Improvement",
];

const WritePage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    setIsButtonDisabled(!(title && value && selectedCategories.length > 0));
  }, [title, value, selectedCategories]);

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !value || selectedCategories.length === 0) {
      console.log("Please fill in all required fields");
      return;
    }

    const payload = {
      title,
      desc: value,
      // img: media,
      categories: selectedCategories,
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.status === 200) {
      const data = await res.json();
      setSubmissionMessage("Your blog post has been successfully submitted!");
    } else {
      console.log("Error:", res.statusText);
      setSubmissionMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      {/* Title input */}
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Editor */}
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="Add" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input type="file" id="image" style={{ display: "none" }} />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="Image" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image
                src="/external.png"
                alt="External"
                width={16}
                height={16}
              />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="Video" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>

      {/* Publish button */}
      <button
        className={`${styles.publish} ${
          isButtonDisabled ? styles.disabled : ""
        }`}
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        Publish now
      </button>

      {/* Category selection */}
      <div className={styles.categorySelection}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategories.includes(category) ? styles.selected : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WritePage;
