import React, { useState } from "react";
import ImageUploadCard from "../../components/ImageDrop";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { uploadPhoto } from "../../redux/features/uploadSlice";
import { profileData } from "../../redux/features/profileSlice";
import { successToast,errorToast } from "../../constants/ShowToast";
import { STORAGE_KEYS, getFromStorage, setToStorage } from "../../constants/Storage";
import { setData } from "../../redux/features/dataSlice";
import Loader from "../../constants/loader/Loader";


const CleraPhoto = ({setScreen,
  fullName,
  email,
  country,
  state,
  selectedDocument,
  fuRl, walletAddress}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [clrImg, setClrImg] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const load = useSelector(state=>state.profile.loading);


  const handleImageUpload = (imageFile) => {
    setIsImageUploaded(true);
    setError("");
    setImageFile(imageFile);
    dispatch(uploadPhoto(imageFile)).then((result) => {
      if (result.payload.statusCode === 200) {
        setClrImg(result.payload.data);
      }
    });
  };

  const handleNext = () => {
    if (!isImageUploaded) {
      setError("Please upload an image");
    } else {
      const allData = {
        fullName: fullName,
        email: email,
        country: country,
        state: state,
        documentImage: fuRl,
        document:selectedDocument,
        image: clrImg,
        walletAddress : walletAddress,
      };
     
      dispatch(profileData(allData)).then((result) => {
        const token = getFromStorage(STORAGE_KEYS?.token)
        if (result) {
            const response = result?.payload?.data
            setToStorage(STORAGE_KEYS?.userData, JSON.stringify(response|| null))
            dispatch(
              setData({
                user: response || null,
                token :  token
              })
            )
          
          successToast( "Account created successfully"); 
          navigate("/landingPage", { replace: true });
        }
        else {
          errorToast("Registration failed. Please try again."); 
        }
      });
    }
  };

  return (
    <div className="Outer-div">
       <Loader isLoad={load} />
      <div className="cleraphoto-box">
        <h3 className="Simple-Text">Upload Your Clear Photo</h3>

        <div>
          <p className="para-text">Make sure your background should be a single color.</p>
        </div>

        <ImageUploadCard onImageUpload={handleImageUpload} setImageFile={setImageFile} />

        {error && <span className="error">{error}</span>}

        <button className="log-but next-flow-btn next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CleraPhoto;
