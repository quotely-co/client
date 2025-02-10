import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  FileTextIcon,
  TruckIcon,
  BarChart2,
  HelpCircleIcon,
  LogOut,
  Package,
  Bell,
  Settings,
  
} from "lucide-react";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const { storeName } = useParams();
  const token = localStorage.getItem("token");
  const HOST = import.meta.env.VITE_HOST_URL;

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${HOST}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: FileTextIcon, label: "Quotations", path: "/quotations" },
    { icon: TruckIcon, label: "Stores", path: "/stores" },
    { icon: Package, label: "Products", path: "/dashboard/products" },
    { icon: BarChart2, label: "Analytics", path: "/dashboard/analytics" },
    { icon: HelpCircleIcon, label: "Support", path: "/dashboard/support" },
  ];

  return (
    <div className="flex flex-col h-full p-6 bg-background border-r shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-primary p-2 rounded-lg">
          <Package className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">{user.username}</span>
          <span className="text-xs text-muted-foreground">Customer Portal</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="mb-6">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/32/32" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user.username}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="space-y-1">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
          MAIN MENU
        </div>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? "secondary" : "ghost"}
              className={cn("w-full justify-start hover:bg-secondary/60", isActive && "bg-secondary font-medium")}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>

      <Separator className="my-4" />

      {/* Quick Actions */}
      <div className="space-y-1">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
          QUICK ACTIONS
        </div>
        <Button variant="ghost" className="w-full justify-start">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>

      {/* Logout */}
      <div className="mt-auto pt-4">
        <Separator className="mb-4" />
        <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
