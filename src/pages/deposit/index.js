import React from "react";
import Amount from "../../features/deposit/Amount";
import { currency } from "../../constants/constants";
import DepositTable from "../../features/deposit/DepositTable";
import { Box, Card, Typography } from "@mui/material";
import "./deposit.css";
import { useState } from "react";
import { useEffect } from "react";
import Web3 from "web3";
import { ABI, ABI2, ContractAddress, ContractAddress2 } from "../../Web3_interact/configuration";
import Currency from "../../features/deposit/Currency";
import { errorToast } from "../../constants/ShowToast";
import { useDispatch, useSelector } from "react-redux";
import { getDepositAmount } from "../../redux/features/getDepositAmountSlice";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BadgeIcon from "@mui/icons-material/Badge";
import Loader from "../../constants/loader/Loader";
import { STORAGE_KEYS, setToStorage } from "../../constants/Storage";
const Deposit = () => {
  const [currencyType, setCurrencyType] = useState("ETH");
  console.log(currencyType, 'curtypee====');
  const [contract, setContract] = useState("");
  const [contract2, setContract2] = useState("");
  const [usdt, setUsdt] = useState("");
  const [account, setAccount] = useState("");
  const dispatch = useDispatch();
  const [totalEth, setTotalEth] = useState(0);
  const [lockedEth, setLockedEth] = useState([]);
  const [unLockedEth, setunLockedEth] = useState([]);
  console.log(unLockedEth, lockedEth, totalEth, "dataaa===");

  const [type, setType] = useState("Locked");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum !== "undefined") {
        try {
          console.log("running");
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const contractInstance = new web3.eth.Contract(ABI, ContractAddress);
          console.log(contractInstance, "contractInstace");
          setContract(contractInstance);
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          setToStorage(STORAGE_KEYS.walletAddress, account || null);
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
    const initApprove = async () => {
      if (window.ethereum !== "undefined") {
        try {
          console.log("running");
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const contractInstance2 = new web3.eth.Contract(ABI2, ContractAddress2);
          console.log(contractInstance2, "contractInstace");
          setContract2(contractInstance2);
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          setToStorage(STORAGE_KEYS.walletAddress, account || null);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("Please install MetaMask or any other Web3 provider.");
      }
    };

    initApprove();
  }, []);



  useEffect(() => {
    dispatch(getDepositAmount())
      .then((result) => {
        if (result?.payload?.statusCode === 200) {
          console.log(
            result?.payload?.data?.totalEth[0]?.total,
            "depositdattatatata"
          );
          setTotalEth(result?.payload?.data?.totalEth[0]?.total || 0);
          setLockedEth(result?.payload?.data?.Collateral || []);
          setunLockedEth(result?.payload?.data?.UnlockedCollateral || []);
        }
      })
      .catch((error) => {
        console.log(error, "errrrerrrrr====");
      });
  }, []);

  const handleCurrencyChange = (event) => {
    setCurrencyType(event.target.value);
    console.log("cur", currencyType);
  };

  // const CheckUsdtBalance = async () => {
  //   try {
  //     const gas = await contract.methods
  //     .Loan_approvedBalance("car")
  //     .estimateGas({ from: account });
  //     const balance = await contract.methods
  //       .Loan_approvedBalance("car")
  //       .send({ from: account, gas: gas });
  //     console.log(balance, "balance======");
  //     setUsdt(balance);
  //   } catch (error) {
  //     console.log(error, "errorz");
  //     errorToast(error?.data?.message);
  //   }
  // };
  const CheckUsdtBalance = async () => {
    console.log('enter');
    try {
      // Assuming contract is already initialized with the contract instance.
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account,'8888888');
      const gas = await contract.methods.Loan_approvedBalance("car").estimateGas({ from: account });
  
      let balance = await contract.methods.Loan_approvedBalance("car").send({ from: account, gas: gas });
      balance =  await contract.methods.Loan_approvedBalance()
      .call();
      console.log( "balance======calll", balance);

      setUsdt(balance);
    } catch (error) {
      console.log(error, "errorz");
      errorToast(error?.data?.message);
    }
  };
  
