import { Route, Routes } from "react-router-dom";
import Pages from "./pages";
import LoanDialog from "./components/common/LoanDialog";
import Layout from "./layout";
import ProtectedRoutes from "./utils/protectedRoutes";

const routes = [
  {
    path: "/",
    element: (
      <Layout page="main">
        <Pages.Home />
      </Layout>
    ),
  },
  {
    path: "/landingpage",
    element: (
      <Layout page="apply">
        <Pages.Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Pages.Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Pages.RegisterProcess />
      </Layout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <Layout>
        <Pages.ForgotPassword />
      </Layout>
    ),
  },
  {
    path: "/changepassword",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Pages.ChangePassword />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/resetpassword",
    element: (
      <Layout>
        <Pages.ResetPassword />
      </Layout>
    ),
  },
  {
    path: "/deposit",
    element: (
      <ProtectedRoutes>
        <Layout page="deposit">
          <Pages.Deposit />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/applyloan",
    element: (
      <ProtectedRoutes>
        <Layout page="apply">
          <Pages.ApplyLoan />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/activeloan",
    element: (
      <ProtectedRoutes>
        <Layout page="apply">
          <Pages.ActiveLoan />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/requestedloan",
    element: (
      <ProtectedRoutes>
        <Layout page="apply">
          <Pages.RequestedLoan />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/emi",
    element: (
      <ProtectedRoutes>
        <Layout page="apply">
          <Pages.EMI />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/faq",
    element: (
      <Layout page="deposit">
        <Pages.ApplyLandingPage />
      </Layout>
    ),
  },
  {
    path: "/dialog",
    element: <LoanDialog />,
  },
  {
    path: "/forgotpasswordOtp",
    element: <Pages.ForgotPasswordOtp />,
  },
  {
    path: "/updateProfile",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Pages.UpdateProfile />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/loanstatusdetails/:id",
    element: (
      <ProtectedRoutes>
        <Layout>
          <Pages.LoanStatusDetails />
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/aboutus",
    element: (
      <Layout>
        <Pages.AboutUs />
      </Layout>
    ),
  },
  {
    path: "/privacypolicy",
    element: (
      <Layout>
        <Pages.PrivacyPolicy />
      </Layout>
    ),
  },
  {
    path: "/terms&conditions",
    element: (
      <Layout>
        <Pages.Terms />
      </Layout>
    ),
  },
];

const Router = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
