"use client";

import { useState } from "react";
import { ChevronRight, Shield, ShieldCheck, Eye, Plus, Edit2, Trash2, Download, Search, Info, X, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MODULES = [
  "Dashboard",
  "Assets",
  "Work Orders",
  "Preventive Maintenance",
  "Inspections",
  "Inventory",
  "Monitoring",
  "Analytics",
  "Users & Access",
  "Settings"
];

const DEFAULT_ACTIONS_LIST = [
  { id: "view", label: "View", icon: Eye, desc: "View and access resources", color: "text-blue-600 bg-blue-50" },
  { id: "create", label: "Create", icon: Plus, desc: "Create new resources", color: "text-green-600 bg-green-50" },
  { id: "update", label: "Update", icon: Edit2, desc: "Update existing resources", color: "text-blue-500 bg-blue-50" },
  { id: "delete", label: "Delete", icon: Trash2, desc: "Delete resources", color: "text-red-500 bg-red-50" },
  { id: "export", label: "Export", icon: Download, desc: "Export resource data", color: "text-purple-600 bg-purple-50" },
];

export default function CreatePermissionGroupPage() {
  const router = useRouter();
  
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [description, setDescription] = useState("");
  const [module, setModule] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isActive, setIsActive] = useState(true);
  const [resourceType, setResourceType] = useState("single");
  const [selectedActions, setSelectedActions] = useState<string[]>(["view", "create", "update", "delete", "export"]);
  const [inheritsFrom, setInheritsFrom] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName || !module) {
      alert("Please fill required fields (Group Name and Module).");
      return;
    }
    
    setIsSubmitting(true);
    const payload = {
      group_name: groupName,
      module: module,
      description: description,
      actions: selectedActions
    };
    
    try {
      const res = await fetch("http://localhost:8000/api/v1/permissions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to create permissions");
      }
      
      router.push("/roles-permissions?tab=permissions");
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAction = (actionId: string) => {
    setSelectedActions(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  const handleGroupCodeChange = (val: string) => {
    setGroupCode(val.toLowerCase().replace(/\s+/g, '_'));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full pb-12">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/roles-permissions" className="hover:text-gray-800">Roles & Permissions</Link>
          <ChevronRight size={12} />
          <Link href="#" onClick={(e) => { e.preventDefault(); router.push('/roles-permissions?tab=permissions'); }} className="hover:text-gray-800">Permissions</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">Create Permission Group</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Create Permission Group</h2>
          <p className="text-sm text-gray-500 mt-1">
            Create a new permission group to organize system permissions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Forms */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Section 1 */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-1">1. Group Information</h3>
            <p className="text-[10px] text-gray-500 mb-5">Define the basic information for this permission group.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Group Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="e.g. Work Orders" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Description</label>
                  <textarea 
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength={255}
                    placeholder="Enter group description" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  ></textarea>
                  <div className="text-right text-[10px] text-gray-400 mt-1">{description.length}/255</div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Icon</label>
                    <button type="button" className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-2">
                      <Search size={16} className="text-gray-400"/> Select Icon
                    </button>
                    <p className="text-[9px] text-gray-400 mt-1">Choose an icon to represent this permission group.</p>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">Sort Order</label>
                    <input 
                      type="number" 
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <p className="text-[9px] text-gray-400 mt-1">Display order in the permission list.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Group Code <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={groupCode}
                    onChange={(e) => handleGroupCodeChange(e.target.value)}
                    placeholder="e.g. work_orders" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Unique code used for system reference. Use lowercase and underscore.</p>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Module <span className="text-red-500">*</span></label>
                  <select 
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="" disabled>Select module</option>
                    {MODULES.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <p className="text-[10px] text-gray-500 mt-1">Select the module this permission group belongs to.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Color</label>
                  <select className="w-24 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-purple-50 text-purple-700 font-bold">
                    <option>Purple</option>
                  </select>
                  <p className="text-[10px] text-gray-500 mt-1">Choose a color to represent this group.</p>
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
                  <p className="text-[10px] text-gray-500 mt-2">Inactive groups will be hidden from role assignment.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-1">2. Group Settings</h3>
            <p className="text-[10px] text-gray-500 mb-5">Configure options for how this permission group will be used.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <label className="block text-xs font-bold text-gray-700 mb-1">Resource Type</label>
                
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <div className="mt-0.5">
                    <input 
                      type="radio" 
                      name="resourceType" 
                      value="single"
                      checked={resourceType === 'single'}
                      onChange={() => setResourceType('single')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Single Resource</div>
                    <div className="text-[10px] text-gray-500">Permissions are managed for a single resource (e.g., Work Order)</div>
                  </div>
                </label>
                
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <div className="mt-0.5">
                    <input 
                      type="radio" 
                      name="resourceType" 
                      value="multiple"
                      checked={resourceType === 'multiple'}
                      onChange={() => setResourceType('multiple')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Multiple Resources</div>
                    <div className="text-[10px] text-gray-500">Permissions are managed for multiple resources under this module</div>
                  </div>
                </label>
                
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <div className="mt-0.5">
                    <input 
                      type="radio" 
                      name="resourceType" 
                      value="global"
                      checked={resourceType === 'global'}
                      onChange={() => setResourceType('global')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">System / Global</div>
                    <div className="text-[10px] text-gray-500">Permissions are not tied to a specific resource</div>
                  </div>
                </label>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Default Actions</label>
                  <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 flex flex-wrap gap-2">
                    {DEFAULT_ACTIONS_LIST.map(act => {
                      const isSelected = selectedActions.includes(act.id);
                      return (
                        <div 
                          key={act.id} 
                          onClick={() => toggleAction(act.id)}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold cursor-pointer border ${isSelected ? 'bg-white border-gray-200 text-gray-700 shadow-sm' : 'bg-transparent border-transparent text-gray-400 hover:bg-gray-100'}`}
                        >
                          {act.label} {isSelected && <X size={12} className="text-gray-400" />}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">Select the default actions that will be available for this group.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Inherits From (Optional)</label>
                  <select 
                    value={inheritsFrom}
                    onChange={(e) => setInheritsFrom(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="">Select parent group</option>
                  </select>
                  <p className="text-[10px] text-gray-500 mt-1">Select a parent group to inherit permissions.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-1">3. Notes (Optional)</h3>
            <p className="text-[10px] text-gray-500 mb-4">Additional notes about this permission group.</p>
            
            <textarea 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              placeholder="Enter notes..." 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            ></textarea>
            <div className="text-right text-[10px] text-gray-400 mt-1">{notes.length}/500</div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4">
            <Link 
              href="/roles-permissions"
              className="px-6 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                className="px-6 py-2 border border-gray-200 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
              >
                {isSubmitting ? 'Creating...' : 'Create Group'}
              </button>
            </div>
          </div>

        </div>
        
        {/* Right Column: Preview & Summary */}
        <div className="xl:col-span-1 space-y-6">
          
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-1">Permission Group Preview</h3>
            <p className="text-[10px] text-gray-500 mb-4">This is how the permission group will appear in the system.</p>
            
            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-800 text-lg">{groupName || 'Group Name'}</h4>
                    {isActive && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">Active</span>}
                  </div>
                  <div className="text-[11px] font-medium text-gray-400 mb-2">{groupCode || 'group_code'}</div>
                  <div className="text-xs font-medium text-gray-500 leading-relaxed">
                    {description || 'Manage group and related activities'}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 bg-gray-200 text-gray-700 text-[10px] font-bold rounded">Module: {module || 'None'}</span>
                <span className="px-2.5 py-1 bg-gray-200 text-gray-700 text-[10px] font-bold rounded">{selectedActions.length} Default Actions</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-1">Default Actions Preview</h3>
            <p className="text-[10px] text-gray-500 mb-4">These actions will be available for this group.</p>
            
            <div className="space-y-4">
              {DEFAULT_ACTIONS_LIST.filter(a => selectedActions.includes(a.id)).map(act => (
                <div key={act.id} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                    <act.icon size={14} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{act.label}</div>
                    <div className="text-[10px] text-gray-500 font-medium">{act.desc.replace('resources', groupName || 'resources')}</div>
                  </div>
                </div>
              ))}
              {selectedActions.length === 0 && (
                <div className="text-xs text-gray-400 italic">No actions selected.</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Summary</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-medium">Module</span>
                <span className="font-bold text-gray-800 text-right">{module || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-medium">Resource Type</span>
                <span className="font-bold text-gray-800 text-right capitalize">{resourceType} Resource</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-medium">Status</span>
                <div className="flex items-center gap-1.5 font-bold text-gray-800">
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  {isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500 font-medium">Sort Order</span>
                <span className="font-bold text-gray-800 text-right">{sortOrder}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-gray-500 font-medium">Inherits From</span>
                <span className="font-bold text-gray-800 text-right">{inheritsFrom || '-'}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800">
            <Info size={16} className="shrink-0 mt-0.5 text-blue-600" />
            <div className="text-xs font-medium leading-relaxed">
              After creating the group, you can add specific permissions and assign them to roles.
            </div>
          </div>
          
        </div>

      </div>
    </form>
  );
}
