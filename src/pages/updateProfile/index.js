import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../redux/features/getProfileSlice";
import { updateProfile } from "../../redux/features/updateProfileSlice";
import { errorToast, successToast } from "../../constants/ShowToast";
import { connectMetamask } from "../../features/register/metamask";
import {setData} from '../../redux/features/dataSlice';
import { STORAGE_KEYS, setToStorage } from "../../constants/Storage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isString } from "../../utils/Validations/validation";

const UpdateProfile = () => {
  const dispatch = useDispatch();
const [apiData,setApiData] = useState('')
const [fullNameError, setFullNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [countryError, setCountryError] = useState("")
  const [stateError, setStateError] = useState("")
  const [walletConnected, setWalletConnected] = useState(false);
  const [metamaskError, setMetamaskError] = useState("");
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [walletAddress, setWalletAddress] = useState("");
  
  const [phoneNo, setPhoneNo] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [phoneVerify, setPhoneVerify] = useState(false)

useEffect(() => {
  dispatch(getProfile())
   .then(result => {
      if (result?.payload?.statusCode === 200) {
        setApiData(result?.payload?.data);
        setFullName(result?.payload?.data?.fullName);
        setEmail(result?.payload?.data?.email);
        setCountry(result?.payload?.data?.country);
        setState(result?.payload?.data?.state);
        setPhoneCode(result?.payload?.data?.countryCode);
        setPhoneNo(result?.payload?.data?.phone);
        setPhoneVerify(result?.payload?.data?.isPhoneVerify)
        setWalletAddress(result?.payload?.data?.walletAddress);
        
      }
    })
   .catch(error => {
      console.log(error);
    });
}, [dispatch]);
   
  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullName.trim() === "") {
      setFullNameError("Full Name is required");
      isValid = false;
    } else {
      setFullNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email ID is required");
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (country.trim() === "") {
      setCountryError("Country is required");
      isValid = false;
    } else {
      setCountryError("");
    }

    if (state.trim() === "") {
      setStateError("State is required");
      isValid = false;
    } else {
      setStateError("");
    }

    return isValid;
  };

  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => state.profile);

  const handleConnectMetamask = async () => {
    try {
      const account = await connectMetamask();
      const last5Chars = account.slice(-7); 
      const addressLength = account.length;
      const ellipsis = addressLength > 7? "..." : ""; 
      // setWalletAddress(last5Chars + ellipsis);
      setWalletAddress(account)
      if(walletAddress != null){
        setWalletConnected(true);
      }
      setMetamaskError(""); 
    } catch (error) {
      console.log(error);
    }
  };



  const handleNext = () => {
    const isValid = validateForm();
    if (isValid){
      const data ={
        fullName,
        email,
        country,
        state,
        walletAddress
      }
       dispatch(updateProfile(data))
       .then(result=>{
      console.log(result,'bogo')

      if(result?.payload?.statusCode === 200){
        const response = result?.payload?.data;
        dispatch(
          setData({
            user: response || null, 
            token: JSON.stringify(result?.payload?.data?.token || "")
          })
         
        )
        setToStorage(STORAGE_KEYS?.userData, JSON.stringify(response || null))
        successToast(result?.payload?.message || "")
      }
      else{
        errorToast(result?.error?.message)
      }
       })
    }

  };


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="card-new">
    <div className="Outer-div">
      <div className="profile-box">
        <h3 className="complete-profile">Update Your Profile</h3>

        <div className="profilepage-input">
          <div className="p-text">Full Name</div>
          <TextField
            className={`tex_fld ${fullNameError ? "error-field" : ""}`}
            placeholder="Full Name"
            value={fullName}
            // onChange={(e) => setFullName(e.target.value)}
            onChange={(val) => {
              if (val.target.value === " " || val.target.value === ".") {
              } else if (isString(val.target.value)) {
                setFullName(val.target.value);
              }
            }}
            error={Boolean(fullNameError)}
            helperText={fullNameError}
          />
        </div>

        <div className="mobile-number-input">
          <PhoneInput
            value={phoneCode + phoneNo}
            name="mobileNumber"
            country={"In"}
            countryCodeEditable
            enableSearch={true}
            placeholder="Phone Number"
            // onChange={handleMobileNumberChange}
            disabled={phoneVerify ? true : false}
          />
        </div>

        <div className="profilepage-input">
          <div className="p-text">Email ID</div>
          <TextField
            className={`tex_fld ${emailError ? "error-field" : ""}`}
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
          />
        </div>

        <div className="profilepage-input">
          <div className="p-text">Country</div>
          <div className="tex_fld">
          <TextField
            className={`tex_fld ${countryError ? "error-field" : ""}`}
            placeholder="Country"
            value={country}
            // onChange={(e) => setCountry(e.target.value)}
            onChange={(val) => {
              if (val.target.value === " " || val.target.value === ".") {
              } else if (isString(val.target.value)) {
                setCountry(val.target.value);
              }
            }}
            error={Boolean(countryError)}
            helperText={countryError}
          />
            {/* <select
              className={`Slct_fld ${countryError ? "error-field" : ""}`}
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
              error={Boolean(countryError)}
            >
                 <option value="">Country</option>
              <option value="India">India</option>
            </select>
            {countryError && <span className="error">{countryError}</span>} */}
          </div>
        </div>

        <div className="profilepage-input">
          <div className="p-text">State</div>
          <div className="tex_fld">
          <TextField
            className={`tex_fld ${stateError ? "error-field" : ""}`}
            placeholder="State"
            value={state}
            // onChange={(e) => setState(e.target.value)}
            onChange={(val) => {
              if (val.target.value === " " || val.target.value === ".") {
              } else if (isString(val.target.value)) {
                setState(val.target.value);
              }
            }}
            error={Boolean(stateError)}
            helperText={stateError}
          />
            {/* <select
              className={`Slct_fld ${stateError ? "error-field" : ""}`}
              value={state}
              onChange={(event) => {
                setState(event.target.value);
              }}
              error={Boolean(stateError)}
            >
              <option value="">State</option>
              <option value="Haryana">Haryana</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>
            {stateError && <span className="error">{stateError}</span>} */}
          </div>
        </div>

        <button className="Four_btn log-but meta" onClick={handleConnectMetamask}>
          <p id="accountarea"></p>
          <img src="/static/images/MetaMask_Fox 1.png" alt="MetaMask logo" />
          {walletAddress ?<p className="meta-wallet">{walletAddress}</p> : <p>Connect with MetaMask</p>}
        </button>

        {metamaskError && <span className="error">{metamaskError}</span>}

        <button className="log-but next-button" onClick={handleNext}>
          Update
        </button>
      </div>
    </div>
    </div>
  );
};

export default UpdateProfile;
