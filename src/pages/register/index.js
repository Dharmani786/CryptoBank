import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RegisterPage from "../../features/register/Register";
import Verify from "../../features/register/Verify";
import Profile from "../../features/register/Profile";
import UploadDocument from "../../features/register/UploadDocument";
import CleraPhoto from "../../features/register/CleraPhoto";

const RegisterProcess = () => {
  const [screen, setScreen] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  const totalSteps = 5;

  const location = useLocation();
  const { fuRl } = location.state || {};

  const handleNext = () => {
    if (screen < totalSteps) {
      setScreen(screen + 1);
    }
  };

  const renderProgressBar = () => {
    const progressPercentage = (screen / totalSteps) * 100;


   

    return (
      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-indicator">{`${screen}/${totalSteps}`}</div>
      </div>
    );
  };

  switch (screen) {
    case 1:
      return (
        <div className="card">
          {renderProgressBar()}
          <RegisterPage
            setScreen={setScreen}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
        </div>
      );
    case 2:
      return (
        <div className="card">
          {renderProgressBar()}
          <Verify
            setScreen={setScreen}
            mobileNumber={mobileNumber}
            countryCode={countryCode}
          />
        </div>
      );
    case 3:
      return (
        <div className="card">
          {renderProgressBar()}
          <Profile
            setScreen={setScreen}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            walletAddress = {walletAddress}
            setWalletAddress = {setWalletAddress}
          />
        </div>
      );
    case 4:
      return (
        <div className="card">
          {renderProgressBar()}
          <UploadDocument
            setScreen={setScreen}
            selectedDocument = {selectedDocument}
            setSelectedDocument = {setSelectedDocument}
          />
        </div>
      );
    case 5:
      return (
        <div className="card">
          {renderProgressBar()}
          {fuRl ? (
            <CleraPhoto setScreen={setScreen} fuRl={fuRl} 
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState} 
            selectedDocument={selectedDocument}
            walletAddress={walletAddress}
           />
          ) : (
            <div>Error: fuRl is not available</div>
          )}
        </div>
      );
    default:
      return <div></div>;
  }
};

export default RegisterProcess;
