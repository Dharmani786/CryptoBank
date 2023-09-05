import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRequestedLoanData } from '../../redux/features/requestedLoanSlice';
import CommonSearchBar from '../../components/common/CommonSearchBar';
import '../../components/common/common.css';
import CommonTable from '../../components/common/CommonTable';
import Loader from '../../constants/loader/Loader';
import Web3 from 'web3';
import { ABI, ContractAddress } from '../../Web3_interact/configuration';
import { errorToast, successToast } from '../../constants/ShowToast'
import { fetchRevertLoanData } from '../../redux/features/revertLoanSlice';

const RequestedLoan = () => {
  const [loanData, setLoanData] = useState([]);
  const [contract, setContract] = useState("");
  const [accounts, setAccounts] = useState()
  const dispatch = useDispatch();
  const requestedLoan = useSelector(state => state.requestedLoan.data);
  const requestHeaders = ['S NO', 'Loan Type', 'Requested Date', 'Loan Id', 'Amount', 'Status', 'Revert'];
  const headers = ['loanType', 'loanRequestedDate', 'loanNumber', 'loanAmount', 'loanStatus',];
  const load = useSelector((state) => state.requestedLoan.loading);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const contractInstance = new web3.eth.Contract(ABI, ContractAddress);
          console.log(contractInstance, "contractInstace");
          setContract(contractInstance);
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const account = accounts[0];
          setAccounts(account)
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
   handleData()
  }, []);
   

  const handleData =()=>{
    dispatch(fetchRequestedLoanData())
    .then(result => {
      if (result.payload.statusCode === 200) {
        setLoanData(result.payload.data[0].data);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  // fnc for search props
  const handleSearch = (params) => {
    dispatch(fetchRequestedLoanData(params))
      .then(result => {
        console.log(result)
        if (result.payload.statusCode === 200) {
          setLoanData(result.payload.data[0].data);
        }
      })
      .catch(error => {
        errorToast(error?.data?.message)
      })
  }

  const handleReset = () => {
    dispatch(fetchRequestedLoanData())
      .then(result => {
        if (result.payload.statusCode === 200) {
          setLoanData(result.payload.data[0].data);
        }
      })
      .catch(error => {
        errorToast(error?.data?.message)
      });
  }
  const mappedData = loanData.length > 0 ? loanData.map((loan) => {
    const formattedDate = new Date(loan.loanRequestedDate).toLocaleDateString('en-GB')
    return headers.reduce((acc, header) => {
      if (header === 'loanRequestedDate') {
        acc[header] = formattedDate;
      } else {
        acc[header] = loan[header];
      }
      return acc;
    }, {});
  }) : [];

  const RevertLoan = async (loanType, loanNumber) => {

    console.log('hiiii', loanType.toLowerCase());
    if (accounts) {
      console.log(accounts,'requested loand======');
      try {
        const gas = await contract.methods.cancelAppliedLoan(loanType.toLowerCase()).estimateGas({
          from: accounts
        })
        const revert = await contract.methods.cancelAppliedLoan(loanType.toLowerCase()).send({
          from: accounts,
          gas: gas
        })
        if (revert) {
          console.log(revert,'apii');
          dispatch(fetchRevertLoanData(loanNumber))
            .then((result) => {
              if (result?.payload?.statusCode === 200) {
                successToast('Loan request reverted')
                handleData()
              }

            })
            .catch((error) => {
              console.log(error,'reverted error');
              errorToast(error?.data?.message)
            })

        }

      }
      catch (error) {
        errorToast(error?.message)
      }
    }
    else {
      errorToast('connect to metamask')
    }

  }


  return (
    <div className='container'>
      <Loader isLoad={load} />
      <div className='loan-wrp2'>
        <h2>Requested Loan</h2>
        <hr />
        <CommonSearchBar onSearch={handleSearch} onReset={handleReset} />
        <div className='loan-table'>
          {headers.length > 0 && <CommonTable headers={headers} data={mappedData} constHeader={requestHeaders} revert={RevertLoan} />}
        </div>
      </div>
    </div>
  );
};

export default RequestedLoan