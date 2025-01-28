import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FileTextIcon,
  TruckIcon,
  BarChart2,
  HelpCircleIcon,
  UserCircle,
  Menu,
} from "lucide-react";

import DashboardPanel from "../../components/Customer/DashboardPanel";
import Quotations from "../../components/Customer/Quotations";
import Stores from "../../components/Customer/Stores";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/" },
    { icon: FileTextIcon, label: "Quotations", path: "/dashboard/quotations" },
    { icon: TruckIcon, label: "Stores", path: "/dashboard/stores" },
    { icon: BarChart2, label: "Analytics", path: "/dashboard/analytics" },
    { icon: HelpCircleIcon, label: "Support", path: "/dashboard/support" },
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
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar (Drawer) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
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
                <Route path="/quotations" element={<Quotations />} />
                <Route path="/stores" element={<Stores />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
