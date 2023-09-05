import secureLocalStorage from "react-secure-storage";

export const STORAGE_KEYS = {
  token: "TOKEN",
  userData: "USER_DATA",
  credentials: "REMEMBER_ME",
  tempToken: "TEMP_TOKEN",
  fcmToken: "FCM_TOKEN",
  language: "LANGUAGE",
  isAuthrorised: "IS_AUTH",
  walletAddress: 'WALLET_ADDRESS'
};
export const setToStorage = (key, data) => {
  localStorage.setItem(key, data);
};
export const getFromStorage = (key) => {
  return localStorage.getItem(key);
};
export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};