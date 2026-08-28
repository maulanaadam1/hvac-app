"use client";

import { useState } from "react";
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
  ChevronRight
} from "lucide-react";

function NavItem({ icon, label, href = "#", isCollapsed }: { icon: React.ReactNode, label: string, href?: string, isCollapsed: boolean }) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Link 
      href={href} 
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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`bg-[#111827] text-gray-300 flex flex-col h-full shrink-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Header / Logo */}
      <div className="h-16 flex items-center px-4 border-b border-gray-800 shrink-0">
        <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-8 h-8 rounded bg-white text-gray-900 flex items-center justify-center font-bold shrink-0">
            <LayoutDashboard size={20} />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-white tracking-wide whitespace-nowrap overflow-hidden">
              HVAC <span className="font-light text-xs block text-gray-400">MANAGEMENT SYSTEM</span>
            </span>
          )}
        </div>
      </div>
      
      {/* Scrollable Nav */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">
        
        {/* Overview */}
        <div className="px-3 mb-2">
          <NavItem href="/" icon={<LayoutDashboard size={18} />} label="Overview" isCollapsed={isCollapsed} />
        </div>

        {/* OPERATIONS */}
        <div className={`mt-6 mb-2 ${isCollapsed ? 'flex justify-center' : 'px-4'}`}>
          {isCollapsed ? (
            <div className="w-6 h-px bg-gray-700"></div>
          ) : (
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Operations</div>
          )}
        </div>
        <nav className="space-y-1 px-3">
          <NavItem href="/assets" icon={<Package size={18} />} label="Assets" isCollapsed={isCollapsed} />
          <NavItem href="/work-orders" icon={<Wrench size={18} />} label="Work Orders" isCollapsed={isCollapsed} />
          <NavItem href="/preventive-maintenance" icon={<ClipboardList size={18} />} label="Preventive Maintenance" isCollapsed={isCollapsed} />
          <NavItem href="/inspections" icon={<ShieldCheck size={18} />} label="Inspections" isCollapsed={isCollapsed} />
        </nav>

        {/* INVENTORY */}
        <div className={`mt-6 mb-2 ${isCollapsed ? 'flex justify-center' : 'px-4'}`}>
          {isCollapsed ? (
            <div className="w-6 h-px bg-gray-700"></div>
          ) : (
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Inventory</div>
          )}
        </div>
        <nav className="space-y-1 px-3">
          <NavItem icon={<Package size={18} />} label="Spare Parts" isCollapsed={isCollapsed} />
          <NavItem icon={<Warehouse size={18} />} label="Warehouse" isCollapsed={isCollapsed} />
          <NavItem icon={<FileText size={18} />} label="Transactions" isCollapsed={isCollapsed} />
        </nav>

        {/* MONITORING */}
        <div className={`mt-6 mb-2 ${isCollapsed ? 'flex justify-center' : 'px-4'}`}>
          {isCollapsed ? (
            <div className="w-6 h-px bg-gray-700"></div>
          ) : (
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Monitoring</div>
          )}
        </div>
        <nav className="space-y-1 px-3">
          <NavItem icon={<Activity size={18} />} label="Live Monitoring" isCollapsed={isCollapsed} />
          <NavItem icon={<AlertCircle size={18} />} label="Alarms" isCollapsed={isCollapsed} />
          <NavItem icon={<Zap size={18} />} label="Energy" isCollapsed={isCollapsed} />
        </nav>

        {/* ANALYTICS */}
        <div className={`mt-6 mb-2 ${isCollapsed ? 'flex justify-center' : 'px-4'}`}>
          {isCollapsed ? (
            <div className="w-6 h-px bg-gray-700"></div>
          ) : (
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Analytics</div>
          )}
        </div>
        <nav className="space-y-1 px-3">
          <NavItem icon={<FileText size={18} />} label="Reports" isCollapsed={isCollapsed} />
          <NavItem icon={<BarChart size={18} />} label="KPI Dashboard" isCollapsed={isCollapsed} />
        </nav>

        {/* ADMINISTRATION */}
        <div className={`mt-6 mb-2 ${isCollapsed ? 'flex justify-center' : 'px-4'}`}>
          {isCollapsed ? (
            <div className="w-6 h-px bg-gray-700"></div>
          ) : (
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Administration</div>
          )}
        </div>
        <nav className="space-y-1 px-3 mb-6">
          <NavItem href="/users" icon={<Users size={18} />} label="Users" isCollapsed={isCollapsed} />
          <NavItem href="/roles-permissions" icon={<Users size={18} />} label="Roles & Permissions" isCollapsed={isCollapsed} />
          <NavItem href="/settings" icon={<Settings size={18} />} label="Settings" isCollapsed={isCollapsed} />
        </nav>
      </div>
      
      {/* Collapse Toggle Button */}
      <div className="p-4 border-t border-gray-800 shrink-0 flex items-center justify-center lg:justify-start">
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
  );
}
