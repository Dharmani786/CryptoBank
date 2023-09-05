import { useEffect } from "react";
import "./App.css";
import Router from "./Routes";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CMS } from "./redux/features/cmsSlice";
import MenuLIst from "./menu";

function App() {
  return (
    <div className="App">
      {/* <MenuLIst /> */}
      <Router />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
