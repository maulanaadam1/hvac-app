"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Users, ShieldCheck, MoreHorizontal, X, Shield, Download, Check, Settings, Package, Wrench, FileText, ChevronDown, ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, Edit, Loader2, Filter, LayoutDashboard } from "lucide-react";
import Link from "next/link";

type RoleSummary = {
  id: string;
  name: string;
  description: string;
  is_system: boolean;
  user_count: number;
  permission_count: number;
  updated_at: string;
};

type Permission = {
  id: number;
  name: string;
  description: string;
  has_access: boolean;
};

type ModuleGroup = {
  module: string;
  permissions: Permission[];
};

type RoleDetail = {
  id: string;
  name: string;
  description: string;
  is_system: boolean;
  user_count: number;
  created_at: string;
  modules: ModuleGroup[];
};

type DetailedPermission = {
  id: number;
  name: string;
  description: string;
  module: string;
  resource: string;
  action: string;
  code: string;
  type: string;
  status: string;
  assigned_roles: { id: string, name: string, is_system: boolean }[];
  created_at: string;
  updated_at: string;
};

export default function RolesPermissionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'roles' | 'permissions'>('roles');
  const [activeDetailTab, setActiveDetailTab] = useState<'permissions' | 'users' | 'info'>('permissions');
  
  // Roles State
  const [roles, setRoles] = useState<RoleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [roleDetail, setRoleDetail] = useState<RoleDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Permissions State
  const [permissions, setPermissions] = useState<DetailedPermission[]>([]);
  const [isPermsLoading, setIsPermsLoading] = useState(true);
  const [selectedPermId, setSelectedPermId] = useState<number | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/roles/`);
      if (res.ok) {
        const data = await res.json();
        setRoles(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPermissions = async () => {
    setIsPermsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/permissions/`);
      if (res.ok) {
        const data = await res.json();
        setPermissions(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPermsLoading(false);
    }
  };

  const handleRowClick = async (roleId: string) => {
    setSelectedRoleId(roleId);
    setIsDetailLoading(true);
    setExpandedModules({}); 
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/roles/${roleId}`);
      if (res.ok) {
        const data = await res.json();
        setRoleDetail(data);
        if (data.modules && data.modules.length > 0) {
          setExpandedModules({ [data.modules[0].module]: true });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const toggleModule = (moduleName: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  // KPI Calculations
  const totalRoles = roles.length;
  const systemRoles = roles.filter(r => r.is_system).length;
  const customRoles = totalRoles - systemRoles;
  const maxPermissions = roles.length > 0 ? Math.max(...roles.map(r => r.permission_count)) : 0;

  // Permissions KPI
  const totalPerms = permissions.length;
  const systemPerms = permissions.filter(p => p.type === 'System').length;
  const customPerms = totalPerms - systemPerms;
  const uniqueModules = new Set(permissions.map(p => p.module)).size;

  // Pagination Logic
  const totalPages = Math.ceil(totalPerms / itemsPerPage);
  const paginatedPermissions = permissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const selectedPerm = permissions.find(p => p.id === selectedPermId);

  const getModuleColor = (mod: string) => {
    if (mod.includes('Dashboard')) return 'text-blue-600 bg-blue-50';
    if (mod.includes('Assets')) return 'text-green-600 bg-green-50';
    if (mod.includes('Work Orders')) return 'text-purple-600 bg-purple-50';
    if (mod.includes('Inventory')) return 'text-teal-600 bg-teal-50';
    if (mod.includes('Users')) return 'text-orange-600 bg-orange-50';
    if (mod.includes('Preventive')) return 'text-pink-600 bg-pink-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getActionColor = (act: string) => {
    if (act.includes('View')) return 'text-blue-600';
    if (act.includes('Create')) return 'text-green-600';
    if (act.includes('Edit') || act.includes('Update')) return 'text-blue-500';
    if (act.includes('Delete')) return 'text-red-500';
    if (act.includes('Manage')) return 'text-orange-500';
    if (act.includes('Export') || act.includes('Import')) return 'text-purple-600';
    return 'text-gray-600';
  };

  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      
      {/* Breadcrumb & Actions */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/roles-permissions" className="hover:text-gray-800">Roles & Permissions</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800 capitalize">{activeTab}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-800">
              {activeTab === 'roles' ? 'Roles & Permissions' : 'Permissions'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {activeTab === 'roles' 
                ? 'Manage roles and assign permissions to control system access.'
                : 'Manage all system permissions. Permissions define what actions can be performed in the system.'}
            </p>
          </div>
          <Link 
            href={activeTab === 'roles' ? '/roles-permissions/roles/create' : '/roles-permissions/permissions/create'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={16} />
            {activeTab === 'roles' ? 'Create Role' : 'Create Permission'}
          </Link>
        </div>
      </div>

      {/* Top KPI Cards (Contextual) */}
      {activeTab === 'roles' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Users size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Total Roles</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{totalRoles}</div>
              <div className="text-[10px] text-gray-400">All system roles</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Custom Roles</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{customRoles}</div>
              <div className="text-[10px] font-bold text-gray-800">{totalRoles ? Math.round((customRoles/totalRoles)*100) : 0}% <span className="font-medium text-gray-400">of total</span></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Default Roles</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{systemRoles}</div>
              <div className="text-[10px] font-bold text-gray-800">{totalRoles ? Math.round((systemRoles/totalRoles)*100) : 0}% <span className="font-medium text-gray-400">of total</span></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <Settings size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Permissions Setup</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{maxPermissions}</div>
              <div className="text-[10px] text-gray-400">Max permissions in DB</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Total Permissions</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{totalPerms}</div>
              <div className="text-[10px] text-gray-400">All permissions</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">System Permissions</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{systemPerms}</div>
              <div className="text-[10px] text-gray-400">Cannot be deleted</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
              <Package size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Custom Permissions</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{customPerms}</div>
              <div className="text-[10px] text-gray-400">Created by organization</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500">Modules</div>
              <div className="text-2xl font-bold text-gray-800 mt-1 mb-0.5">{uniqueModules}</div>
              <div className="text-[10px] text-gray-400">System modules</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className={`grid grid-cols-1 gap-6 relative ${(activeTab === 'roles' ? selectedRoleId : selectedPermId) ? 'xl:grid-cols-3' : 'xl:grid-cols-1'}`}>
        
        {/* Table area */}
        <div className={`${(activeTab === 'roles' ? selectedRoleId : selectedPermId) ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col space-y-4 transition-all duration-300`}>
          
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col overflow-hidden">
            
            {/* Tabs & Filters */}
            <div className="border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between">
              <nav className="flex px-2">
                <button 
                  onClick={() => setActiveTab('roles')} 
                  className={`py-3 px-4 text-sm font-bold border-b-2 ${activeTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Roles
                </button>
                <button 
                  onClick={() => setActiveTab('permissions')} 
                  className={`py-3 px-4 text-sm font-bold border-b-2 ${activeTab === 'permissions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                  Permissions
                </button>
              </nav>
            </div>
            
            {/* Conditional Table Toolbars */}
            {activeTab === 'roles' ? (
              <div className="p-4 flex flex-wrap gap-3 items-center justify-between border-b border-gray-100 bg-gray-50/30">
                <div className="flex gap-3 items-center flex-1">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="Search roles..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"/>
                  </div>
                  <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 w-32 outline-none"><option>All Status</option></select>
                </div>
                <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50">
                  <Download size={14} /> Export
                </button>
              </div>
            ) : (
              <div className="p-4 flex flex-wrap gap-3 items-center justify-between border-b border-gray-100 bg-gray-50/30">
                <div className="flex gap-3 items-center flex-1">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="Search permissions..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"/>
                  </div>
                  <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 w-32 outline-none"><option>All Modules</option></select>
                  <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 w-32 outline-none"><option>All Actions</option></select>
                  <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 w-36 outline-none"><option>All Resource Types</option></select>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50">
                    <Download size={14} /> Export
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50">
                    <Filter size={14} /> Filters
                  </button>
                </div>
              </div>
            )}

            {/* Conditional Tables */}
            <div className="overflow-x-auto">
              {activeTab === 'roles' ? (
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100 bg-white tracking-wider">
                    <tr>
                      <th className="px-6 py-4">ROLE NAME</th>
                      <th className="px-4 py-4">TYPE</th>
                      <th className="px-4 py-4 text-center">USERS</th>
                      <th className="px-4 py-4 text-center">PERMISSIONS</th>
                      <th className="px-4 py-4">DESCRIPTION</th>
                      <th className="px-4 py-4 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                          <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                          Loading roles...
                        </td>
                      </tr>
                    ) : roles.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-gray-400 font-medium">
                          No roles found in database.
                        </td>
                      </tr>
                    ) : (
                      roles.map((row) => (
                        <tr key={row.id} onClick={() => handleRowClick(row.id)} className={`hover:bg-gray-50/50 cursor-pointer ${selectedRoleId === row.id ? 'bg-blue-50/20 border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full ${row.is_system ? 'bg-blue-600' : 'bg-teal-500'} flex items-center justify-center shrink-0 shadow-sm`}>
                                {row.is_system ? <ShieldCheck size={16} className="text-white"/> : <Users size={16} className="text-white"/>}
                              </div>
                              <div className="font-bold text-gray-800">{row.name}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.is_system ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>{row.is_system ? 'System' : 'Custom'}</span>
                          </td>
                          <td className="px-4 py-4 text-center font-bold text-gray-800">{row.user_count}</td>
                          <td className="px-4 py-4 text-center font-bold text-gray-800">{row.permission_count}</td>
                          <td className="px-4 py-4 text-[11px] font-medium text-gray-500 max-w-xs leading-relaxed">{row.description}</td>
                          <td className="px-4 py-4 text-center">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/roles-permissions/roles/edit/${row.id}`);
                              }}
                              className="text-gray-400 hover:text-gray-800 p-1.5 rounded-md hover:bg-gray-100 border border-gray-200 inline-block" 
                              title="Edit Role"
                            >
                              <MoreHorizontal size={14}/>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100 bg-white tracking-wider">
                    <tr>
                      <th className="px-4 py-4 w-10 text-center"><input type="checkbox" className="rounded border-gray-300" /></th>
                      <th className="px-4 py-4">PERMISSION</th>
                      <th className="px-4 py-4">MODULE</th>
                      <th className="px-4 py-4">RESOURCE</th>
                      <th className="px-4 py-4">ACTION</th>
                      <th className="px-4 py-4">CODE</th>
                      <th className="px-4 py-4">TYPE</th>
                      <th className="px-4 py-4">STATUS</th>
                      <th className="px-4 py-4 text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isPermsLoading ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                          <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                          Loading permissions...
                        </td>
                      </tr>
                    ) : permissions.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-12 text-center text-gray-400 font-medium">
                          No permissions found in database.
                        </td>
                      </tr>
                    ) : (
                      paginatedPermissions.map((row) => (
                        <tr key={row.id} onClick={() => setSelectedPermId(row.id)} className={`hover:bg-gray-50/50 cursor-pointer ${selectedPermId === row.id ? 'bg-blue-50/20 border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}>
                          <td className="px-4 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className="rounded border-gray-300" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-bold text-gray-800">{row.name}</div>
                            <div className="text-[10px] text-gray-500 font-medium mt-0.5 max-w-xs">{row.description}</div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getModuleColor(row.module)}`}>{row.module}</span>
                          </td>
                          <td className="px-4 py-4 font-medium text-gray-600">{row.resource}</td>
                          <td className="px-4 py-4 font-bold">
                            <span className={`${getActionColor(row.action)}`}>{row.action}</span>
                          </td>
                          <td className="px-4 py-4 font-medium text-gray-500">{row.code}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.type === 'System' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>{row.type}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5 font-bold text-gray-700">
                              <div className={`w-2 h-2 rounded-full ${row.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                              {row.status}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button className="text-gray-400 hover:text-gray-800 p-1.5 rounded-md hover:bg-gray-100 border border-gray-200" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={14}/></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-white text-xs text-gray-500 flex justify-between items-center rounded-b-xl">
              <span>
                Showing {activeTab === 'roles' ? roles.length : (permissions.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1)} 
                {activeTab === 'permissions' && permissions.length > 0 && ` to ${Math.min(currentPage * itemsPerPage, permissions.length)} `}
                of {activeTab === 'roles' ? roles.length : permissions.length} results
              </span>
              {activeTab === 'permissions' && totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  {/* First Page */}
                  <button 
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronsLeft size={14} />
                  </button>
                  {/* Previous Page */}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft size={14} />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx;
                    } else {
                      pageNum = currentPage - 2 + idx;
                    }

                    return (
                      <button 
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 flex items-center justify-center border rounded font-bold ${currentPage === pageNum ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  {/* Next Page */}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronRight size={14} />
                  </button>
                  {/* Last Page */}
                  <button 
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 border border-gray-200 rounded text-gray-400 hover:text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                  >
                    <ChevronsRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col (1/3) Role Details Drawer */}
        {activeTab === 'roles' && selectedRoleId && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col h-[calc(100vh-120px)] sticky top-4 overflow-hidden">
              
              <div className="px-6 pt-6 flex justify-between items-center mb-6 shrink-0">
                <h3 className="font-bold text-gray-800 text-lg">Role Details</h3>
                <button onClick={() => setSelectedRoleId(null)} className="text-gray-400 hover:text-gray-800 p-1 bg-gray-50 rounded-md border border-gray-200"><X size={16}/></button>
              </div>

              {isDetailLoading || !roleDetail ? (
                <div className="flex-1 flex items-center justify-center pb-20">
                  <Loader2 size={32} className="animate-spin text-gray-300" />
                </div>
              ) : (
                <>
                  <div className="px-6 flex gap-4 mb-6 shrink-0">
                    <div className={`w-16 h-16 rounded-full ${roleDetail.is_system ? 'bg-blue-600' : 'bg-teal-500'} flex items-center justify-center shrink-0 shadow-sm`}>
                      <ShieldCheck size={28} className="text-white" />
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-gray-800 text-lg">{roleDetail.name}</div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${roleDetail.is_system ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>{roleDetail.is_system ? 'System Role' : 'Custom Role'}</span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium mb-2 mt-1 leading-relaxed">{roleDetail.description}</div>
                      
                      <div className="text-[10px] text-gray-400 font-medium space-y-0.5">
                        <div>Created: <span className="text-gray-600">{roleDetail.created_at}</span></div>
                        <div>Total Users: <span className="text-gray-600 font-bold">{roleDetail.user_count}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="px-6 border-b border-gray-200 shrink-0">
                    <nav className="flex space-x-6">
                      <button onClick={() => setActiveDetailTab('permissions')} className={`border-b-2 py-3 px-1 text-xs font-bold transition-colors ${activeDetailTab === 'permissions' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Permissions</button>
                      <button onClick={() => setActiveDetailTab('users')} className={`border-b-2 py-3 px-1 text-xs font-bold transition-colors ${activeDetailTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Users ({roleDetail.user_count})</button>
                      <button onClick={() => setActiveDetailTab('info')} className={`border-b-2 py-3 px-1 text-xs font-bold transition-colors ${activeDetailTab === 'info' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Role Info</button>
                    </nav>
                  </div>

                  <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                    
                    {activeDetailTab === 'permissions' && (
                      <>
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex gap-2 shrink-0">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input type="text" placeholder="Search permissions..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                          </div>
                          <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 outline-none w-32"><option>All Modules</option></select>
                        </div>

                        <div className="p-4 space-y-4">
                          {roleDetail.modules.map((mod, idx) => {
                            const isExpanded = expandedModules[mod.module];
                            const checkedCount = mod.permissions.filter(p => p.has_access).length;
                            const totalCount = mod.permissions.length;
                            const allChecked = checkedCount === totalCount && totalCount > 0;
                            const someChecked = checkedCount > 0 && checkedCount < totalCount;

                            return (
                              <div key={idx} className="border border-gray-100 rounded-lg overflow-hidden">
                                <div 
                                  onClick={() => toggleModule(mod.module)}
                                  className="bg-gray-50 px-4 py-3 flex items-center justify-between cursor-pointer border-b border-gray-100"
                                >
                                  <div className="flex items-center gap-3">
                                    {isExpanded ? <ChevronDown size={16} className="text-gray-400"/> : <ChevronRight size={16} className="text-gray-400"/>}
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center text-white ${allChecked ? 'border-blue-600 bg-blue-600' : someChecked ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'}`}>
                                      {allChecked && <Check size={12}/>}
                                      {someChecked && <div className="w-2 h-0.5 bg-white rounded"></div>}
                                    </div>
                                    <span className="font-bold text-gray-800 text-xs">{mod.module}</span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-[10px] font-bold">{checkedCount}/{totalCount}</span>
                                </div>
                                
                                {isExpanded && (
                                  <div className="px-4 py-2 space-y-1 bg-white">
                                    {mod.permissions.map((perm) => (
                                      <div key={perm.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center text-white mt-0.5 shrink-0 ${perm.has_access ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'}`}>
                                          {perm.has_access && <Check size={12}/>}
                                        </div>
                                        <div className="flex-1">
                                          <div className={`text-xs font-bold ${perm.has_access ? 'text-gray-800' : 'text-gray-400'}`}>{perm.name}</div>
                                          <div className="text-[10px] text-gray-400 font-medium">{perm.description}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {activeDetailTab === 'users' && (
                      <div className="p-6">
                        <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm mb-3">
                            <Users size={20} />
                          </div>
                          <h4 className="font-bold text-gray-800 text-sm mb-1">{roleDetail.user_count} Users Assigned</h4>
                          <p className="text-[11px] text-gray-500 max-w-xs">There are {roleDetail.user_count} users currently assigned to this role. Manage them in the Users menu.</p>
                          <Link href="/users" className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            Manage Users
                          </Link>
                        </div>
                      </div>
                    )}

                    {activeDetailTab === 'info' && (
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Role Type</div>
                            <div className="text-sm font-bold text-gray-800">{roleDetail.is_system ? 'System Role (Built-in)' : 'Custom Role'}</div>
                            <div className="text-[11px] text-gray-500 mt-0.5">{roleDetail.is_system ? 'System roles cannot be deleted, but permissions can be modified.' : 'Custom roles created by administrators.'}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Description</div>
                            <div className="text-sm font-medium text-gray-700 leading-relaxed">{roleDetail.description || 'No description provided.'}</div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex justify-between items-center">
                            <div>
                              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Creation Date</div>
                              <div className="text-sm font-bold text-gray-800">{roleDetail.created_at}</div>
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                              <FileText size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="p-4 border-t border-gray-100 bg-white shrink-0">
                    <button 
                      onClick={() => router.push(`/roles-permissions/roles/edit/${roleDetail.id}`)}
                      className="w-full py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Edit size={14} /> Edit Role
                    </button>
                  </div>

                </>
              )}
            </div>
          </div>
        )}

        {/* Right Col (1/3) Permission Details Drawer */}
        {activeTab === 'permissions' && selectedPerm && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col h-[calc(100vh-120px)] sticky top-4 overflow-hidden">
              
              <div className="px-6 pt-6 flex justify-between items-center mb-6 shrink-0">
                <h3 className="font-bold text-gray-800 text-lg">Permission Details</h3>
                <button onClick={() => setSelectedPermId(null)} className="text-gray-400 hover:text-gray-800 p-1 bg-gray-50 rounded-md border border-gray-200"><X size={16}/></button>
              </div>

              <div className="px-6 flex gap-4 mb-6 shrink-0">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck size={28} className="text-white" />
                </div>
                <div className="text-sm flex flex-col justify-center">
                  <div className="font-bold text-gray-800 text-lg leading-tight">{selectedPerm.name}</div>
                  <div className="mt-1">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-50 text-green-700">{selectedPerm.type} Permission</span>
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium mt-1.5 leading-relaxed max-w-xs">{selectedPerm.description}</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col p-6 pt-0 space-y-6">
                
                {/* Properties list */}
                <div className="space-y-3.5 text-[11px]">
                  <div className="flex justify-between border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-medium w-24">Code</span>
                    <span className="font-bold text-gray-800 text-right">{selectedPerm.code}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-medium w-24">Module</span>
                    <span className="font-bold text-gray-800 text-right">{selectedPerm.module}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-medium w-24">Resource</span>
                    <span className="font-bold text-gray-800 text-right">{selectedPerm.resource}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-medium w-24">Action</span>
                    <span className="font-bold text-gray-800 text-right">{selectedPerm.action}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-medium w-24">Type</span>
                    <span className="font-bold text-gray-800 text-right">{selectedPerm.type} Permission</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-medium w-24">Status</span>
                    <div className="flex items-center justify-end gap-1.5 font-bold text-gray-800 text-right">
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedPerm.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      {selectedPerm.status}
                    </div>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-3">
                    <span className="text-gray-500 font-medium w-24">Created At</span>
                    <span className="font-bold text-gray-800 text-right">{selectedPerm.created_at}</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-gray-500 font-medium w-24">Updated At</span>
                    <span className="font-bold text-gray-800 text-right">{selectedPerm.updated_at}</span>
                  </div>
                </div>

                {/* Assigned To Roles */}
                <div>
                  <h4 className="font-bold text-gray-800 text-xs mb-3">Assigned To Roles ({selectedPerm.assigned_roles.length})</h4>
                  <div className="space-y-2 text-xs font-bold text-gray-700">
                    {selectedPerm.assigned_roles.length === 0 ? (
                      <div className="text-gray-400 font-medium text-xs">No roles assigned.</div>
                    ) : (
                      selectedPerm.assigned_roles.map(r => (
                        <div key={r.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                          <div className={`w-6 h-6 rounded-full ${r.is_system ? 'bg-blue-600' : 'bg-teal-500'} text-white flex items-center justify-center`}>
                            {r.is_system ? <ShieldCheck size={12}/> : <Users size={12}/>}
                          </div>
                          {r.name}
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* Footer Action */}
              <div className="p-4 border-t border-gray-100 bg-white shrink-0">
                <button className="w-full py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Edit size={14} /> Edit Permission
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
