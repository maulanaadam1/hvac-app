"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Filter, MoreHorizontal, ArrowUpDown, Box, PlayCircle, AlertTriangle, AlertCircle, PowerOff, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AssetsPage() {
  const router = useRouter();
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAssets = async () => {
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      const res = await fetch(`${baseUrl}/assets/`);
      if (res.ok) {
        setAssets(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
    try {
      const res = await fetch(`${baseUrl}/assets/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAssets();
      } else {
        alert("Failed to delete asset.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 pb-8">
      
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Box size={24} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Total Assets</div>
            <div className="text-2xl font-bold text-gray-800">1,245</div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <PlayCircle size={24} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Running</div>
            <div className="text-2xl font-bold text-gray-800">1,198</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Warning</div>
            <div className="text-2xl font-bold text-gray-800">25</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Critical</div>
            <div className="text-2xl font-bold text-gray-800">12</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            <PowerOff size={24} />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Offline</div>
            <div className="text-2xl font-bold text-gray-800">10</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="relative w-full lg:w-72 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap">
          <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 min-w-[140px]">
            <option>All Types</option>
          </select>
          <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 min-w-[140px]">
            <option>All Locations</option>
          </select>
          <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 min-w-[120px]">
            <option>All Status</option>
          </select>
          <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 min-w-[150px]">
            <option>All Manufacturers</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            More Filters
          </button>
          <Link href="/assets/create" className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm ml-auto lg:ml-2">
            <Plus size={16} />
            Add Asset
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-gray-500 uppercase bg-white border-b border-gray-200 tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold flex items-center gap-1">ASSET ID <ArrowUpDown size={12}/></th>
                <th className="px-6 py-4 font-semibold">EQUIPMENT</th>
                <th className="px-6 py-4 font-semibold">LOCATION <ArrowUpDown size={12} className="inline ml-1"/></th>
                <th className="px-6 py-4 font-semibold">TYPE <ArrowUpDown size={12} className="inline ml-1"/></th>
                <th className="px-6 py-4 font-semibold">STATUS</th>
                <th className="px-6 py-4 font-semibold">CRITICALITY</th>
                <th className="px-6 py-4 font-semibold">MANUFACTURER <ArrowUpDown size={12} className="inline ml-1"/></th>
                <th className="px-6 py-4 font-semibold">LAST MAINTENANCE <ArrowUpDown size={12} className="inline ml-1"/></th>
                <th className="px-6 py-4 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={9} className="text-center py-8 text-gray-400">Loading assets...</td></tr>
              ) : assets.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-8 text-gray-400">No assets found.</td></tr>
              ) : (
                assets.map((asset, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap">
                      <Link href={`/assets/${asset.id}`} className="hover:text-blue-600 transition-colors">
                        {asset.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center shrink-0 text-[8px] text-gray-400 border border-gray-200">
                          Img
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{asset.name || asset.equipment}</div>
                          <div className="text-xs text-blue-600 font-medium">{asset.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {asset.location}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {asset.equipment}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold border
                        ${asset.status === 'Running' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        ${asset.status === 'Warning' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                        ${asset.status === 'Offline' ? 'bg-gray-50 text-gray-600 border-gray-200' : ''}
                      `}>
                        {asset.status === 'Running' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>}
                        {asset.status === 'Warning' && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-1.5"></div>}
                        {asset.status === 'Offline' && <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-1.5"></div>}
                        {asset.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold
                        ${asset.criticality === 'High' ? 'text-red-600 bg-red-50' : ''}
                        ${asset.criticality === 'Medium' ? 'text-orange-600 bg-orange-50' : ''}
                        ${asset.criticality === 'Low' ? 'text-blue-600 bg-blue-50' : ''}
                      `}>
                        {asset.criticality}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs font-medium">
                      {asset.manufacturer}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-medium text-gray-800">{asset.lastMaintenance}</div>
                      <div className="text-[10px] text-gray-500">{asset.lastMaintenanceAgo}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => router.push(`/assets/edit/${asset.id}`)} className="text-gray-400 hover:text-blue-600 transition-colors p-1.5 rounded-md hover:bg-blue-50">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(asset.id)} className="text-gray-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="mt-auto px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">Showing 1 to 10 of 1,245 assets</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-medium text-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium text-sm">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium text-sm">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-gray-600 font-medium text-sm">125</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
