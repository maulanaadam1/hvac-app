import { ChevronRight, ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* 1. KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Total Assets */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-gray-200 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <div className="p-1.5 bg-gray-100 rounded-md"><svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div>
              Total Assets
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800">1,245</div>
            <div className="text-xs text-gray-400 mt-1">All HVAC Equipment</div>
          </div>
        </div>

        {/* Running */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-gray-200 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <div className="p-1.5 bg-green-50 rounded-md"><svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              Running
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800">1,198</div>
            <div className="text-xs mt-1 font-medium text-gray-500"><span className="text-green-500 font-bold">96.22%</span> of total assets</div>
          </div>
          {/* Sparkline mock */}
          <div className="absolute bottom-2 right-4 w-16 h-8 opacity-60">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-green-500 fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M0 25 L20 20 L40 28 L60 10 L80 15 L100 5"/></svg>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-gray-200 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <div className="p-1.5 bg-red-50 rounded-md"><svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              Breakdown
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800">12</div>
            <div className="text-xs mt-1 font-medium text-gray-500"><span className="text-red-500 font-bold">0.96%</span> of total assets</div>
          </div>
          {/* Sparkline mock */}
          <div className="absolute bottom-2 right-4 w-16 h-8 opacity-60">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-red-500 fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M0 20 L20 25 L40 15 L60 25 L80 10 L100 5"/></svg>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-gray-200 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 rounded-md"><svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>
              Maintenance
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800">35</div>
            <div className="text-xs text-gray-400 mt-1">In Progress</div>
          </div>
          {/* Sparkline mock */}
          <div className="absolute bottom-2 right-4 w-16 h-8 opacity-60">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-blue-500 fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M0 25 L20 15 L40 20 L60 10 L80 15 L100 5"/></svg>
          </div>
        </div>

        {/* PM Overdue */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-gray-200 transition-colors cursor-pointer">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <div className="p-1.5 bg-orange-50 rounded-md"><svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
              PM Overdue
            </div>
            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800">18</div>
            <div className="text-xs text-gray-400 mt-1">Require Attention</div>
          </div>
          {/* Sparkline mock */}
          <div className="absolute bottom-2 right-4 w-16 h-8 opacity-60">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-orange-500 fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M0 20 L20 28 L40 15 L60 20 L80 5 L100 10"/></svg>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: Equipment Health, Work Orders, Alarms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Equipment Health */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Equipment Health</h3>
            <select className="text-xs bg-gray-50 border-gray-200 rounded p-1 text-gray-600 focus:outline-none">
              <option>This Month</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            {/* Donut Chart Mockup */}
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="20" className="transition-all duration-1000" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="240" className="transition-all duration-1000 origin-center rotate-[90deg]" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="246" className="transition-all duration-1000 origin-center rotate-[105deg]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">92%</span>
                <span className="text-xs text-gray-500 font-medium">Healthy</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex-1 ml-6 space-y-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="font-medium text-gray-700">Running</span></div>
                <div className="text-gray-500 font-semibold">1,198 <span className="text-gray-400 font-normal">(96.22%)</span></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div><span className="font-medium text-gray-700">Warning</span></div>
                <div className="text-gray-500 font-semibold">25 <span className="text-gray-400 font-normal">(2.01%)</span></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="font-medium text-gray-700">Critical</span></div>
                <div className="text-gray-500 font-semibold">12 <span className="text-gray-400 font-normal">(0.96%)</span></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-400"></div><span className="font-medium text-gray-700">Offline</span></div>
                <div className="text-gray-500 font-semibold">10 <span className="text-gray-400 font-normal">(0.81%)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Work Orders */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Active Work Orders</h3>
            <a href="#" className="text-xs text-blue-500 font-medium hover:underline">View all</a>
          </div>
          <div className="space-y-4 h-48 overflow-y-auto custom-scrollbar pr-2">
            {[
              { id: 'WO-2026-00124', status: 'In Progress', statusColor: 'bg-blue-100 text-blue-700', task: 'AHU-001 - Filter Replacement', tech: 'Dimas Prayoga', due: 'Today 14:30' },
              { id: 'WO-2026-00123', status: 'Assigned', statusColor: 'bg-orange-100 text-orange-700', task: 'CH-001 - High Pressure Alarm', tech: 'Rizky Fadilah', due: 'Today 16:00' },
              { id: 'WO-2026-00122', status: 'Assigned', statusColor: 'bg-orange-100 text-orange-700', task: 'FCU-205 - Water Leak', tech: 'Satria W.', due: 'Tomorrow 09:00' },
              { id: 'WO-2026-00121', status: 'Open', statusColor: 'bg-gray-100 text-gray-700', task: 'AHU-002 - Noise on Fan', tech: '-', due: 'Tomorrow 11:00' }
            ].map((wo, i) => (
              <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-800">{wo.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${wo.statusColor}`}>{wo.status}</span>
                  </div>
                  <div className="text-xs text-gray-500">{wo.task}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Technician</div>
                  <div className="text-xs font-medium text-gray-700">{wo.tech}</div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Due</div>
                  <div className="text-xs font-medium text-gray-700">{wo.due}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alarms Summary */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-1">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Alarms Summary</h3>
            <a href="#" className="text-xs text-blue-500 font-medium hover:underline">View all</a>
          </div>
          <div className="flex items-center justify-between">
            {/* Donut Chart Mockup */}
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="220" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="120" className="origin-center rotate-[45deg]" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#9ca3af" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="150" className="origin-center rotate-[190deg]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">35</span>
                <span className="text-xs text-gray-500 font-medium">Total Alarms</span>
              </div>
            </div>
            {/* Legend */}
            <div className="flex-1 ml-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-3xl font-bold text-gray-800">5</span></div>
              </div>
              <div className="text-xs text-gray-500 font-medium -mt-2 ml-4">Critical</div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div><span className="text-xl font-bold text-gray-800">17</span></div>
              </div>
              <div className="text-xs text-gray-500 font-medium -mt-1 ml-4">Warning</div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-400"></div><span className="text-xl font-bold text-gray-800">13</span></div>
              </div>
              <div className="text-xs text-gray-500 font-medium -mt-1 ml-4">Normal</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Third Row: System Overview and Energy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* System Overview */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-2 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="font-bold text-gray-800">System Overview</h3>
            <a href="#" className="text-xs text-blue-500 font-medium hover:underline">View all systems</a>
          </div>
          
          <div className="flex justify-between items-center pt-8 pb-4 relative z-10 px-8">
            {/* Very abstract representation matching the graphic */}
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-gray-800">CHILLER</div>
              <div className="text-[10px] text-gray-500">2 Units</div>
              <div className="text-xs text-green-500 font-semibold flex items-center justify-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>Running</div>
            </div>

            <div className="w-24 h-24 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-400">
               [Chiller 3D]
            </div>

            <div className="flex-1 border-t-2 border-dashed border-green-300 mx-4 relative top-[-20px]"></div>

            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-gray-800">AHU</div>
              <div className="text-[10px] text-gray-500">8 Units</div>
              <div className="text-xs text-green-500 font-semibold flex items-center justify-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>6 Running</div>
              <div className="text-xs text-orange-500 font-semibold flex items-center justify-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>2 Warning</div>
            </div>

            <div className="w-32 h-24 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-400">
               [AHU 3D]
            </div>

            <div className="flex-1 border-t-2 border-dashed border-green-300 mx-4 relative top-[-20px]"></div>

            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-gray-800">FCU</div>
              <div className="text-[10px] text-gray-500">32 Units</div>
              <div className="text-xs text-green-500 font-semibold flex items-center justify-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>28 Running</div>
              <div className="text-xs text-orange-500 font-semibold flex items-center justify-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>4 Warning</div>
            </div>
            
             <div className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-400">
               [FCU 3D]
            </div>
          </div>
        </div>

        {/* Energy Consumption */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-800">Energy Consumption</h3>
            <select className="text-xs bg-gray-50 border-gray-200 rounded p-1 text-gray-600 focus:outline-none">
              <option>This Month</option>
            </select>
          </div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-3xl font-bold text-gray-800">245,620 <span className="text-sm font-normal text-gray-500">kWh</span></div>
              <div className="text-xs text-gray-400">Total Consumption</div>
            </div>
            <div className="text-xs font-bold text-green-500 flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
              <ArrowDown size={12} /> 8.4% <span className="text-gray-500 font-normal">vs last month</span>
            </div>
          </div>

          {/* Bar Chart Mockup */}
          <div className="h-32 flex items-end justify-between gap-1 mt-4 border-b border-l border-gray-200 pl-2 pb-1 relative">
            <div className="absolute -left-6 bottom-0 text-[10px] text-gray-400">0</div>
            <div className="absolute -left-6 bottom-1/3 text-[10px] text-gray-400">10k</div>
            <div className="absolute -left-6 bottom-2/3 text-[10px] text-gray-400">20k</div>
            <div className="absolute -left-6 top-0 text-[10px] text-gray-400">30k</div>
            
            {/* Generate random-looking bars */}
            {[...Array(30)].map((_, i) => {
              const height = 20 + Math.random() * 60;
              return (
                <div key={i} className="w-full bg-blue-400 hover:bg-blue-500 rounded-t-sm transition-colors" style={{ height: `${height}%` }}></div>
              )
            })}
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-gray-400 px-2">
            <span>01</span><span>05</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30</span>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Recent Activity & PM Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-12">
        {/* Recent Activity */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-2">
          <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-gray-400 uppercase font-semibold border-b border-gray-100">
                <tr>
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Activity</th>
                  <th className="pb-2">Asset</th>
                  <th className="pb-2">Performed By</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  { time: '10:24', activity: 'Work Order Completed', asset: 'WO-2026-00120 - FCU-101 Repair', perf: 'Satria W.', status: 'Completed', statusCol: 'bg-green-100 text-green-700' },
                  { time: '09:15', activity: 'PM Performed', asset: 'AHU-003 - Monthly Inspection', perf: 'Dimas Prayoga', status: 'Completed', statusCol: 'bg-green-100 text-green-700' },
                  { time: '08:40', activity: 'Spare Part Issued', asset: 'Filter 20x20x2', perf: 'Rizky Fadilah', status: 'Issued', statusCol: 'bg-blue-100 text-blue-700' },
                  { time: '08:10', activity: 'Alarm Triggered', actCol: 'text-red-500', asset: 'CH-001 - High Pressure', perf: 'System', status: 'Critical', statusCol: 'bg-red-100 text-red-700' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                    <td className="py-3 font-medium text-xs text-gray-500">{row.time}</td>
                    <td className={`py-3 font-medium ${row.actCol || 'text-gray-800'}`}>{row.activity}</td>
                    <td className="py-3 text-xs text-gray-500">{row.asset}</td>
                    <td className="py-3 text-xs font-medium">{row.perf}</td>
                    <td className="py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${row.statusCol}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PM Compliance */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">PM Compliance</h3>
            <select className="text-xs bg-gray-50 border-gray-200 rounded p-1 text-gray-600 focus:outline-none">
              <option>This Month</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Donut Chart Mockup */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="40" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="220" className="origin-center rotate-[290deg]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">84%</span>
                <span className="text-[10px] text-gray-500 font-medium">Compliance</span>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex-1 ml-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div><span className="font-medium text-gray-700">Completed</span></div>
                <div className="text-gray-800 font-bold">156</div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div><span className="font-medium text-gray-700">Pending</span></div>
                <div className="text-gray-800 font-bold">24</div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="font-medium text-gray-700">Overdue</span></div>
                <div className="text-gray-800 font-bold">20</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
