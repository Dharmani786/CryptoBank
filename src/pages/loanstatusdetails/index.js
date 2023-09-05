import React, { useEffect } from "react";
import { LinearProgress } from "@mui/material";
import "./LoanStatusDetails.css";
import { useDispatch } from "react-redux";
import {  useParams } from "react-router-dom";
import { useState } from "react";
import Web3 from "web3";
import { ABI, ContractAddress } from "../../Web3_interact/configuration";
import {
  activeLoanDetails,
  getEmi,
  payEmi,
} from "../../redux/features/activeLoanDetailsSlice";
import { errorToast } from "../../constants/ShowToast";

const LoanStatusDetails = () => {
  const id = useParams();
  const dispatch = useDispatch();

  const [getEmiData, setGetEmiData] = useState([]);
  const [dataById, setDataById] = useState([]);
  const [contract, setContract] = useState("");
  const [loanType, setLoanType] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;

    // return moment(dateString).format("DD MMM YYYY");
  };
  const handlePay = async () => {
    try {
      const promises = [dispatch(payEmi(id)), dispatch(getEmi(id))];

      const [payEmiResponse, getEmiResponse] = await Promise.all(promises);

      console.log("Payment successful!");
      console.log("payEmiResponse:", payEmiResponse);
      console.log("getEmiResponse:", getEmiResponse);

      const responseData = await getEmiResponse?.payload?.data;
      console.log("getEmiDataaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", responseData);
      setGetEmiData(responseData || []);
    } catch (error) {
      console.error("Payment failed:", error.message);
    }
  };

  const PayEMi = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      const gas = await contract.methods.payEmi(loanType.toLowerCase()).estimateGas({ from: account})
      const transaction = await contract.methods
        .payEmi(loanType.toLowerCase())
        .send({ from: account ,gas: gas});
        console.log(transaction,'sdsdsdgg')
        if(transaction){
          handlePay();
        }
    } catch (error) {
      errorToast(error?.data?.message)
      console.log(error, "payEMIERRRR");
    }
  };

 

  useEffect(() => {
    dispatch(activeLoanDetails(id))
      .then((result) => {
        if (result.payload && result.payload.statusCode === 200) {
          setDataById(result?.payload?.data || []);
          setLoanType(result?.payload?.data?.[0]?.loanType || '')
        } else {
          console.log("Received unexpected response:", result);
        }
      })
      .catch((error) => {
        console.log(
          "Error while dispatching active loan details request:",
          error
        );
      });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getEmi(id))
      .then((response) => {
        const responseData = response.payload.data;
        setGetEmiData(responseData || []);
      })
      .catch((error) => {
        console.error("Error fetching getEmi:", error);
      });
  }, [id, dispatch]);

  // smart contract
  useEffect(() => {
    const init = async () => {
      if (window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const contractInstance = new web3.eth.Contract(ABI, ContractAddress);
          console.log(contractInstance, "contractInstace");
          setContract(contractInstance);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("Please install MetaMask or any other Web3 provider.");
      }
    };

    init();
  }, []);

  return (
    <div className="section-1">
      <div className="container">
        {dataById?.map((item) => {
          return (
            <div className="home-loan">
              <h3>{item?.loanType || ""}</h3>
              <ul className="loan">
                <li className="amount">
                  <p>Loan Approved On</p>
                  <h4>{formatDate(item?.loanApprovedDate) || ""}</h4>
                </li>
                <li className="amount">
                  <p>Total Loan Amount</p>
                  <h4>{item?.loanAmount || 0}</h4>
                </li>
                <li className="amount">
                  <p>TimeLine</p>
                  <h4>{item?.loanTenure || 0} Month</h4>
                </li>
                <li className="amount">
                  <p>Collateral Amount</p>
                  <h4>{item?.collaterealAmount || 0}</h4>
                </li>
                <li className="amount">
                  <p>Locking Period</p>
                  <h4>{item?.loanTenure || 0} Month</h4>
                </li>
              </ul>
            </div>
          );
        })}

        <div className="section-2">
          {dataById?.length
            ? dataById?.map((item) => {
                return (
                  <div className="Disbursed-sec sec-d1">
                    <div className="flex-sec-2">
                      <figure className="MoneybagImg">
                        <img
                          src="/static/images/money-bag.png"
                          alt="Money Bag"
                        />
                      </figure>
                      <p>We have given you</p>
                    </div>
                    <div className="text-flex-idf">
                      <h4>Disbursed Amount</h4>
                      <p>total amount</p>
                    </div>
                    <div className="range-progressbar">
                      <p>ETH {item?.disbursedAmount || 0}</p>
                      <p>ETH {item?.loanAmount || 0}</p>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={item?.disbursedAmount || 0}
                    />
                  </div>
                );
              })
            : null}

          {getEmiData?.length
            ? getEmiData?.map((item) => {
                console.log(item, "9099999");
                return (
                  <div className="Disbursed-sec sec-d2">
                    <div className="flex-sec-2">
                      <figure className="MoneybagImg">
                        <img
                          src="/static/images/money-bag.png"
                          alt="Money Bag"
                        />
                      </figure>
                      <p>You must pay back</p>
                    </div>
                    <div className="text-flex-idf">
                      <h4>Repaid Amount</h4>
                      <p>
                        total amount <br /> (With interest)
                      </p>
                    </div>
                    <div className="range-progressbar">
                      <p>ETH {item?.repaidAmount || 0}</p>
                      <p>ETH {item?.LoanAmountWithInterest || 0}</p>
                    </div>
                    <LinearProgress variant="determinate" value={0} />
                    <div className="payNow-btn">
                      <div className="Date-Status">
                        EMI: {item?.EMI || 0} (
                          {/* {item?.emiDueDate === null ? "" : formatDate(item?.emiDueDate) }) */}
                        {formatDate(item?.emiDueDate) || ""})
                      </div>
                      
                      {item?.EMI === 0 ? <button disabled>No EMI</button>: <button
                        onClick={() => PayEMi()}
                      >
                        Pay Emi
                      </button>}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default LoanStatusDetails;
