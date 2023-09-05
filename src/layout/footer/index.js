import { Box } from "@mui/material";
import React from "react";
// import { makeStyles } from "@mui/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton } from "@mui/material";
import "./Footer.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//   footer: {
//     marginTop: "auto",
//     // backgroundColor: '#333',
//     color: "#fff",
//     padding: "20px",
//   },
// }));

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const ele = document.getElementById("hideFooter");
    if (
      location?.pathname === "/register" ||
      location?.pathname === "/login" ||
      location?.pathname === "/forgot-password" ||
      location?.pathname === "/changepassword" ||
      location?.pathname === "/updateProfile"  ||
      location?.pathname === "/forgotPasswordOtp"
    ) {
      ele.style.display = "none";
    } else {
      ele.style.display = "flex";
    }
  }, [location]);

  return (
    <footer className="container  foo_ter" id="hideFooter">
      <div className="ftr_container">
        <div className="ftr_wrp">
          <Box className="ftr_con">
            <Box className="ftr_con-li">
              <img src="/static/images/logo.png" alt="logo" />
              <p className="lo_rem">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ultrices nisi et erat malesuada, nec venenatis lacus auctor.
                Quisque sed efficitur metus, at dignissim mauris. Aenean <br />{" "}
                eleifend,
              </p>
            </Box>
            <Box className="ftr_li">
              <ul>
                <li className="li_main">Company</li>
                <li className="about" onClick={() => navigate("/aboutus")}>
                  About Us
                </li>
                <li
                  className="about"
                  onClick={() => navigate("/faq")}
                >
                  FAQ
                </li>
              </ul>
            </Box>
            <Box className="ftr_li">
              <ul>
                <li className="li_main">Loan</li>
                <li className="about">Personal Loan</li>
                <li className="about">Home Loan</li>
                <li className="about">Car Loan</li>
              </ul>
            </Box>
            {/* <Box className="ftr_li">
              <ul>
                <li className="li_main">Assets</li>
                <li className="about">All Assets</li>
                <li className="about">Buy Ethereum</li>
              </ul>
            </Box> */}
            <Box className="ftr_li">
              <ul>
                <li className="li_main">Setting</li>
                <li
                  className="about"
                  onClick={() => navigate("/terms&conditions")}
                >
                  Terms & Conditions
                </li>
                <li
                  className="about"
                  onClick={() => navigate("/privacypolicy")}
                >
                  Privacy policy
                </li>
              
              </ul>
            </Box>

            <Box></Box>
          </Box>
        </div>
        <Box className="icon">
          <ul>
            <li className="ftr_socials">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
               <IconButton className="socialIcons">
                <FacebookOutlinedIcon sx={{ color: "white" }} />
              </IconButton>
            </a>
            <a
              href="https://twitter.com/Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
                <IconButton className="socialIcons">
                <TwitterIcon sx={{ color: "white" }} />
              </IconButton>
            </a>

            <a
              href="https://in.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton className="socialIcons">
                <LinkedInIcon sx={{ color: "white" }} />
              </IconButton>
            </a>
             
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
                <IconButton className="socialIcons">
                <InstagramIcon sx={{ color: "white" }} />
              </IconButton>
            </a>
           
              <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton className="socialIcons">
                <YouTubeIcon sx={{ color: "white" }} />
              </IconButton>
            </a>
             
            </li>
          </ul>
        </Box>
      </div>
    </footer>
  );
};

export default Footer;
