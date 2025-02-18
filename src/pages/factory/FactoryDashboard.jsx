import React, { useState } from 'react';
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
import Sidebar from '@/components/Factory/Sidebar';

const FactoryDashboard = () => {
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
                  path="/analytics" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      Analytics
                    </div>
                  } 
                />
                <Route 
                  path="/support" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      Support
                    </div>
                  } 
                />
                <Route 
                  path="/products" 
                  element={
                    <div className="mt-2 lg:mt-4">
                      <Products />
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
export default FactoryDashboard;

