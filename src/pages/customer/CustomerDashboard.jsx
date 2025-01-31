import React from "react";
import { Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DashboardPanel from "../../components/Customer/DashboardPanel";
import Quotations from "../../components/Customer/Quotations";
import Stores from "../../components/Customer/Stores";
import SingleShop from "../../components/Customer/SingleShop";
import Sidebar from "../../components/Customer/Sidebar";

const CustomerDashboard = () => {
  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Mobile Sidebar (Drawer) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden fixed top-4 left-4 z-50">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-6">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <main className="h-screen overflow-y-auto">
          <div className="p-8">
            <Routes>
              <Route path="/dashboard" element={<DashboardPanel />} />
              <Route path="/quotations" element={<Quotations />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/dashboard/analytics" element={<div>Analytics</div>} />
              <Route path="/dashboard/support" element={<div>Support</div>} />

              {/* Dynamic shop route */}
              <Route path="/:storeName" element={<SingleShop />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
