"use client";
import { ArrowLeft, Printer, Edit, MoreVertical, ChevronRight, CheckCircle2, Clock, Check, Plus, Trash2, ArrowRight, ArrowDownUp, GripVertical, Lightbulb, Package, Eye, XCircle, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function WorkOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Tasks");
  
  // Tasks State for Drag-and-Drop
  const [tasks, setTasks] = useState([
    { id: 1, name: "Check System Readings", desc: "Check and record current system readings", assignee: "Budi Santoso", avatar: "BS", status: "Completed", stCol: "text-green-700", stDot: "bg-green-500", pri: "High", priCol: "text-red-600 bg-red-50 border-red-200", dur: "30 min", prog: 100, due: "May 27, 2024", time: "09:00 AM" },
    { id: 2, name: "Inspect Discharge Pressure", desc: "Inspect high discharge pressure issue", assignee: "Andi Wijaya", avatar: "AW", status: "In Progress", stCol: "text-blue-700", stDot: "bg-blue-500", pri: "High", priCol: "text-red-600 bg-red-50 border-red-200", dur: "45 min", prog: 60, due: "May 27, 2024", time: "10:00 AM" },
    { id: 3, name: "Check Condenser", desc: "Inspect condenser coil and fan operation", assignee: "Slamet Riyadi", avatar: "SR", status: "In Progress", stCol: "text-blue-700", stDot: "bg-blue-500", pri: "Medium", priCol: "text-orange-600 bg-orange-50 border-orange-200", dur: "60 min", prog: 50, due: "May 27, 2024", time: "11:00 AM" },
    { id: 4, name: "Clean Condenser Coil", desc: "Clean condenser coil if necessary", assignee: "Slamet Riyadi", avatar: "SR", status: "Pending", stCol: "text-orange-600", stDot: "bg-orange-500", pri: "Medium", priCol: "text-orange-600 bg-orange-50 border-orange-200", dur: "90 min", prog: 0, due: "May 27, 2024", time: "01:00 PM" },
    { id: 5, name: "Check Refrigerant Level", desc: "Verify refrigerant level and top up if needed", assignee: "Dedi Kurniawan", avatar: "DK", status: "Pending", stCol: "text-orange-600", stDot: "bg-orange-500", pri: "High", priCol: "text-red-600 bg-red-50 border-red-200", dur: "45 min", prog: 0, due: "May 27, 2024", time: "02:30 PM" },
    { id: 6, name: "System Test & Verification", desc: "Run system test and verify normal operation", assignee: "Budi Santoso", avatar: "BS", status: "Pending", stCol: "text-orange-600", stDot: "bg-orange-500", pri: "High", priCol: "text-red-600 bg-red-50 border-red-200", dur: "60 min", prog: 0, due: "May 27, 2024", time: "04:00 PM" },
  ]);

  // Mock role check (this would normally come from your Auth context)
  const userRole = "Planner"; // Simulated current user role
  const canReorder = userRole === "Planner" || userRole === "Super Admin";

  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleDragStart = (idx: number) => {
    if (!canReorder) return;
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (!canReorder || draggedIdx === null || draggedIdx === idx) return;

    const newTasks = [...tasks];
    const draggedItem = newTasks[draggedIdx];
    newTasks.splice(draggedIdx, 1);
    newTasks.splice(idx, 0, draggedItem);
    
    // Update IDs sequentially to reflect new order
    const reorderedTasks = newTasks.map((t, i) => ({ ...t, id: i + 1 }));
    setTasks(reorderedTasks);
    setDraggedIdx(idx);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  
  
  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      
      {/* Breadcrumb & Actions */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/work-orders" className="hover:text-gray-800">Work Orders</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">{id}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold tracking-tight text-gray-800">{id}</h2>
              <span className="inline-flex items-center px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">
                In Progress
              </span>
            </div>
            <p className="text-lg text-gray-600">Chiller #1 - High Discharge Pressure</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <Printer size={16} />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <Edit size={16} />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
              More Actions <ChevronRight size={14} className="rotate-90"/>
            </button>
          </div>
        </div>
      </div>
      {/* Quick Info Bar */}
      <div className="flex items-start justify-between bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Asset</div>
          <div className="font-bold text-gray-800 text-sm">CH-01</div>
          <div className="text-[10px] text-gray-500">Chiller - Daikin</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Location</div>
          <div className="font-bold text-gray-800 text-sm">Building A - Mechanical Room</div>
          <div className="text-[10px] text-gray-500">Floor 1</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Priority</div>
          <div className="font-bold text-red-600 text-sm flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-600"></div> High</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Type</div>
          <div className="font-bold text-gray-800 text-sm">Corrective</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Requested By</div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-700 border">BS</div>
            <div>
              <div className="font-bold text-gray-800 text-xs">Budi Santoso</div>
              <div className="text-[10px] text-gray-500">Technician</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Due Date</div>
          <div className="font-bold text-gray-800 text-sm flex items-center gap-1.5"><Clock size={12}/> May 29, 2024</div>
          <div className="text-[10px] text-gray-500">10:00 AM</div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-gray-200 flex space-x-8">
        {["Overview", "Tasks", "Parts", "Labor", "Notes", "Attachments", "History"].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-1 text-sm font-semibold border-b-2 ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content */}
      {activeTab === "Overview" && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3) */}
        <div className="col-span-2 space-y-6">
          
          {/* Work Order Information */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">Work Order Information</h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Work Order ID</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">{id}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Status</div>
                <div className="col-span-2"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">In Progress</span></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Work Type</div>
                <div className="col-span-2"><span className="px-2 py-0.5 rounded bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100">Corrective</span></div>
              </div>
              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1 text-sm font-medium text-gray-500">% Complete</div>
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-800">60%</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 w-24">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Priority</div>
                <div className="col-span-2"><span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-xs font-bold border border-red-100">High</span></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Work Category</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Mechanical</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Request Type</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Equipment Issue</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Cost Center</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Building A - Facility</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Problem</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Dirty Filter causing low airflow</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Impact</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Affects comfort in Lobby area</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Description</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Replace pre-filter and fine filter on AHU-001. Customer reported low airflow and higher return temperature.</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">SLA</div>
                <div className="col-span-2"><span className="px-2 py-0.5 rounded bg-green-50 text-green-600 text-xs font-bold border border-green-100">On Track</span></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Created On</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">24 Apr 2026 09:15</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Last Updated</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">24 Apr 2026 11:20</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Requested By</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Rizky Fadilah</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Updated By</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Satria W.</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 text-sm font-medium text-gray-500">Source</div>
                <div className="col-span-2 text-sm font-semibold text-gray-800">Manual Request</div>
              </div>
            </div>
          </div>

          {/* Work Order Progress (Stepper) */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-8 text-lg">Work Order Progress</h3>
            <div className="flex items-start justify-between relative px-4">
              {/* Connecting line */}
              <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 -z-10">
                <div className="h-full bg-green-500 w-1/2"></div>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg"><Check size={20}/></div>
                <div className="text-sm font-bold text-gray-800">Open</div>
                <div className="text-[10px] text-gray-500 font-medium">24 Apr 09:15</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg"><Check size={20}/></div>
                <div className="text-sm font-bold text-gray-800">Assigned</div>
                <div className="text-[10px] text-gray-500 font-medium">24 Apr 09:30</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg border-4 border-blue-100">3</div>
                <div className="text-sm font-bold text-gray-800">In Progress</div>
                <div className="text-[10px] text-gray-500 font-medium">24 Apr 10:10</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center font-bold text-lg">4</div>
                <div className="text-sm font-bold text-gray-400">Verification</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center font-bold text-lg">5</div>
                <div className="text-sm font-bold text-gray-400">Closed</div>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 text-lg">Task List</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50">
                <Plus size={14}/> Add Task
              </button>
            </div>
            
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100">
                <tr>
                  <th className="pb-3 w-8">#</th>
                  <th className="pb-3">TASK</th>
                  <th className="pb-3">TYPE</th>
                  <th className="pb-3">ASSIGNEE</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3">STARTED</th>
                  <th className="pb-3">COMPLETED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: 1, task: 'Isolate AHU and lock out power', type: 'Safety', assignee: 'Satria W.', status: 'Completed', stCol: 'bg-green-100 text-green-700', start: '24 Apr 10:10', end: '24 Apr 10:20' },
                  { id: 2, task: 'Remove old pre-filter', type: 'Service', assignee: 'Satria W.', status: 'Completed', stCol: 'bg-green-100 text-green-700', start: '24 Apr 10:20', end: '24 Apr 10:35' },
                  { id: 3, task: 'Inspect filter frame and housing', type: 'Inspection', assignee: 'Satria W.', status: 'Completed', stCol: 'bg-green-100 text-green-700', start: '24 Apr 10:35', end: '24 Apr 10:50' },
                  { id: 4, task: 'Install new pre-filter', type: 'Service', assignee: 'Satria W.', status: 'In Progress', stCol: 'bg-blue-100 text-blue-700', start: '24 Apr 10:50', end: '-' },
                  { id: 5, task: 'Install fine filter', type: 'Service', assignee: '-', status: 'Pending', stCol: 'bg-gray-100 text-gray-600', start: '-', end: '-' },
                  { id: 6, task: 'Check differential pressure', type: 'Inspection', assignee: '-', status: 'Pending', stCol: 'bg-gray-100 text-gray-600', start: '-', end: '-' },
                  { id: 7, task: 'Test and verify operation', type: 'Testing', assignee: '-', status: 'Pending', stCol: 'bg-gray-100 text-gray-600', start: '-', end: '-' },
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-3 font-semibold text-gray-500">{row.id}</td>
                    <td className="py-3 font-semibold text-gray-800">{row.task}</td>
                    <td className="py-3 text-gray-500 font-medium">{row.type}</td>
                    <td className="py-3 font-semibold text-gray-800">{row.assignee}</td>
                    <td className="py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.stCol}`}>{row.status}</span></td>
                    <td className="py-3 text-gray-500 text-xs font-medium">{row.start}</td>
                    <td className="py-3 text-gray-500 text-xs font-medium">{row.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">Notes</h3>
            <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 ml-4 mb-6">
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold">SW</div>
                      <span className="font-bold text-gray-800 text-sm">Satria W.</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Started working on filter replacement. AHU isolated and safe to work.</p>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">24 Apr 2026 10:10</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold">SW</div>
                      <span className="font-bold text-gray-800 text-sm">Satria W.</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">Old pre-filter removed. Housing in good condition.</p>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">24 Apr 2026 10:35</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-6 w-4 h-4 rounded-full bg-gray-100 border-2 border-gray-300"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold">DP</div>
                      <span className="font-bold text-gray-800 text-sm">Dimas Prayoga</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-2">New pre-filter installed.</p>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500">24 Apr 2026 11:15</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 items-center">
              <input type="text" placeholder="Write a note..." className="flex-1 border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <button className="px-6 py-2.5 bg-[#111827] text-white rounded-lg text-sm font-bold">Add Note</button>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          
          {/* Status & Priority */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">Status & Priority</h3>
            <div className="flex gap-6 items-center">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#1d4ed8" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="105.55" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-gray-800">60%</span>
                  <span className="text-[8px] uppercase tracking-wider font-bold text-gray-500 mt-0.5">Completed</span>
                </div>
              </div>
              <div className="flex-1 space-y-3 text-sm">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div> In Progress
                </div>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div> High Priority
                </div>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Clock size={12} className="text-gray-500"/> Due: Today 14:30
                </div>
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <CheckCircle2 size={12} className="text-green-500"/> On Track
                </div>
              </div>
            </div>
          </div>

          {/* Asset Information */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Asset Information</h3>
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center text-[10px] text-gray-400 font-bold shrink-0">
                [AHU Image]
              </div>
              <div>
                <div className="font-bold text-lg text-gray-800">AHU-001</div>
                <div className="text-sm font-medium text-gray-500">Air Handling Unit</div>
                <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div> Running
                </div>
                <div className="text-xs text-gray-500 font-medium mt-2 flex items-center gap-1">
                   <div className="w-3 h-3 rounded bg-gray-200 flex items-center justify-center text-[8px]">B</div> Building A
                </div>
                <div className="text-xs text-gray-500 font-medium mt-1">Floor 1 / Lobby</div>
              </div>
            </div>
            <Link href="/assets/AHU-001" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
              View Asset Detail <ArrowRight size={14}/>
            </Link>
          </div>

          {/* Assignment */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Assignment</h3>
            
            <div className="mb-4">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Technician</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 border">SW</div>
                <div>
                  <div className="font-bold text-gray-800 text-sm flex items-center gap-2">Satria W. <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[9px]">Lead Technician</span></div>
                  <div className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">📞 +62 812 3456 7890</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Team Members</div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 border">DP</div>
                    <div className="font-bold text-gray-800 text-sm">Dimas Prayoga</div>
                  </div>
                  <Trash2 size={14} className="text-gray-400 cursor-pointer hover:text-red-500"/>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 border">RF</div>
                    <div className="font-bold text-gray-800 text-sm">Rizky Fadilah</div>
                  </div>
                  <Trash2 size={14} className="text-gray-400 cursor-pointer hover:text-red-500"/>
                </div>
              </div>
              <button className="text-blue-600 text-sm font-bold mt-4 flex items-center gap-1 hover:underline">
                <Plus size={14}/> Add Technician
              </button>
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Schedule</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Start Time</span>
                <span className="font-bold text-gray-800">24 Apr 2026 10:10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Due Time</span>
                <span className="font-bold text-gray-800">24 Apr 2026 14:30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Estimated Duration</span>
                <span className="font-bold text-gray-800">4h 20m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Actual Duration</span>
                <span className="font-bold text-gray-800">2h 30m</span>
              </div>
            </div>
          </div>

          {/* Parts Summary */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Parts Summary</h3>
            <div className="space-y-3 text-sm mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Planned Cost</span>
                <span className="font-bold text-gray-800">IDR 1,250,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Actual Cost</span>
                <span className="font-bold text-gray-800">IDR 850,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Used Parts</span>
                <span className="font-bold text-gray-800">2 Items</span>
              </div>
            </div>
            <Link href="#" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
              View Parts & Labor <ArrowRight size={14}/>
            </Link>
          </div>
          
        </div>
      </div>
      )}

      {activeTab === "Tasks" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Tasks Area */}
          <div className="lg:col-span-3 bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Tasks</h3>
                  <p className="text-sm text-gray-500 mt-1">Break down the work order into actionable tasks and track progress.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    <ArrowDownUp size={16} /> Reorder
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm">
                    <Plus size={16} /> Add Task
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-5 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="text-2xl font-black text-gray-800 mb-2">6</div>
                  <div className="text-xs font-bold text-gray-500 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Total Tasks</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="text-2xl font-black text-green-700 mb-2">1</div>
                  <div className="text-xs font-bold text-green-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div> Completed</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="text-2xl font-black text-blue-700 mb-2">2</div>
                  <div className="text-xs font-bold text-blue-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> In Progress</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <div className="text-2xl font-black text-orange-700 mb-2">3</div>
                  <div className="text-xs font-bold text-orange-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Pending</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <div className="text-2xl font-black text-purple-700 mb-2">0</div>
                  <div className="text-xs font-bold text-purple-700 flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> On Hold</div>
                </div>
              </div>

              {/* Tasks Table */}
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100">
                  <tr>
                    <th className="pb-3 w-8 text-center"></th>
                    <th className="pb-3 w-8">#</th>
                    <th className="pb-3">TASK NAME</th>
                    <th className="pb-3">ASSIGNED TO</th>
                    <th className="pb-3">STATUS</th>
                    <th className="pb-3">PRIORITY</th>
                    <th className="pb-3">EST. DURATION</th>
                    <th className="pb-3 w-24">PROGRESS</th>
                    <th className="pb-3">DUE DATE</th>
                    <th className="pb-3 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tasks.map((t, idx) => (
                    <tr 
                      key={t.name}
                      draggable={canReorder}
                      onDragStart={() => handleDragStart(idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnd={handleDragEnd}
                      className={`hover:bg-gray-50/50 transition-colors ${draggedIdx === idx ? 'opacity-40 bg-gray-50' : ''}`}
                    >
                      <td className={`py-4 text-center text-gray-300 ${canReorder ? 'cursor-grab hover:text-gray-500' : 'opacity-30 cursor-not-allowed'}`} title={canReorder ? "Drag to reorder" : "Only Planners can reorder"}>
                        <GripVertical size={16}/>
                      </td>
                      <td className="py-4 font-bold text-gray-400">{t.id}</td>
                      <td className="py-4">
                        <div className="font-bold text-gray-800 text-sm mb-0.5">{t.name}</div>
                        <div className="text-[10px] text-gray-500">{t.desc}</div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-bold text-blue-700 shrink-0">{t.avatar}</div>
                          <div>
                            <div className="font-bold text-gray-800 text-xs">{t.assignee}</div>
                            <div className="text-[9px] text-gray-500">Technician</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className={`text-xs font-bold flex items-center gap-1.5 ${t.stCol}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${t.stDot}`}></div> {t.status}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${t.priCol}`}>{t.pri}</span>
                      </td>
                      <td className="py-4 text-xs font-semibold text-gray-700">{t.dur}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${t.prog === 100 ? 'bg-green-500' : t.prog > 0 ? 'bg-blue-600' : 'bg-gray-200'}`} style={{width: `${t.prog}%`}}></div>
                          </div>
                          <span className="text-[10px] font-bold text-gray-500">{t.prog}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="font-bold text-gray-800 text-xs">{t.due}</div>
                        <div className="text-[10px] text-gray-500">{t.time}</div>
                      </td>
                      <td className="py-4 text-center">
                        <button className="text-gray-400 hover:text-gray-800 p-1.5 rounded-md border border-gray-200 hover:bg-gray-100">
                          <MoreVertical size={14}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

            <div className="border-t border-gray-100 p-4 bg-gray-50 mt-auto flex justify-between items-center">
              <button className="flex items-center gap-2 text-blue-600 text-sm font-bold hover:underline">
                <Plus size={16}/> Add Task
              </button>
              <div className="text-sm font-medium text-gray-600">
                Total Estimated Duration: <span className="font-bold text-gray-900">5h 30m</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Task Summary */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-6 text-sm">Task Summary</h3>
              
              <div className="flex gap-4 items-center">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                    {/* Simplified segments for illustration */}
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="131.95" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="175.92" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="219.9" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">6</span>
                    <span className="text-[8px] font-bold text-gray-500 mt-0.5">Total Tasks</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Completed
                    </div>
                    <div className="font-medium text-gray-500">1 (17%)</div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div> In Progress
                    </div>
                    <div className="font-medium text-gray-500">2 (33%)</div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div> Pending
                    </div>
                    <div className="font-medium text-gray-500">3 (50%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Templates */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2 text-sm">Task Templates</h3>
              <p className="text-[11px] text-gray-500 mb-4">Use templates to quickly add common task lists.</p>
              
              <div className="space-y-3">
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500">
                  <option>Select template</option>
                  <option>Chiller Standard Maintenance</option>
                  <option>HVAC Inspection</option>
                </select>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 bg-white text-blue-600 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50">
                  <Plus size={16}/> Apply Template
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 text-gray-700">
                <Lightbulb size={16}/>
                <h3 className="font-bold text-sm">Tips</h3>
              </div>
              <ul className="text-xs text-gray-600 space-y-3 list-disc pl-4">
                <li>Drag and drop to reorder tasks</li>
                <li>Set dependencies by completing tasks in order</li>
                <li>Update task status to track progress</li>
                <li>Add notes or attachments to tasks from the menu</li>
              </ul>
            </div>
            
          </div>
        </div>
      )}

      {activeTab === "Parts" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Parts Area */}
          <div className="lg:col-span-3 bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
            
            <div className="p-6 pb-0">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Parts & Materials</h3>
                  <p className="text-sm text-gray-500 mt-1">View and manage parts used in this work order.</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    <Plus size={16} /> Add from Inventory
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
                    <Plus size={16} /> Add Non-Inventory Part
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 border border-blue-100 shadow-sm">
                    <Eye size={16} /> View Stock
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-6 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="text-xl font-black text-gray-800 mb-1">7</div>
                  <div className="text-[10px] font-bold text-gray-500 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Total Items</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="text-xl font-black text-gray-800 mb-1">5</div>
                  <div className="text-[10px] font-bold text-gray-500 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> From Inventory</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <div className="text-xl font-black text-gray-800 mb-1">2</div>
                  <div className="text-[10px] font-bold text-gray-500 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> Non-Inventory</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 border border-green-100 col-span-2">
                  <div className="text-xl font-black text-green-700 mb-1">$1,248.50</div>
                  <div className="text-[10px] font-bold text-green-700 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Total Estimated Cost</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <div className="text-xl font-black text-blue-700 mb-1">$400.50</div>
                  <div className="text-[10px] font-bold text-blue-700 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Total Actual Cost</div>
                </div>
              </div>

              {/* Parts Table */}
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100">
                    <tr>
                      <th className="pb-3 px-4 w-10">#</th>
                      <th className="pb-3 px-4">PART / MATERIAL</th>
                      <th className="pb-3 px-4">SOURCE</th>
                      <th className="pb-3 px-4">PART NUMBER</th>
                      <th className="pb-3 px-4">QTY</th>
                      <th className="pb-3 px-4">UNIT</th>
                      <th className="pb-3 px-4">UNIT COST</th>
                      <th className="pb-3 px-4">TOTAL COST</th>
                      <th className="pb-3 px-4 text-center">RETURNABLE</th>
                      <th className="pb-3 px-4 text-center">STATUS</th>
                      <th className="pb-3 px-4 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { id: 1, name: "Oil Filter", desc: "Remove oil contaminants", source: "Inventory", dot: "bg-green-500", partNum: "FLTR-OIL-01", qty: 1, unit: "pcs", uCost: "$25.00", tCost: "$25.00", ret: true, status: "Used", stCol: "text-green-700 bg-green-50 border-green-200" },
                      { id: 2, name: "Air Filter", desc: "MERV 8 Panel Filter", source: "Inventory", dot: "bg-green-500", partNum: "FLTR-AIR-08", qty: 2, unit: "pcs", uCost: "$18.00", tCost: "$36.00", ret: true, status: "Used", stCol: "text-green-700 bg-green-50 border-green-200" },
                      { id: 3, name: "V-Belt A42", desc: "Drive belt", source: "Inventory", dot: "bg-green-500", partNum: "BELT-A42", qty: 1, unit: "pcs", uCost: "$22.00", tCost: "$22.00", ret: false, status: "Used", stCol: "text-green-700 bg-green-50 border-green-200" },
                      { id: 4, name: "Pressure Sensor", desc: "Discharge pressure sensor", source: "Inventory", dot: "bg-green-500", partNum: "SENS-PRS-300", qty: 1, unit: "pcs", uCost: "$125.00", tCost: "$125.00", ret: true, status: "Used", stCol: "text-green-700 bg-green-50 border-green-200" },
                      { id: 5, name: "Refrigerant R134a", desc: "Refrigerant gas", source: "Inventory", dot: "bg-green-500", partNum: "REF-R134A", qty: 2, unit: "kg", uCost: "$45.00", tCost: "$90.00", ret: false, status: "Partial", stCol: "text-orange-700 bg-orange-50 border-orange-200" },
                      { id: 6, name: "Compressor Oil", desc: "Synthetic oil ISO 46", source: "Non-Inventory", dot: "bg-yellow-500", partNum: "OIL-ISO46", qty: 1, unit: "L", uCost: "$35.00", tCost: "$35.00", ret: false, status: "Used", stCol: "text-green-700 bg-green-50 border-green-200" },
                      { id: 7, name: "Gasket Set", desc: "Compressor gasket set", source: "Non-Inventory", dot: "bg-yellow-500", partNum: "GSKT-SET-01", qty: 1, unit: "set", uCost: "$67.50", tCost: "$67.50", ret: false, status: "Used", stCol: "text-green-700 bg-green-50 border-green-200" },
                    ].map(p => (
                      <tr key={p.id} className="hover:bg-gray-50/50 group">
                        <td className="py-4 px-4 font-bold text-gray-400">{p.id}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 shrink-0 mt-0.5"><Package size={16}/></div>
                            <div>
                              <div className="font-bold text-gray-800 text-sm mb-0.5">{p.name}</div>
                              <div className="text-[10px] text-gray-500">{p.desc}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${p.dot}`}></div> {p.source}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-700">{p.partNum}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-900">{p.qty}</td>
                        <td className="py-4 px-4 text-xs font-semibold text-gray-500">{p.unit}</td>
                        <td className="py-4 px-4 text-xs font-semibold text-gray-700">{p.uCost}</td>
                        <td className="py-4 px-4 text-xs font-bold text-gray-900">{p.tCost}</td>
                        <td className="py-4 px-4 text-center">
                          {p.ret ? <CheckCircle2 size={16} className="text-green-500 mx-auto"/> : <XCircle size={16} className="text-red-500 mx-auto"/>}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${p.stCol}`}>{p.status}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button className="text-gray-400 hover:text-gray-800 p-1.5 rounded-md border border-gray-200 hover:bg-gray-100">
                            <MoreVertical size={14}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t border-gray-100 bg-gray-50/50">
                    <tr>
                      <td colSpan={7} className="py-4 px-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Total</td>
                      <td className="py-4 px-4 text-sm font-black text-gray-900">$400.50</td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div className="p-6 bg-gray-50 mt-auto border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800 mb-2">Notes (Parts)</h4>
              <div className="relative bg-white rounded-lg">
                <textarea 
                  placeholder="Add notes about parts used in this work order..." 
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                ></textarea>
                <div className="absolute bottom-3 right-3 text-[10px] font-semibold text-gray-400">0/500</div>
              </div>
            </div>
            
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Parts Summary */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-6 text-sm">Parts Summary</h3>
              
              <div className="flex gap-4 items-center">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                    {/* Simplified segments for illustration */}
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="219.9" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="175.92" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="87.96" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-gray-800">7</span>
                    <span className="text-[8px] font-bold text-gray-500 mt-0.5">Total Items</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Used
                    </div>
                    <div className="font-medium text-gray-500">5 (71%)</div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Partial
                    </div>
                    <div className="font-medium text-gray-500">1 (14%)</div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div> Available
                    </div>
                    <div className="font-medium text-gray-500">1 (14%)</div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div> Not Used
                    </div>
                    <div className="font-medium text-gray-500">0 (0%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Availability */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-sm">Inventory Availability</h3>
              <div className="space-y-3 mb-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">All parts available</span>
                  <span className="font-bold text-gray-800">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Partially available</span>
                  <span className="font-bold text-gray-800">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Not available</span>
                  <span className="font-bold text-gray-800">0</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-200 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                <Package size={16}/> Check Availability
              </button>
            </div>

            {/* Returnable Items */}
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-sm">Returnable Items</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Returnable</span>
                  <span className="font-bold text-gray-800">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Non-returnable</span>
                  <span className="font-bold text-gray-800">4</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-gray-600 font-medium">Return Rate</span>
                  <span className="font-bold text-gray-800">42%</span>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-800">
              <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">After completing the work order, unused returnable parts can be returned to inventory.</p>
            </div>
            
          </div>
        </div>
      )}


    </div>
  );
}
