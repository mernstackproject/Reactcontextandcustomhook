import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

const Edit = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate(); 
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(null);
  useEffect(() => {
    const findImageData = state?.value?.find((i) => i._id === id);
    if (findImageData) {
      setImageUrl(`http://localhost:4006/${findImageData.file}`);
    } else {
      navigate("*");
    }
  }, [id, state, navigate]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const regex = /\.(jpg|jpeg|png)$/i;
    if (!regex.test(e.target.files[0].name)) {
      setImageError(
        "Invalid file format. Please upload a JPG, JPEG, or PNG file."
      );
    } else {
      setImageError("");
    }
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const imageSubmit = async (e) => {
    e.preventDefault();
    const regex = /\.(jpg|jpeg|png)$/i;
    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);

    if (!regex.test(image.name)) {
      setImageError(
        "Invalid file format. Please upload a JPG, JPEG, or PNG file."
      );
      return false;
    }

    try {
      const response = await axios.post(
        "http://localhost:4006/api/v1/singleImageUpload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/image")
      // Handle success message
    } catch (error) {
      console.error("Error uploading image: ", error);
      // Handle error message
    }
  };

  return (
    <>
      <p>Image Edit</p>
      <form onSubmit={imageSubmit}>
        <input type="file" name="image" onChange={handleChange} />
        {imageError && imageUrl ? (
          ""
        ) : (
          <img
            alt="upload"
            style={{ height: "100px", width: "100px" }}
            src={imageUrl}
          />
        )}

        <p style={{ color: "red" }}>{imageError}</p>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Edit;
