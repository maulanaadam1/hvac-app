"use client";

import React, { useState, useEffect, Fragment } from "react";
import { ChevronRight, Plus, Search, ShieldCheck, Users, Info, Settings, LayoutDashboard, Package, Wrench, FileText, ChevronDown, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

type Permission = {
  id: number;
  name: string;
  description: string;
  module: string;
  action: string;
  has_access?: boolean;
};

type GroupedPermissions = {
  [module: string]: Permission[];
};

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const roleId = params.id as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [groupedPermissions, setGroupedPermissions] = useState<GroupedPermissions>({});
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [roleName, setRoleName] = useState("");
  const [roleCode, setRoleCode] = useState("");
  const [description, setDescription] = useState("");
  const [roleType, setRoleType] = useState("custom");
  const [isActive, setIsActive] = useState(true);
  const [scopeType, setScopeType] = useState("all");
  
  // Expanded modules state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  
  // Permission selections: module -> set of selected permission IDs
  const [selectedPermissions, setSelectedPermissions] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (roleId) {
      fetchRoleAndPermissions();
    }
  }, [roleId]);

  const fetchRoleAndPermissions = async () => {
    setIsLoading(true);
    try {
      // Fetch permissions first (just to get the full list if we wanted to, but the role detail endpoint returns all permissions with has_access)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/roles/${roleId}`);
      if (!res.ok) throw new Error("Failed to fetch role details");
      
      const roleData = await res.json();
      
      setRoleName(roleData.name);
      setRoleCode(roleData.name.toUpperCase().replace(/\s+/g, '_'));
      setDescription(roleData.description || "");
      setRoleType(roleData.is_system ? 'system' : 'custom');
      
      // The roleData.modules has the permissions with has_access
      const grouped: GroupedPermissions = {};
      const expanded: Record<string, boolean> = {};
      const selected = new Set<number>();
      
      roleData.modules.forEach((mod: any) => {
        grouped[mod.module] = mod.permissions.map((p: any) => {
          if (p.has_access) {
            selected.add(p.id);
          }
          return {
            id: p.id,
            name: p.name,
            description: p.description,
            module: mod.module,
            action: p.name,
            has_access: p.has_access
          };
        });
        expanded[mod.module] = true;
      });
      
      setGroupedPermissions(grouped);
      setExpandedModules(expanded);
      setSelectedPermissions(selected);
      
    } catch (e) {
      console.error("Failed to fetch data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModule = (moduleName: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const expandAll = () => {
    const expanded: Record<string, boolean> = {};
    Object.keys(groupedPermissions).forEach(mod => expanded[mod] = true);
    setExpandedModules(expanded);
  };

  const handlePermissionChange = (permId: number, checked: boolean) => {
    setSelectedPermissions(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(permId);
      } else {
        newSet.delete(permId);
      }
      return newSet;
    });
  };

  const handleModuleLevelChange = (moduleName: string, level: 'none' | 'view' | 'edit' | 'full') => {
    const modPerms = groupedPermissions[moduleName] || [];
    const modPermIds = modPerms.map(p => p.id);
    
    setSelectedPermissions(prev => {
      const newSet = new Set(prev);
      
      // First remove all permissions for this module
      modPermIds.forEach(id => newSet.delete(id));
      
      if (level === 'none') {
        // Already cleared
      } else if (level === 'view') {
        // Add only view permissions
        modPerms.filter(p => p.action.toLowerCase().includes('view')).forEach(p => newSet.add(p.id));
      } else if (level === 'edit') {
        // Add view and edit/update permissions
        modPerms.filter(p => 
          p.action.toLowerCase().includes('view') || 
          p.action.toLowerCase().includes('edit') || 
          p.action.toLowerCase().includes('update')
        ).forEach(p => newSet.add(p.id));
      } else if (level === 'full') {
        // Add all permissions
        modPermIds.forEach(id => newSet.add(id));
      }
      
      return newSet;
    });
  };

  const determineModuleLevel = (moduleName: string): string => {
    const modPerms = groupedPermissions[moduleName] || [];
    if (modPerms.length === 0) return 'none';

    const selectedInMod = modPerms.filter(p => selectedPermissions.has(p.id));
    
    if (selectedInMod.length === 0) return 'none';
    if (selectedInMod.length === modPerms.length) return 'full';
    
    // Check if only view is selected
    const hasOnlyView = selectedInMod.every(p => p.action.toLowerCase().includes('view'));
    if (hasOnlyView) return 'view';
    
    // Mixed logic (could be edit)
    return 'mixed';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      name: roleName,
      code: roleCode,
      description,
      is_system: roleType === 'system',
      is_active: isActive,
      scope_type: scopeType,
      permission_ids: Array.from(selectedPermissions)
    };
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/roles/${roleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to update role");
      }
      
      // Success
      router.push("/roles-permissions");
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full pb-12">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/roles-permissions" className="hover:text-gray-800">Roles & Permissions</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">Edit Role</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Edit Role</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update role information and modify its access permissions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Form Info */}
        <div className="xl:col-span-1 space-y-6">
          
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Role Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Role Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Enter role name (e.g. Technician)" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <p className="text-[10px] text-gray-500 mt-1">The name that will be displayed in the system.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Role Code <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={roleCode}
                  onChange={(e) => setRoleCode(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
                  placeholder="Enter role code (e.g. TECHNICIAN)" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <p className="text-[10px] text-gray-500 mt-1">Unique code used for system reference.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Description</label>
                <textarea 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter role description" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                ></textarea>
                <p className="text-[10px] text-gray-500 mt-1">Brief explanation of the role and its responsibilities.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2.5">Role Type</label>
                <div className="space-y-3">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <div className="mt-0.5">
                      <input 
                        type="radio" 
                        name="roleType" 
                        value="system"
                        checked={roleType === 'system'}
                        onChange={() => setRoleType('system')}
                        className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">System Role</div>
                      <div className="text-[10px] text-gray-500">Predefined role managed by system</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <div className="mt-0.5">
                      <input 
                        type="radio" 
                        name="roleType" 
                        value="custom"
                        checked={roleType === 'custom'}
                        onChange={() => setRoleType('custom')}
                        className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                      />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">Custom Role</div>
                      <div className="text-[10px] text-gray-500">Custom role created for organization</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">Status</label>
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-4' : 'translate-x-1'}`} />
                  </button>
                  <span className="text-sm font-bold text-gray-800">{isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-2">Inactive roles cannot be assigned to users.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-1">Role Scope (Optional)</h3>
            <p className="text-[10px] text-gray-500 mb-4">Limit the role access to specific locations. If not set, role can access all locations.</p>
            
            <div className="space-y-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div className="mt-0.5">
                  <input 
                    type="radio" 
                    name="scopeType" 
                    value="all"
                    checked={scopeType === 'all'}
                    onChange={() => setScopeType('all')}
                    className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">All Sites</div>
                  <div className="text-[10px] text-gray-500">Role can access all sites and locations</div>
                </div>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div className="mt-0.5">
                  <input 
                    type="radio" 
                    name="scopeType" 
                    value="specific"
                    checked={scopeType === 'specific'}
                    onChange={() => setScopeType('specific')}
                    className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Specific Sites</div>
                  <div className="text-[10px] text-gray-500">Role can access selected sites and locations</div>
                </div>
              </label>
            </div>
          </div>
          
        </div>
        
        {/* Right Column: Permissions Matrix */}
        <div className="xl:col-span-2">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col h-full min-h-[600px]">
            
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Permissions</h3>
                <p className="text-xs text-gray-500 mt-0.5">Select the permissions this role will have. Permissions are grouped by modules.</p>
              </div>
              <div className="flex items-center gap-3">
                <button type="button" onClick={expandAll} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <ChevronDown size={14}/> Expand All
                </button>
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input type="text" placeholder="Search permissions..." className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <Loader2 size={32} className="animate-spin mb-3" />
                  <p className="text-sm">Loading permissions matrix...</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead className="sticky top-0 bg-white shadow-sm z-10 text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4 w-1/2">Module / Permission</th>
                      <th className="px-4 py-4 text-center">
                        <div className="text-gray-800">No Access</div>
                        <div className="font-medium mt-0.5">None</div>
                      </th>
                      <th className="px-4 py-4 text-center">
                        <div className="text-gray-800">View Only</div>
                        <div className="font-medium mt-0.5">Read</div>
                      </th>
                      <th className="px-4 py-4 text-center">
                        <div className="text-gray-800">Edit</div>
                        <div className="font-medium mt-0.5">Read & Edit</div>
                      </th>
                      <th className="px-4 py-4 text-center">
                        <div className="text-gray-800">Full Access</div>
                        <div className="font-medium mt-0.5">All</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {Object.keys(groupedPermissions).map(moduleName => {
                      const modPerms = groupedPermissions[moduleName];
                      const isExpanded = expandedModules[moduleName];
                      const modLevel = determineModuleLevel(moduleName);
                      
                      return (
                        <React.Fragment key={moduleName}>
                          {/* Module Header Row */}
                          <tr className="bg-gray-50/50 hover:bg-gray-50 transition-colors group">
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-3">
                                <button 
                                  type="button"
                                  onClick={() => toggleModule(moduleName)}
                                  className="w-5 h-5 rounded flex items-center justify-center bg-white border border-gray-200 text-blue-600 shadow-sm hover:border-blue-300"
                                >
                                  {isExpanded ? <span className="text-lg leading-none mb-1">-</span> : <Plus size={14}/>}
                                </button>
                                <div>
                                  <div className="font-bold text-gray-800 text-sm">{moduleName}</div>
                                  <div className="text-[10px] text-gray-500 font-medium">Manage {moduleName.toLowerCase()} settings</div>
                                </div>
                              </div>
                            </td>
                            
                            {/* Master Radios */}
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="radio" 
                                name={`mod_${moduleName}`}
                                checked={modLevel === 'none'}
                                onChange={() => handleModuleLevelChange(moduleName, 'none')}
                                className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-gray-400 cursor-pointer"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="radio" 
                                name={`mod_${moduleName}`}
                                checked={modLevel === 'view'}
                                onChange={() => handleModuleLevelChange(moduleName, 'view')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="radio" 
                                name={`mod_${moduleName}`}
                                checked={modLevel === 'edit' || modLevel === 'mixed'}
                                onChange={() => {
                                  // If it's already mixed, clicking this might force an edit level. Let's just implement edit.
                                  handleModuleLevelChange(moduleName, 'edit')
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input 
                                type="radio" 
                                name={`mod_${moduleName}`}
                                checked={modLevel === 'full'}
                                onChange={() => handleModuleLevelChange(moduleName, 'full')}
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                              />
                            </td>
                          </tr>
                          
                          {/* Expanded Items */}
                          {isExpanded && modPerms.map(perm => {
                            const isSelected = selectedPermissions.has(perm.id);
                            const isView = perm.action.toLowerCase().includes('view');
                            const isEdit = perm.action.toLowerCase().includes('edit') || perm.action.toLowerCase().includes('update');
                            
                            return (
                              <tr key={perm.id} className="hover:bg-blue-50/10 transition-colors">
                                <td className="px-6 py-3 pl-14">
                                  <div className="font-bold text-gray-800 text-xs">{perm.name}</div>
                                  <div className="text-[10px] text-gray-500">{perm.description}</div>
                                </td>
                                
                                {/* Item Checks */}
                                <td className="px-4 py-3 text-center">
                                  <input 
                                    type="radio" 
                                    name={`perm_${perm.id}`}
                                    checked={!isSelected}
                                    onChange={() => handlePermissionChange(perm.id, false)}
                                    className="w-3.5 h-3.5 text-gray-400 border-gray-300 focus:ring-gray-400 cursor-pointer"
                                  />
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {isView ? (
                                    <input 
                                      type="radio" 
                                      name={`perm_${perm.id}`}
                                      checked={isSelected}
                                      onChange={() => handlePermissionChange(perm.id, true)}
                                      className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                  ) : (
                                    <span className="text-gray-200">-</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {isEdit ? (
                                    <input 
                                      type="radio" 
                                      name={`perm_${perm.id}`}
                                      checked={isSelected}
                                      onChange={() => handlePermissionChange(perm.id, true)}
                                      className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                  ) : (
                                    <span className="text-gray-200">-</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-center">
                                  {!isView && !isEdit ? (
                                    <input 
                                      type="radio" 
                                      name={`perm_${perm.id}`}
                                      checked={isSelected}
                                      onChange={() => handlePermissionChange(perm.id, true)}
                                      className="w-3.5 h-3.5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                  ) : (
                                    <span className="text-gray-200">-</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between mt-auto shrink-0">
              <div className="text-xs font-bold text-gray-600">
                {selectedPermissions.size} permission{selectedPermissions.size !== 1 ? 's' : ''} selected
              </div>
              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedPermissions(new Set())}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3"
                >
                  Clear All
                </button>
                <Link 
                  href="/roles-permissions"
                  className="px-4 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </form>
  );
}
