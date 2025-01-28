import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Package, FileText, Percent, UserCircle, Menu, LogOut } from "lucide-react";
import DashboardPanel from "../../components/Factory/DashboardPanel";
import Products from "../../components/Factory/Products";
import Quotations from "../../components/Factory/Quotations";
import Discounts from "../../components/Factory/Discounts";
import Profile from "../../components/Factory/Profile";

const FactoryDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/factory/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/factory/' },
    { icon: Package, label: 'Products', path: '/factory/products' },
    { icon: FileText, label: 'Quotations', path: '/factory/quotations' },
    { icon: Percent, label: 'Discounts', path: '/factory/discounts' },
    { icon: UserCircle, label: 'Profile', path: '/factory/profile' },
  ];

  const NavItems = () => (
    <div className="space-y-2">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Button
            key={item.path}
            variant={isActive ? "secondary" : "ghost"}
            className={cn("w-full justify-start", isActive && "bg-secondary")}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
      <Button variant="destructive" className="w-full justify-start mt-4" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" /> Logout
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sheet/Drawer */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4">
          <div className="mt-8">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-64 flex-col gap-4 border-r bg-background p-4">
          <NavItems />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="w-full min-h-screen">
            <div className="p-8">
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
