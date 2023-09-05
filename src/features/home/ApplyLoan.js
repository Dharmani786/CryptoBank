import React from "react";
import { useState } from "react";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emiCalculator } from "../../redux/features/emiCalculatorSlice";
import { useEffect } from "react";
import { fetchActiveLoanData } from "../../redux/features/activeLoanSlice";

const ApplyLoan = () => {
  const dispatch = useDispatch();
  const [loanAmount, setLoanAmount] = useState(2500);
  const [monthChange, setMonthChange] = useState(6);
  const [loanType, setloanType] = useState("PERSONAL");
  const [calcData, setCalcData] = useState("");


  useEffect(() => {
    handleDispatch();
  }, [loanAmount, monthChange, loanType]);

  const handleLoanAmountChange = (event, value) => {
    setLoanAmount(value);
    setloanType(loanType);
  };

  const handleMonthChange = (event, value) => {
    setMonthChange(value);
  };
  const handleLoanChange = (event, value) => {
    setloanType(event.target.value);
  };
  const handleDispatch = () => {
    if (loanAmount > 0 && monthChange > 0 && loanType != null) {
      const data = {
        loanType: loanType,
        loanAmount: loanAmount,
        loanTenure: monthChange,
      };
      dispatch(emiCalculator(data))
        .then((result) => {
          if (result.payload.statusCode === 200) {
            setCalcData(result.payload.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };



  return (
    <div className="lo_an">
      <div className="container Loan_box">
        <div className="left-side">
          <div className="loan-options">
            <h4>
              Choose the Loan <br /> Option that Best Fits Your <br /> Financial
              Strategy.
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              porta ut <br /> velit eget varius. Praesent euismod ligula at orci
              ornare sagittis. Donec eget <br /> metus massa. Suspendisse
              potenti. Vivamus tristique pretium velit quis bibendum.
            </p>
          </div>
          <div className="loan-value">
            <p>
              1 ETH = 1,867.50{" "}
              <span
                style={{
                  fontSize: "10px",
                  color: "#2B2B2B",
                  position: "relative",
                  bottom: "7px",
                }}
              >
                USD
              </span>
            </p>
            <Link to="/applyloan">
              <button>Apply Loan</button>
            </Link>
          </div>
        </div>

        <div className="right-side">
          <div className="calculate-loan">
            <h4>Calculate Loan Value</h4>
            <button
              value="PERSONAL"
              onClick={handleLoanChange}
              className={
                loanType === "PERSONAL" ? "loan-butn_ative" : "loan-butn"
              }
            >
              Personal Loan
            </button>
            <button
              value="CAR"
              onClick={handleLoanChange}
              className={loanType === "CAR" ? "loan-butn_ative" : "loan-butn"}
            >
              Car Loan
            </button>
            <button
              value="HOME"
              onClick={handleLoanChange}
              className={loanType === "HOME" ? "loan-butn_ative" : "loan-butn"}
            >
              Home Loan
            </button>
          </div>
          <div className="loan-amount">
            <label>Loan Amount</label>
            <p className="loan-amount">{loanAmount} ETH</p>
          </div>
          <div className="loan-value">
            <Slider
              min={0}
              max={500000}
              step={1}
              value={loanAmount}
              onChange={handleLoanAmountChange}
              sx={{ width: "480px", height: "12px" }}
            />
          </div>
          <div className="range-label">
            <label>2500 ETH</label>
            <label>500000 ETH</label>
          </div>
          <div className="loan-value">
            <label>TENURE</label>
          </div>
          <div className="rate_change">
            <span>{monthChange} months</span>
            <span>at {calcData.interstRate}%p.a.</span>
          </div>
          <div className="loan-value">
            <Slider
              min={0}
              max={24}
              step={1}
              value={monthChange}
              onChange={handleMonthChange}
              sx={{ width: "480px", height: "12px" }}
            />
          </div>
          <div className="range-label">
            <label>3 months</label>
            <label>24 months</label>
          </div>
          <div className="monthly-emi">
            <h6>Your Monthly EMI</h6>
            <p>{calcData.emi} ETH</p>
          </div>
          <div className="loan-summary">
            <div className="row">
              <div className="column">
                <p>Loan Amount:</p>
                <p className="To_tal">{loanAmount} ETH</p>
                <p>Interest at {calcData.interstRate}% p.a.:</p>
                <p className="To_tal">{calcData.totalInterest} ETH</p>
              </div>
              <div className="column total">
                <p>Total payable:</p>
                <p className="To_tal">{calcData.totalAmount} ETH</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;
