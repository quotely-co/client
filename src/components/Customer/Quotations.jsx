import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Send, 
  Truck, 
  Ban, 
  ChevronDown,
  FileText,
  Filter,
  Search
} from 'lucide-react';

const QuotationList = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample quotation data
  const quotations = [
    {
      id: "QT-2024-001",
      customerName: "Tech Solutions Inc",
      date: "2024-02-11",
      amount: 12500.00,
      status: "pending",
      items: [
        { name: "Paper Cup 8oz", quantity: 5000 },
        { name: "Paper Cup 12oz", quantity: 3000 }
      ],
      lastUpdated: "2024-02-11"
    },
    {
      id: "QT-2024-002",
      customerName: "Coffee House Chain",
      date: "2024-02-10",
      amount: 8750.00,
      status: "sent",
      items: [
        { name: "Paper Cup 6oz", quantity: 10000 }
      ],
      lastUpdated: "2024-02-10"
    },
    {
      id: "QT-2024-003",
      customerName: "Restaurant Group LLC",
      date: "2024-02-09",
      amount: 15000.00,
      status: "approved",
      items: [
        { name: "Paper Cup 12oz", quantity: 8000 },
        { name: "Paper Cup 16oz", quantity: 5000 }
      ],
      lastUpdated: "2024-02-09"
    },
    {
      id: "QT-2024-004",
      customerName: "Retail Solutions Co",
      date: "2024-02-08",
      amount: 9800.00,
      status: "delivered",
      items: [
        { name: "Paper Cup 8oz", quantity: 6000 }
      ],
      lastUpdated: "2024-02-08"
    },
    {
      id: "QT-2024-005",
      customerName: "Events Management Inc",
      date: "2024-02-07",
      amount: 4500.00,
      status: "rejected",
      items: [
        { name: "Paper Cup 6oz", quantity: 3000 }
      ],
      lastUpdated: "2024-02-07"
    }
  ];

  const statusConfig = {
    pending: { icon: Clock, color: 'text-yellow-500 bg-yellow-50' },
    sent: { icon: Send, color: 'text-blue-500 bg-blue-50' },
    approved: { icon: CheckCircle2, color: 'text-green-500 bg-green-50' },
    delivered: { icon: Truck, color: 'text-purple-500 bg-purple-50' },
    rejected: { icon: Ban, color: 'text-red-500 bg-red-50' }
  };

  const filteredQuotations = quotations.filter(quote => {
    const matchesStatus = filterStatus === 'all' || quote.status === filterStatus;
    const matchesSearch = quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const StatusBadge = ({ status }) => {
    const { icon: Icon, color } = statusConfig[status];
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium capitalize ${color}`}>
        <Icon className="w-4 h-4" />
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
          <p className="text-gray-600 mt-1">Manage and track your quotations</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          New Quotation
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search quotations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-300 py-2 pl-4 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="approved">Approved</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quotations List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Quotation ID</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Items</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Last Updated</th>
                <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.map((quote) => (
                <tr key={quote.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{quote.id}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{quote.customerName}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">
                      {quote.items.map((item, index) => (
                        <div key={index}>
                          {item.name} × {item.quantity.toLocaleString()}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="font-medium text-gray-900">
                      ${quote.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={quote.status} />
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">{quote.lastUpdated}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronDown className="w-5 h-5" />
                    </button>
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

export default QuotationList;