import * as Yup from 'yup';

export const ApplyLoanValidations = Yup.object().shape({
  incomeType: Yup.string().required('Income Details is required'),
  amount: Yup.string().required('Amount is required'),
  coleteralamount: Yup.string().required('Collateral Amount is required'),
  loanType: Yup.string().required('Loan Type is required'),
  loanDuration: Yup.string().required('Loan Duration is required'),
});
