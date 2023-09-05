import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  STORAGE_KEYS,
  getFromStorage,
  removeFromStorage,
  setToStorage,
} from "../../constants/Storage";
// import DialogComponent from "../../components/common/DialogComponent";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";
import { setData } from "../../redux/features/dataSlice";
import { logOut } from "../../redux/features/logOutSlice";
import { infoToast } from "../../constants/ShowToast";
import { Box, Modal } from "@mui/material";
import { connectMetamask } from "../../features/register/metamask";

const Header2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const openProfile = Boolean(anchorEl);
  const [loginMenu, setLoginMenu] =useState(null);
  const[connect,setConnect]=useState(false)
  const [walletAddress,setWalletAddress]=useState('')
  console.log(loginMenu, "loginMenu");
  const LoginOpen = Boolean(loginMenu);

  const handleLoginClick = (event) => {
    setLoginMenu(event.currentTarget);
  };

  const handleLoginClose = () => {
    setLoginMenu(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    border: "none",
    borderRadius: 2,
    p: 4,
  };

  const dialogData = [
    {
      logo: "/static/images/17-Loan.png",
      text: "Apply Loan",
      description: "Lorem ipsum dolor sit amet,",
      link: "/login",
    },
  ];

  const DialogData = [
    {
      logo: "/static/images/17-Loan.png",
      text: "Apply Loan",
      description: "Lorem ipsum dolor sit amet,",
      link: "/applyloan",
    },
    {
      logo: "/static/images/qoer.png",
      text: "Active Loan",
      description: "Lorem ipsum dolor sit amet,",
      link: "/activeloan",
    },
    {
      logo: "/static/images/loan (3) 1.png",
      text: "Requested Loan",
      description: "Lorem ipsum dolor sit amet,",
      link: "/requestedloan",
    },
  ];

  // const dialogPosition = {
  //   position: "absolute",
  //   bottom: "360px",
  //   right: "350px",
  // };
  const dialogPosition = {
    position: "absolute",
    bottom: "350px",
    right: "450px"
  }
  const handleConnectMetamask = async () => {
    try {
      const account = await connectMetamask();
      const last5Chars = account.slice(-7); 
      const addressLength = account.length;
      const ellipsis = addressLength > 7? "..." : "";
      setWalletAddress(last5Chars + ellipsis)
      setToStorage(STORAGE_KEYS.walletAddress, account)
      setConnect(true);
    } catch (error) {
      console.log(error);
    }
  };

  const loginState = useSelector((state) => state.login);


  useEffect(() => {
    const token = getFromStorage(STORAGE_KEYS.token);
    const data = getFromStorage(STORAGE_KEYS.userData);
    if (token) {
      dispatch(
        setData({
          user: data ? JSON.parse(data) : null,
          token,
        })
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const logdata = useSelector((state) => state?.data?.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(false);
    navigate("/updateProfile");
  };

  const handleChangePassword = () => {
    setAnchorEl(false);
    navigate("/changepassword");
  };

  const handleCloseDiolog = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    
    dispatch(logOut())
      .then((response) => {
        if (response?.payload?.statusCode === 200) {
          removeFromStorage(STORAGE_KEYS?.token);
          removeFromStorage(STORAGE_KEYS.userData);
          removeFromStorage(STORAGE_KEYS?.walletAddress);
          dispatch(
            setData({
              user: null,
              token: "",
            })
          );
          setAnchorEl(false);
          setOpenModal(false)
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <header className="header">
      <div className="container mn_hdr">
        <div className="logo-container">
          <Link to="/">
            <img src="/static/images/logo.png" alt="company" className="logo" />
          </Link>
          {!logdata && (
            <>
              <Link onClick={handleLoginClick} className="emi-selector">
                Loan
                {/* <figure onClick={handleLoginClick}> */}
                <img
                  className="arrow-icn"
                  src="/static/images/select.png"
                  alt="dropdown-pic"
                />
                {/* </figure> */}
              </Link>
              <Menu
                className="menu1"
                id="basic-menu-logout"
                anchorEl={loginMenu}
                open={LoginOpen}
                onClose={handleLoginClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button-logout",
                }}
              >
                {dialogData?.map((item) => (
                  <MenuItem
                    key={item.link}
                    onClick={() => {
                      handleLoginClose();
                      navigate(item.link);
                    }}
                  >
                    <div className="menuitem">
                      <figure
                        style={{
                          width: "35px",
                          height: "35px",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src={item.logo}
                          alt=""
                          style={{ width: "100%", height: "100%" }}
                        />
                      </figure>
                      <div className="text">
                        <h3
                          style={{
                            fontSize: "19px",
                            color: "#1E90FF",
                            lineHeight: "22px",
                            paddingBottom: "5px",
                            fontWeight: "100",
                          }}
                        >
                          {item.text}
                        </h3>
                        <p style={{ fontSize: "15px", color: "#708090" }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </div>
        {logdata ? (
          <div className="login-register">
            <Link to="/deposit" className="emi-selector" onClick={handleLoginClose}>
              Amount
            </Link>
            <Link onClick={handleLoginClick} className="emi-selector">
              Loan
              <img
                className="arrow-icn"
                src="/static/images/select.png"
                alt="dropdown-pic"
              />
            </Link>
            <Menu
              className="menu2"
              style={{ top: "30px", width: "400px" }}
              id="basic-menu-login"
              anchorEl={loginMenu}
              open={LoginOpen}
              onClose={handleLoginClose}
              MenuListProps={{
                "aria-labelledby": "basic-button-login",
              }}
            >
              {DialogData?.map((item) => (
                <MenuItem
                  key={item.link}
                  onClick={() => {
                    handleLoginClose();
                    navigate(item.link);
                  }}
                >
                  <div className="menuitem">
                    <figure
                      style={{
                        width: "35px",
                        height: "35px",
                        marginRight: "10px",
                      }}
                    >
                      <img
                        src={item.logo}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </figure>
                    <div className="text">
                      <h3>{item.text}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </Menu>

            <div>
              <Link to="/EMI" className="emi-selector" onClick={handleLoginClose}>
                EMI
              </Link>
            </div>
            <button className="register-button" onClick={handleClick}>
              {logdata?.fullName || "no data"}
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openProfile}
              onClose={handleCloseProfile}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ marginTop: "25px" }}
            >
              <MenuItem onClick={handleClose}>
                <img
                  src="/static/images/17-Loan.png"
                  className="prof-icn"
                  alt=""
                />
                Profile
              </MenuItem>
              <MenuItem onClick={handleChangePassword}>
                <img
                  src="/static/images/password 1.png"
                  className="prof-icn"
                  alt=""
                />
                Change Password
              </MenuItem>
              <MenuItem onClick={() => {
                setAnchorEl(null);
                setOpenModal(true)
              }}>
                <img
                  src="/static/images/logout 1.png"
                  className="prof-icn"
                  alt=""
                />
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <div className="header-metamask">
              {/* {!connect ? */}
               <button onClick={handleConnectMetamask}>
               <img src="/static/images/MetaMask_Fox 1.png" alt="MetaMask Logo" />
             </button>
              {/* : '' */}
            {/* }    */}
            </div>
            <div className="login-register">
              <Link to="/login">
                <button className="login-button">Log In</button>
              </Link>
              <Link to="/register">
                <button className="register-button">Register</button>
              </Link>
            </div>
          </>
        )}
      </div>
      <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div className="warning-modal">
                    <h3>Are you sure, you want to logout?</h3>
                    <div className="btn-div">
                      <button className="yes" onClick={() => handleLogout()}>
                        Yes
                      </button>
                      <button
                        className="no"
                        onClick={() => setOpenModal(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Box>
              </Modal>
    </header>
  );
};

export default Header2;
