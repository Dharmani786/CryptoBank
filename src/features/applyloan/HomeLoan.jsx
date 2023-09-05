import moment from 'moment';
import React, { useEffect } from 'react'

const HomeLoan = (props) => {
const loanDataArr = Array.from(props.loanData);
console.log(loanDataArr, '0000');

useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);
  return (
    <div className='homeloan-cont'>
      <div className='homeloan-details'>
        <div className='details-header'>
          <h4>{loanDataArr[0]?.loanType || ""}</h4>
          <h4>USDT {loanDataArr[0]?.collaterealAmount || ""}</h4>
        </div>
        <div className='details-time'>
           <p>{moment(loanDataArr[0]?.createdAt).format('Do MMMM, YYYY')}{" "}{moment(loanDataArr[0]?.createdAt).format('h:mm A')}</p>
        </div>
        <div className="details-table">
          <table className='details-tab'>
            <thead>
              <tr>
                <th>No</th>
                <th>Status</th>
                <th>No's of EMI</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              { loanDataArr?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight:'bold',color: item.loanStatus === 'PENDING' ? '#FCAD00' : 'green' }}>{item.loanStatus}</td>
                  <td>{item.noOfEMI}</td>
                  <td>{item.loanAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HomeLoan