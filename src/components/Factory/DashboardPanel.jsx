import React, { useState } from "react";
import { 
  FileText, 
  Package, 
  Clock, 
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  Boxes,
  Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPanel = () => {
  // Sample data for charts
  const quotationData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 65 },
    { name: 'May', value: 58 },
    { name: 'Jun', value: 72 }
  ];


  const stats = [
    { 
      title: "Total Quotations", 
      value: 120, 
      change: "+12% this month",
      icon: <FileText size={20} className="text-blue-500" />
    },
    { 
      title: "Active Products", 
      value: 45, 
      change: "5 added this week",
      icon: <Package size={20} className="text-green-500" />
    },
    { 
      title: "Pending Quotes", 
      value: 8, 
      change: "3 need attention",
      icon: <Clock size={20} className="text-orange-500" />
    },
    { 
      title: "Monthly Revenue", 
      value: "₹4,50,000", 
      change: "+18% vs last month",
      icon: <DollarSign size={20} className="text-purple-500" />
    }
  ];

  const recentQuotes = [
    { id: "QT-001", client: "Tech Solutions", status: "Pending", amount: "₹45,000", date: "2024-01-15" },
    { id: "QT-002", client: "Global Industries", status: "Approved", amount: "₹78,000", date: "2024-01-14" },
    { id: "QT-003", client: "Smart Corp", status: "Rejected", amount: "₹32,000", date: "2024-01-13" },
    { id: "QT-004", client: "Mega Systems", status: "Approved", amount: "₹95,000", date: "2024-01-12" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="section-title mb-2">Factory Dashboard</h1>
          <p className="text-gray-600">Welcome back, manage your quotations and track performance</p>
        </div>
        <button className="btn btn-primary">
          <FileText size={18} className="mr-2" />
          New Quotation
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="card p-6 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
              <div className="p-2 rounded-lg bg-gray-50">
                {stat.icon}
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-auto">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Charts & Recent Activity */}
      

      {/* Recent Quotations */}
      
    </div>
  );
};

export default DashboardPanel;