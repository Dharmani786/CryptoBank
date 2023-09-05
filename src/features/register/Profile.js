import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectMetamask } from "./metamask";
import { STORAGE_KEYS, getFromStorage, setToStorage } from "../../constants/Storage";
import { isString } from "../../utils/Validations/validation";

const Profile = ({
  setScreen,
  fullName,
  setFullName,
  email,
  setEmail,
  country,
  setCountry,
  state,
  setState,
  setWalletAddress
}) => {
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateError, setStateError] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [metamaskError, setMetamaskError] = useState("");


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
  
  const handleFullNameChange = (val) => {
      if (val.target.value === " " || val.target.value === ".") {
      } else if (isString(val.target.value)) {
        setFullName(val.target.value);
      }
    if (fullNameError) {
      setFullNameError("");
    }
  };
  
  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    
    setEmail(newValue);
    if (emailError) {
      setEmailError("");
    }
  };
  
  const handleCountryChange = (val) => {
    if (val.target.value === " " || val.target.value === ".") {
    } else if (isString(val.target.value)) {
      setCountry(val.target.value);
    }
    if (countryError) {
      setCountryError("");
    }
  };
  
  const handleStateChange = (val) => {
    if (val.target.value === " " || val.target.value === ".") {
    } else if (isString(val.target.value)) {
      setState(val.target.value);
    }
    if (stateError) {
      setStateError("");
    }
  };

  const { loading, user, error } = useSelector((state) => state.profile);

  const handleNext = () => {
    const isValid = validateForm();

    if (isValid && walletConnected) {
      setScreen(4);
      setFullNameError("");
      setEmailError("");
      setCountryError("");
      setStateError("");
    } else if (!walletConnected) {
      setMetamaskError("Please connect to MetaMask");
    }
  };

  const handleConnectMetamask = async () => {
    try {
      const account = await connectMetamask();
      
      setWalletAddress(account);
      setToStorage(STORAGE_KEYS.walletAddress, account)
      setWalletConnected(true);
      setMetamaskError("");
    } catch (error) {
      console.log(error);
    }
  };

  const wallet = getFromStorage(STORAGE_KEYS.walletAddress)
  console.log(wallet, 'wallet');
  return (
    <div className="Outer-div">
      <div className="profile-box">
        <h3 className="complete-profile">Complete Your Profile</h3>

        <div className="profilepage-input">
          <div className="p-text">Full Name</div>
          <TextField
            className="tex_fld"
            placeholder="Full Name"
            value={fullName}
            onChange={handleFullNameChange}
            // error={Boolean(fullNameError)}
            // helperText={fullNameError}
          />
       {fullNameError && <span className="error">{fullNameError}</span>}

        </div>

        <div className="profilepage-input">
          <div className="p-text">Email ID</div>
          <TextField
            className="tex_fld"
            placeholder="Email ID"
            value={email}
            onChange={handleEmailChange}
            // error={Boolean(emailError)}
            // helperText={emailError}
          />
        {emailError && <span className="error">{emailError}</span>}

        </div>

        <div className="profilepage-input">
          <div className="p-text">Country</div>
          <div className="tex_fld">
          <TextField
            className="tex_fld"
            placeholder="Country"
            value={country}
            onChange={handleCountryChange}
            // error={Boolean(emailError)}
            // helperText={emailError}
          />
            {/* <select
              className="Slct_fld"
              value={country}
              onChange={handleCountryChange}
              error={Boolean(countryError)}
            >
              <option value="">Country</option>
              <option value="India">India</option>
            </select> */}
            {countryError && <span className="error">{countryError}</span>}
          </div>
        </div>

        <div className="profilepage-input">
          <div className="p-text">State</div>
          <div className="tex_fld">
          <TextField
            className="tex_fld"
            placeholder="State"
            value={state}
            onChange={handleStateChange}
            // error={Boolean(emailError)}
            // helperText={emailError}
          />
            {/* <select
              className="Slct_fld"
              value={state}
              onChange={handleStateChange}
              error={Boolean(stateError)}
            >
              <option value="">State</option>
              <option value="Haryana">Haryana</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select> */}
            {stateError && <span className="error">{stateError}</span>}
          </div>
        </div>

        {
          !walletConnected?    <button className="Four_btn log-but meta" onClick={handleConnectMetamask}>
          <p id="accountarea"></p>
          <img src="/static/images/MetaMask_Fox 1.png" alt="MetaMask logo" />
          <p>Connect with MetaMask</p>
        </button> : null
      }
     
{!walletConnected ? metamaskError && <span className="error">{metamaskError}</span> : null}
        

        <button className="log-but next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Profile;
