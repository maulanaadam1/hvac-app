"use client";

import { useState, useEffect } from "react";
import { Settings, Building2, MapPin, Bell, Link as LinkIcon, Wrench, Package, ShieldCheck, DatabaseBackup, FileText, Monitor, ChevronRight, Edit, UploadCloud, Clock, Calendar, Globe, DollarSign, List, LogOut, AlertTriangle, CheckCircle2, ChevronDown, Save, RefreshCw, Cloud, Activity } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    system_name: "HVAC Management System",
    system_logo: "",
    timezone: "Asia/Jakarta",
    date_format: "DD MMM YYYY",
    time_format: "24-Hour",
    language: "English",
    currency: "IDR",
    unit_system: "Metric",
    items_per_page: 20,
    week_starts_on: "Monday",
    automatic_logout: 30,
    maintenance_mode: false
  });
  const [editForm, setEditForm] = useState({...settings});

  useEffect(() => {
    // Fetch general settings on mount
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/settings/general`)
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        setEditForm(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (activeTab === "audit") {
      setIsLoadingLogs(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/activities/all`)
        .then(res => res.json())
        .then(data => {
          setAuditLogs(Array.isArray(data) ? data : []);
          setIsLoadingLogs(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoadingLogs(false);
        });
    }
  }, [activeTab]);

  const handleEdit = () => {
    setEditForm({...settings});
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/settings/general`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setSettings(editForm);
        setIsEditing(false);
      } else {
        alert("Failed to save settings");
      }
    } catch (e) {
      alert("Network error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        alert("File size exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({...editForm, system_logo: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

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
              
              <button onClick={() => setActiveTab("general")} className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors relative ${activeTab === "general" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                {activeTab === "general" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>}
                <Settings size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className={`text-sm font-bold ${activeTab === "general" ? "" : "text-gray-700"}`}>General</div>
                  <div className={`text-[10px] font-medium ${activeTab === "general" ? "text-blue-500" : "text-gray-400"}`}>System name, logo, and basic settings</div>
                </div>
              </button>

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

              <button onClick={() => setActiveTab("audit")} className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors relative ${activeTab === "audit" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"}`}>
                {activeTab === "audit" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-lg"></div>}
                <FileText size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className={`text-sm font-bold ${activeTab === "audit" ? "" : "text-gray-700"}`}>Audit Logs</div>
                  <div className={`text-[10px] font-medium ${activeTab === "audit" ? "text-blue-500" : "text-gray-400"}`}>System activity and audit logs</div>
                </div>
              </button>

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

        {/* Middle Col (6/12) General Settings or Audit Logs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
            
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">
                {activeTab === "general" ? "General Settings" : "System Audit Logs"}
              </h3>
              {activeTab === "general" && !isEditing && (
                <button onClick={handleEdit} className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
                  <Edit size={14}/> Edit Settings
                </button>
              )}
            </div>

            {activeTab === "general" ? (
              <>

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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <input type="text" value={editForm.system_name} onChange={e => setEditForm({...editForm, system_name: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.system_name}</div>
                  )}
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
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-white overflow-hidden">
                      {(isEditing ? editForm.system_logo : settings.system_logo)?.startsWith("data:image") ? (
                        <img src={isEditing ? editForm.system_logo : settings.system_logo} alt="Logo" className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-800 rounded-sm rotate-45"></div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">
                        {((isEditing ? editForm.system_logo : settings.system_logo)?.length > 30) 
                          ? "custom_logo_uploaded" 
                          : (isEditing ? editForm.system_logo : settings.system_logo)}
                      </div>
                      <div className="text-[10px] text-gray-400 font-medium">PNG/JPG • Max 2MB</div>
                    </div>
                  </div>
                  {isEditing ? (
                    <label className="cursor-pointer px-3 py-1.5 border border-gray-200 rounded text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
                      Upload
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                  ) : (
                    <button className="px-3 py-1.5 border border-gray-200 rounded text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm opacity-50 cursor-not-allowed">Change</button>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.timezone} onChange={e => setEditForm({...editForm, timezone: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value="Asia/Jakarta">(UTC+07:00) Asia/Jakarta</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">(UTC-05:00) America/New_York</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.timezone}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.date_format} onChange={e => setEditForm({...editForm, date_format: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value="DD MMM YYYY">DD MMM YYYY (24 Apr 2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2026-04-24)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (04/24/2026)</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.date_format}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.time_format} onChange={e => setEditForm({...editForm, time_format: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value="24-Hour">24-Hour (14:30)</option>
                      <option value="12-Hour">12-Hour (02:30 PM)</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.time_format}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.language} onChange={e => setEditForm({...editForm, language: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value="English">English</option>
                      <option value="Indonesian">Indonesian</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.language}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.currency} onChange={e => setEditForm({...editForm, currency: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value="IDR">IDR (Indonesian Rupiah)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="EUR">EUR (Euro)</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.currency}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.unit_system} onChange={e => setEditForm({...editForm, unit_system: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value="Metric">Metric (°C, kW, m³/h, kPa)</option>
                      <option value="Imperial">Imperial (°F, BTU/h, CFM, psi)</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.unit_system}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.items_per_page} onChange={e => setEditForm({...editForm, items_per_page: parseInt(e.target.value)})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.items_per_page}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.week_starts_on} onChange={e => setEditForm({...editForm, week_starts_on: e.target.value})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value="Monday">Monday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.week_starts_on}</div>
                  )}
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
                <div className="sm:w-1/2">
                  {isEditing ? (
                    <select value={editForm.automatic_logout} onChange={e => setEditForm({...editForm, automatic_logout: parseInt(e.target.value)})} className="w-full px-3 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                      <option value={15}>15 Minutes</option>
                      <option value={30}>30 Minutes</option>
                      <option value={60}>1 Hour</option>
                      <option value={120}>2 Hours</option>
                    </select>
                  ) : (
                    <div className="text-sm font-medium text-gray-800">{settings.automatic_logout} Minutes</div>
                  )}
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
                <div className="sm:w-1/2 flex items-center">
                  <button 
                    disabled={!isEditing}
                    onClick={() => setEditForm({...editForm, maintenance_mode: !editForm.maintenance_mode})}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      (isEditing ? editForm.maintenance_mode : settings.maintenance_mode) ? 'bg-blue-600' : 'bg-gray-200'
                    } ${isEditing ? 'cursor-pointer' : 'opacity-80 cursor-default'}`}
                  >
                    <div className={`absolute top-1 bottom-1 w-3 bg-white rounded-full shadow-sm transition-transform ${
                      (isEditing ? editForm.maintenance_mode : settings.maintenance_mode) ? 'left-6' : 'left-1'
                    }`}></div>
                  </button>
                </div>
              </div>

            </div>

            {isEditing && (
              <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50 rounded-b-xl">
                <button onClick={() => setIsEditing(false)} disabled={isSaving} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
            </>
            ) : (
              <div className="p-0">
                {isLoadingLogs ? (
                  <div className="flex justify-center p-12">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : auditLogs.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between mb-1">
                          <div className="font-bold text-gray-800 text-sm flex items-center gap-2">
                            <Activity size={14} className="text-blue-500" />
                            {log.action}
                          </div>
                          <div className="text-[10px] font-bold text-gray-400">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Unknown'}
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 font-medium mb-1">{log.description}</div>
                        <div className="text-[10px] text-gray-400 font-medium">Actor: <span className="font-bold text-gray-600">{log.user}</span></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-sm font-medium text-gray-500">
                    No activity logs found.
                  </div>
                )}
              </div>
            )}
            
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
