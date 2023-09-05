import { errorToast } from "../../constants/ShowToast";

export const connectMetamask = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      return account;
    } catch (error) {
      throw new Error("Failed to connect with MetaMask: " + error.message);
    }
  } else {
    errorToast("MetaMask not found. Please install MetaMask extension.");
    throw new Error("MetaMask not found. Please install MetaMask extension.");
  }
};
