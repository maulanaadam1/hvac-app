"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ClipboardList, 
  Target, 
  TimerReset, 
  PauseCircle, 
  CheckCircle2, 
  Clock,
  Search,
  ChevronDown,
  Calendar,
  Filter,
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus
} from "lucide-react";

const workOrders = [
  {
    id: "WO-2024-0256",
    title: "Chiller #1 - High Discharge Pressure",
    created: "May 27, 2024",
    asset: "CH-01",
    assetDesc: "Chiller - Daikin",
    type: "Corrective",
    typeColor: "text-red-500 bg-red-50",
    priority: "High",
    priorityColor: "text-red-600",
    status: "In Progress",
    statusDot: "bg-blue-500",
    statusText: "text-blue-600",
    assigneeName: "Budi Santoso",
    assigneeRole: "Technician",
    assigneeAvatar: "BS",
    dueDate: "May 29, 2024",
    dueTime: "10:00 AM",
    dueColor: "text-red-600",
    updatedDate: "May 27, 2024",
    updatedTime: "09:15 AM",
  },
  {
    id: "WO-2024-0255",
    title: "AHU-03 Filter Replacement",
    created: "May 27, 2024",
    asset: "AHU-03",
    assetDesc: "AHU - Trane",
    type: "Preventive",
    typeColor: "text-purple-600 bg-purple-50",
    priority: "Medium",
    priorityColor: "text-orange-500",
    status: "Open",
    statusDot: "bg-gray-400",
    statusText: "text-gray-600",
    assigneeName: "Andi Wijaya",
    assigneeRole: "Technician",
    assigneeAvatar: "AW",
    dueDate: "May 31, 2024",
    dueTime: "09:00 AM",
    dueColor: "text-gray-800",
    updatedDate: "May 27, 2024",
    updatedTime: "08:45 AM",
  },
  {
    id: "WO-2024-0254",
    title: "VAV Box-12 Not Cooling",
    created: "May 26, 2024",
    asset: "VAV-12",
    assetDesc: "VAV Box",
    type: "Corrective",
    typeColor: "text-red-500 bg-red-50",
    priority: "High",
    priorityColor: "text-red-600",
    status: "Open",
    statusDot: "bg-gray-400",
    statusText: "text-gray-600",
    assigneeName: "Slamet Riyadi",
    assigneeRole: "Technician",
    assigneeAvatar: "SR",
    dueDate: "May 28, 2024",
    dueTime: "02:00 PM",
    dueColor: "text-red-600",
    updatedDate: "May 26, 2024",
    updatedTime: "02:30 PM",
  },
  {
    id: "WO-2024-0253",
    title: "Cooling Tower Water Level Sensor Calibration",
    created: "May 27, 2024",
    asset: "CT-01",
    assetDesc: "Cooling Tower",
    type: "Preventive",
    typeColor: "text-purple-600 bg-purple-50",
    priority: "Low",
    priorityColor: "text-green-500",
    status: "Completed",
    statusDot: "bg-green-500",
    statusText: "text-green-600",
    assigneeName: "Dedi Kurniawan",
    assigneeRole: "Technician",
    assigneeAvatar: "DK",
    dueDate: "May 26, 2024",
    dueTime: "09:00 AM",
    dueColor: "text-gray-800",
    updatedDate: "May 26, 2024",
    updatedTime: "11:20 AM",
  },
  {
    id: "WO-2024-0252",
    title: "chiller #2 - Annual Maintenance",
    created: "May 25, 2024",
    asset: "CH-02",
    assetDesc: "Chiller - Carrier",
    type: "Preventive",
    typeColor: "text-purple-600 bg-purple-50",
    priority: "Medium",
    priorityColor: "text-orange-500",
    status: "Completed",
    statusDot: "bg-green-500",
    statusText: "text-green-600",
    assigneeName: "Budi Santoso",
    assigneeRole: "Technician",
    assigneeAvatar: "BS",
    dueDate: "May 25, 2024",
    dueTime: "09:00 AM",
    dueColor: "text-gray-800",
    updatedDate: "May 25, 2024",
    updatedTime: "04:10 PM",
  },
  {
    id: "WO-2024-0251",
    title: "AHU-01 Belt Alignment",
    created: "May 24, 2024",
    asset: "AHU-01",
    assetDesc: "AHU - Daikin",
    type: "Corrective",
    typeColor: "text-red-500 bg-red-50",
    priority: "Medium",
    priorityColor: "text-orange-500",
    status: "In Progress",
    statusDot: "bg-blue-500",
    statusText: "text-blue-600",
    assigneeName: "Andi Wijaya",
    assigneeRole: "Technician",
    assigneeAvatar: "AW",
    dueDate: "May 27, 2024",
    dueTime: "03:00 PM",
    dueColor: "text-gray-800",
    updatedDate: "May 27, 2024",
    updatedTime: "10:05 AM",
  },
  {
    id: "WO-2024-0250",
    title: "Pump P-02 Bearing Noise",
    created: "May 24, 2024",
    asset: "P-02",
    assetDesc: "Chilled Water Pump",
    type: "Corrective",
    typeColor: "text-red-500 bg-red-50",
    priority: "High",
    priorityColor: "text-red-600",
    status: "On Hold",
    statusDot: "bg-purple-500",
    statusText: "text-purple-600",
    assigneeName: "Slamet Riyadi",
    assigneeRole: "Technician",
    assigneeAvatar: "SR",
    dueDate: "May 24, 2024",
    dueTime: "11:00 AM",
    dueColor: "text-gray-800",
    updatedDate: "May 25, 2024",
    updatedTime: "09:00 AM",
  },
  {
    id: "WO-2024-0249",
    title: "Condenser Coil Cleaning FF-07",
    created: "May 23, 2024",
    asset: "FCU-07",
    assetDesc: "Fan Coil Unit",
    type: "Preventive",
    typeColor: "text-purple-600 bg-purple-50",
    priority: "Low",
    priorityColor: "text-green-500",
    status: "Completed",
    statusDot: "bg-green-500",
    statusText: "text-green-600",
    assigneeName: "Dedi Kurniawan",
    assigneeRole: "Technician",
    assigneeAvatar: "DK",
    dueDate: "May 23, 2024",
    dueTime: "02:00 PM",
    dueColor: "text-gray-800",
    updatedDate: "May 23, 2024",
    updatedTime: "03:30 PM",
  },
  {
    id: "WO-2024-0248",
    title: "Temperature Sensor Calibration",
    created: "May 23, 2024",
    asset: "SENSOR-15",
    assetDesc: "Temperature Sensor",
    type: "Preventive",
    typeColor: "text-purple-600 bg-purple-50",
    priority: "Low",
    priorityColor: "text-green-500",
    status: "Open",
    statusDot: "bg-gray-400",
    statusText: "text-gray-600",
    assigneeName: "Budi Santoso",
    assigneeRole: "Technician",
    assigneeAvatar: "BS",
    dueDate: "May 30, 2024",
    dueTime: "01:00 PM",
    dueColor: "text-gray-800",
    updatedDate: "May 23, 2024",
    updatedTime: "10:20 AM",
  },
  {
    id: "WO-2024-0247",
    title: "Emergency: Chiller Shutdown",
    created: "May 22, 2024",
    asset: "CH-01",
    assetDesc: "Chiller - Daikin",
    type: "Corrective",
    typeColor: "text-red-500 bg-red-50",
    priority: "Critical",
    priorityColor: "text-red-700 font-black",
    status: "In Progress",
    statusDot: "bg-blue-500",
    statusText: "text-blue-600",
    assigneeName: "Andi Wijaya",
    assigneeRole: "Technician",
    assigneeAvatar: "AW",
    dueDate: "May 22, 2024",
    dueTime: "05:00 PM",
    dueColor: "text-red-600",
    updatedDate: "May 22, 2024",
    updatedTime: "05:30 PM",
  }
];

