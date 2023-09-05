import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch,useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetOtp } from '../../redux/features/passwordOtpSlice';
import '../login/LogIn.css'
import Loader from '../../constants/loader/Loader';
import { useEffect } from 'react';
import { reSendOtp } from "../../redux/features/resendOtpSlice";
import { successToast } from '../../constants/ShowToast';
import Layout from '../../layout'



const ForgotPasswordOtp = () => {
  const [otp, setOtp] = useState('');
  const [countDown, setCountDown] = useState(20);
  const [countDownFinished, setCountDownFinished] = useState(false);
  const [otpError, setOtpError] = useState('');


  const location = useLocation();
  const { email } = location.state || {};

  const load = useSelector((state)=>state?.resetotp?.loading);
  console.log("checkjkdsnfffffffffffffffff__",load)

   
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1);
      } else {
        setCountDownFinished(true);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countDown]);


  const validateForm = () => {
    let isValid = true;
    // Validate OTP
    if (!otp || otp.length !== 4) {
      setOtpError('Please enter a valid OTP.');
      isValid = false;
    } else {
      setOtpError('');
    }
    return isValid;
  };
  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    setOtpError('');
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNext = () => {
    const isValid = validateForm();
    if (isValid) {
      const veificationData = {
        key: email,
        otp
      };
      console.log(veificationData)
      dispatch(resetOtp(veificationData))
        .then((result) => {
          console.log(result,'ggg')
          if (result.payload.statusCode === 200) {
            navigate('/resetpassword', { state: { email } })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleResendOTP = () => {
    setCountDown(20);
    setCountDownFinished(false);

    const veificationData = {
      key: email,
    };

    dispatch(reSendOtp(veificationData))
      .then((result) => {
        console.log("yebvbsdnv======", result);
        if (result.payload.statusCode === 200) {
          successToast("OTP Resent!");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    
    console.log("Resend OTP triggered");
  };


  return (
  <Layout>
    <div className="Outer-div">
      <Loader isLoad = {load} />
      <div className="Verify-b">
        <div className="Verify-no-text">
          <h3>Verify your Email</h3>
        </div>
        <div className="otp-input-container">
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={4}
            renderInput={(props) => <input {...props} />}
            separator={<span className="otp-input-separator"> </span>}
            inputStyle={{
              width: '60px',
              height: '60px',
              fontSize: '28px',
              border: '1px solid #a8a9ac',
              marginRight: '10px', // Optional: Customize the spacing between inputs
            }}
          />
        </div>
        {otpError && <div className="error" style={{textAlign: 'center'}}>{otpError}</div>}

        {countDownFinished ? (
          <button onClick={handleResendOTP} className="resend">
            Resend OTP
          </button>
        ) : (
          <span className="countdown-timer">
            {countDown < 10 ? `00 : 0${countDown}` : `00 : ${countDown}`}
          </span>
        )}

        <button className="log-but next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
    </Layout>
   
  );
};
export default ForgotPasswordOtp;