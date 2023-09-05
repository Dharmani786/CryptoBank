import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/features/registerSlice";
import { successToast, errorToast } from "../../constants/ShowToast";
import Loader from "../../constants/loader/Loader";

const RegisterPage = ({
  setScreen, mobileNumber, setMobileNumber, countryCode, setCountryCode
}) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const load = useSelector(state=>state?.register?.loading);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const validateForm = () => {
    let isValid = true;
  
    // Validate mobile number
    if (!mobileNumber || mobileNumber.length < 6) {
      setMobileNumberError(
        "Mobile number is required"
      );
      isValid = false;
    } else {
      setMobileNumberError("");
    }
  
    // Validate password
    if (!password || password.length <8 ) {
      setPasswordError(
        "Password is required and should be at least 8 characters."
      );
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[#\$@])/.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one symbol (#$@)."
      );
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }
  
    // Validate confirm password
    if(confirmPassword === ""){
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }
    else if(confirmPassword !== password) {
      setConfirmPasswordError("The passwords you entered do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }
  
    return isValid;
  };

  const handlemobileNumberchange = (value, country) => {   
    setMobileNumber(value.substring(country?.dialCode?.length));
    setCountryCode(country?.dialCode?.includes("+") ? country?.dialCode : "+" + country?.dialCode);
    setMobileNumberError("")
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
    setPasswordError('');
  }

  const handleConfirmPasswordChange = (e) =>{
          setConfirmPassword(e.target.value)
          setConfirmPasswordError("")
  }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => state.register);



  const handleNextClick = async () => {
    const isValid = validateForm();
  
    if (isValid) {
      const userCredential = {
        key: mobileNumber,
        password,
        countryCode,
      };
  
      try {
        const result = await dispatch(registerUser(userCredential));

  
        if (result.payload && (result.payload.statusCode === 200 || result.payload.statusCode === 201)) {
                  
          setScreen(2);
        } else {
          // Error case
          errorToast(result.payload?.message || "Phone already register");
        }
      } catch (error) {
      
        if (error.response && error.response.data && error.response.data.message) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Registration failed!");
        }
        console.log(error);
      }
    }
  };
  
  

  return (
    <div className="Outer-div">
       <Loader isLoad={load} />
      <div className="Register-Box-here">
        <div className="register-here">Register Here!</div>
        <div className="mobile-number-text">Mobile Number</div>
        <div className="mobile-number-input">
          <PhoneInput
            value={countryCode + mobileNumber}
            onChange={handlemobileNumberchange}
            countryCodeEditable
            enableSearch={true}
            placeholder="Phone Number"
          />
          {mobileNumberError && (
            <div className="error">{mobileNumberError}</div>
          )}
        </div>
        <div className="password-input">
          <TextField
            className="tex_fld"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div className="password-input">
          <TextField
            className="tex_fld"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleToggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {confirmPasswordError && (
            <div className="error">{confirmPasswordError}</div>
          )}
        </div>

        <button
          className="log-but Reg-but next-button"
          onClick={handleNextClick}
        >
          Next
        </button>
        <div className="existing-user-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
