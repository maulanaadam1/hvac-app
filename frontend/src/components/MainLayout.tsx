"use client";

import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { Bell, Search, AlertCircle, User, LogOut, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemLogo, setSystemLogo] = useState<string | null>(null);
  const [automaticLogoutMinutes, setAutomaticLogoutMinutes] = useState(30);
  const [isCheckingMaintenance, setIsCheckingMaintenance] = useState(true);
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
    
    // Check maintenance mode and settings
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/settings/general`)
      .then(res => res.json())
      .then(data => {
        setMaintenanceMode(data.maintenance_mode === true);
        if (data.system_logo && data.system_logo.startsWith("data:image")) {
          setSystemLogo(data.system_logo);
          
          // Update favicon dynamically
          let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = data.system_logo;
        }
        if (data.automatic_logout) {
          setAutomaticLogoutMinutes(data.automatic_logout);
        }
        setIsCheckingMaintenance(false);
      })
      .catch(err => {
        console.error("Failed to check settings", err);
        setIsCheckingMaintenance(false);
      });
  }, [pathname, isLoginPage, router]);

  // Idle Timer Logic for Automatic Logout
  useEffect(() => {
    if (!isAuthenticated || isLoginPage || isCheckingMaintenance) return;

    let idleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      // Set timer based on settings (convert minutes to ms)
      idleTimer = setTimeout(() => {
        alert("You have been automatically logged out due to inactivity.");
        handleSignOut();
      }, automaticLogoutMinutes * 60 * 1000);
    };

    // Initialize the timer
    resetIdleTimer();

    // Listen to user interactions to reset the timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer);
    });

    return () => {
      clearTimeout(idleTimer);
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [isAuthenticated, isLoginPage, isCheckingMaintenance, automaticLogoutMinutes]);

  if (!mounted || (!isAuthenticated && !isLoginPage) || isCheckingMaintenance) {
    return <div className="h-screen w-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  const userName = userData?.full_name || "Admin User";
  const userRole = userData?.roles?.[0] || "Administrator";
  const initials = userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  // If maintenance mode is ON and user is NOT a Super Admin, block access
  if (maintenanceMode && userRole !== "Super Admin") {
    return (
      <div className="h-screen w-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={48} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Under Maintenance</h1>
        <p className="text-gray-500 max-w-md mb-8">
          We are currently performing scheduled maintenance on the HVAC Management Platform. 
          Please check back later. We apologize for the inconvenience.
        </p>
        <button onClick={handleSignOut} className="px-6 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-800 font-sans w-full">
      {/* Sidebar Component */}
      <Sidebar isMobileOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} systemLogo={systemLogo || undefined} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 -ml-1.5 lg:hidden text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {pathname === "/" ? "Overview" : pathname.split("/")[1].replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">Welcome back, {userName.split(" ")[0]}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden sm:block">
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
