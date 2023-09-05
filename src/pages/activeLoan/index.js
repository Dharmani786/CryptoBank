import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveLoanData } from "../../redux/features/activeLoanSlice";
import CommonSearchBar from "../../components/common/CommonSearchBar";
import "../../components/common/common.css";
import CommonTable from "../../components/common/CommonTable";
import { ABI, ContractAddress } from "../../Web3_interact/configuration";
import Web3 from "web3";
import Loader from "../../constants/loader/Loader";

const ActiveLoan = () => {
  const [loanData, setLoanData] = useState([]);
  const dispatch = useDispatch();
  const [contract, setContract] = useState("");
  const [loanDetailsData, setLoanDetailsData] = useState("");

  const activeHeaders = [
    "S NO",
    "Loan Type",
    "Start Date",
    "End Date",
    "Amount",
    "EMI",
    "View",
  ];
  const headers = [
    "loanType",
    "loanStartDate",
    "loanEndDate",
    "loanAmount",
    "noOfEMI",
    "_id",
  ];

  const load = useSelector((state) => state.activeLoan.loading);
  useEffect(() => {
    console.log("ooo", contract);
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

  useEffect(() => {
    if (contract) {
      // GetLoanDetails();
    }
  }, [contract]);
  // const GetLoanDetails = async () => {
  //   try {
  //     const loanDetails = await contract.methods.getLoanDetails('car').call();
  //     setLoanDetailsData(loanDetails)
  //     console.log(loanDetails,'cdcdcd2')
  //     console.log(loanDetailsData,'cdcdcd')
  //   }
  //   catch (error) {
  //     console.log(error,'xdxdxd')
  //   }
  // };

  useEffect(() => {
    dispatch(fetchActiveLoanData())
      .then((result) => {
        console.log(result);
        if (result.payload.statusCode === 200) {
          setLoanData(result.payload.data[0].data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const handleSearch = (params) => {
    dispatch(fetchActiveLoanData(params))
      .then((result) => {
        console.log(result);
        if (result.payload.statusCode === 200) {
          setLoanData(result.payload.data[0].data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const mappedData =
    loanData.length > 0
      ? loanData.map((loan) => {
        const formattedStartDate = new Date(
          loan.loanStartDate
        ).toLocaleDateString("en-GB");
        const formattedEndDate = new Date(
          loan.loanEndDate
        ).toLocaleDateString("en-GB");
        return headers.reduce((acc, header) => {
          if (header === "loanStartDate") {
            acc[header] = formattedStartDate;
          } else if (header === "loanEndDate") {
            acc[header] = formattedEndDate;
          } else {
            acc[header] = loan[header];
          }
          return acc;
        }, {});
      })
      : [];

  const handleReset = () => {
    dispatch(fetchActiveLoanData())
      .then((result) => {
        if (result.payload.statusCode === 200) {
          setLoanData(result.payload.data[0].data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="wrapcls">
      <Loader isLoad={load} />
      <div className="container">
        <div className="loan-wrp">
          <h2>Active Loan</h2>
          <hr />
          <CommonSearchBar onSearch={handleSearch} onReset={handleReset} />
          <div className="loan-table">
            {headers.length > 0 && (
              <CommonTable
                headers={headers}
                data={mappedData}
                constHeader={activeHeaders}
                id={loanData[0]?._id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveLoan;
