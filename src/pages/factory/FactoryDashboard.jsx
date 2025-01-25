import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Factory/Sidebar";
import DashboardPanel from "../../components/Factory/DashboardPanel";
import Products from "../../components/Factory/Products"; // Example page
import Quotations from "../../components/Factory/Quotations"; // Example page
import Discounts from "../../components/Factory/Discounts";
import Profile from "../../components/Factory/Profile";

const FactoryDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white h-full fixed">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 bg-gray-100 p-4 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardPanel />} />
          <Route path="/products" element={<Products />} />
          <Route path="/quotations" element={<Quotations />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default FactoryDashboard;
