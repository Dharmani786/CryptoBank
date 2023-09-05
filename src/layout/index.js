import React from "react";
import Footer from "./footer";
import Header2 from "./header/index2";
import { STORAGE_KEYS, getFromStorage } from "../constants/Storage";

const Layout = ({ children }) => {


  const token =  getFromStorage(STORAGE_KEYS.token);
    console.log('new????????????????',token)

  return (
    <div>
      <Header2/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
