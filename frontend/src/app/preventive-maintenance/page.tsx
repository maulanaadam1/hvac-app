import { Calendar, Search, Filter, MoreHorizontal, Download, Plus, ChevronLeft, ChevronRight, Activity } from "lucide-react";

export default function PreventiveMaintenancePage() {
  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Preventive Maintenance</h2>
          <p className="text-sm text-gray-500 mt-1">Plan, schedule, and track all preventive maintenance activities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
            <Plus size={16} />
            Create PM Plan
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
            <Calendar size={20} />
          </div>
          <div className="text-sm font-medium text-gray-500">PM Plans</div>
          <div className="text-2xl font-bold text-gray-800">24</div>
          <div className="text-[10px] text-gray-400 mt-1">Total PM Plans</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center text-green-600 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="text-sm font-medium text-gray-500">Completed <span className="font-normal text-[10px]">(This Month)</span></div>
          <div className="text-2xl font-bold text-gray-800">156</div>
          <div className="text-[10px] font-bold text-gray-500 mt-1">76.1% <span className="font-medium text-gray-400">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded bg-orange-50 flex items-center justify-center text-orange-500 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div className="text-sm font-medium text-gray-500">Due This Month</div>
          <div className="text-2xl font-bold text-gray-800">42</div>
          <div className="text-[10px] font-bold text-gray-500 mt-1">20.5% <span className="font-medium text-gray-400">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-600 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div className="text-sm font-medium text-gray-500">Overdue</div>
          <div className="text-2xl font-bold text-gray-800 text-red-600">13</div>
          <div className="text-[10px] font-bold text-gray-500 mt-1">6.3% <span className="font-medium text-gray-400">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
            <Activity size={20} />
          </div>
          <div className="text-sm font-medium text-gray-500">Assets Covered</div>
          <div className="text-2xl font-bold text-gray-800">212</div>
          <div className="text-[10px] font-bold text-gray-500 mt-1">87% <span className="font-medium text-gray-400">of total assets</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-2">
          <a href="#" className="border-b-2 border-blue-600 text-blue-600 py-3 px-1 text-sm font-bold">PM Schedule</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">PM Plans</a>
        </nav>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col (2/3) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* PM Schedule Table */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col">
            {/* Filters */}
            <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="Search PM schedule..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"/>
              </div>
              <select className="bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg px-3 py-2 w-32"><option>All Status</option></select>
              <select className="bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg px-3 py-2 w-32"><option>All Assets</option></select>
              <select className="bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg px-3 py-2 w-32"><option>All Locations</option></select>
              <select className="bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg px-3 py-2 w-32"><option>All PM Types</option></select>
              <div className="bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-lg px-3 py-2 flex items-center gap-2 font-medium">
                24 Apr 2026 - 24 May 2026 <Calendar size={12}/>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50">
                <Filter size={14} /> Filters
              </button>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100 bg-white">
                  <tr>
                    <th className="px-4 py-3">PM ID</th>
                    <th className="px-4 py-3">PM PLAN</th>
                    <th className="px-4 py-3">ASSET</th>
                    <th className="px-4 py-3">LOCATION</th>
                    <th className="px-4 py-3">FREQUENCY</th>
                    <th className="px-4 py-3">NEXT DUE</th>
                    <th className="px-4 py-3">STATUS</th>
                    <th className="px-4 py-3">COMPLIANCE</th>
                    <th className="px-4 py-3">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: '1', pmId: 'PM-PLN-00024', plan: 'AHU Monthly Service', asset: 'AHU-001', loc: 'Building A / Floor 1 / Lobby', freq: 'Monthly', due: '24 Apr 2026', dueSub: 'Today', status: 'Due Today', stCol: 'bg-orange-50 text-orange-600 border-orange-200', comp: 100 },
                    { id: '2', pmId: 'PM-PLN-00017', plan: 'Filter Replacement', asset: 'AHU-002', loc: 'Building A / Floor 2 / Office', freq: 'Monthly', due: '25 Apr 2026', dueSub: 'Tomorrow', status: 'Scheduled', stCol: 'bg-blue-50 text-blue-600 border-blue-200', comp: 100 },
                    { id: '3', pmId: 'PM-PLN-00008', plan: 'Cooling Coil Cleaning', asset: 'FCU-101', loc: 'Building A / Floor 1 / Room 101', freq: 'Quarterly', due: '28 Apr 2026', dueSub: 'in 4 days', status: 'Scheduled', stCol: 'bg-blue-50 text-blue-600 border-blue-200', comp: 75 },
                    { id: '4', pmId: 'PM-PLN-00009', plan: 'Fan & Motor Inspection', asset: 'FCU-102', loc: 'Building A / Floor 1 / Room 102', freq: 'Quarterly', due: '28 Apr 2026', dueSub: 'in 4 days', status: 'Scheduled', stCol: 'bg-blue-50 text-blue-600 border-blue-200', comp: 75 },
                    { id: '5', pmId: 'PM-PLN-00011', plan: 'Chiller Inspection', asset: 'CH-001', loc: 'Rooftop', freq: 'Monthly', due: '01 May 2026', dueSub: 'in 7 days', status: 'Scheduled', stCol: 'bg-blue-50 text-blue-600 border-blue-200', comp: 100 },
                    { id: '6', pmId: 'PM-PLN-00012', plan: 'Cooling Tower Service', asset: 'CT-001', loc: 'Rooftop', freq: 'Monthly', due: '02 May 2026', dueSub: 'in 8 days', status: 'Scheduled', stCol: 'bg-blue-50 text-blue-600 border-blue-200', comp: 100 },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-semibold text-gray-500">{row.id}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-500">{row.pmId}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{row.plan}</td>
                      <td className="px-4 py-3 font-semibold text-gray-700">{row.asset}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 font-medium">{row.loc}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-700">{row.freq}</td>
                      <td className="px-4 py-3">
                        <div className={`font-semibold text-xs ${row.dueSub === 'Today' ? 'text-orange-500' : 'text-gray-800'}`}>{row.due}</div>
                        <div className={`text-[10px] font-bold ${row.dueSub === 'Today' ? 'text-orange-500' : 'text-gray-400'}`}>{row.dueSub}</div>
                      </td>
                      <td className="px-4 py-3"><span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${row.stCol}`}>{row.status}</span></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gray-700 w-6">{row.comp}%</span>
                          <div className="w-12 bg-gray-100 rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: `${row.comp}%`}}></div></div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-gray-400 hover:text-gray-800 p-1 rounded hover:bg-gray-100"><MoreHorizontal size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white text-sm">
              <span className="text-gray-500">Showing 1 to 6 of 24 results</span>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">&lt;</button>
                <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white font-medium text-xs">1</button>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium text-xs">2</button>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium text-xs">3</button>
                <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium text-xs">4</button>
                <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">&gt;</button>
              </div>
            </div>
          </div>

          {/* PM Calendar & Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">PM Calendar <ChevronLeft size={16} className="text-gray-400 ml-2"/><ChevronRight size={16} className="text-gray-400"/><span className="text-sm font-semibold text-gray-600">April 2026</span></h3>
                <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs font-semibold">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md shadow-sm">Month</button>
                  <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700">Week</button>
                  <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700">List</button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-2">
                <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-sm font-semibold">
                {/* Mockup calendar grid */}
                <div className="p-2 border border-transparent text-gray-300">30</div>
                <div className="p-2 border border-transparent text-gray-300">31</div>
                {[...Array(26)].map((_, i) => (
                  <div key={i} className="p-2 border border-transparent text-gray-700">{i+1}</div>
                ))}
                <div className="p-2 border border-gray-200 bg-gray-50 text-gray-800 relative">
                  24
                  <div className="absolute top-7 left-1 right-1 text-[8px] bg-orange-100 text-orange-700 rounded px-1 py-0.5 truncate text-center">AHU-001</div>
                </div>
                <div className="p-2 border border-transparent text-gray-700 relative">
                  25
                  <div className="absolute top-7 left-1 right-1 text-[8px] bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate text-center">AHU-002</div>
                </div>
                <div className="p-2 border border-transparent text-gray-700">26</div>
                <div className="p-2 border border-transparent text-gray-700">27</div>
                <div className="p-2 border border-transparent text-gray-700 relative">
                  28
                  <div className="absolute top-7 left-1 right-1 text-[8px] bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate text-center">FCU-101</div>
                </div>
                <div className="p-2 border border-transparent text-gray-700">29</div>
                <div className="p-2 border border-transparent text-gray-700">30</div>
                <div className="p-2 border border-transparent text-gray-300 relative">
                  1
                  <div className="absolute top-7 left-1 right-1 text-[8px] bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate text-center">CH-001</div>
                </div>
                <div className="p-2 border border-transparent text-gray-300 relative">
                  2
                  <div className="absolute top-7 left-1 right-1 text-[8px] bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate text-center">CT-001</div>
                </div>
                <div className="p-2 border border-transparent text-gray-300">3</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">PM Plans</h3>
                <a href="#" className="text-xs text-blue-600 font-bold hover:underline">View all</a>
              </div>
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100">
                  <tr>
                    <th className="pb-3">PLAN ID</th>
                    <th className="pb-3">PM PLAN</th>
                    <th className="pb-3 text-center">ASSETS</th>
                    <th className="pb-3">FREQUENCY</th>
                    <th className="pb-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { id: 'PM-PLN-00024', name: 'AHU Monthly Service', assets: 8, freq: 'Monthly', status: 'Active' },
                    { id: 'PM-PLN-00017', name: 'Filter Replacement', assets: 6, freq: 'Monthly', status: 'Active' },
                    { id: 'PM-PLN-00008', name: 'Cooling Coil Cleaning', assets: 32, freq: 'Quarterly', status: 'Active' },
                    { id: 'PM-PLN-00009', name: 'Fan & Motor Inspection', assets: 32, freq: 'Quarterly', status: 'Active' },
                    { id: 'PM-PLN-00011', name: 'Chiller Inspection', assets: 4, freq: 'Monthly', status: 'Active' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-3 font-medium text-gray-500">{row.id}</td>
                      <td className="py-3 font-semibold text-gray-800">{row.name}</td>
                      <td className="py-3 font-bold text-gray-600 text-center">{row.assets}</td>
                      <td className="py-3 font-medium text-gray-600">{row.freq}</td>
                      <td className="py-3"><span className="text-green-600 font-bold text-[10px]">Active</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a href="#" className="text-xs text-blue-600 font-bold flex items-center gap-1">View all PM Plans <ChevronRight size={14}/></a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col (Span 1) */}
        <div className="space-y-6">
          
          {/* Upcoming PM */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 text-lg">Upcoming PM</h3>
              <a href="#" className="text-xs text-blue-600 font-bold hover:underline">View all</a>
            </div>
            <div className="space-y-4">
              {[
                { asset: 'AHU-001', name: 'AHU Monthly Service', date: '24 Apr 2026', due: 'Due Today', dueCol: 'text-orange-600 bg-orange-50 border-orange-200' },
                { asset: 'AHU-002', name: 'Filter Replacement', date: '25 Apr 2026', due: 'Tomorrow', dueCol: 'text-orange-500 font-bold' },
                { asset: 'FCU-101', name: 'Cooling Coil Cleaning', date: '28 Apr 2026', due: 'in 4 days', dueCol: 'text-blue-500 font-bold' },
                { asset: 'CH-001', name: 'Chiller Inspection', date: '01 May 2026', due: 'in 7 days', dueCol: 'text-blue-500 font-bold' },
                { asset: 'CT-001', name: 'Cooling Tower Service', date: '02 May 2026', due: 'in 8 days', dueCol: 'text-blue-500 font-bold' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg bg-gray-50/50">
                  <div className="w-12 h-12 bg-gray-200 rounded shrink-0 flex items-center justify-center text-[8px] text-gray-500">Img</div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-gray-800">{item.asset}</div>
                    <div className="text-[10px] text-gray-500 font-medium">{item.name}</div>
                    <div className="flex justify-between items-center mt-1">
                      <div className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={10}/> {item.date}</div>
                      <div className={`text-[10px] px-1.5 py-0.5 rounded border border-transparent ${item.dueCol}`}>{item.due}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PM Compliance */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-2">PM Compliance <span className="text-[10px] text-gray-500 font-normal">(This Month)</span></h3>
            <div className="flex items-center gap-6 mt-6">
              <div className="relative w-32 h-32 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1d4ed8" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="60" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="120" className="origin-center rotate-[45deg]"/>
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="230" className="origin-center rotate-[240deg]"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">76%</span>
                  <span className="text-[10px] text-gray-500 font-medium">Compliance</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-gray-600"><div className="w-2 h-2 rounded-full bg-green-500"></div>Completed</div>
                  <div className="font-bold text-gray-800 text-sm">156 <span className="text-[10px] text-gray-400 font-normal">(76%)</span></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-gray-600"><div className="w-2 h-2 rounded-full bg-blue-600"></div>Scheduled</div>
                  <div className="font-bold text-gray-800 text-sm">42 <span className="text-[10px] text-gray-400 font-normal">(20%)</span></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-medium text-gray-600"><div className="w-2 h-2 rounded-full bg-red-500"></div>Overdue</div>
                  <div className="font-bold text-gray-800 text-sm">13 <span className="text-[10px] text-gray-400 font-normal">(6%)</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* PM Overview */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-8">PM Overview <span className="text-[10px] text-gray-500 font-normal">(This Month)</span></h3>
            
            <div className="h-40 flex items-end justify-between px-6 pb-2 border-b border-gray-100 relative">
              <div className="absolute -left-2 bottom-0 text-[10px] text-gray-400">0</div>
              <div className="absolute -left-2 bottom-1/2 text-[10px] text-gray-400">100</div>
              <div className="absolute -left-2 top-0 text-[10px] text-gray-400">200</div>
              
              <div className="flex flex-col items-center gap-2 w-16">
                <span className="text-xs font-bold text-gray-800">156</span>
                <div className="w-full bg-green-500 rounded-t-md" style={{height: '75%'}}></div>
              </div>
              <div className="flex flex-col items-center gap-2 w-16">
                <span className="text-xs font-bold text-gray-800">42</span>
                <div className="w-full bg-blue-500 rounded-t-md" style={{height: '30%'}}></div>
              </div>
              <div className="flex flex-col items-center gap-2 w-16">
                <span className="text-xs font-bold text-gray-800">13</span>
                <div className="w-full bg-red-500 rounded-t-md" style={{height: '10%'}}></div>
              </div>
            </div>
            <div className="flex justify-between px-6 mt-3 text-xs font-semibold text-gray-500">
              <span className="w-16 text-center">Completed</span>
              <span className="w-16 text-center">Scheduled</span>
              <span className="w-16 text-center">Overdue</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
