import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../../components/Factory/Sidebar";
import DashboardPanel from "../../components/Factory/DashboardPanel";
import Products from "../../components/Factory/Products";
import Quotations from "../../components/Factory/Quotations";
import Discounts from "../../components/Factory/Discounts";
import Profile from "../../components/Factory/Profile";

const FactoryDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex min-h-screen">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:sticky lg:flex-none
          top-0 left-0
          w-64 h-full
          bg-gray-800 text-white
          transition-transform duration-300 ease-in-out
          z-40 lg:z-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <main className="lg:pl-0 w-full min-h-screen">
            <div className="pt-16 lg:pt-0 px-4 w-full">
              <Routes>
                <Route path="/" element={<DashboardPanel />} />
                <Route path="/products" element={<Products />} />
                <Route path="/quotations" element={<Quotations />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FactoryDashboard;