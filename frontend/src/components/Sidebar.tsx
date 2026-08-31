"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Wrench, 
  Activity, 
  Package, 
  Warehouse,
  FileText,
  AlertCircle,
  Zap,
  BarChart,
  ClipboardList,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Database
} from "lucide-react";

function NavItem({ icon, label, href = "#", isCollapsed, onClick }: { icon: React.ReactNode, label: string, href?: string, isCollapsed: boolean, onClick?: () => void }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link 
      href={href} 
      onClick={onClick}
      title={isCollapsed ? label : ""}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isCollapsed ? "justify-center" : ""
      } ${
        isActive 
          ? "bg-[#1f2937] text-white" 
          : "text-gray-400 hover:text-white hover:bg-[#1f2937]"
      }`}
    >
      <div className={isActive && href === "/" ? "text-blue-400" : ""}>
        {icon}
      </div>
      {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap overflow-hidden">{label}</span>}
    </Link>
  );
}

export default function Sidebar({ isMobileOpen, onClose, systemLogo }: { isMobileOpen?: boolean, onClose?: () => void, systemLogo?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData.roles && userData.roles.includes("Super Admin")) {
          setIsSuperAdmin(true);
        }
        if (userData.permissions) {
          setUserPermissions(userData.permissions);
        }
      } catch (e) {}
    }
  }, []);

  const hasAccess = (moduleName: string) => {
    if (isSuperAdmin) return true;
    // Check if any permission starts with moduleName
    return userPermissions.some(perm => perm.startsWith(`${moduleName}:`));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`bg-[#111827] text-gray-300 flex flex-col h-full shrink-0 transition-all duration-300 
        fixed inset-y-0 left-0 z-50 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:relative lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'w-64'} w-64`}
      >
        
        {/* Header / Logo */}
        <div className={`h-16 flex items-center border-b border-gray-800 shrink-0 ${isCollapsed ? "justify-center" : "px-4"}`}>
          {systemLogo && systemLogo.startsWith("data:image") ? (
            <img src={systemLogo} alt="Logo" className={`object-contain ${isCollapsed ? "w-8 h-8" : "w-8 h-8 mr-2"}`} />
          ) : (
            <div className="w-8 h-8 rounded bg-white text-gray-900 flex items-center justify-center font-bold shrink-0">
              <LayoutDashboard size={20} />
            </div>
          )}
          {!isCollapsed && (
            <span className="font-bold text-white tracking-wide whitespace-nowrap overflow-hidden ml-2">
              HVAC <span className="font-light text-xs block text-gray-400">MANAGEMENT SYSTEM</span>
            </span>
          )}
          {/* Mobile Close Button */}
          {isMobileOpen && !isCollapsed && (
            <button onClick={onClose} className="ml-auto lg:hidden text-gray-400 hover:text-white">
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
        
        {/* Scrollable Nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
          
          {/* Overview */}
          <div className="px-3 mb-2">
            <NavItem href="/" icon={<LayoutDashboard size={18} />} label="Overview" isCollapsed={isCollapsed} onClick={onClose} />
          </div>

          {/* OPERATIONS */}
          {(hasAccess('Assets') || hasAccess('Work Orders') || hasAccess('Preventive Maintenance') || hasAccess('Inspections')) && (
            <>
              <div className={`mt-6 mb-2 ${isCollapsed ? 'lg:flex lg:justify-center px-4' : 'px-4'}`}>
                <div className={`text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''}`}>Operations</div>
                <div className={`hidden ${isCollapsed ? 'lg:block w-6 h-px bg-gray-700' : ''}`}></div>
              </div>
              <nav className="space-y-1 px-3">
                {hasAccess('Assets') && <NavItem href="/assets" icon={<Package size={18} />} label="Assets" isCollapsed={isCollapsed} onClick={onClose} />}
                {hasAccess('Work Orders') && <NavItem href="/work-orders" icon={<Wrench size={18} />} label="Work Orders" isCollapsed={isCollapsed} onClick={onClose} />}
                {hasAccess('Preventive Maintenance') && <NavItem href="/preventive-maintenance" icon={<ClipboardList size={18} />} label="Preventive Maintenance" isCollapsed={isCollapsed} onClick={onClose} />}
                {hasAccess('Inspections') && <NavItem href="/inspections" icon={<ShieldCheck size={18} />} label="Inspections" isCollapsed={isCollapsed} onClick={onClose} />}
              </nav>
            </>
          )}

          {/* INVENTORY */}
          {(hasAccess('Inventory') || hasAccess('Spare Parts')) && (
            <>
              <div className={`mt-6 mb-2 ${isCollapsed ? 'lg:flex lg:justify-center px-4' : 'px-4'}`}>
                <div className={`text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''}`}>Inventory</div>
                <div className={`hidden ${isCollapsed ? 'lg:block w-6 h-px bg-gray-700' : ''}`}></div>
              </div>
              <nav className="space-y-1 px-3">
                <NavItem icon={<Package size={18} />} label="Spare Parts" isCollapsed={isCollapsed} onClick={onClose} />
                <NavItem icon={<Warehouse size={18} />} label="Warehouse" isCollapsed={isCollapsed} onClick={onClose} />
                <NavItem icon={<FileText size={18} />} label="Transactions" isCollapsed={isCollapsed} onClick={onClose} />
              </nav>
            </>
          )}

          {/* MONITORING */}
          {(hasAccess('Monitoring') || hasAccess('Alarms') || hasAccess('Energy')) && (
            <>
              <div className={`mt-6 mb-2 ${isCollapsed ? 'lg:flex lg:justify-center px-4' : 'px-4'}`}>
                <div className={`text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''}`}>Monitoring</div>
                <div className={`hidden ${isCollapsed ? 'lg:block w-6 h-px bg-gray-700' : ''}`}></div>
              </div>
              <nav className="space-y-1 px-3">
                <NavItem icon={<Activity size={18} />} label="Live Monitoring" isCollapsed={isCollapsed} onClick={onClose} />
                <NavItem icon={<AlertCircle size={18} />} label="Alarms" isCollapsed={isCollapsed} onClick={onClose} />
                <NavItem icon={<Zap size={18} />} label="Energy" isCollapsed={isCollapsed} onClick={onClose} />
              </nav>
            </>
          )}

          {/* ANALYTICS */}
          {(hasAccess('Reports') || hasAccess('Analytics')) && (
            <>
              <div className={`mt-6 mb-2 ${isCollapsed ? 'lg:flex lg:justify-center px-4' : 'px-4'}`}>
                <div className={`text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''}`}>Analytics</div>
                <div className={`hidden ${isCollapsed ? 'lg:block w-6 h-px bg-gray-700' : ''}`}></div>
              </div>
              <nav className="space-y-1 px-3">
                <NavItem icon={<FileText size={18} />} label="Reports" isCollapsed={isCollapsed} onClick={onClose} />
                <NavItem icon={<BarChart size={18} />} label="KPI Dashboard" isCollapsed={isCollapsed} onClick={onClose} />
              </nav>
            </>
          )}

          {/* ADMINISTRATION */}
          {(hasAccess('Users') || hasAccess('Roles & Permissions') || hasAccess('Settings')) && (
            <>
              <div className={`mt-6 mb-2 ${isCollapsed ? 'lg:flex lg:justify-center px-4' : 'px-4'}`}>
                <div className={`text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''}`}>Administration</div>
                <div className={`hidden ${isCollapsed ? 'lg:block w-6 h-px bg-gray-700' : ''}`}></div>
              </div>
              <nav className="space-y-1 px-3 mb-6">
                {isSuperAdmin && <NavItem href="/master-data" icon={<Database size={18} />} label="Master Data" isCollapsed={isCollapsed} onClick={onClose} />}
                {hasAccess('Users') && <NavItem href="/users" icon={<Users size={18} />} label="Users" isCollapsed={isCollapsed} onClick={onClose} />}
                {hasAccess('Roles & Permissions') && <NavItem href="/roles-permissions" icon={<Users size={18} />} label="Roles & Permissions" isCollapsed={isCollapsed} onClick={onClose} />}
                {hasAccess('Settings') && <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" isCollapsed={isCollapsed} onClick={onClose} />}
              </nav>
            </>
          )}
        </div>
        
        {/* Collapse Toggle Button (Desktop Only) */}
        <div className="p-4 border-t border-gray-800 shrink-0 hidden lg:flex items-center justify-start">
           <button 
             onClick={() => setIsCollapsed(!isCollapsed)}
             className={`flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full ${isCollapsed ? 'justify-center' : ''}`}
             title={isCollapsed ? "Expand" : "Collapse"}
           >
             {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
             {!isCollapsed && <span>Collapse</span>}
           </button>
        </div>
      </aside>
    </>
  );
}
