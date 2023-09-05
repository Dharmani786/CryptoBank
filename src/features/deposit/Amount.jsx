import { WidthWide } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { isNumber, isString } from "../../utils/Validations/validation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  borderRadius: 2,
  p: 4,
};

const Amount = ({ deposit, amt, Withdraw, currency , WithdrawFund}) => {
  console.log(currency,'888amount');
  const total = amt;

  const [open, setOpen] = useState(false);
  const [openwidth, setOpenWidth] = useState(false);
  const [openwithdraw, setOpenWithdraw] = useState(false);
  const [amount, setAmount] = useState("");
  console.log(amount,'amount');
  const [WidAmount, setWidAmount] = useState("");
  const [WithdrawAmount, setWithdrawAmount] = useState()
  const [error, setError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(false);
    setAmount("")
  };

  const handleAddamount = () => {
    if (!amount) {
      setError(true);
    } else {
      deposit(amount);
      setOpen(false);
      setWithdrawAmount("");
    }
  };

  const handleWidthamount = () => {
    if (!WidAmount) {
      setError(true);
    } else {
      Withdraw(WidAmount);
      setOpenWidth(false);
      setWidAmount("");
    }
  };

  const handleWithdrawamount = () => {
    if (!WithdrawAmount) {
      setError(true);
    } else {
      WithdrawFund(WithdrawAmount);
      setOpenWidth(false);
      setWidAmount("");
    }
  };
  const handleCloseWidth = () => {
    setOpenWidth(false);
    setError(false);
    setWidAmount("")
  };

  const handleCloseWithdraw = () => {
    setOpenWithdraw(false);
    setError(false);
    setWithdrawAmount("")
  };

  return (
    <div className="deposit-amount">
      <Box
        sx={{
          height: "230px",
          width: "230px",
          padding: "10px",
          margin: "15px auto",
          position: "relative",
        }}
      >
        <CircularProgressbar
          value={total / 10}
          styles={buildStyles({
            rotation: 0.5,
            strokeLinecap: "butt",
            textSize: "16px",
            pathColor: "#1E90FF",
            textColor: "#708090",
            trailColor: "#F9FAFF",
            backgroundColor: "#1E90FF",
          })}
        />
        <Box
          sx={{
            top: '37%',
            width: '90%',
            textAlign: 'center',
            position: 'absolute',
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px", justifyContent: 'center' }}>
            <Typography variant="h5" color="#1e90ff" fontWeight="900">
              {total || 0}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                lineHeight: "10px",
              }}
            >
              {currency}
            </Typography>
          </div>
          <Typography sx={{ textAlign: "center" }} variant="button">
            Total
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: "20px",
        }}
      >
        <Button
        disabled={currency === "ETH" ? true : false}
          variant="contained"
          className="addbtn"
          //   onClick={props.depositFund}
          onClick={handleOpen}
        >
          Add Amount
        </Button>
        <Button
          variant="outlined"
          onClick={() => setOpenWithdraw(true)}
          //   onClick={Withdraw}
          style={{ width: "50%" }}
        >
          Withdraw
        </Button>
      </Box>
      <div className="widthfund">
      <Button
        disabled={currency === "ETH" ? true : false}
          variant="outlined"
          onClick={() => setOpenWidth(true)}
          //   onClick={Withdraw}
          style={{ width: "100%", marginTop: '20px' }}
        >
          Withdraw Loan Fund
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="amout">
            <h3 style={{ fontSize: "23px" }}>Add Amount</h3>
            <TextField
              placeholder="Enter Amount"
              fullWidth
              value={amount}
              // onChange={(e) => setAmount(e.target.value)}
              onChange={(val) => {
                if (val.target.value === " " || val.target.value === ".") {
                } else if (isNumber(val.target.value)) {
                  setAmount(val.target.value);
                }
              }}
            />
            {error && !amount ? (
              <h6 className="err_msg">This field is compulsory.</h6>
            ) : (
              ""
            )}

            <button
              className="loan-btn23"
              onClick={() => {
                handleAddamount(amount);
              }}
            >
              Add Amount
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openwidth}
        // onClose={{() => setOpenWidth(false);
        //   setError(false)
        // }}
        onClose={handleCloseWidth}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="amout">
            <h3 style={{ fontSize: "23px" }}>Add Loan Type</h3>
            <TextField
              placeholder= "Add Loan Type"
              fullWidth
              value={WidAmount}
              onChange={(val) => {
                if (val.target.value === " " || val.target.value === ".") {
                } else if (isString(val.target.value)) {
                  setWidAmount(val.target.value);
                }
              }}
            />
            {error && !WidAmount ? (
              <h6 className="err_msg">This field is compulsory.</h6>
            ) : (
              ""
            )}

            <button className="loan-btn23" onClick={() => handleWidthamount()}>
              Withdraw
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openwithdraw}
        // onClose={{() => setOpenWidth(false);
        //   setError(false)
        // }}
        onClose={handleCloseWithdraw}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="amout">
            <h3 style={{ fontSize: "23px" }}>Enter Withdraw Amount</h3>
            <TextField
              placeholder= "Enter Withdraw Amount"
              fullWidth
              value={WithdrawAmount}
              onChange={(val) => {
                if (val.target.value === " " || val.target.value === ".") {
                } else if (isNumber(val.target.value)) {
                  setWithdrawAmount(val.target.value);
                }
              }}
            />
            {error && !WithdrawAmount ? (
              <h6 className="err_msg">This field is compulsory.</h6>
            ) : (
              ""
            )}

            <button className="loan-btn23" onClick={() => handleWithdrawamount()}>
              Withdraw Amount
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default Amount;
