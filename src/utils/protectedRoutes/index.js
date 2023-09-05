import { Navigate } from "react-router-dom";
import { STORAGE_KEYS, getFromStorage } from "../../constants/Storage";

const ProtectedRoutes = ({ children }) => {
  if (getFromStorage(STORAGE_KEYS.token)) {
    return children;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
