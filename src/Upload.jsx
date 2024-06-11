import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Upload = () => {
  const [show, setShow] = useState(false);
  const [colorCount, setColorCount] = useState("");
  const colorArray = [
    "#FF0000",
    "#0000FF",
    "#FFC0CB",
    "#808080",
    "#FFFFE0",
    "#800080",
    "#FFD700",
    "#FFFF00",
    "#FFA500",
  ];
  const handleColorChange = () => {
    // setColorCount((colorCount) => (colorCount + 1) % colorArray.length)
    setColorCount((colors) => (colors >= 8 ? 0 : colors + 1));
  };

  const [data, setData] = useState([
    {
      name: "",
      ag1: "",
      friend: "",
    },
  ]);
  const [one, setOne] = useState(1);
  const handleClick = useCallback(() => {
    setOne((prevState) => prevState + 1);
  }, []);
  const renderInc = useMemo(() => {
    return (
      <>
        <p>{one}</p>
        <button type="submit" onClick={handleClick}>
          Increase
        </button>
      </>
    );
  }, [one, handleClick]);
  useEffect(() => {
    return () => {};
  }, [one]);

  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageData, setImageData] = useState([]);
  const imageSubmit = async (e) => {
    e.preventDefault();
    const regex = /\.(jpg|jpeg|png)$/i;
    if (image === "") {
      console.log("imaaafff", image.size);
      setImageError("This is not a valid image");
      return false;
    } else if (!regex.test(image.name)) {
      setImageError(
        "Invalid file format. Please upload a JPG, JPEG, or PNG file."
      );
      return false;
    } else if (image.size > 2 * 1024 * 1024) {
      setImageError("File size should be less than 2 MB.");
      return false;
    }
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("http://localhost:4006/api/v1/singleImageUpload", formData)
      .then((response) => {
        console.log(response.data);
        // Handle success message
      })
      .catch((error) => {
        console.error("Error uploading image: ", error);
        // Handle error message
      });
  };
  const handleImageChange = (e) => {
    const regex = /\.(jpg|jpeg|png)$/i;
    if (!e.target.files[0]) {
      setImageError("This field is required");
    } else if (!regex.test(e.target.files[0].name)) {
      setImageError(
        "Invalid file format. Please upload a JPG, JPEG, or PNG file."
      );
    } else if (e.target.files[0].size > 2 * 1024 * 1024) {
      // 2 MB in bytes
      setImageError("File size should be less than 2 MB.");
      console.log("image.size", image.size);
    } else {
      setImageError("");
    }
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    const getImage = async () => {
      // const data = await axios.get("http://localhost:4006/api/v1/getImage");
      setImageData(data?.data?.data);
    };

    getImage();
  }, []);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...data];
    updatedData[index][name] = value;
    setData(updatedData);
  };
  const handleOpenDiv = () => {
    setShow(false);
  };
  const handleClose = () => {
    setShow(true);
  };
  const functionToCheckEmptyValues = (d) => {
    for (const f of d) {
      if (f.name.trim() === "" || f.ag1.trim() === "") {
        return true;
      }
    }
    return false;
  };

  const handleSubmitData = () => {
    const emptyElement = functionToCheckEmptyValues(data);
    if (emptyElement) {
      alert("Please enter an empty value");
      return;
    }
    console.log("dd", data);
  };
  const handleAddInput = () => {
    const val = {
      name: "",
      ag1: "",
      friend: "",
    };
    setData([...data, val]);
  };
  const array = [
    {
      name: "dsds",
      status: "pending",
    },
    {
      name: "dsds",
      status: "approved",
    },
    {
      name: "dsds",
      status: "rejected",
    },
    {
      name: "dsds",
      status: "pending",
    },
  ];
  return (
    <>
      {array.map((i) => {
        return (
          <>
            <p>{i.name}</p>
            <p>{i.status}</p>
            {i.status === "approved" ? (
              <button disabled>Approved</button>
            ) : i.status === "rejected" ? (
              <button disabled>Rejected</button>
            ) : (
              <>
                <button>Approved</button> <button>Rejected</button>
              </>
            )}
          </>
        );
      })}
      <form style={{ marginTop: "20px" }} onSubmit={imageSubmit}>
        <input onChange={handleImageChange} type="file" name="image" />
        <p style={{ color: "red" }}>{imageError}</p>
        {image && imageError ? (
          ""
        ) : image && !imageError ? (
          <img src={URL.createObjectURL(image)} alt="Uploaded" />
        ) : (
          ""
        )}
        <button type="submit">Submit</button>
      </form>

      {imageData?.map((image) => (
        <div key={image._id}>
          <img
            style={{ height: "100px", width: "100px" }}
            src={`http://localhost:4006/${image.file}`}
            alt="Uploaded"
          />
          <Link to={`/edit-image/${image._id}`} state={{ value: imageData }}>
            <button>Edit</button>
          </Link>
        </div>
      ))}

      <div
        style={{
          backgroundColor: colorArray[colorCount],
          minHeight: "10vh",
          padding: "20px",
        }}
      >
        <button onClick={handleColorChange}>color</button>
        <p>Select a color to change the background!</p>
      </div>
      {renderInc}
      {data.map((item, index) => {
        return (
          <>
            <input
              type="text"
              onChange={(e) => handleChange(e, index)}
              name="name"
              value={item?.name}
            />
            <input
              type="text"
              onChange={(e) => handleChange(e, index)}
              name="ag1"
              value={item.ag1}
            />
            <input
              type="text"
              onChange={(e) => handleChange(e, index)}
              name="friend"
              value={item.friend}
            />
          </>
        );
      })}
      <button onClick={handleAddInput} type="submit">
        Input Add
      </button>
      <button onClick={handleSubmitData} type="submit">
        Submit
      </button>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleOpenDiv}>Open</button>
      </div>
      <div
        style={{
          backgroundColor: "red",
          height: "200px",
          width: "200px",
          marginTop: "20px",
          padding: "5px 5px",
          display: show ? "none" : "block",
        }}
      >
        <button
          onClick={handleClose}
          style={{ float: "right", marginTop: "20px" }}
        >
          Close
        </button>
      </div>
    </>
  );
};
export default Upload;
