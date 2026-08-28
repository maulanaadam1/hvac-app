import { ArrowLeft, Printer, Edit, MoreVertical, ChevronRight, CheckCircle2, Clock, Check, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WorkOrdersPage() {
  const id = "WO-2026-00124";
  
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
            <p className="text-lg text-gray-600">Filter Replacement - AHU-001</p>
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

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <a href="#" className="border-b-2 border-blue-600 text-blue-600 py-3 px-1 text-sm font-bold">Details</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Tasks</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Parts & Labor</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Checklist</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Notes</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Attachments</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">History</a>
        </nav>
      </div>

      {/* Main Content */}
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
    </div>
  );
}
