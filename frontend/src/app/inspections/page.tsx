import { Calendar, Search, Filter, MoreHorizontal, Download, Plus, CheckCircle, FileText, X, Check, Image as ImageIcon, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function InspectionsPage() {
  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      
      {/* Breadcrumb & Actions */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/inspections" className="hover:text-gray-800">Inspections</Link>
          <span className="mx-1">&gt;</span>
          <span className="text-gray-800">Overview</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-800">Inspections</h2>
            <p className="text-sm text-gray-500 mt-1">Manage and track all equipment inspections.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
              <Plus size={16} />
              New Inspection
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
            <Calendar size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">Total Inspections</div>
          <div className="text-2xl font-bold text-gray-800">342</div>
          <div className="text-[10px] text-gray-400 mt-1">This Month</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
            <CheckCircle size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">Completed</div>
          <div className="text-2xl font-bold text-gray-800">256</div>
          <div className="text-[10px] font-bold text-gray-800 mt-1">74.9% <span className="font-medium text-gray-500">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-2">
            <div className="font-bold">⏳</div>
          </div>
          <div className="text-xs font-medium text-gray-500">In Progress</div>
          <div className="text-2xl font-bold text-gray-800">48</div>
          <div className="text-[10px] font-bold text-gray-800 mt-1">14.0% <span className="font-medium text-gray-500">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
            <div className="font-bold">!</div>
          </div>
          <div className="text-xs font-medium text-gray-500">Overdue</div>
          <div className="text-2xl font-bold text-gray-800">38</div>
          <div className="text-[10px] font-bold text-gray-800 mt-1">11.1% <span className="font-medium text-gray-500">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
            <ShieldCheck size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">Assets Inspected</div>
          <div className="text-2xl font-bold text-gray-800">186</div>
          <div className="text-[10px] text-gray-400 mt-1">This Month</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-2">
          <a href="#" className="border-b-2 border-blue-600 text-blue-600 py-3 px-1 text-sm font-bold">List View</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Calendar View</a>
        </nav>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 relative">
        
        {/* Left Col (2/3) Table area */}
        <div className="xl:col-span-2 space-y-4">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search inspections..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"/>
            </div>
            <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-medium text-xs rounded-lg px-3 py-2 w-32"><option>All Status</option></select>
            <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-medium text-xs rounded-lg px-3 py-2 w-32"><option>All Types</option></select>
            <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-medium text-xs rounded-lg px-3 py-2 w-32"><option>All Assets</option></select>
            <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-medium text-xs rounded-lg px-3 py-2 w-32"><option>All Locations</option></select>
            <div className="bg-white border border-gray-200 shadow-sm text-gray-700 font-medium text-xs rounded-lg px-3 py-2 flex items-center gap-2">
              24 Apr 2026 - 24 May 2026 <Calendar size={12}/>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50">
              <Filter size={14} /> Filters
            </button>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[9px] text-gray-400 uppercase font-bold border-b border-gray-100 bg-white tracking-wider">
                  <tr>
                    <th className="px-4 py-3">INSPECTION ID</th>
                    <th className="px-4 py-3">ASSET</th>
                    <th className="px-4 py-3">TYPE</th>
                    <th className="px-4 py-3">LOCATION</th>
                    <th className="px-4 py-3">INSPECTOR</th>
                    <th className="px-4 py-3">DATE</th>
                    <th className="px-4 py-3">STATUS</th>
                    <th className="px-4 py-3 text-center">SCORE</th>
                    <th className="px-4 py-3 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: 'INSP-2026-00432', asset: 'AHU-001', assetName: 'Air Handling Unit', type: 'Routine', loc1: 'Building A', loc2: 'Floor 1 / Lobby', insp: 'Satria W.', date: '24 Apr 2026', time: '09:30', status: 'Completed', stCol: 'bg-green-50 text-green-700 border-green-200', score: 92, scCol: 'text-green-500 border-green-500' },
                    { id: 'INSP-2026-00431', asset: 'FCU-101', assetName: 'Fan Coil Unit', type: 'Routine', loc1: 'Building A', loc2: 'Floor 1 / Room 101', insp: 'Dimas Prayoga', date: '24 Apr 2026', time: '08:45', status: 'Completed', stCol: 'bg-green-50 text-green-700 border-green-200', score: 88, scCol: 'text-green-500 border-green-500' },
                    { id: 'INSP-2026-00430', asset: 'CH-001', assetName: 'Chiller', type: 'Routine', loc1: 'Rooftop', loc2: '', insp: 'Rizky Fadilah', date: '23 Apr 2026', time: '15:00', status: 'Completed', stCol: 'bg-green-50 text-green-700 border-green-200', score: 95, scCol: 'text-green-500 border-green-500' },
                    { id: 'INSP-2026-00429', asset: 'CT-001', assetName: 'Cooling Tower', type: 'Routine', loc1: 'Rooftop', loc2: '', insp: 'Satria W.', date: '23 Apr 2026', time: '13:20', status: 'Completed', stCol: 'bg-green-50 text-green-700 border-green-200', score: 90, scCol: 'text-green-500 border-green-500' },
                    { id: 'INSP-2026-00428', asset: 'AHU-002', assetName: 'Air Handling Unit', type: 'Routine', loc1: 'Building A', loc2: 'Floor 2 / Office', insp: 'Dimas Prayoga', date: '23 Apr 2026', time: '10:30', status: 'In Progress', stCol: 'bg-blue-50 text-blue-700 border-blue-200 bg-blue-50/50', score: 65, scCol: 'text-orange-500 border-orange-500', active: true },
                    { id: 'INSP-2026-00427', asset: 'PMP-001', assetName: 'Water Pump', type: 'Routine', loc1: 'Basement', loc2: '', insp: 'Rizky Fadilah', date: '22 Apr 2026', time: '16:10', status: 'Completed', stCol: 'bg-green-50 text-green-700 border-green-200', score: 91, scCol: 'text-green-500 border-green-500' },
                    { id: 'INSP-2026-00426', asset: 'EF-001', assetName: 'Exhaust Fan', type: 'Routine', loc1: 'Basement', loc2: '', insp: 'Satria W.', date: '22 Apr 2026', time: '14:05', status: 'Overdue', stCol: 'bg-red-50 text-red-600 border-red-200', score: 45, scCol: 'text-red-500 border-red-500' },
                    { id: 'INSP-2026-00425', asset: 'FCU-102', assetName: 'Fan Coil Unit', type: 'Follow-up', loc1: 'Building A', loc2: 'Floor 1 / Room 102', insp: 'Dimas Prayoga', date: '22 Apr 2026', time: '11:40', status: 'Completed', stCol: 'bg-green-50 text-green-700 border-green-200', score: 96, scCol: 'text-green-500 border-green-500' },
                    { id: 'INSP-2026-00424', asset: 'VAV-001', assetName: 'VAV Box', type: 'Routine', loc1: 'Building B', loc2: 'Floor 3 / Office', insp: 'Rizky Fadilah', date: '21 Apr 2026', time: '09:15', status: 'Completed', stCol: 'bg-green-50 text-green-700 border-green-200', score: 89, scCol: 'text-green-500 border-green-500' },
                    { id: 'INSP-2026-00423', asset: 'CH-002', assetName: 'Chiller', type: 'Routine', loc1: 'Rooftop', loc2: '', insp: 'Satria W.', date: '20 Apr 2026', time: '15:30', status: 'Overdue', stCol: 'bg-red-50 text-red-600 border-red-200', score: 40, scCol: 'text-red-500 border-red-500' },
                  ].map((row, i) => (
                    <tr key={i} className={`hover:bg-gray-50/50 cursor-pointer ${row.active ? 'bg-blue-50/20' : ''}`}>
                      <td className="px-4 py-4 font-bold text-gray-800">{row.id}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded border border-gray-200 bg-gray-50 flex shrink-0 items-center justify-center text-[6px] text-gray-400">Img</div>
                          <div>
                            <div className="font-bold text-gray-800">{row.asset}</div>
                            <div className="text-[10px] text-gray-500">{row.assetName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{row.type}</td>
                      <td className="px-4 py-4 text-[10px] font-medium text-gray-600">
                        <div>{row.loc1}</div>
                        <div>{row.loc2}</div>
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">{row.insp}</td>
                      <td className="px-4 py-4 text-[10px] font-medium text-gray-600">
                        <div>{row.date}</div>
                        <div>{row.time}</div>
                      </td>
                      <td className="px-4 py-4"><span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${row.stCol}`}>{row.status}</span></td>
                      <td className="px-4 py-4 text-center">
                        <div className={`w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${row.scCol}`}>
                          {row.score}%
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button className="text-gray-400 hover:text-gray-800 p-1 rounded hover:bg-gray-100 border border-gray-200"><MoreHorizontal size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white text-xs text-gray-500">
              <span>Showing 1 to 100 of 342 results</span>
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">&lt;</button>
                <button className="w-6 h-6 flex items-center justify-center rounded bg-blue-600 text-white font-medium">1</button>
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium">2</button>
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium">3</button>
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium">4</button>
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium">5</button>
                <span className="px-1">...</span>
                <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium">35</button>
                <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 hover:bg-gray-50">&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col (1/3) Inspection Detail Drawer */}
        <div className="space-y-4">
          
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col p-6 h-auto sticky top-4">
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Inspection Detail</h3>
              <button className="text-gray-400 hover:text-gray-800 p-1 bg-gray-50 rounded-md border border-gray-200"><X size={16}/></button>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-800 text-sm">INSP-2026-00428</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-blue-50 text-blue-700 border-blue-200">In Progress</span>
            </div>

            <div className="flex gap-4 mb-4 bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              <div className="w-20 h-20 bg-gray-200 rounded border border-gray-200 flex items-center justify-center text-[10px] text-gray-500 font-bold shrink-0">[AHU Img]</div>
              <div className="text-sm">
                <div className="font-bold text-gray-800 text-lg">AHU-002</div>
                <div className="text-xs text-gray-500 font-medium mb-2">Air Handling Unit</div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-50 text-green-700 border border-green-200">
                  <div className="w-1 h-1 rounded-full bg-green-500 mr-1"></div> Running
                </span>
                <div className="text-[10px] text-gray-500 font-medium mt-2 flex flex-col gap-0.5">
                   <span>🏢 Building A</span>
                   <span>📍 Floor 2 / Office</span>
                </div>
              </div>
            </div>

            <a href="#" className="text-xs text-blue-600 font-bold hover:underline mb-6 block">View Asset Detail &rarr;</a>

            <div className="space-y-4 text-xs">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Inspection Type</span>
                <span className="font-bold text-gray-800">Routine</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Inspector</span>
                <span className="font-bold text-gray-800">Dimas Prayoga</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Date</span>
                <span className="font-bold text-gray-800">23 Apr 2026 10:30</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500 font-medium">Next Due</span>
                <span className="font-bold text-gray-800">23 Jul 2026</span>
              </div>
              <div className="flex justify-between pb-2 items-center">
                <span className="text-gray-500 font-medium w-1/3">Score (Current)</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="font-bold text-orange-500">65%</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full" style={{width: '65%'}}></div>
                  </div>
                  <span className="font-medium text-gray-400 text-[10px]">15%</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6">
              <h4 className="font-bold text-gray-800 mb-4 text-sm">Checklist Progress</h4>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="92.36" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="263.89" strokeDashoffset="224.3" className="origin-center rotate-[234deg]"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xl font-bold text-gray-800">13<span className="text-xs text-gray-400">/20</span></span>
                    <span className="text-[9px] font-bold text-gray-500">65%</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2 text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>Completed</span>
                    <span className="font-bold text-gray-800">13 <span className="text-gray-400 font-medium">(65%)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>In Progress</span>
                    <span className="font-bold text-gray-800">3 <span className="text-gray-400 font-medium">(15%)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>Not Started</span>
                    <span className="font-bold text-gray-800">4 <span className="text-gray-400 font-medium">(20%)</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>Failed</span>
                    <span className="font-bold text-gray-800">0 <span className="text-gray-400 font-medium">(0%)</span></span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">View Checklist</button>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-800 text-sm">Recent Photos</h4>
                <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View all</a>
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-12 bg-gray-200 rounded border border-gray-200"></div>
                <div className="w-12 h-12 bg-gray-200 rounded border border-gray-200"></div>
                <div className="w-12 h-12 bg-gray-200 rounded border border-gray-200"></div>
                <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">+8</div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-gray-800 mb-2 text-sm">Notes</h4>
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                AHU running normal. Pre-filter slightly dirty, will recommend cleaning on next service. No abnormal noise detected.
              </p>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-800 text-sm">Attachments</h4>
                <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View all</a>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-red-500" />
                    <div>
                      <div className="text-xs font-bold text-gray-700">Inspection_Form_AHU-002.pdf</div>
                      <div className="text-[9px] font-medium text-gray-400">245 KB</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400"/>
                </div>
                <div className="flex items-center justify-between p-2 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <ImageIcon size={14} className="text-blue-500" />
                    <div>
                      <div className="text-xs font-bold text-gray-700">Thermal_Image_01.jpg</div>
                      <div className="text-[9px] font-medium text-gray-400">1.2 MB</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-400"/>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3 pt-6 border-t border-gray-100">
              <button className="flex-1 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">Save Progress</button>
              <button className="flex-[2] py-2.5 bg-[#111827] rounded-lg text-xs font-bold text-white hover:bg-gray-800 shadow-sm transition-colors flex items-center justify-center gap-1.5"><Check size={14}/> Complete Inspection</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
