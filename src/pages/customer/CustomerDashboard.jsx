import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DashboardPanel from "../../components/Customer/DashboardPanel";
import Quotations from "../../components/Customer/Quotations";
import Stores from "../../components/Customer/Stores";
import SingleShop from "../../components/Customer/SingleShop";
import Sidebar from "../../components/Customer/Sidebar";
import Products from "../../components/Customer/Products";

const CustomerDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <div className="h-screen flex bg-background">
      {/* Mobile Sidebar (Drawer) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="lg:hidden fixed top-2 left-2 z-50 shadow-sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-64 p-0 border-r"
        >
          <div className="h-full overflow-y-auto">
            <Sidebar onSidebarClose={handleClose} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r shrink-0">
        <div className="h-full overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <div className="px-2 py-2 sm:px-4 md:px-6 lg:px-8 min-h-screen">
            <div className="max-w-full mx-auto">
              <Routes>
                <Route 
                  path="/dashboard" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      <DashboardPanel />
                    </div>
                  } 
                />
                <Route 
                  path="/quotations" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      <Quotations />
                    </div>
                  } 
                />
                <Route 
                  path="/stores" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      <Stores />
                    </div>
                  } 
                />
                <Route 
                  path="/dashboard/analytics" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      Analytics
                    </div>
                  } 
                />
                <Route 
                  path="/dashboard/support" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      Support
                    </div>
                  } 
                />
                <Route 
                  path="/dashboard/products" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      <Products />
                    </div>
                  } 
                />
                <Route 
                  path="/:shopName" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      <SingleShop />
                    </div>
                  } 
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;