import { Typography, Box } from "@mui/material";

const Introduction = () => {
  return (
    <section>
      <div className="container section_intro">
      <div className="intro_wrap">
        <div className="intro_left_content">
          <Typography className="len_ding" variant="h4" color="#2B2B2B" sx = {{ fontWeight:600,fontSize:56 }}>
            Embrace the Future <br /> of Lending With <br /> <p className="Eth_blue">Ethereum </p>
          </Typography>
          <Typography variant="body1" color="#2B2B2B" sx ={{lineHeight: "34px", fontSize:26, fontWeight:500, paddingTop:"30px"}}>
            Your Gateway to Decentralized <br/>Ethereum  Lending!
          </Typography>
          <div class="Four_btn_wrap">
            <button class="Four_btn">
              <img src="/static/images/credit-card.png" alt="Image 1" width="20px" />
              <p>Repay At any time</p>
            </button>
            <button class="Four_btn">
              <img src="/static/images/coins.png" alt="Image 2" width="20px" />
              <p>No Transaction fee</p>
            </button>
            <button class="Four_btn">
              <img src="/static/images/Vector2.png" alt="Image 3" width="20px" />
              <p>Low rate Loan staking</p>
            </button>
            <button class="Four_btn">
              <img src="/static/images/ethereum.png" alt="Image 4" width="20px" />
              <p>ETH Loan</p>
            </button>
          </div>
        </div>
        <figure className="intro_right_content">
          <img
            src="/static/images/Layer.png"
            alt="layer"
            className="Layer_pic"
          />
        </figure>
      </div>
      </div>
    </section>
  );
};

 export default Introduction;