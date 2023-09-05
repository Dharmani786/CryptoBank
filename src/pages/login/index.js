import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./LogIn.css";
import { login } from "../../redux/features/authSlice";
import {
  STORAGE_KEYS,
  getFromStorage,
  setToStorage,
  removeFromStorage,
} from "../../constants/Storage";
import { errorToast, successToast } from "../../constants/ShowToast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import { setData } from "../../redux/features/dataSlice";
import Loader from "../../constants/loader/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const load = useSelector((state) => state?.login?.status);

  const [mobileNumber, setMobileNumber] = useState("+91");
  const [password, setPassword] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [walletAddress, SetWalletAddress] = useState('')
  console.log(walletAddress ,'wallet111');

  const storedUserData = getFromStorage(STORAGE_KEYS.credentials) || null;

 
  useEffect(() => {
    const getMetaMask = async () => {
      try {
        
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const account = accounts[0];
        SetWalletAddress(account)
      } catch (error) {
        throw new Error("Failed to connect with MetaMask: " + error.message);
      }
    }
    getMetaMask()
  }, [])

  const validateForm = () => {
    let isValid = true;

    if (!mobileNumber || mobileNumber.length < 6) {
      setMobileNumberError("Mobile number is required");
      isValid = false;
    } else {
      setMobileNumberError("");
    }

    if (!password || password.length < 8) {
      setPasswordError(
        "Password is required and should be at least 8 characters."
      );
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[#\$@])/.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one symbol (#$@)."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleMobileNumberChange = (value, country) => {
    setMobileNumber(value);
    setCountryCode(country.dialCode);
    setMobileNumberError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      const data = {
        key: mobileNumber.substring(countryCode.length),
        countryCode: (countryCode.includes("+") ? "" : "+") + countryCode,
        password,
      };

      if (rememberMe) {
        setToStorage(STORAGE_KEYS.credentials, JSON.stringify(data));
      } else {
        removeFromStorage(STORAGE_KEYS.credentials);
      }

      dispatch(login(data))
        .then((result) => {
          if (result.payload.statusCode === 200) {
            const response = result?.payload?.data;
            setToStorage(
              STORAGE_KEYS.token,
              JSON.stringify(result?.payload?.data?.token || "")
            );
            setToStorage(
              STORAGE_KEYS?.userData,
              JSON.stringify(result?.payload?.data || null)
            );
           setToStorage(STORAGE_KEYS?.walletAddress, walletAddress)

            dispatch(
              setData({
                user: response || null,
                token: JSON.stringify(result?.payload?.data.token || ""),
              })
            );

            setTimeout(() => {
              navigate("/landingPage", { replace: true });
            }, 1000);
            successToast("Logged In", { duration: 3000 });
          } else {
            errorToast(result.payload.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (storedUserData) {
      setRememberMe(true);
      const rememberData = JSON.parse(storedUserData);
      setCountryCode(rememberData?.countryCode);
      setMobileNumber(rememberData?.countryCode + rememberData?.key);
      setPassword(rememberData?.password);
    }
  }, []);

  return (
    <div className="Outer-div">
      <Loader isLoad={load} />
      <div className="card">
        <div className="register-here">Login Here!</div>
        <div className="mobile-number-text">Mobile Number</div>
        <div className="mobile-number-input">
          <PhoneInput
            value={mobileNumber}
            name="mobileNumber"
            country={"In"}
            countryCodeEditable
            enableSearch={true}
            placeholder="Phone Number"
            onChange={handleMobileNumberChange}
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
            name="password"
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

        <div className="rem-for">
          <div className="remember-me">
          <Checkbox 
          style={{padding: 0}}
           checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}/>
            {/* <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            /> */}
            <span> Remember me</span>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </div>

        <button className="log-but" onClick={handleSubmit}>
          Login
        </button>
        <div className="new-user-text">
          New User? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