//ustd withdraw
  // const WithdrawLoanFund = async (loanType) => {
  //   console.log("wLf usdttttt widthdraw called", loanType);
  //   try {
  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     const account = accounts[0];
  //     console.log(account, "userAcc");
  //     const gas = await contract.methods
  //       .withdrawLoanFund(loanType.toLowerCase())
  //       .estimateGas({ from: account });
  //     const transaction = await contract.methods
  //       .withdrawLoanFund(loanType.toLowerCase())
  //       .send({ from: account, gas: gas });
  //     console.log(transaction, "rtrt");
  //   } catch (error) {
  //     console.log(error?.data?.message, "errry");
  //     errorToast(error?.data?.message);
  //   }
  // };

  //widthdraw fund 

  const widthdrawFund = async (amount) => {
    console.log(amount,'=====amountt==');
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      const gas = await contract.methods
        .widthdrawUsdt(amount)
        .estimateGas({ from: account });
      const transaction = await contract.methods
        .widthdrawUsdt(amount)
        .send({ from: account, gas: gas });
      console.log(transaction, "dgt");
    } catch (error) {
      console.log(error);
      errorToast(error?.data?.message);
    }
  }



  //eth withdraw
  const WithdrawSecurityAmount = async (loantype) => {
    console.log("wS111a called", loantype);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account, "userAcc");
      const gas = await contract.methods
        .withdrawSecurityAmount(loantype.toLowerCase())
        .estimateGas({ from: account });
      const transaction = await contract.methods
        .withdrawSecurityAmount(loantype.toLowerCase())
        .send({ from: account, gas: gas });
      console.log(transaction, "dgt");
    } catch (error) {
      console.log(error);
      errorToast(error?.data?.message);
    }
  };


  const DepositFund = async (amount) => {
    console.log(amount, "deposit amount");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account, "userAcc");

      const gas2 = await contract2.methods
      .approve(amount)
      .estimateGas({ from: account });

      const transferApproval = await contract2.methods.approve(ContractAddress2,amount).send({from:account,gas:gas2});

      console.log('=================transferApproval: ', transferApproval);

      const gas = await contract.methods
        .depositUsdt(amount)
        .estimateGas({ from: account });

      const transaction = await contract.methods
        .depositUsdt(amount)
        .send({ from: account, gas: gas });
        
      console.log(transaction, "transaction");
    } catch (error) {
      console.log(error, "errrrururur");
      errorToast(error?.data?.message);
    }
  };

  const load = useSelector((state) => state?.EthApi?.status);
  console.log(load, "ssssttttttt");
  const usdtInt = parseInt(usdt, 10);
  // console.log(amount)
  return (
    <div className="deposit-fluid ">
      <Loader isLoad={load} />
      <div className="container">
        <div className="wrap-deposit">
          <div className="cur-rency">
            <div className="deposit-lft">
              <div className="deposit-amount-cont">
                <Amount
                  amt={currencyType === "ETH" ? totalEth : usdtInt}
                  Withdraw={
                    currencyType === "ETH"
                      ? WithdrawSecurityAmount
                      : widthdrawFund
                  }
                  WithdrawFund ={widthdrawFund}
                  currency={currencyType}
                  deposit={DepositFund}
                />
              </div>
              <div className="deposit-currency-cont">
                <h2>Currency</h2>
                {/* currency */}
                <div className="deposit-currency_cont">
                  <Card
                    variant="outlined"
                    // onClick={(e) => handleCurrencyChange(e)}
                    onClick={() => setCurrencyType('ETH')}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "61px",
                      width: "329px",
                      padding: "0px 10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <figure
                        style={{
                          height: "33px",
                          width: "33px",
                          marginRight: "15px",
                        }}
                      >
                        {" "}
                        <img
                          src="/static/images/2b5c7d80-7bcd-4cfb-8bd9-d1760a752afc 1.png"
                          alt="eth"
                        />{" "}
                      </figure>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: "20px",
                            fontWeight: "700px",
                          }}
                        >
                          ETH
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            margin: "0px 0px 0px 0px ",
                            fontWeight: "400px",
                          }}
                        >
                          Etherium
                        </Typography>
                      </Box>
                    </div>
                    <input
                      type="radio"
                      className="deposit-radio"
                      value="ETH"
                      checked={currencyType === "ETH"}
                    />
                  </Card>
                  <Card
                    variant="outlined"
                    onClick={(e) => {
                      setCurrencyType("USDT")
                      // handleCurrencyChange(e);
                      // CheckUsdtBalance();
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "61px",
                      width: "329px",
                      padding: "0px 10px",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <figure
                        style={{
                          height: "33px",
                          width: "33px",
                          marginRight: "15px",
                        }}
                      >
                        {" "}
                        <img
                          src="/static/images/ethereum.png"
                          alt="usdt"
                        />{" "}
                      </figure>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: "20px",
                            fontWeight: "700px",
                          }}
                        >
                          USDT
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            margin: "0px 0px 0px 0px ",
                            fontWeight: "400px",
                          }}
                        >
                          TetherUS
                        </Typography>
                      </Box>
                    </div>
                    <input
                      type="radio"
                      className="deposit-radio"
                      value="USDT"
                      checked={currencyType === "USDT"}
                    />
                  </Card>
                </div>

                {/* currency end */}
              </div>
            </div>
            <div className="deposit-rt">
              <div className="deposit-hr-cont">
                <div
                  style={{
                    width: "770px",
                    height: "230px",
                    color: "#fff",
                  }}
                >
                  <div className="hr-content">
                    {/* <h3>Home loan 3400 ETH</h3>
                                        <h3>Car loan 3440 ETH</h3>
                                        <h3>Personal loan 3400 ETH</h3>
                                         <h1>{currencyType === 'ETH' ? 750 : usdtInt}<span style={{
                                            fontSize: '16px',
                                            padding: '10px'
                                        }}>{currencyType}</span></h1> */}
                    <div className="balace_display">
                      <h2>
                        {type === "Locked"
                          ? "Locked Ethereum"
                          : "Unlocked Ethereum"}
                      </h2>
                      {type === "Locked"
                        ? lockedEth?.map((item) => {
                            return (
                              <div key={item?._id}>
                                <div className="loan_bal">
                                  {item._id === "HOME" ? (
                                    <HomeIcon />
                                  ) : item._id === "CAR" ? (
                                    <DirectionsCarIcon />
                                  ) : (
                                    <BadgeIcon />
                                  )}
                                  <h5>{item?._id || ""} :</h5>
                                  <p>{item?.total || 0} ETH</p>
                                </div>
                              </div>
                            );
                          })
                        : unLockedEth?.map((item) => {
                            return (
                              <div key={item?._id}>
                                <div className="loan_bal">
                                  {item._id === "HOME" ? (
                                    <HomeIcon />
                                  ) : item._id === "CAR" ? (
                                    <DirectionsCarIcon />
                                  ) : (
                                    <BadgeIcon />
                                  )}
                                  <h5>{item?._id || ""} :</h5>
                                  <p>{item?.total || 0} ETH</p>
                                </div>
                              </div>
                            );
                          })}
                    </div>

                    <div className="rev_buttons">
                      <div
                        className={
                          type === "Locked" ? "r_btn active_dis" : "r_btn"
                        }
                        onClick={() => setType("Locked")}
                      >
                        <h6>Locked Etherium</h6>
                        <LockIcon />
                      </div>
                      <div
                        className={
                          type === "Unlocked" ? "r_btn active_dis" : "r_btn"
                        }
                        onClick={() => setType("Unlocked")}
                      >
                        <h6>Unlocked Etherium</h6>
                        <LockOpenIcon />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hr-img">
                  <figure
                    style={{
                      height: "100%",
                      width: "395px",
                    }}
                  >
                    <img
                      src="/static/images/Artwork.png"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      alt=""
                    ></img>
                  </figure>
                </div>
              </div>
              <div className="deposit-table">
                <DepositTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
