import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSearchBar from '../../components/common/CommonSearchBar';
import '../../components/common/common.css';
import CommonTable from '../../components/common/CommonTable';
import { fetchEmiHistory } from '../../redux/features/emiHistorySlice';
import Loader from '../../constants/loader/Loader'



const Emi = () => {
  const [loanData, setLoanData] = useState([]);
  const dispatch = useDispatch();
  const requestHeaders = ['S.No', 'Date', 'Txn Hash', 'Loan', 'From', 'ETH', ' Status'];
  const headers = ['emiPaidDate', 'emiTransactionHash', 'loanType', 'userAddress', 'EMI', 'emiStatus',]
  const load = useSelector((state)=>state.emiHistory.loading)

  useEffect(() => {
    dispatch(fetchEmiHistory())
      .then(result => {
        console.log(result)
        if (result.payload.statusCode === 200) {
          setLoanData(result.payload.data[0].data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch]);
  const handleSearch = (params) => {
    dispatch(fetchEmiHistory(params))
      .then(result => {
        console.log(result)
        if (result.payload.statusCode === 200) {
          setLoanData(result.payload.data[0].data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleReset = () => {
    dispatch(fetchEmiHistory())
    .then(result => {
      if (result.payload.statusCode === 200) {
        setLoanData(result.payload.data[0].data);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  const mappedData = loanData.length > 0 ? loanData.map((loan) => {
    const formattedemiPaidDate = new Date(loan.emiPaidDate).toLocaleDateString('en-GB')
    return headers.reduce((acc, header) => {
      if (header === 'emiPaidDate') {
           acc[header] = acc[header] !== null ? '' : formattedemiPaidDate;      
      } 
     else {
        acc[header] = loan[header];
      }
      return acc;
    }, {});
  }) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className='container'>
      <Loader isLoad={load}/>
      <div className='loan-wrp2'>
        <h2>EMI</h2>
        <hr />
        <CommonSearchBar onSearch={handleSearch} onReset={handleReset}/>
        <div className='loan-table'>
          {headers.length > 0 && <CommonTable headers={headers} data={mappedData} constHeader={requestHeaders} />}
        </div>
      </div>
    </div>
  );
};

export default Emi