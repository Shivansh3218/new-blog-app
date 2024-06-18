"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import Cookies from "js-cookie";
import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarContent } from "@mui/material";
import { user } from "@nextui-org/react";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  const [value, setValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [image, setImage] = useState(null); // Add this line
  const [quill, setQuill] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [highlightCategories, setHighlightCategories] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    setIsButtonDisabled(!(title && value));
  }, [title, value]);


  const handleCategoryClick = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
  
      if (!allowedTypes.includes(file.type)) {
        alert("Only PNG, JPG, and GIF files are allowed.");
        return;
      }
  
      // Use URL.createObjectURL to create a URL for the file
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };
  const user = JSON.parse(Cookies.get("user")); // Get the user cookie

  useEffect(() => {
    if (quill) {
      const selection = quill.getSelection();
      if (selection) {
        const cursorPosition = selection.index;
        quill.insertEmbed(cursorPosition, "image", image);
        quill.setSelection(cursorPosition + 1);
      }
    }
  }, [image]);

  const handleSubmit = async () => {
    if (selectedCategories.length === 0) {
      // Highlight category selection area
      setHighlightCategories(true);
      setTimeout(() => setHighlightCategories(false), 3000); // Remove highlight after 3 seconds
      return; // Prevent form submission
    }
    setIsLoading(true);
    const user = JSON.parse(Cookies.get("user")); // Get the user cookie
    const payload = {
      title,
      image, // This is the image URL from the state
      body: value.replace(/<p>|<\/p>/g, ""), // This is the post body from the state
      authorEmail: user?.email, // Use the email from the cookie
      authorId: user?.id, // Use the user from the cookie
      authorName: user?.name, // Use the name from the cookie
      categories: selectedCategories, // This is the selected categories from the state
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);

    if (res.status === 200) {
      const data = await res.json();
      setSubmissionMessage("Your blog post has been successfully submitted!");
      setOpenSnackbar(true); // Open the snackbar
      // Reset form
      setTitle("");
      setValue("");
      setSelectedCategories([]);
      setImage(null);
    } else {
      console.log("Error:", res.statusText);
      setSubmissionMessage("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [isLoading]);

  return (
    <div className={styles.container} style={{ position: "relative" }}>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.768);",
          }}
        >
          <CircularProgress color="success" />
        </Box>
      )}

      <div className={styles.titlePublish}>
        {/* Title input */}
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

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

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message={submissionMessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <SnackbarContent
            style={{ backgroundColor: "green", color: "white" }}
            message={submissionMessage}
          />
        </Snackbar>
      </div>
      <div className={styles.editorCategory}>
        {/* Editor */}
        <div className={styles.editor}>
          <div style={{ display: "flex" }}>
            <input
              type="file"
              id="image"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <button className={styles.addButton}>
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
                    ["bold", "italic", "underline", "strike"],
                    [{ header: 1 }, { header: 2 }], // Add headings
                    ["link", "image", "code-block"], // Add link
                  ],
                },
              }}
              formats={[
                "bold",
                "italic",
                "underline",
                "strike",
                "header",
                "link",
                "image",
                "code-block",
              ]}
              ref={(el) => {
                if (el != null) {
                  setQuill(el.getEditor());
                }
              }}
            />
          </div>

          {image && (
            <div
              className={styles.imagePreview}
              style={{ position: "relative", display: "inline-block" }}
            >
              <div style={{ position: "relative", display: "inline-flex" }}>
                <img
                  src={image}
                  alt="Selected"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
                <CloseIcon
                  onClick={() => setImage(null)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                    color: "red", // Change as needed
                    backgroundColor: "white", // Optional for better visibility
                    borderRadius: "50%", // Optional for a rounded shape
                    margin: "5px", // Ensures the icon does not overlap the image border
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {/* Category selection */}

        <div
          className={`${styles.categorySelection} ${
            highlightCategories ? styles.highlight : ""
          }`}
        >
          {highlightCategories && (
            <div
              style={{
                textAlign: "center",
                color: "red",
                marginBottom: "10px",
              }}
            >
              Please select a category before publishing
            </div>
          )}

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
    </div>
  );
};

export default WritePage;
