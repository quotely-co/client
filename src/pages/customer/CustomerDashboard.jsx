import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Customer/Sidebar"; // Customer Sidebar
import DashboardPanel from "../../components/Customer/DashboardPanel"; // Dashboard Main Panel
import Orders from "../../components/Customer/Orders"; // Example page
import Quotations from "../../components/Customer/Quotations"; // Example page
import Profile from "../../components/Customer/Profile"; // Example page

const CustomerDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white h-full fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gray-100 p-4 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardPanel />} />
          <Route path="/quotations" element={<Quotations />} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerDashboard;
