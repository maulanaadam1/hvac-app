import { ArrowLeft, Edit, MoreVertical, History, Thermometer, Wind, Zap, Droplets, Activity, ChevronRight, Settings2, Box } from "lucide-react";
import Link from "next/link";

export default function AssetDetailPage({ params }: { params: { id: string } }) {
  const asset = {
    id: params.id, // "AHU-001"
    name: "Air Handling Unit",
    status: "Running",
  };

  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      {/* Breadcrumb & Actions */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/assets" className="hover:text-gray-800">Assets</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">{params.id}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold tracking-tight text-gray-800">{params.id}</h2>
              <span className="inline-flex items-center px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                {asset.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{asset.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <Edit size={16} />
              Edit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              <History size={16} />
              History
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
          <a href="#" className="border-b-2 border-blue-600 text-blue-600 py-3 px-1 text-sm font-bold">Overview</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Specifications</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Components</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Documents</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Maintenance</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Metrics</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">Alarms</a>
          <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-sm font-semibold">History</a>
        </nav>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Left Col & Mid Col (Span 2) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Asset Info Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/3 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100 p-4 min-h-[200px]">
                <div className="text-gray-400 font-bold text-sm">[AHU Image 3D Render]</div>
              </div>
              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Asset ID</div>
                    <div className="font-bold text-gray-800">AHU-001</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Equipment Type</div>
                    <div className="font-bold text-gray-800">Air Handling Unit</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Manufacturer</div>
                    <div className="font-bold text-gray-800">Daikin</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Model</div>
                    <div className="font-bold text-gray-800">D-AHU-20</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Serial Number</div>
                    <div className="font-bold text-gray-800">DAIKIN-20-001</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Installation Date</div>
                    <div className="font-bold text-gray-800">10 May 2024</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Location</div>
                    <div className="font-bold text-gray-800">Building A / Floor 1 / Lobby</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Status</div>
                    <div><span className="inline-flex items-center text-[11px] font-bold text-green-600"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div> Running</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Criticality</div>
                    <div><span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600">High</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="font-medium text-gray-500">Warranty Until</div>
                    <div className="font-bold text-gray-800">10 May 2027</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Temperature Trend */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 text-lg">Live Temperature Trend</h3>
              <select className="text-xs bg-gray-50 border border-gray-200 rounded-md p-1.5 text-gray-600 focus:outline-none">
                <option>Last 24 Hours</option>
              </select>
            </div>
            
            {/* Chart Mockup */}
            <div className="relative h-48 w-full border-b border-l border-gray-200 pl-4 pb-2 mb-2">
              <div className="absolute -left-6 bottom-0 text-[10px] text-gray-400">0</div>
              <div className="absolute -left-6 bottom-1/2 text-[10px] text-gray-400">20</div>
              <div className="absolute -left-6 top-0 text-[10px] text-gray-400">40</div>
              <div className="absolute -left-6 -top-2 text-[10px] text-gray-400">°C</div>
              
              {/* Fake lines */}
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,50 Q10,48 20,50 T40,51 T60,49 T80,50 T100,48" fill="none" stroke="#2563eb" strokeWidth="1.5" />
                <path d="M0,60 Q10,58 20,60 T40,61 T60,59 T80,60 T100,58" fill="none" stroke="#22c55e" strokeWidth="1.5" />
              </svg>

              {/* Legend overlay */}
              <div className="absolute top-0 right-4 flex gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div>Supply Air Temp</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>Return Air Temp</div>
              </div>

              {/* Tooltip mockup */}
              <div className="absolute left-[30%] top-[20%] bg-white border border-gray-200 shadow-lg rounded-lg p-3 text-xs z-10 w-40">
                <div className="text-gray-400 mb-2 font-medium">Today, 01:30 AM</div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>Supply Air Temp</div>
                  <div className="font-bold text-gray-800">13.8 °C</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 font-semibold text-gray-700"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>Return Air Temp</div>
                  <div className="font-bold text-gray-800">18.1 °C</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 ml-4">
              <span>09:30</span><span>13:30</span><span>17:30</span><span>21:30</span><span>01:30</span><span>05:30</span><span>09:30</span>
            </div>
          </div>

          {/* Recent Work Orders */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">Recent Work Orders</h3>
              <a href="#" className="text-xs text-blue-600 font-bold hover:underline">View all</a>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100">
                <tr>
                  <th className="pb-3">WO ID</th>
                  <th className="pb-3">TITLE</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3">ASSIGNED TO</th>
                  <th className="pb-3">DUE DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { id: 'WO-2026-00124', title: 'Filter Replacement', status: 'In Progress', stCol: 'bg-blue-100 text-blue-700', user: 'Dimas Prayoga', due: 'Today 14:30' },
                  { id: 'WO-2026-00123', title: 'High Pressure Alarm', status: 'Assigned', stCol: 'bg-orange-100 text-orange-700', user: 'Rizky Fadilah', due: 'Today 16:00' },
                  { id: 'WO-2026-00122', title: 'Water Leak', status: 'Assigned', stCol: 'bg-orange-100 text-orange-700', user: 'Satria W.', due: 'Tomorrow 09:00' },
                  { id: 'WO-2026-00121', title: 'Noise on Fan', status: 'Open', stCol: 'bg-gray-100 text-gray-600', user: '-', due: 'Tomorrow 11:00' },
                ].map((row) => (
                  <tr key={row.id}>
                    <td className="py-3 font-bold text-gray-800">{row.id}</td>
                    <td className="py-3 font-semibold text-gray-600">{row.title}</td>
                    <td className="py-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.stCol}`}>{row.status}</span></td>
                    <td className="py-3 font-semibold text-gray-700">{row.user}</td>
                    <td className="py-3 text-gray-500 font-medium text-xs">{row.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col (Span 1) */}
        <div className="space-y-6">
          
          {/* Current Status */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Current Status</h3>
                <p className="text-[10px] text-gray-500 font-medium mt-1">Today, 09:30 AM</p>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-bold border border-green-200">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div> Running
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2"><Thermometer size={14} className="text-blue-500"/> Supply Air Temp</div>
                <div className="text-xl font-bold text-gray-800">14.2 <span className="text-[10px] font-semibold">°C</span></div>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2"><Thermometer size={14} className="text-green-500"/> Return Air Temp</div>
                <div className="text-xl font-bold text-gray-800 flex items-center justify-between">
                  <span>18.4 <span className="text-[10px] font-semibold">°C</span></span>
                  <div className="w-1 h-3 bg-green-400 rounded-full rotate-45"></div>
                </div>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2"><Wind size={14} className="text-blue-400"/> Air Flow</div>
                <div className="text-xl font-bold text-gray-800">8,200 <span className="text-[10px] font-semibold">CFM</span></div>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2"><Activity size={14} className="text-orange-400"/> Static Pressure</div>
                <div className="text-xl font-bold text-gray-800">450 <span className="text-[10px] font-semibold">Pa</span></div>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2"><Droplets size={14} className="text-purple-500"/> Humidity</div>
                <div className="text-xl font-bold text-gray-800">56 <span className="text-[10px] font-semibold">%RH</span></div>
              </div>
              <div className="border border-gray-100 bg-gray-50/50 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2"><Settings2 size={14} className="text-green-600"/> Filter Status</div>
                <div className="text-sm font-bold text-green-600 mt-1">Good</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-2">
                <div className="text-xl font-bold text-gray-800"><Zap size={14} className="inline text-gray-400 mr-1"/>Power</div>
                <div className="text-2xl font-bold text-gray-800">12.4 <span className="text-xs font-semibold text-gray-500">kW</span></div>
              </div>
              <div className="flex items-center gap-1 h-2">
                <div className="h-full bg-blue-600 rounded-l-full w-[65%]"></div>
                <div className="h-full bg-green-500 w-[20%]"></div>
                <div className="h-full bg-gray-200 rounded-r-full w-[15%]"></div>
              </div>
              <div className="text-[10px] font-bold text-gray-400 mt-1">65%</div>
            </div>
          </div>

          {/* Quick Information */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-6 text-lg">Quick Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 font-medium"><Box size={14}/> AHU Type</div>
                <div className="font-semibold text-gray-800">Double Skin</div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 font-medium"><Wind size={14}/> Air Direction</div>
                <div className="font-semibold text-gray-800">Supply / Return</div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 font-medium"><Settings2 size={14}/> Fan Type</div>
                <div className="font-semibold text-gray-800">Centrifugal</div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 font-medium"><Droplets size={14}/> Cooling Coil</div>
                <div className="font-semibold text-gray-800">Chilled Water Coil</div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 font-medium"><Activity size={14}/> Heating Coil</div>
                <div className="font-semibold text-gray-800">-</div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 font-medium"><Activity size={14}/> Control System</div>
                <div className="font-semibold text-gray-800">BMS Integrated</div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2 text-gray-500 font-medium"><History size={14}/> Last Maintenance</div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">24 Apr 2026</div>
                  <div className="text-[10px] text-gray-400 font-medium mt-0.5">2 days ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Components Overview */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800 text-lg">Components Overview</h3>
              <a href="#" className="text-xs text-blue-600 font-bold hover:underline">View all</a>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Wind size={12}/> Supply Fan</span>
                  <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-green-500"></div> Running</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Wind size={12}/> Return Fan</span>
                  <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-green-500"></div> Running</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Droplets size={12}/> Cooling Coil</span>
                  <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-green-500"></div> Running</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Settings2 size={12}/> Filter</span>
                  <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-green-500"></div> Good</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Settings2 size={12}/> Damper</span>
                  <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-blue-500"></div> Open</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5"><Droplets size={12}/> Humidifier</span>
                  <span className="text-[9px] font-bold text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200 flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-gray-500"></div> Standby</span>
                </div>
              </div>
              <div className="w-24 shrink-0 flex items-center justify-center bg-gray-50 rounded border border-gray-100 text-[8px] text-gray-400">
                [Diagram]
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
