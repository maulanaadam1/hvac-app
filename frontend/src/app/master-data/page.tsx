"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Database, Plus, Search, Building2, MapPin, Layers, Settings2, Edit, Trash2 } from "lucide-react";

type Site = { id: string, name: string };
type Building = { id: string, name: string, site_id: string };
type Floor = { id: string, name: string, building_id: string };
type EquipmentType = { id: string, name: string, code: string, description: string };

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState('sites');
  
  const [sites, setSites] = useState<Site[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<EquipmentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals / Inputs
  const [newItemName, setNewItemName] = useState("");
  const [newItemCode, setNewItemCode] = useState("");
  const [selectedParentId, setSelectedParentId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Editing state
  const [editId, setEditId] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      const [resSites, resBuild, resFloor, resEq] = await Promise.all([
        fetch(`${baseUrl}/master-data/sites`),
        fetch(`${baseUrl}/master-data/buildings`),
        fetch(`${baseUrl}/master-data/floors`),
        fetch(`${baseUrl}/master-data/equipment-types`)
      ]);
      
      if (resSites.ok) setSites(await resSites.json());
      if (resBuild.ok) setBuildings(await resBuild.json());
      if (resFloor.ok) setFloors(await resFloor.json());
      if (resEq.ok) setEquipmentTypes(await resEq.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;
    setIsSubmitting(true);
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    let endpoint = "";
    let payload: any = { name: newItemName };

    if (activeTab === 'sites') endpoint = `/master-data/sites${editId ? '/' + editId : ''}`;
    if (activeTab === 'buildings') {
      endpoint = `/master-data/buildings${editId ? '/' + editId : ''}`;
      payload.site_id = selectedParentId;
    }
    if (activeTab === 'floors') {
      endpoint = `/master-data/floors${editId ? '/' + editId : ''}`;
      payload.building_id = selectedParentId;
    }
    if (activeTab === 'equipment') {
      endpoint = `/master-data/equipment-types${editId ? '/' + editId : ''}`;
      payload.code = newItemCode || newItemName.substring(0,3).toUpperCase();
      payload.description = "";
    }

    try {
      const res = await fetch(baseUrl + endpoint, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setNewItemName("");
        setNewItemCode("");
        setSelectedParentId("");
        setEditId(null);
        fetchData();
      } else {
        alert("Failed to save data");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, tab: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    let endpoint = "";
    if (tab === 'sites') endpoint = `/master-data/sites/${id}`;
    if (tab === 'buildings') endpoint = `/master-data/buildings/${id}`;
    if (tab === 'floors') endpoint = `/master-data/floors/${id}`;
    if (tab === 'equipment') endpoint = `/master-data/equipment-types/${id}`;

    try {
      const res = await fetch(baseUrl + endpoint, { method: "DELETE" });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete. It might be in use.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (item: any, tab: string) => {
    setEditId(item.id);
    setNewItemName(item.name);
    if (tab === 'buildings') setSelectedParentId(item.site_id);
    if (tab === 'floors') setSelectedParentId(item.building_id);
    if (tab === 'equipment') setNewItemCode(item.code);
  };

  const resetForm = () => {
    setEditId(null);
    setNewItemName("");
    setNewItemCode("");
    setSelectedParentId("");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetForm();
  };

  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-800">Master Data</h2>
            <p className="text-sm text-gray-500 mt-1">Manage sites, locations, buildings, and asset categories.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column (Navigation) */}
        <div className="w-full lg:w-64 shrink-0 flex flex-col space-y-1">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3">Location Master</div>
          <button onClick={() => handleTabChange('sites')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'sites' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <MapPin size={18} /> Sites & Campuses
          </button>
          <button onClick={() => handleTabChange('buildings')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'buildings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Building2 size={18} /> Buildings
          </button>
          <button onClick={() => handleTabChange('floors')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'floors' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Layers size={18} /> Floors
          </button>
          
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 mt-6">Equipment Master</div>
          <button onClick={() => handleTabChange('equipment')} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'equipment' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Settings2 size={18} /> Asset Types & Categories
          </button>
        </div>

        {/* Right Column (Content) */}
        <div className="flex-1 bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col overflow-hidden">
          
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-bold text-gray-800 text-lg capitalize">{activeTab.replace("-", " ")}</h3>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 overflow-y-auto">
            
            {/* Add Form */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-800 text-sm">{editId ? "Edit Item" : "Add New"}</h4>
                  {editId && (
                    <button onClick={resetForm} className="text-xs text-blue-600 font-bold hover:underline">Cancel</button>
                  )}
                </div>
                <form onSubmit={handleAdd} className="space-y-4">
                  {(activeTab === 'buildings' || activeTab === 'floors') && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Select Parent <span className="text-red-500">*</span></label>
                      <select 
                        value={selectedParentId}
                        onChange={e => setSelectedParentId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500" required>
                        <option value="">-- Select --</option>
                        {activeTab === 'buildings' && sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        {activeTab === 'floors' && buildings.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                      </select>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      value={newItemName}
                      onChange={e => setNewItemName(e.target.value)}
                      placeholder="e.g. Building B" 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
                  </div>

                  {activeTab === 'equipment' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Code <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={newItemCode}
                        onChange={e => setNewItemCode(e.target.value)}
                        placeholder="e.g. AHU" 
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting || (activeTab !== 'sites' && activeTab !== 'equipment' && !selectedParentId)}
                    className="w-full py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isSubmitting ? "Saving..." : "Save Data"}
                  </button>
                </form>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-2">
              <div className="border border-gray-100 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-[11px] text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Name</th>
                      {activeTab === 'buildings' && <th className="px-4 py-3 font-semibold">Site</th>}
                      {activeTab === 'floors' && <th className="px-4 py-3 font-semibold">Building</th>}
                      {activeTab === 'equipment' && <th className="px-4 py-3 font-semibold">Code</th>}
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {isLoading ? (
                      <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
                    ) : (
                      <>
                        {activeTab === 'sites' && sites.map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50/50">
                            <td className="px-4 py-3 font-bold text-gray-800">{s.name}</td>
                            <td className="px-4 py-3 text-right">
                              <button onClick={() => handleEdit(s, 'sites')} className="text-gray-400 hover:text-blue-600 mx-1"><Edit size={14}/></button>
                              <button onClick={() => handleDelete(s.id, 'sites')} className="text-gray-400 hover:text-red-600 mx-1"><Trash2 size={14}/></button>
                            </td>
                          </tr>
                        ))}
                        {activeTab === 'buildings' && buildings.map((b) => {
                          const site = sites.find(s => s.id === b.site_id);
                          return (
                            <tr key={b.id} className="hover:bg-gray-50/50">
                              <td className="px-4 py-3 font-bold text-gray-800">{b.name}</td>
                              <td className="px-4 py-3 text-gray-500">{site?.name}</td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => handleEdit(b, 'buildings')} className="text-gray-400 hover:text-blue-600 mx-1"><Edit size={14}/></button>
                                <button onClick={() => handleDelete(b.id, 'buildings')} className="text-gray-400 hover:text-red-600 mx-1"><Trash2 size={14}/></button>
                              </td>
                            </tr>
                          )
                        })}
                        {activeTab === 'floors' && floors.map((f) => {
                          const build = buildings.find(b => b.id === f.building_id);
                          return (
                            <tr key={f.id} className="hover:bg-gray-50/50">
                              <td className="px-4 py-3 font-bold text-gray-800">{f.name}</td>
                              <td className="px-4 py-3 text-gray-500">{build?.name}</td>
                              <td className="px-4 py-3 text-right">
                                <button onClick={() => handleEdit(f, 'floors')} className="text-gray-400 hover:text-blue-600 mx-1"><Edit size={14}/></button>
                                <button onClick={() => handleDelete(f.id, 'floors')} className="text-gray-400 hover:text-red-600 mx-1"><Trash2 size={14}/></button>
                              </td>
                            </tr>
                          )
                        })}
                        {activeTab === 'equipment' && equipmentTypes.map((eq) => (
                          <tr key={eq.id} className="hover:bg-gray-50/50">
                            <td className="px-4 py-3 font-bold text-gray-800">{eq.name}</td>
                            <td className="px-4 py-3 font-bold text-blue-600">{eq.code}</td>
                            <td className="px-4 py-3 text-right">
                              <button onClick={() => handleEdit(eq, 'equipment')} className="text-gray-400 hover:text-blue-600 mx-1"><Edit size={14}/></button>
                              <button onClick={() => handleDelete(eq.id, 'equipment')} className="text-gray-400 hover:text-red-600 mx-1"><Trash2 size={14}/></button>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
