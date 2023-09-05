import React from "react";
import "./Glance.css";

const Glance = () => {
  return (
    <div className="Glance_block">
      <div className="container Glance-content">
        <div className="glance_left-content">
          <h1 style={{ marginBottom: "35px" }}>
            Quick <br /> Glance
          </h1>
          <p style={{ color: "#1E90FF", fontSize: "20px" ,marginBottom:'10px'}}>
            It's better to see once than to read twice !
          </p>
          <p style={{ fontSize: "20px" , color:'#2B2B2B',marginBottom:'16px', lineHeight:"30px"}}>
            watch our video tutorials to learn how to get the most of our
            products.
          </p>
          <p style={{ fontSize: "20px" , color:'#2B2B2B', lineHeight:"30px" }}>
            Our team consists of highly motivated and skilled specialists <br />{" "}
            who know how to deal with any issue that you mat come <br /> across.
            This creates a basis for lasting relationship with our <br />{" "}
            clients built on trust and mutual understanding.
          </p>
        </div>
        <div className="glance_right-content">
          <figure className="back_img" alt="back-vdo-img">
            <img src="/static/images/Rectangle2.png" alt="Rectangle" />
          </figure>
          <figure className="vdo_img">
          <video height='300' controls="controls autoplay" className="vdo_run">
        <source src="/static/images/home_vd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
          </video>
           </figure>
        </div>
      </div>
    </div>
  );
};
export default Glance;