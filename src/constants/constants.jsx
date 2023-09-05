
export const depositData = [
  {
    Txn: '0x7871acebe98bef4d893',
    from: '0x9c037bd72870....',
    to: '0x3819f64f',
    eth: '0 ETH',
  }
]

export const currency = [
  {
    logo: '/static/images/ethereum.png',
    abr: 'ETH',
    suffix: 'Etherium',
    value:'ETH'
  },
  {
    logo: '/static/images/2b5c7d80-7bcd-4cfb-8bd9-d1760a752afc 1.png',
    abr: 'USDT',
    suffix: 'TetherUS',
    value:'USDT'
  }
]
//data for active table

export const activeData = [
  {
    S_NO: '01',
    Loan_Type: 'Home Loan',
    Start_Date: '05 May 2023',
    End_Date: '05 May 2024',
    Amount: '250000',
    EMI: '12'
  }
]
export const activeHeaders = ['S NO', 'Loan Type', 'Start Date', 'End Date', 'Amount', 'EMI'];

//

//Data for request table
export const requestHeaders = ['S NO', 'Loan Type', 'Requested Date', 'Loan ID', 'Amount', 'Status'];

export const requestData = [
  {
    S_NO: '01',
    Loan_Type: 'Home Loan',
    Requested_Date: '05 May 2023',
    Loan_ID: 'xxxxxxxx',
    Amount: '250000',
    Status: 'Pending',
  },
  {
    S_NO: '02',
    Loan_Type: 'Home Loan',
    Requested_Date: '05 May 2023',
    Loan_ID: 'xxxxxxxx',
    Amount: '250000',
    Status: 'rejected',
  },
];
//

//data for emi table
export const EmiHeaders = ['S NO', 'Txn Hash', 'Loan', 'From', 'ETH', 'Status'];
export const emiData = [
  {
    S_NO: '01',
    Txn_Hash: '0x7871acebe98bef4d893',
    Loan: 'Home Loan',
    From: '0x3819f64f',
    ETH: '2000ETH',
    Status: 'paid',

  },
 
]
//