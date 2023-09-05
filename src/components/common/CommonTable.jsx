import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import './common.css';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CommonTable = ({ headers, data, constHeader ,id, revert}) => {

  const navigate = useNavigate();

  const rows = data?.map((item, index) => (
    <TableRow key={item['loanId']}>
      <TableCell align='center'>{index + 1}</TableCell>
      {headers.map((header) => (
        <TableCell align='center' key={header} className="col-border">
          {header === 'loanStatus' ? (
            <span style={{ fontWeight: 'bold',color: item['loanStatus'] === 'REJECTED' ? '#DC3545' : item['loanStatus'] === 'ACTIVE' ? 'green' : '#FCAD00' }}>{item[header]}</span>
          ) : header === 'emiStatus' ? (
            <span style={{  fontWeight: 'bold',color: item['emiStatus'] === 'PAID' ? 'green' : item['emiStatus'] === 'PENDING' ? '#FCAD00' : '#DC3545' }}>{item[header]}</span>
          ) : header === '_id' ? (
            <>
            <span style={{display:'none'}}>{item[header]}</span>
            <span> <Visibility 
            className='visible'
            onClick={()=>navigate(`/loanstatusdetails/${item[header]}`)}
            style={{ cursor: 'pointer'}} /></span>
            </>
          ): (
              <span>{item[header]}</span>
            
      )}
    </TableCell>
  ))
}
      {constHeader.includes('Revert') && (
        <TableCell align='center' className='reverted'>
          {item['loanStatus'] === 'REJECTED'? <span>REJECTED</span> : <span onClick={() => revert(item['loanType'],item['loanNumber'])}>REVERT REQUEST</span> }
          <span></span>
       
        </TableCell>
      )}
    
    </TableRow >
  ));

return (
  <TableContainer sx={{ padding: '5px' }}>
    {
      data?.length ?   <Table
      sx={{
        minWidth: 650,
        padding: '20px 10px 10px 2 0px',
        borderRadius: '20px',
        boxShadow: ' 0px 6px 12px -6px rgba(24, 39, 75, 0.12)',
      }}
      aria-label="customized table"
      className='custom-table'
    >
      <TableHead>
        <TableRow
          sx={{
            backgroundColor: '#ECF6FD',
            borderBottom: '1px solid #000',
          }}
        >
          {constHeader.map((header) => (
            <TableCell align='center' key={header}>{header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>: <div className='no_data'>
    <figure>
      <img src='/static/images/no_loan.jpg' alt=''/>
    </figure>
            <h3>No Record Found</h3>
    </div>
    }
  
  </TableContainer>
);
};

export default CommonTable;
