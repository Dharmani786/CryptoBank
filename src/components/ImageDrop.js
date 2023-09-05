import React, { useEffect, useState, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import {uploadPhoto} from "../redux/features/uploadSlice";

const ImageUploadCard = ({ onImageUpload }) => {
  const [imageFile, setImageFile] = useState();
  const fileInputRef = useRef(null);
   
  const dispatch = useDispatch();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    onImageUpload(file);
  };


  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleDelete = () => {
    setImageFile(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImageFile(e.dataTransfer.files[0]);
    onImageUpload(e.dataTransfer.files[0]);
  };
  

  return (
    <div>
      <div
        className="upload-identity-box"
        style={{
          width: "100%",
          height: 169,
          border: "1px dashed #1E90FF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop:"12px",
          marginBottom:"34px"
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="fileInput"
          ref={fileInputRef}
        />

        <figure className="upload_doc" onClick={() => fileInputRef.current.click()}>
          {imageFile ? (
            <>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="preview"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover"
                }}
              />
            </>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <span style={{ fontSize: 10, color: "#1E90FF" }}>
                <img src="/static/images/Drop.png" alt="dropIcon" />
              </span>
              <span
                style={{ fontSize: 14,fontWeight:400,marginTop:"20px", color: "#1E90FF", color: "#708090" }}
              >
                Drag &amp; Drop files Here
              </span>
            </div>
          )}
        </figure>
      </div>

      {imageFile && (
        <Box display="flex" justifyContent="center" mt={1}>
          <Typography
            variant="body1"
            color="#708090"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" style={{ color: "red" }} />
          </Typography>
          <Typography
            variant="body1"
            color="#708090"
            style={{ cursor: "pointer" }}
            onClick={() => fileInputRef.current.click()}
          >
            Delete and upload another image
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ImageUploadCard;
