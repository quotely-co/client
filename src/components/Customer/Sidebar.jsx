import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  BarChart2, 
  UserCircle, 
  LogOut,
  FileTextIcon,
  TruckIcon,
  HelpCircleIcon
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      name: "Create Quotation", 
      path: "/dashboard/quotations", 
      icon: <FileTextIcon size={20} /> 
    },
  
    { 
      name: "My Orders", 
      path: "/dashboard/orders", 
      icon: <FileText size={20} /> 
    },
    { 
      name: "Track Shipments", 
      path: "/dashboard/shipments", 
      icon: <TruckIcon size={20} /> 
    },
    { 
      name: "Analytics", 
      path: "/dashboard/analytics", 
      icon: <BarChart2 size={20} /> 
    },
    { 
      name: "Support", 
      path: "/dashboard/support", 
      icon: <HelpCircleIcon size={20} /> 
    },
  
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-black to-[#001e80] text-white flex flex-col fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Package size={24} />
          Customer Hub
        </h2>
        <p className="text-sm text-white/60 mt-1">Manage Your Account</p>
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

      {/* Bottom Section with User Profile */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <UserCircle size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">John Doe</h4>
            <p className="text-sm text-white/60 truncate">customer@example.com</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={() => {
            // Add logout logic here
            console.log("Logout clicked");
          }}
          className="flex items-center gap-2 w-full px-4 py-2 mt-4 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;