export default function WorkOrdersIndexPage() {
  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Work Orders</h1>
          <p className="text-sm text-gray-500 mt-1">View and manage all work orders in the system.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
          <Plus size={16} /> Create Work Order <ChevronDown size={14} className="ml-1 opacity-70" />
        </button>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        
        {/* Total Work Orders */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <ClipboardList size={20} />
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Total Work Orders</div>
          </div>
          <div className="text-left mt-2">
            <div className="text-3xl font-black text-gray-900">256</div>
            <div className="text-xs text-gray-500 font-medium mt-1">All time</div>
          </div>
        </div>

        {/* Open */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <Target size={20} />
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Open</div>
          </div>
          <div className="text-left mt-2">
            <div className="text-3xl font-black text-gray-900">78</div>
            <div className="text-xs text-gray-500 font-medium mt-1">30.5%</div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center">
              <TimerReset size={20} />
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">In Progress</div>
          </div>
          <div className="text-left mt-2">
            <div className="text-3xl font-black text-gray-900">46</div>
            <div className="text-xs text-gray-500 font-medium mt-1">18.0%</div>
          </div>
        </div>

        {/* On Hold */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <PauseCircle size={20} />
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">On Hold</div>
          </div>
          <div className="text-left mt-2">
            <div className="text-3xl font-black text-gray-900">12</div>
            <div className="text-xs text-gray-500 font-medium mt-1">4.7%</div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Completed</div>
          </div>
          <div className="text-left mt-2">
            <div className="text-3xl font-black text-gray-900">112</div>
            <div className="text-xs text-gray-500 font-medium mt-1">43.8%</div>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div className="text-[11px] font-bold text-gray-400 uppercase">Overdue</div>
          </div>
          <div className="text-left mt-2">
            <div className="text-3xl font-black text-gray-900">8</div>
            <div className="text-xs text-gray-500 font-medium mt-1">3.1%</div>
          </div>
        </div>

      </div>

      {/* Filters and List */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex-1 flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by WO number, title, asset..." 
                className="w-64 pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <div className="text-[10px] font-bold text-gray-500 mb-0.5 ml-1 uppercase">Status</div>
              <button className="flex items-center justify-between w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700">
                All Status <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>
            
            <div className="relative">
              <div className="text-[10px] font-bold text-gray-500 mb-0.5 ml-1 uppercase">Priority</div>
              <button className="flex items-center justify-between w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700">
                All Priority <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>

            <div className="relative">
              <div className="text-[10px] font-bold text-gray-500 mb-0.5 ml-1 uppercase">Type</div>
              <button className="flex items-center justify-between w-32 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700">
                All Types <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>

            <div className="relative">
              <div className="text-[10px] font-bold text-gray-500 mb-0.5 ml-1 uppercase">Assigned To</div>
              <button className="flex items-center justify-between w-36 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700">
                All Technicians <ChevronDown size={14} className="text-gray-400" />
              </button>
            </div>

            <div className="relative">
              <div className="text-[10px] font-bold text-gray-500 mb-0.5 ml-1 uppercase">Date Range</div>
              <button className="flex items-center justify-between w-48 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white hover:bg-gray-50 text-gray-700">
                Select date range <Calendar size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 lg:mt-0 pt-4 lg:pt-0">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[10px] text-gray-500 uppercase font-bold bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 w-10 text-center">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3">WO Number <span className="text-gray-300 mx-1">|</span> Title</th>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {workOrders.map((wo, i) => (
                <tr key={i} className="hover:bg-gray-50/50 group">
                  <td className="px-4 py-4 text-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-4">
                    <Link href={`/work-orders/${wo.id}`} className="font-bold text-blue-600 hover:underline block mb-0.5">{wo.id}</Link>
                    <div className="text-xs font-semibold text-gray-800 mb-1">{wo.title}</div>
                    <div className="text-[10px] text-gray-400">Created: {wo.created}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-bold text-gray-800 text-xs mb-0.5">{wo.asset}</div>
                    <div className="text-[10px] text-gray-500">{wo.assetDesc}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border border-current ${wo.typeColor}`}>
                      {wo.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`font-bold text-xs ${wo.priorityColor}`}>{wo.priority}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${wo.statusDot}`}></div>
                      <span className={`font-bold text-xs ${wo.statusText}`}>{wo.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-[8px] font-bold shrink-0">
                        {wo.assigneeAvatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-xs">{wo.assigneeName}</div>
                        <div className="text-[10px] text-gray-500">{wo.assigneeRole}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className={`font-bold text-xs ${wo.dueColor}`}>{wo.dueDate}</div>
                    <div className={`text-[10px] ${wo.dueColor}`}>{wo.dueTime}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-gray-800 text-xs">{wo.updatedDate}</div>
                    <div className="text-[10px] text-gray-500">{wo.updatedTime}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button className="text-gray-400 hover:text-gray-800 p-1 rounded-md border border-gray-200 hover:bg-gray-100">
                      <MoreHorizontal size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between bg-white mt-auto">
          <div className="text-xs text-gray-500 font-medium">
            Showing 1 to 10 of 256 work orders
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-gray-200 rounded text-gray-400 hover:bg-gray-50"><ChevronLeft size={16}/></button>
            <button className="px-2.5 py-1 border border-blue-600 bg-blue-50 text-blue-600 font-bold rounded text-xs">1</button>
            <button className="px-2.5 py-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded text-xs">2</button>
            <button className="px-2.5 py-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded text-xs">3</button>
            <button className="px-2.5 py-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded text-xs">4</button>
            <button className="px-2.5 py-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded text-xs">5</button>
            <span className="px-1 text-gray-400 text-xs">...</span>
            <button className="px-2.5 py-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold rounded text-xs">26</button>
            <button className="px-2 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-50"><ChevronRight size={16}/></button>
            
            <div className="ml-4 flex items-center gap-2">
              <button className="flex items-center justify-between px-2 py-1 border border-gray-200 rounded text-xs font-semibold text-gray-600 hover:bg-gray-50 w-20">
                10 / page <ChevronDown size={12}/>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
