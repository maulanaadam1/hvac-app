import { Settings, Building2, MapPin, Bell, Link as LinkIcon, Wrench, Package, ShieldCheck, DatabaseBackup, FileText, Monitor, ChevronRight, Edit, UploadCloud, Clock, Calendar, Globe, DollarSign, List, LogOut, AlertTriangle, CheckCircle2, ChevronDown, Save, RefreshCw, Cloud } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/settings" className="hover:text-gray-800">Settings</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">General</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Configure system preferences and application settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* Left Col (3/12) Settings Menu */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl py-4">
            <div className="px-4 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Settings Menu</div>
            <nav className="space-y-1 px-2">
              
              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>
                <Settings size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold">General</div>
                  <div className="text-[10px] text-blue-500 font-medium">System name, logo, and basic settings</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Building2 size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Organization</div>
                  <div className="text-[10px] text-gray-400 font-medium">Manage organization and sites</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Locations</div>
                  <div className="text-[10px] text-gray-400 font-medium">Buildings, floors, and locations</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Bell size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Notifications</div>
                  <div className="text-[10px] text-gray-400 font-medium">Email, in-app, and system alerts</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <LinkIcon size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Integrations</div>
                  <div className="text-[10px] text-gray-400 font-medium">IoT, API, and third-party integrations</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Wrench size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Maintenance</div>
                  <div className="text-[10px] text-gray-400 font-medium">Work order, PM, and checklist settings</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Package size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Inventory</div>
                  <div className="text-[10px] text-gray-400 font-medium">Stock, parts, and warehouse settings</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Security</div>
                  <div className="text-[10px] text-gray-400 font-medium">Authentication and security policies</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <DatabaseBackup size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Backup & Restore</div>
                  <div className="text-[10px] text-gray-400 font-medium">Database backup and restore</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <FileText size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">Audit Logs</div>
                  <div className="text-[10px] text-gray-400 font-medium">System activity and audit logs</div>
                </div>
              </a>

              <a href="#" className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Monitor size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-gray-700">System</div>
                  <div className="text-[10px] text-gray-400 font-medium">System info and advanced settings</div>
                </div>
              </a>

            </nav>
          </div>
        </div>

        {/* Middle Col (6/12) General Settings */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
            
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">General Settings</h3>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
                <Edit size={14}/> Edit Settings
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><Settings size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">System Name</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">The name of your HVAC management system.</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-800 sm:w-1/2">
                  HVAC Management System
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><UploadCloud size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">System Logo</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Upload or update your system logo.</div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:w-1/2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                      {/* Logo placeholder */}
                      <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45"></div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">logo_hvac.png</div>
                      <div className="text-[10px] text-gray-400 font-medium">PNG • 256 x 256</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 border border-gray-200 rounded text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">Change</button>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><Clock size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Timezone</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set the default timezone for the system.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  (UTC+07:00) Asia/Jakarta <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><Calendar size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Date Format</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set the default date format.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  DD MMM YYYY (24 Apr 2026) <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><Clock size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Time Format</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set the default time format.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  24-Hour (14:30) <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><Globe size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Language</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set the system default language.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  English <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><DollarSign size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Currency</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set the default currency for the system.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  IDR (Indonesian Rupiah) <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><Settings size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Unit System</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set preferred unit system for measurements.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  Metric (°C, kW, m³/h, kPa) <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><List size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Items Per Page</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set the default number of items per page.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  20 <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><Calendar size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Week Starts On</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Set the first day of the week.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  Monday <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-50">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><LogOut size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Automatic Logout</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Automatically logout inactive users.</div>
                  </div>
                </div>
                <div className="sm:w-1/2 flex items-center justify-between text-sm font-medium text-gray-800">
                  30 Minutes <ChevronDown size={14} className="text-gray-400"/>
                </div>
              </div>

              {/* Setting Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div className="flex gap-3">
                  <div className="text-gray-400 mt-0.5"><AlertTriangle size={18}/></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Maintenance Mode</div>
                    <div className="text-[11px] text-gray-500 font-medium mt-0.5">Enable maintenance mode (system access limited).</div>
                  </div>
                </div>
                <div className="sm:w-1/2">
                  <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 bottom-1 w-3 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
                Reset to Default
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors">
                Save Changes
              </button>
            </div>
            
          </div>
        </div>

        {/* Right Col (3/12) System Info Widgets */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* System Information */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">System Information</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Version</span>
                <span className="font-bold text-gray-800">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Environment</span>
                <span className="font-bold text-gray-800">Production</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Database</span>
                <span className="font-bold text-gray-800">PostgreSQL 15.2</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Backend</span>
                <span className="font-bold text-gray-800">FastAPI 0.110.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Frontend</span>
                <span className="font-bold text-gray-800">Next.js 14.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Server Time</span>
                <span className="font-bold text-gray-800">24 Apr 2026 14:30:25</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-500">Uptime</span>
                <span className="font-bold text-green-700 bg-green-50 border border-green-100 px-1.5 py-0.5 rounded text-[10px]">15d 6h 24m</span>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-sm">System Status</h3>
              <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View details</a>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="font-bold text-gray-800">Database</span>
                </div>
                <span className="font-medium text-gray-500">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="font-bold text-gray-800">API Server</span>
                </div>
                <span className="font-medium text-gray-500">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="font-bold text-gray-800">Web Application</span>
                </div>
                <span className="font-medium text-gray-500">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="font-bold text-gray-800">Background Workers</span>
                </div>
                <span className="font-medium text-gray-500">Healthy</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="font-bold text-gray-800">IoT Gateway</span>
                </div>
                <span className="font-medium text-gray-500">Healthy</span>
              </div>
            </div>
          </div>

          {/* Storage Usage */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-sm">Storage Usage</h3>
              <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View details</a>
            </div>
            
            <div className="mb-4 text-xs">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="font-medium text-gray-500 mb-0.5">Total Used</div>
                  <div className="font-bold text-gray-800"><span className="text-sm">128.45 GB</span> / 500 GB</div>
                </div>
                <div className="font-bold text-gray-500">25.7%</div>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-600" style={{width: '60%'}}></div>
                <div className="h-full bg-green-500" style={{width: '30%'}}></div>
                <div className="h-full bg-orange-400" style={{width: '8%'}}></div>
                <div className="h-full bg-red-500" style={{width: '2%'}}></div>
              </div>
            </div>

            <div className="space-y-2 text-[10px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span className="font-bold text-gray-700">Database</span>
                </div>
                <span className="font-medium text-gray-500">62.45 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="font-bold text-gray-700">Files & Attachments</span>
                </div>
                <span className="font-medium text-gray-500">45.20 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  <span className="font-bold text-gray-700">Logs</span>
                </div>
                <span className="font-medium text-gray-500">10.80 GB</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span className="font-bold text-gray-700">Others</span>
                </div>
                <span className="font-medium text-gray-500">10.00 GB</span>
              </div>
            </div>
          </div>

          {/* Backup */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800 text-sm">Backup</h3>
              <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View all backups</a>
            </div>
            
            <div className="space-y-3 text-xs mb-4">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Last Backup</span>
                <span className="font-bold text-gray-800">24 Apr 2026 02:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Next Backup</span>
                <span className="font-bold text-gray-800">25 Apr 2026 02:00</span>
              </div>
            </div>

            <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
              <Cloud size={14} /> Backup Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
