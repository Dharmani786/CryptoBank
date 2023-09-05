import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch,useSelector } from 'react-redux';
import { resetPassword } from '../../redux/features/resetPasswordSlice';
import { successToast,errorToast } from '../../constants/ShowToast';
import Loader from '../../constants/loader/Loader';


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
 

  const load = useSelector((state) => state?.resetPassword?.status);
    
  console.log(load,"tryhnsdm")

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate password
    if (!password || password.length < 8) {
      setPasswordError(
        'Password is required and should be at least 8 characters.'
      );
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[#\$@])/.test(password)) {
      setPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, and one symbol (#$@).'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Validate confirm password
    if(!confirmPassword){
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    }
   else if (confirmPassword !== password) {
      setConfirmPasswordError('The passwords you entered do not match.');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  
  const handlePasswordChange = (e) =>{
    setPassword(e.target.value);
    setPasswordError('');
  }

  const handleConfirmPasswordChange = (e) =>{
          setConfirmPassword(e.target.value)
          setConfirmPasswordError("")
  }

  const handleSubmit = () => {
    const isValidForm = validateForm();

    if (isValidForm) {
      dispatch(resetPassword({ key: email, password }))
        .then((result) => {
          if (result.payload.statusCode === 200) {
            navigate('/login');
            successToast("Password reset successfully!");
          }
        })
        .catch((error) => {
          console.log(error);
          errorToast("Password reset failed!");
        });
    }
  };

  return (
    <div className="Outer-div">
       <Loader isLoad={load} />
      <div className="card">
        <div className="Change-password-box">
          <h2>Password</h2>

          <div className="password-input">
            <TextField
              className="tex_fld"
              type={showPassword ? 'text' : 'password'}
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
            {passwordError && <p className="error">{passwordError}</p>}
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
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {confirmPasswordError && (
              <p className="error">{confirmPasswordError}</p>
            )}
          </div>

          <div className="password-guide">
            <ul className="strong-pswrd">
              <li>Must have at least 8 characters.</li>
              <li>Upper and lower case letters.</li>
              <li>A symbol (#$@).</li>
            </ul>
          </div>

          <button className="log-but forgot-next" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
