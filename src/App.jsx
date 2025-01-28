import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import OpenRoute from "./components/auth/OpenRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Lazy-loaded components
const Landing = lazy(() => import("./pages/Landing"));
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
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* General */}
        <Route path="/" element={<Landing />} />

        {/* Customer routes */}
        <Route path="/auth/register" element={<OpenRoute><Register /></OpenRoute>} />
        <Route path="/auth/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/dashboard/*" element={<CustomerDashboard />} />


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
