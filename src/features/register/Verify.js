import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { verifyOtp } from "../../redux/features/verifyOtpSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../../constants/ShowToast";
import { reSendOtp } from "../../redux/features/resendOtpSlice";
import Loader from "../../constants/loader/Loader";

const Verify = ({ setScreen, mobileNumber, countryCode }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [countDown, setCountDown] = useState(59);
  const [countDownFinished, setCountDownFinished] = useState(false);
  const [otpError, setOtpError] = useState("");

  const location = useLocation();

  const load = useSelector((state) => state.verify.loading);

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
    if (!otp || otp.length !== 4 || !/^\d+$/.test(otp)) {
      setOtpError("Please enter a valid OTP (4 digits only).");
      isValid = false;
    } else {
      setOtpError("");
    }

    return isValid;
  };

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
    setOtpError("");
  };

  const navigate = useNavigate();

  const { loading, user, error } = useSelector((state) => state.register);

  const handleNext = () => {
    const isValid = validateForm();

    if (isValid) {
      const verificationData = {
        key: mobileNumber,
        countryCode,
        otp,
      };

      console.log(verificationData);

      dispatch(verifyOtp(verificationData))
        .then((result) => {
          console.log("result:====>>>> ", result);

          if (result.type === verifyOtp.fulfilled.type) {
            setOtp("");
            setScreen(3);
            successToast("OTP Verified!");
          } else {
            console.log(result.error);
            errorToast("OTP Invalid!");
          }
        })
        .catch((error) => {
          console.log(error);
          errorToast("An error occurred!");
        });
    }
  };

  const handleResendOTP = () => {
    setCountDown(20);
    setCountDownFinished(false);

    const veificationData = {
      key: mobileNumber,
      countryCode,
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
    <div className="Outer-div">
      <Loader isLoad={load} />

      <div className="Verify-box">
        <div className="Verify-no-text">
          <h3>Verify your number</h3>
        </div>
        <input
          type="tel"
          className="phoneNo-inputLine"
          value={countryCode + " " + mobileNumber}
        />

        <div className="otp-input-container">
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={4}
            renderInput={(props, index) => (
              <input {...props} inputMode="numeric" />
            )}
            inputType="tel"
            separator={<span className="otp-input-separator"> </span>}
            inputStyle={{
              width: "60px",
              height: "60px",
              fontSize: "28px",
              border: "1px solid #a8a9ac ",
              marginRight: "10px",
            }}
          />
        </div>

        {otpError && (
          <div
            className="error"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            {otpError}
          </div>
        )}

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
  );
};

export default Verify;
