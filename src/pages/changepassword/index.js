import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePassword } from "../../redux/features/changePasswordSlice";
import { STORAGE_KEYS, getFromStorage } from '../../constants/Storage';
import { successToast, errorToast } from "../../constants/ShowToast";
import { useEffect } from 'react';
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../constants/loader/Loader";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  const load = useSelector(state=>state?.changepassword?.loading);

  console.log(load,"checkstateofloading");

  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let isValid = true;
  
    if (oldPassword.length < 8) {
      setOldPasswordError('Old password must have at least 8 characters.');
      isValid = false;
    } else if (!/[a-z]/.test(oldPassword) || !/[A-Z]/.test(oldPassword)) {
      setOldPasswordError('Old password must have both uppercase and lowercase letters.');
      isValid = false;
    } else if (!/[@#$]/.test(oldPassword)) {
      setOldPasswordError('Old password must contain at least one of the following symbols: @, #, $.');
      isValid = false;
    } else {
      setOldPasswordError('');
    }
  
    if (password.length < 8) {
      setPasswordError('Password must have at least 8 characters.');
      isValid = false;
    } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      setPasswordError('Password must have both uppercase and lowercase letters.');
      isValid = false;
    } else if (!/[@#$]/.test(password)) {
      setPasswordError('Password must contain at least one of the following symbols: @, #, $.');
      isValid = false;
    } else {
      setPasswordError('');
    }
  
    if(confirmPassword === ""){
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }
    else 
    if (confirmPassword !== password) {
      setConfirmPasswordError("The passwords you entered do not match");
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }
  
    return isValid;
  };
  
 

  
  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    if (oldPasswordError) {
      setOldPasswordError('');
    }
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

const handleSubmit = () => {
  const isValid = validateForm();

  if (isValid) {
    const changePasswordData = {
      oldPassword,
      password,
    };

    dispatch(changePassword(changePasswordData))
      .then((result) => {
        console.log("Result--------------gean: ", result);
        if (result.payload && result.payload.statusCode === 200) {
          // successToast(result.payload.message);

          navigate('/landingPage');
          
        }
      })
      .catch((error) => {
        errorToast(error);
      });
  }
};


  useEffect(() => {
    const token = getFromStorage(STORAGE_KEYS.token);
    console.log('nfgakjbszgdsiubnkasew', token);
  }, []);

  return (
    <>
    <Loader isload = {load}/>
    <div className="card">
      <div className="forgot-password-section">
        <h1>Change Password</h1>

        <div className="password-input">
          <TextField
            className="tex_fld"
            type={showOldPassword ? 'text' : 'password'}
            placeholder="Old password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleOldPasswordVisibility} edge="end">
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {oldPasswordError && <span className="error">{oldPasswordError}</span>}
        </div>

        <div className="password-input">
          <TextField
            className="tex_fld"
            type={showPassword ? 'text':'password'}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>

        <div className="password-input">
          <TextField
            className="tex_fld"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {confirmPasswordError && <span className="error">{confirmPasswordError}</span>}
        </div>

        <div className="password-guide">
          <ul className="strong-pswrd">
            <li>Must have at least 8 characters.</li>
            <li>Upper & Lower case letters</li>
            <li>A Symbol (#$@)</li>
            <li>A longer password</li>
          </ul>
        </div>

        <button className="log-but forgot-next" type="submit" onClick={handleSubmit}>
          Update Password
        </button>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
