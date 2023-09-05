import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import HomeLoan from "../../features/applyloan/HomeLoan";
import "./apply.css";
import { ApplyLoanValidations } from "../../validations/validations";
import { loanDetails } from "../../redux/features/loanDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { uploadPhoto } from "../../redux/features/uploadSlice";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../constants/ShowToast";
import Web3 from "web3";
import { ABI, ContractAddress } from "../../Web3_interact/configuration";
import { useEffect } from "react";
import { getLoanDetails } from "../../redux/features/getDetailsSlice";
import Loader from "../../constants/loader/Loader";
import { MenuItem, Select, TextField } from "@mui/material";
import { isNumber } from "../../utils/Validations/validation";
import { STORAGE_KEYS, getFromStorage } from "../../constants/Storage";
import { fetchActiveLoanData } from "../../redux/features/activeLoanSlice";

const ApplyLoan = () => {
  const dispatch = useDispatch();
  const [activeData, setActiveData] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [contract, setContract] = useState("");
  const [colAmt, setColAmt] = useState("");
  const [loanData, setLoanData] = useState("");
  const [error, setError] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [emidata, setEmiData] = useState();
  const [activeLoanData, setActiveLoanData] = useState('')
  const [accounts,setAccounts] =useState();
  const [activeLoan, setActiveLoan] = useState([]);
  console.log(activeLoan,'===========');

  const [loading, setLoading] = useState(false);
  // console.log(activeLoanData,'activeLoanData' );

  const load = useSelector((state) => state.loanDetails.status);
  console.log(loanData, "getloandata");
  useEffect(() => {
    const init = async () => {
      if (window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const contractInstance = new web3.eth.Contract(ABI, ContractAddress);
          console.log(contractInstance, "contractInstace");
          setContract(contractInstance);
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          setAccounts(account)
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("Please install MetaMask or any other Web3 provider.");
      }
    };

    init();
  }, []);

  const applyForLoan = async (values) => {
    try {
      setLoading(true);
      if (window.ethereum) {
        setLoading(false);
      }
      if(accounts){
        const gas = await contract.methods
        .applyForLoan(
          values?.loanType.toLowerCase(),
          values?.amount,
          values?.duration
        )
        .estimateGas({ from: accounts, value: values?.collaterealAmount });

      const apply = await contract.methods
        .applyForLoan(
          values?.loanType.toLowerCase(),
          values?.amount,
          values?.duration
        )
        .send({
          from: accounts,
          value: colAmt,
          gas: gas,
        });

      if (apply && colAmt) {
        dispatch(uploadPhoto(imageFile))
          .then((result) => {
            if (result) {
              const imageLink = result?.payload?.data;
              const data = {
                employmentType: selectedValue.toUpperCase(),
                incomeDetails: values?.income,
                collaterealAmount: JSON.stringify(colAmt),
                loanAmount: values?.amount,
                loanTenure: values?.duration,
                loanType: values?.loanType,
                loanDocumentImage: imageLink,
              };
              dispatch(loanDetails(data))
                .then((result) => {
                  console.log(result);
                  if (result.payload.statusCode === 200) {
                    setActiveData(true);
                    setEmiData(result?.payload?.data?.calculateEmi);
                    successToast("Loan Applied");
                    const data = {
                      loanType: values?.loanType,
                    };
                    dispatch(getLoanDetails(data))
                      .then((result) => {
                        if (result?.payload?.statusCode === 200) {
                          setLoanData(result?.payload?.data);
                         
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    errorToast(result?.payload?.message);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      }
      else{
        errorToast('Connect to Metamask')
      }
    
    } catch (error) {
      console.log(error, "ertetrert");
      errorToast(error?.data?.message);
    }
  };

  const handleImageFile = (file) => {
    setImageFile(file);
  };

  const renderHomeLoan = () => {
    if (activeData) {
      return <HomeLoan loanData={loanData} />;
    } else {
      return null;
    }
  };

  const leftStyle = {
    textAlign: "left",
  };

  const rightStyle = {
    textAlign: "right",
    paddingBotoom: "10px",
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const formik = useFormik({
    initialValues: {
      employmentType: selectedValue || "",
      income: "",
      amount: "",
      loanType: "HOME",
      collaterealAmount: "",
      duration: "3",
    },
    validationSchema: Yup.object({
      income: Yup.string().required("This field is required."),
      amount: Yup.string().required("This field is required."),
      collaterealAmount: Yup.string().required("This field is required."),
      duration: Yup.string().required("This field is required."),
    }),
    onSubmit: async (values) => {
      console.log(values, "value");
      formik.setSubmitting(true);
      if (!imageFile || !selectedValue) {
        setError(true);
      } else {
        applyForLoan(values);
      }
    },
  });

  const walletAddress = getFromStorage(STORAGE_KEYS.walletAddress);

  useEffect(() => {
      const fetchSecurityAmount = async () => {
        if(accounts){
           if (
          formik.values.amount &&
          formik.values.duration &&
          formik.values.loanType
        ) {
          
          try {
            const colateral = await contract.methods
              .securityAmountCalculator(
                formik.values.loanType.toLowerCase(),
                formik.values.amount,
                formik.values.duration
              )
              .call();
              console.log(colateral, 'colateralcolateralcolateral');
            formik.setFieldValue("collaterealAmount", Number(colateral));
            setColAmt(Number(colateral));
          } catch (error) {
            console.log(error, "errorrrr");
            errorToast(error?.data?.message);
          }
        }
        }
       
      };
      fetchSecurityAmount();
  }, [formik.values.loanType, formik.values.amount, formik.values.duration]);

  const getLoanActive = (type) => {
    const data = {
      loanType: type,
    };
    dispatch(getLoanDetails(data))
    .then((result) => {
      if (result?.payload?.statusCode === 200) {
        setActiveLoanData(result?.payload?.data);
        console.log(result?.payload?.data, '======helo==');
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    const params = {
      search: formik.values.loanType,
        fromDate:  '',
        toDate: '',
    };
    console.log(params, 'jpar');
    dispatch(fetchActiveLoanData(params))
      .then((result) => {
        console.log(result);
        if (result.payload.statusCode === 200) {
          setActiveLoan(result.payload.data[0].data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formik.values.loanType]);

  return (
    <div className="container">
      <Loader isLoad={loading || load} />
      <div className="applyloan-wrp">
        <h1 className="apply-loan">Apply Loan</h1>
        <div className="applyloan-flex">
          <div className="applyloan-lft">
            <div className="applyloan-lft-con">
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="employeeType">Employment Type</label>
                <Select
                  disabled={activeData ? true : false}
                  className="emplyo"
                  displayEmpty
                  value={selectedValue}
                  onChange={handleSelectChange}
                  style={{ display: "block" }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">Select employment</MenuItem>
                  <MenuItem value="FULL_TIME">Full Time</MenuItem>
                  <MenuItem value="PART_TIME">Part Time</MenuItem>
                </Select>
                {error && !selectedValue ? (
                  <h6 className="err_msg">This field is compulsory.</h6>
                ) : (
                  ""
                )}

                <div className="input_fld">
                  <label htmlFor="employeeType">Income Details</label>
                  <TextField
                    placeholder="Enter Income"
                    disabled={activeData ? true : false}
                    fullWidth
                    className="text_field"
                    id="income"
                    name="income"
                    onChange={(val) => {
                      if (
                        val.target.value === " " ||
                        val.target.value === "."
                      ) {
                      } else if (isNumber(val.target.value)) {
                        formik.handleChange(val);
                      }
                    }}
                    onBlur={formik.handleBlur}
                    value={formik.values.income}
                    helperText={formik.touched.income && formik.errors.income}
                  />
                </div>
                <h2 className="h3div">Apply Loan</h2>
                {!activeData ? (
                  <>
                    {" "}
                   
                      <div className="loan-div">
                        <h3
                          className={`loan-btn ${
                            formik.values.loanType === "HOME" ? "active" : ""
                          }`}
                          onClick={() =>
                            {formik.setFieldValue("loanType", "HOME");
                            getLoanActive("HOME")
                          }
                          }
                        >
                          Home Loan
                        </h3>
                        <h3
                          className={`loan-btn ${
                            formik.values.loanType === "CAR" ? "active" : ""
                          }`}
                          onClick={() =>
                            {formik.setFieldValue("loanType", "CAR"); getLoanActive("CAR")}
                          }
                        >
                          Car Loan
                        </h3>
                        <h3
                          className={`loan-btn ${
                            formik.values.loanType === "PERSONAL"
                              ? "active"
                              : ""
                          }`}
                          onClick={() =>
                            {formik.setFieldValue("loanType", "PERSONAL"); getLoanActive("PERSONAL")}
                          }
                        >
                          Personal Loan
                        </h3>
                      </div>
                      {
                        activeLoan?.length ? activeLoan?.map((item) => {
                          console.log(item,'item');
                          return(
                            <div>{item?.loanType === formik.values.loanType ?
                             <div className="loan_detail">

                              <h3>Loan Status: <span className="greencls">Approved</span></h3>
                              <h3>Loan Amount: <span>{item?.loanAmount || ""} USTD</span></h3>
                              <h3>Total Emi's: <span>{item?.noOfEMI || "0"}</span></h3>
                            </div>
                            : item?.loanType !== formik.values.loanType ?    <div className="loan_detail">

                            <h3>Loan Status: <span className="greencls">Approved</span></h3>
                            <h3>Loan Amount: <span>{ ""} USTD</span></h3>
                            <h3>Total Emi's: <span>{ "0"}</span></h3>
                          </div>: <> <div className="input_fld">                   
                        <label htmlFor="employeeType">Amount</label>
                        <TextField
                          placeholder="Amount"
                          onChange={(val) => {
                            if (
                              val.target.value === " " ||
                              val.target.value === "."
                            ) {
                            } else if (isNumber(val.target.value)) {
                              formik.handleChange(val);
                            }
                          }}
                          className="text_field"
                          fullWidth
                          id="amount"
                          name="amount"
                          onBlur={formik.handleBlur}
                          value={formik.values.amount}
                          helperText={
                            formik.touched.amount && formik.errors.amount
                          }
                        />
                      </div>
                    <div className="input_fld">
                      <label htmlFor="employeeType">Collateral Amount</label>
                      <TextField
                        placeholder="Collateral Amount"
                        fullWidth
                        className="text_field"
                        id="collaterealAmount"
                        name="collaterealAmount"
                        disabled
                        onChange={(val) => {
                          if (
                            val.target.value === " " ||
                            val.target.value === "."
                          ) {
                          } else if (isNumber(val.target.value)) {
                            formik.handleChange(val);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.collaterealAmount}
                        helperText={
                          formik.touched.collaterealAmount &&
                          formik.errors.collaterealAmount
                        }
                      />
                    </div></>}
                              </div>
                          )
                        }):  <><div className="input_fld">                   
                        <label htmlFor="employeeType">Amount</label>
                        <TextField
                          placeholder="Amount"
                          onChange={(val) => {
                            if (
                              val.target.value === " " ||
                              val.target.value === "."
                            ) {
                            } else if (isNumber(val.target.value)) {
                              formik.handleChange(val);
                            }
                          }}
                          className="text_field"
                          fullWidth
                          id="amount"
                          name="amount"
                          onBlur={formik.handleBlur}
                          value={formik.values.amount}
                          helperText={
                            formik.touched.amount && formik.errors.amount
                          }
                        />
                      </div>
                    <div className="input_fld">
                      <label htmlFor="employeeType">Collateral Amount</label>
                      <TextField
                        placeholder="Collateral Amount"
                        fullWidth
                        className="text_field"
                        id="collaterealAmount"
                        name="collaterealAmount"
                        disabled
                        onChange={(val) => {
                          if (
                            val.target.value === " " ||
                            val.target.value === "."
                          ) {
                          } else if (isNumber(val.target.value)) {
                            formik.handleChange(val);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.collaterealAmount}
                        helperText={
                          formik.touched.collaterealAmount &&
                          formik.errors.collaterealAmount
                        }
                      />
                    </div></>
                      }
                  
                    <div className="input_fld">
                      <label htmlFor="employeeType">Duration</label>
                      <div className="loan-div">
                        <h3
                          className={`loan-btn ${
                            formik.values.duration === "3" ? "active" : ""
                          }`}
                          onClick={() => formik.setFieldValue("duration", "3")}
                        >
                          3 Month
                        </h3>
                        <h3
                          className={`loan-btn ${
                            formik.values.duration === "6" ? "active" : ""
                          }`}
                          onClick={() => formik.setFieldValue("duration", "6")}
                        >
                          6 Month
                        </h3>
                        <h3
                          className={`loan-btn ${
                            formik.values.duration === "12" ? "active" : ""
                          }`}
                          onClick={() => formik.setFieldValue("duration", "12")}
                        >
                          12 Month
                        </h3>
                        <h3
                          className={`loan-btn ${
                            formik.values.duration === "24" ? "active" : ""
                          }`}
                          onClick={() => formik.setFieldValue("duration", "24")}
                        >
                          24 Month
                        </h3>
                        <h3
                          className={`loan-btn ${
                            formik.values.duration === "36" ? "active" : ""
                          }`}
                          onClick={() => formik.setFieldValue("duration", "36")}
                        >
                          36 Month
                        </h3>
                      </div>
                    </div>
                    <div className="input_fld">
                      <div className="upload-img">
                        <label htmlFor="upload">
                          Upload Document (Address & Income proof)
                        </label>
                        <input
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          onChange={(e) => handleImageFile(e.target.files[0])}
                          style={{ display: "none" }}
                          id="fileInput"
                          ref={fileInputRef}
                        />
                        <figure
                          className="upload-fig"
                          onClick={() => fileInputRef.current.click()}
                        >
                          {imageFile ? (
                            <img
                              src={URL.createObjectURL(imageFile)}
                              alt="preview"
                              style={{
                                cursor: "pointer",
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <img
                              src="/static/images/plus (1) 1.png"
                              alt="preview"
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "center",
                              }}
                            />
                          )}
                        </figure>
                        {error && !imageFile ? (
                          <h6 className="err_msg">This field is compulsory.</h6>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="form-submit"
                      onClick={() => setError(true)}
                    >
                      Apply Now
                    </button>
                  </>
                ) : (
                  renderHomeLoan()
                )}
              </form>
            </div>
          </div>
          <div className="applyloan-rt">
            <div className="loan-card">
              <div className="card-hdr">
                <h2>Your Monthly EMI</h2>
                <h4>{emidata?.emi || 0} ETH</h4>
              </div>
              <div className="applyloan-table">
                <table className="r-table">
                  <tbody>
                    <tr>
                      <td style={leftStyle}>Loan Amount</td>
                      <td style={rightStyle}>{emidata?.amount || 0} ETH</td>
                    </tr>
                    <tr>
                      <td style={leftStyle}>
                        Interest at {`${emidata?.interstRate || 0}%`} p.a.
                      </td>
                      <td style={rightStyle}>
                        {emidata?.totalInterest || 0} ETH
                      </td>
                    </tr>
                  </tbody>
                  <hr></hr>
                  <tbody>
                    <tr>
                      <td style={leftStyle}>Total payable</td>
                      <td style={rightStyle}>
                        {emidata?.totalAmount || 0} ETH
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyLoan;

// import React from 'react'

// const ApplyLoan = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default ApplyLoan
