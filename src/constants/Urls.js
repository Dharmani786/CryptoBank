export const API_URL = "https://decentralizedbankapi.appgrowthcompany.com/";
export const ETH_URL ='https://api-testnet.polygonscan.com/api'
export const API_KEY = 'PX2KXNHX2NDI92XI6T8M5W5WGK93UIXNQ6';
export const END_POINTS = {
    transaction:'transaction',
    getReciept:'gettxreceiptstatus',
    signin: "api/v1/user/signin",
    signUp: "api/v1/user/signup",
    forgot_pass: "api/v1/user/forgotPassword",
    reset_pass: "api/v1/user/resetPassword",
    change_pass: "api/v1/user/changePassword",
    update_profile: "api/v1/user/updateProfile",    
    get_Profile: "profile",
    log_out: "api/v1/user/logout",
    media_Upload: "api/v1/user/upload",
    otp_verify: "api/v1/user/otp_verfication",
    resend_otp: "api/v1/user/SendOTP",
    
    cms: "api/v1/user/getcms",
    faq: '/api/v1/user/getFAQ',
    otp: "otp", 
    activeLoan:'api/v1/user/activeLoan?',
    requestedLoan:'',
    applyLoan:'',
    latestTransaction:'',
    emiHistory:'',
    getProfile:'',
    updateProfile:'',  
    getCollateralDetails:'api/v1/user/getCollateralDetails',
    revertLoan:'api/v1/user/deleteLoanById/'
  };