// import { useState, useEffect } from 'eact';
// import Web3 from 'web3';

// const web3 = new Web3('YOUR_PROVIDER_URL');
// const contract = new web3.eth.Contract(ABI, ContractAddress);

// const SecurityAmountCalculator = (loanType, amount, time) => {
//   const securityAmount = contract.methods.securityAmountCalculator(loanType, amount, time).call();
//   return securityAmount;
// };

// const ApplyLoan = (loanType, amount, time) => {
//   const transaction = contract.methods.applyForLoan(loanType, amount, time).send({ from: web3.eth.defaultAccount });
//   return transaction;
// };

// const CheckUsdtBalance = () => {
//   const balance = contract.methods.checkUsdtBalance().call();
//   return balance;
// };

// const WithdrawLoanFund = (loanType) => {
//   const transaction = contract.methods.withdrawLoanFund(loanType).send({ from: web3.eth.defaultAccount });
//   return transaction;
// };

// const WithdrawSecurityAmount = (loanType) => {
//   const transaction = contract.methods.withdrawSecurityAmount(loanType).send({ from: web3.eth.defaultAccount });
//   return transaction;
// };

// const GetLoanDetails = (loanType) => {
//   const loanDetails = contract.methods.getLoanDetails(loanType).call();
//   return loanDetails;
// };

// const PayEMi = (loanType) => {
//   const transaction = contract.methods.payEmi(loanType).send({ from: web3.eth.defaultAccount, value: web3.utils.toWei('0.01', 'ether') });
//   return transaction;
// };

// const LoanApprovedBalance = (loanType) => {
//   const balance = contract.methods.Loan_approvedBalance(loanType).call();
//   return balance;
// };

// const DepositFund = (amount) => {
//   const transaction = contract.methods.depositFund(amount).send({ from: web3.eth.defaultAccount, value: amount });
//   return transaction;
// };

// const WithdrawFund = (amount) => {
//   const transaction = contract.methods.withdrawFund(amount).send({ from: web3.eth.defaultAccount });
//   return transaction;
// };