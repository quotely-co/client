import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import OpenRoute from "./components/auth/OpenRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoadingSpinner from "./components/common/Loading";
import Success from "./pages/Success";
import Failure from "./pages/Failure";

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

// 404 Page
const NotFound = () => <h1>404 - Page Not Found</h1>;

const App = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* Customer Routes */}
        <Route path="/register" element={<OpenRoute><Register /></OpenRoute>} />
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/dashboard/*" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />

        {/* Factory Routes */}
        <Route path="/factory/register" element={<OpenRoute><FactoryRegister /></OpenRoute>} />
        <Route path="/factory/login" element={<OpenRoute><FactoryLogin /></OpenRoute>} />
        <Route path="/factory/onboarding" element={<OpenRoute><Onboarding /></OpenRoute>} />
        <Route path="/factory/*" element={<ProtectedRoute><FactoryDashboard /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <Toaster />
  </Router>
);

export default App;
