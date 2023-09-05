import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/features/forgotSlice";
import { successToast, errorToast } from "../../constants/ShowToast";
import Loader from "../../constants/loader/Loader";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const load = useSelector((state) => state?.forgotPassword?.status)
  console.log("checkfor___", load)

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");


  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }

    setEmailError("");
    return true;
  };

  const handleEmailOnchange = (e) => {
    setEmail(e.target.value);
    setEmailError("")
  }

  const handleForgotPassword = () => {
    const isValidEmail = validateEmail();

    if (isValidEmail) {
      // console.log(data)
      dispatch(forgotPassword({ key: email }))
        .then((result) => {
          console.log(result, "vjsbaegrkhjwose");
          if (result.payload.statusCode === 200) {
            navigate("/forgotPasswordOtp", { state: { email } });
          } else errorToast(result.error.messagge);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="Outer-div">
      <Loader isLoad={load} />
      <div className="card">
        <div className="forgot-password-section">
          <h1>Forgot Password</h1>
          <p>Enter your email associated with your account</p>

          <div className={`password-input ${emailError ? "error-field" : ""}`}>
            <TextField
              className="tex_fld"
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={handleEmailOnchange}
            />
            {emailError && <span className="error2">{emailError}</span>}
          </div>

          <button
            className="log-but forgot-next"
            onClick={handleForgotPassword}
          >
            Next
          </button>
          <div className="back-to-login-text">
            Back to <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
