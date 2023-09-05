import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ImageUploadCard from "../../components/ImageDrop";
import { useDispatch } from "react-redux";
import { uploadPhoto } from "../../redux/features/uploadSlice";
import { useNavigate } from "react-router-dom";

const UploadDocument = ({
  setScreen,
  selectedDocument,
  setSelectedDocument
}) => {
  const [fUrl, setFUrl] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.value);
    setError("");
  };

  const handleImageUpload = (imageFile) => {
    setIsImageUploaded(true);
    setError("");
    dispatch(uploadPhoto(imageFile)).then((result) => {
      if (result) {
        setFUrl(result.payload.data);
      }
    });
  };

  const handleNext = () => {
    if (!selectedDocument) {
      setError("Please select a document type");
    } else if (!isImageUploaded) {
      setError("Please upload an image");
    } else {
      setScreen(5);

      navigate("/register", {
        state: {
          fuRl: fUrl,
          selectedDocument: selectedDocument,
        },
      });
    }
  };

  return (
    <div className="Outer-div">
      <div className="UploadDoc-box">
        <h3 className="Simple-Text">Upload your document</h3>

        <div className="radio-btn-grp">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selectedDocument}
              onChange={handleDocumentChange}
            >
              <FormControlLabel
                value="AADHAR"
                control={<Radio />}
                label="Your Aadhar card"
              />
              <FormControlLabel
                value="PASSPORT"
                control={<Radio />}
                label="Valid Passport"
              />
              <FormControlLabel
                value="DRIVING_LICENSE"
                control={<Radio />}
                label="Your Driving Licences"
              />
              <FormControlLabel
                value="VOTER_ID"
                control={<Radio />}
                label="Your Voter Id"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <ImageUploadCard
          onImageUpload={handleImageUpload}
          setImageFile={setImageFile}
        />

        {error && <span className="error">{error}</span>}

        <button className="log-but next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;
