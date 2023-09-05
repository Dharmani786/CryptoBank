import { configureStore } from '@reduxjs/toolkit';
import registerSlice from '../features/registerSlice';
import verifyOtpSlice from '../features/verifyOtpSlice';
import profileSlice from '../features/profileSlice';
import loanDetailsSlice from '../features/loanDetailsSlice';
import activeLoanSlice from '../features/activeLoanSlice';
import requestedLoanSlice from '../features/requestedLoanSlice';
import authSlice from '../features/authSlice';
import uploadSlice from '../features/uploadSlice';
import emiHistorySlice from '../features/emiHistorySlice';
import emiCalculatorSlice from '../features/emiCalculatorSlice';
import changePasswordSlice from '../features/changePasswordSlice';
import dataSlice from '../features/dataSlice';
import resetPasswordSlice from '../features/resetPasswordSlice';
import forgotSlice from '../features/forgotSlice';
import passwordOtpSlice from '../features/passwordOtpSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
    verify : verifyOtpSlice,
    profile : profileSlice,
    login: authSlice,
    upload:uploadSlice,
    loanDetails: loanDetailsSlice,
    activeLoan: activeLoanSlice,
    requestedLoan: requestedLoanSlice,
    emiHistory: emiHistorySlice,
    emiCalculator: emiCalculatorSlice,
    changepassword : changePasswordSlice,
    data: dataSlice,
    resetPassword : resetPasswordSlice,
    forgotPassword:forgotSlice,
    resetotp:passwordOtpSlice,
  },
});


