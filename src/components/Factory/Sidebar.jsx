import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Tag,
  BarChart2,
  UserCircle,
  LogOut,
  Settings
} from "lucide-react";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const HOST = import.meta.env.VITE_HOST_URL
  const token = localStorage.getItem('token')
  const [factory, setFactory] = useState({})

  const handleLogout = async () => {
    localStorage.removeItem('token')
    navigate('/auth/factory/login')
  }

  useEffect(() => {
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    
    const factoryId = payload.factoryId 
    const fetchData = async (req, res) => {
      const response = await axios.get(`${HOST}/api/factory?id=${factoryId}`)
      setFactory(response.data);
      
      
    }
    fetchData()
  }, [])

  const menuItems = [
    {
      name: "Dashboard",
      path: "/factory",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Products",
      path: "/factory/products",
      icon: <Package size={20} />
    },
    {
      name: "Quotations",
      path: "/factory/quotations",
      icon: <FileText size={20} />
    },
    {
      name: "Discounts",
      path: "/factory/discounts",
      icon: <Tag size={20} />
    },
    {
      name: "Analytics",
      path: "/factory/analytics",
      icon: <BarChart2 size={20} />
    },
    {
      name: "Profile",
      path: "/factory/profile",
      icon: <UserCircle size={20} />
    }
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-black to-[#001e80] text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Package size={24} />
          Factory
        </h2>
        <p className="text-sm text-white/60 mt-1">Whitelist Quotation</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 pt-4">
        <ul className="flex flex-col gap-1 px-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-150 
                    ${isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            {factory?.logo_url ? (
              <img
                src={factory.logo_url}
                alt="Factory Logo"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircle size={24} className="text-gray-500" />
            )}
          </div>

          <div className="flex-1">
            <h4 className="font-medium">{factory.factoryName || "no _ Name"}</h4>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors">
            <Settings size={18} />
            Settings
          </button>
          <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;