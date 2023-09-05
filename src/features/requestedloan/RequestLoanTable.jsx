import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { requestHeaders, requestData } from '../../constants/constants';

const RequestLoanTable = () => {
  const rows = requestData.map((item) => (
    <TableRow key={item['S NO']}>
      {requestHeaders.map((header) => (
        <TableCell key={header} className='col-border'> {item[header.replace(' ', '_')]}</TableCell>
      ))}
    </TableRow>
  ));

  return (
    <TableContainer sx={{ padding: '5px' }}>
      <Table
        sx={{
          minWidth: 650,
          padding: '20px 10px 10px 2 0px',
          borderRadius: '20px',
          boxShadow: ' 0px 6px 12px -6px rgba(24, 39, 75, 0.12)',
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: '#ECF6FD',
              borderBottom: '1px solid #000',
            }}
          >
            {requestHeaders.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestLoanTable;
