"use client";
import { useState, useEffect, useRef } from "react";
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
  const [quill, setQuill] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef();


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






  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (quill) {
      const selection = quill.getSelection();
      if (selection) {
        const cursorPosition = selection.index;
        quill.insertEmbed(cursorPosition, 'image', selectedImage);
        quill.setSelection(cursorPosition + 1);
      }
    }
  }, [selectedImage]);

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
      <input
        type="file"
        id="image"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
        <button className={styles.addButton} >
        <label htmlFor="image">
        <Image src="/image.png" alt="Image" width={16} height={16} />
        </label>
        </button>
    
        

      <ReactQuill
        className={styles.textArea}
        theme="bubble"
        value={value}
        onChange={setValue}
        placeholder="Tell your story..."
        modules={{
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'header': 1 }, { 'header': 2 }],  // Add headings
              ['link', 'image', 'code-block'],  // Add link
            ],
          },
        }}
        formats={['bold', 'italic', 'underline', 'strike', 'header', 'link', 'image', 'code-block']}
        ref={(el) => {
          if (el != null) {
            setQuill(el.getEditor());
          }
        }}
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
