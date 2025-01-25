import React, { useState } from "react";
import { 
  FileText, 
  Package, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  DollarSign, 
  Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomerDashboardPanel = () => {
  // Sample data for charts
  const orderData = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Apr', value: 65 },
    { name: 'May', value: 58 },
    { name: 'Jun', value: 72 }
  ];

  const stats = [
    { 
      title: "Total Orders", 
      value: 120, 
      change: "+15% this month",
      icon: <Package size={20} className="text-blue-500" />
    },
    { 
      title: "Pending Orders", 
      value: 5, 
      change: "2 need attention",
      icon: <Clock size={20} className="text-orange-500" />
    },
    { 
      title: "Monthly Spend", 
      value: "₹1,20,000", 
      change: "+20% vs last month",
      icon: <DollarSign size={20} className="text-green-500" />
    },
    { 
      title: "Upcoming Deliveries", 
      value: 3, 
      change: "2 scheduled this week",
      icon: <Calendar size={20} className="text-purple-500" />
    }
  ];

  const recentOrders = [
    { id: "ORD-001", product: "Laptop", status: "Shipped", amount: "₹50,000", date: "2024-01-15" },
    { id: "ORD-002", product: "Smartphone", status: "Delivered", amount: "₹35,000", date: "2024-01-14" },
    { id: "ORD-003", product: "Headphones", status: "Pending", amount: "₹5,000", date: "2024-01-13" },
    { id: "ORD-004", product: "Smartwatch", status: "Cancelled", amount: "₹8,000", date: "2024-01-12" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="section-title mb-2">Customer Dashboard</h1>
          <p className="text-gray-600">Welcome back, track your orders and manage your profile</p>
        </div>
        <button className="btn btn-primary">
          <FileText size={18} className="mr-2" />
          New Order
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Order Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Customer Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircle size={20} className="text-green-500 mr-2" />
                <span>Order Approval Rate</span>
              </div>
              <span className="font-semibold">90%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Clock size={20} className="text-orange-500 mr-2" />
                <span>Avg. Delivery Time</span>
              </div>
              <span className="font-semibold">5 days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp size={20} className="text-blue-500 mr-2" />
                <span>Repeat Purchase Rate</span>
              </div>
              <span className="font-semibold">70%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button className="btn btn-text">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium">Order ID</th>
                <th className="text-left py-3 px-4 font-medium">Product</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Amount</th>
                <th className="text-left py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.product}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4 font-medium">{order.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`tag ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-700' :
                      order.status === 'Pending' ? 'bg-orange-50 text-orange-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPanel;
