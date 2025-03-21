import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import OpenRoute from "./components/auth/OpenRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoadingSpinner from "./components/common/Loading";

// Lazy-loaded components
const Landing = lazy(() => import("./pages/Landing"));
const Support = lazy(() => import("./pages/Support"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));

const Onboarding = lazy(() => import("./pages/factory/Onboarding"));
const Admin = lazy(() => import("./pages/Admin/AdminDashboard"));
const FactoryDashboard = lazy(() => import("./pages/factory/FactoryDashboard"));

// Customer routes
const Register = lazy(() => import("./pages/customer/Register"));
const Login = lazy(() => import("./pages/customer/Login"));
const CustomerDashboard = lazy(() => import("./pages/customer/CustomerDashboard"));

// Factory routes
const FactoryLogin = lazy(() => import("./pages/factory/Login"));
const FactoryRegister = lazy(() => import("./pages/factory/Register"));

const App = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* General */}
        <Route path="/" element={<Landing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />


        {/* Customer routes */}
        <Route path="/register" element={<OpenRoute><Register /></OpenRoute>} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/*" element={<CustomerDashboard />} />

        {/* Factory routes */}
        <Route path="/auth/factory/register" element={<OpenRoute><FactoryRegister /></OpenRoute>} />
        <Route path="/auth/factory/login" element={<OpenRoute><FactoryLogin /></OpenRoute>} />
        <Route path="/factory/*" element={<ProtectedRoute><FactoryDashboard /></ProtectedRoute>} />
        <Route path="/factory/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </Suspense>
    <Toaster />
  </Router>
);

export default App;