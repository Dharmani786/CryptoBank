import { Typography } from "@mui/material";
import "./Working.css";

const Works = () => {

  const data = [
    {
      name: 'Bitcoin',
      symbol : 'BTC',
      lastPrice: '$22,360.77',
      change24h: '-4.23%',
      marketCap: '$431,718,886,140.40',
      change7d: '-6.40%',
      lastUpdate: '2022-2023'
    },
    {
      name: 'Ethereum',
      symbol: "ETH",
      lastPrice: '$1,542.89',
      change24h: '-2.31%',
      marketCap: '$176,802,889,211.93',
      change7d: '-9.15%',
      lastUpdate: '2022-2023'
    },
    {
      name: 'Tether',
      symbol: "USDT",
      lastPrice: '$1,542.89',
      change24h: '0.00%',
      marketCap: '$176,802,889,211.93',
      change7d: '0.00%',
      lastUpdate: '2022-2023'
    },
    {
      name: 'Ethereum',
      symbol: "USDC",
      lastPrice: '$1,542.89',
      change24h: '-4.23%',
      marketCap: '$176,802,889,211.93',
      change7d: '-6.40%',
      lastUpdate: '2022-2023'
    }
    
  ];

  return (
    <>


    <div className="bg-img">
      <div className="container">
        <div className="works_wrap">
          <Typography
            className="works"
            variant="h5"
            color="#2B2B2B"
            sx={{ fontWeight: "700", fontSize:"30px",   }}
          >
            How it Works
            <p>
              Choose when and how much to repay. Interest payments are debited
              monthly from your account.
            </p>
          </Typography>
          <div className="image_wrap">
            <div className="image_overlap">
              <figure className="Line">
                <img src="/static/images/Line.png" alt="Line" />
              </figure>

              <div className="am_et">
                <div className="image-gallery">
                  <div className="image-item">
                    <img src="/static/images/coins.png" alt="coin" />
                  </div>
                  <div className="text-item">               
                      <h3>Deposit assets</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
                <div className="image-gallery">
                  <div className="image-item">
                    <img src="/static/images/clicker.png" alt="coin" />
                  </div>
                  <div className="text-item">
                      <h3>Choose your terms</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
                <div className="image-gallery">
                  <div className="image-item">
                    <img src="/static/images/money.png" alt="coin" />
                  </div>
                  <div className="text-item">
                      <h3>Receive your loan</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
                <div className="image-gallery">
                  <div className="image-item">
                    <img src="/static/images/discount.png" alt="coin" />
                  </div>
                  <div className="text-item">
                      <h3>Maintainloan-to-value %</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
                <div className="image-gallery">
                  <div className="image-item">
                    <img src="/static/images/wallet.png" alt="coin" />
                  </div>
                  <div className="text-item">
                      <h3>Repay loan& pay interest</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </div>
              </div>
                </div>

                {/* <div className="image-item">
                  <img src="/static/images/clicker.png" alt="clicker" />
                </div>
                <div className="image-item">
                  <img src="/static/images/money.png" alt="money" />
                </div>
                <div className="image-item">
                  <img src="/static/images/discount.png" alt="discount" />
                </div>
                <div className="image-item">
                  <img src="/static/images/wallet.png" alt="wallet" />
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* <div className="text-line">
          <div className="text-item">
              <h3>Choose your terms</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="text-item">
            <h3>Choose your terms</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="text-item">
            <h3>Receive your loan</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="text-item">
            <h3>Maintainloan-to-value %</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="text-item">
            <h3>Repay loan& pay interest</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div> */}
      </div>

      <div className="pamphlet-block">
        <div className="container">
          <div className="pamphlet-wrap">
            <div className="pamphlet-left">
              <h2>
                Get Loan in Two <br /> Simple Steps
              </h2>
              <p>
                Submit Ethereum as a collateral <br />
                Get Approval for USDT (ERC 20) Loan Instantly
              </p>
            </div>

            <div className="pamphlet-right">
              <figure className="arrow-pic">
                <img src="/static/images/arrow.png" alt="arrow-img" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <div className="mar_ket">
      <div className="container">
        <div className="Borrow">
          <h4>Borrow Market</h4>
        </div>

        
        
        <div className="Data_list">
      <table className="Tbl-data">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
            <th>Last 7 Days</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{item.name}
              <span className="cntnt_shrtnm">({item?.symbol}) </span>
              </td>
              <td>{item.lastPrice}</td>
              <td style={{ color: item.change24h.includes('-') ? 'red' : 'green' }}>{item.change24h}</td>
              <td>{item.marketCap}</td>
              <td style={{ color: item.change7d.includes('-') ? 'red' : 'green' }}>{item.change7d}</td>
              <td>{item.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
         


      </div>
    </>
  );
};

export default Works;
