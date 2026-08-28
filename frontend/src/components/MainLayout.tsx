"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Bell, Search, AlertCircle, User, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const isLoginPage = pathname === "/login";
  
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  
  useEffect(() => {
    setMounted(true);
    
    // Check authentication
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (!token && !isLoginPage) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      if (userStr) {
        try {
          setUserData(JSON.parse(userStr));
        } catch (e) {}
      }
    }
  }, [pathname, isLoginPage, router]);

  if (!mounted || (!isAuthenticated && !isLoginPage)) {
    return <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const userName = userData?.full_name || "Admin User";
  const userRole = userData?.roles?.[0] || "Administrator";
  const initials = userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-800 font-sans w-full">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {pathname === "/" ? "Overview" : pathname.split("/")[1].replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
            <p className="text-xs text-gray-500">Welcome back, {userName.split(" ")[0]}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-9 pr-12 py-2 bg-gray-100 border-transparent rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white border rounded text-gray-500 font-sans">⌘</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white border rounded text-gray-500 font-sans">K</kbd>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-500">
              <button className="relative hover:text-gray-700">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">5</span>
              </button>
              <button className="hover:text-gray-700">
                <AlertCircle size={20} />
              </button>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-4 border-l focus:outline-none hover:opacity-80 transition-opacity"
              >
                <div className="text-right hidden md:block">
                  <div className="text-sm font-semibold text-gray-800">{userName}</div>
                  <div className="text-xs text-gray-500">{userRole}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border">
                  <span className="text-blue-700 font-bold">{initials}</span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-50 md:hidden">
                    <div className="text-sm font-semibold text-gray-800">{userName}</div>
                    <div className="text-xs text-gray-500">{userRole}</div>
                  </div>
                  <Link 
                    href="/users/profile" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    <User size={16} /> View Profile
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50" onClick={() => isProfileOpen && setIsProfileOpen(false)}>
          {children}
        </main>
      </div>
    </div>
  );
}
