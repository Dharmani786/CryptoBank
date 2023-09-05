import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { EthApi } from '../../redux/features/EtherscanApi/transactionApiSlice';
import { STORAGE_KEYS, getFromStorage } from '../../constants/Storage';
import { ContractAddress } from '../../Web3_interact/configuration';

const DepositTable = () => {
       const dispatch = useDispatch()
       const [data,setData] = useState('')
       const textRef = React.useRef(null);
       const fromtextRef = React.useRef(null);

    const [tooltip, setTooltip] = useState('');

       const accountAddress = getFromStorage(STORAGE_KEYS?.walletAddress) 
     useEffect(() => {
        dispatch(EthApi(accountAddress))
        .then((result) =>{
          console.log(result,'eweweewweeweew=====')
          if(result?.payload?.message === 'OK'){
            setData(result?.payload?.result)
          }
        })
        .catch((error)=>{
          console.log(error)
        })
     }, []);
     
     const filteredData = data?.length? data?.filter((item) => item?.from?.toLowerCase() === ContractAddress?.toLowerCase()) : null;

    const handleCopy = (item) => {
      navigator.clipboard.writeText(item);
      setTooltip("Copied to clipboard.");
      setTimeout(() => {
        setTooltip("Copy the content.");
      }, 2000);
    }
    const handlefromCopy = (item) => {
      navigator.clipboard.writeText(item);
      setTooltip("Copied to clipboard.");
      setTimeout(() => {
        setTooltip("Copy the content.");
      }, 2000);
    }

  return (
    <TableContainer component={Paper} sx={{
     padding:'20px',
     position:'relative'
    }}>
      <Typography sx={{
        marginBottom:'10px',
        fontWeight: 'bold'

      }}>Latest Transactions</Typography>
      <Table 
      
      className='latest'
      sx={{ minWidth: 650,
        position: 'relative',
       padding:'20px 10px 10px 2 0px',
       borderRadius:'20px',
       boxShadow:' 0px 6px 12px -6px rgba(24, 39, 75, 0.12)' }} aria-label="customized table">
        <TableHead style={{backgroundColor: '#ECF6FD'}}>
          <TableRow>
            <TableCell  align='center'>Txn Hash</TableCell>
            <TableCell align="center">From</TableCell>
            <TableCell align="center">To</TableCell>
            <TableCell align="center">Eth</TableCell>
            {/* <TableCell align="center">Type</TableCell> */}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.length ? (
           filteredData?.map((item) => (
             <TableRow key={item.blockNumber}>
              <Tooltip title={tooltip} ref={textRef}>
              <TableCell onClick={() => handleCopy(item?.hash)} style={{cursor: 'pointer', borderRight:'1px solid rgba(224, 224, 224, 1)'}} component="th" scope="row" align='center'>{`${item?.hash.substring(0, 3)} ... ${item?.hash.substring(item?.hash?.length - 3)}`}</TableCell>
              </Tooltip>
               
              <Tooltip title={tooltip} ref={fromtextRef}>
               <TableCell  onClick={() => handlefromCopy(item?.from)} style={{cursor: 'pointer'}} align="center">{`${item?.from.substring(0, 3)} ... ${item?.from.substring(item?.from?.length - 3)}`}</TableCell>
               </Tooltip>
               <TableCell align="center">{`${item?.to.substring(0, 3)}...${item?.to.substring(item?.to?.length - 3)}`}</TableCell>
               <TableCell align="center">{item?.value}</TableCell>
             </TableRow>
           ))
         ) : (
           <p className='no_trans'>No Transactions Found</p>
         )}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default DepositTable;