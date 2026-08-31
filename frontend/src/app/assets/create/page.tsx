"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  UploadCloud, 
  Calendar, 
  ScanBarcode, 
  Info,
  Download,
  X,
  Save,
  CheckCircle2
} from "lucide-react";

type MasterItem = { id: string, name: string };
type MasterBuilding = { id: string, name: string, site_id: string };
type MasterFloor = { id: string, name: string, building_id: string };
type MasterEquipment = { id: string, name: string, code: string };

export default function AddAssetPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>("https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80");

  // Master Data States
  const [sites, setSites] = useState<MasterItem[]>([]);
  const [buildings, setBuildings] = useState<MasterBuilding[]>([]);
  const [floors, setFloors] = useState<MasterFloor[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<MasterEquipment[]>([]);

  // Selected values for cascading dropdowns
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [selectedBuildingId, setSelectedBuildingId] = useState("");

  useEffect(() => {
    const fetchMasterData = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      try {
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
      }
    };
    fetchMasterData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/assets");
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] relative">
      
      {/* Page Header */}
      <div className="px-8 pt-6 pb-4 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-xs font-medium text-gray-500 gap-1.5">
            <Link href="/assets" className="hover:text-blue-600 transition-colors">Assets</Link>
            <ChevronRight size={12} />
            <Link href="/assets" className="hover:text-blue-600 transition-colors">Asset List</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-bold">Add New Asset</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Asset</h1>
            <p className="text-sm text-gray-500 mt-1">Enter asset information to register a new HVAC equipment or system.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <Download size={16} /> Import Asset
          </button>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto px-8 pb-28 custom-scrollbar">
        <form id="add-asset-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column - Main Details */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* 1. Basic Information */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Info size={14} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm">1. Basic Information</h2>
                    <p className="text-[11px] text-gray-500">Provide the basic details of the asset.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Asset Name <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. AHU-01, Chiller Plant 1" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Asset Tag / ID <span className="text-red-500">*</span></label>
                    <input type="text" placeholder="e.g. AHU-2024-0001" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
                    <p className="text-[10px] text-gray-400 mt-0.5">Unique ID or tag for this asset</p>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Asset Type <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none" required>
                      <option value="">Select asset type</option>
                      <option value="HVAC">HVAC System</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Category <span className="text-red-500">*</span></label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none" required>
                      <option value="">Select category</option>
                      {equipmentTypes.map(eq => (
                        <option key={eq.id} value={eq.id}>{eq.name} ({eq.code})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Manufacturer</label>
                    <input type="text" placeholder="e.g. Daikin, Trane, Carrier" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Model</label>
                    <input type="text" placeholder="e.g. FXDQ100PVE" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Serial Number</label>
                    <input type="text" placeholder="Enter serial number" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Year of Manufacture</label>
                    <input type="number" min="1900" max="2100" placeholder="e.g. 2024" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Barcode / QR Code</label>
                    <div className="relative">
                      <input type="text" placeholder="Enter barcode or scan" className="w-full px-3 pr-9 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      <ScanBarcode className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Location Information */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Info size={14} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm">2. Location Information</h2>
                    <p className="text-[11px] text-gray-500">Specify where this asset is installed.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Site / Location <span className="text-red-500">*</span></label>
                    <select 
                      value={selectedSiteId}
                      onChange={e => { setSelectedSiteId(e.target.value); setSelectedBuildingId(""); }}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none" required>
                      <option value="">Select site or location</option>
                      {sites.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Building <span className="text-red-500">*</span></label>
                    <select 
                      value={selectedBuildingId}
                      onChange={e => setSelectedBuildingId(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none" required>
                      <option value="">Select building</option>
                      {buildings.filter(b => b.site_id === selectedSiteId).map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Floor</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none">
                      <option value="">Select floor</option>
                      {floors.filter(f => f.building_id === selectedBuildingId).map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Room / Area</label>
                    <input type="text" placeholder="e.g. Mechanical Room" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Zone</label>
                    <input type="text" placeholder="e.g. Zone A" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">GPS Location (Optional)</label>
                    <input type="text" placeholder="e.g. -6.200000, 106.816666" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </div>

              {/* 3. Technical Specifications */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Info size={14} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm">3. Technical Specifications</h2>
                    <p className="text-[11px] text-gray-500">Enter technical and operational specifications.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Capacity</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="e.g. 100" className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                      <input type="text" placeholder="e.g. TR, kW, CFM" className="w-1/2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Voltage</label>
                    <input type="text" placeholder="e.g. 380 V" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Phase</label>
                    <input type="text" placeholder="e.g. 3 Phase" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Refrigerant Type</label>
                    <input type="text" placeholder="e.g. R410A" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Refrigerant Capacity</label>
                    <input type="text" placeholder="e.g. 12 kg" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Airflow Capacity</label>
                    <input type="text" placeholder="e.g. 5000 CFM" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Power Consumption</label>
                    <input type="text" placeholder="e.g. 15 kW" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>

                <div className="mt-5 space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Additional Specifications (Optional)</label>
                  <textarea rows={3} placeholder="Enter any additional technical specifications..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                  <div className="text-right text-[10px] text-gray-400">0/500</div>
                </div>
              </div>

            </div>

            {/* Right Column - Secondary Details */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* 4. Asset Image */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 text-sm mb-1">4. Asset Image</h2>
                <p className="text-[11px] text-gray-500 mb-4">Upload image of the asset (optional).</p>
                
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <UploadCloud size={32} className="text-blue-500 mb-3" />
                    <p className="text-sm font-bold text-gray-700">Drag and drop an image here</p>
                    <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                    <p className="text-[10px] text-gray-400 mt-4">JPG, PNG or WEBP (Max. 5MB)</p>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                    <img src={imagePreview} alt="Asset preview" className="w-full h-40 object-cover" />
                    <button 
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-md text-gray-600 hover:text-red-500 hover:bg-white shadow-sm transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                    <div className="bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700 border-t border-gray-200">
                      AHU-01.jpg
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Operational Information */}
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 text-sm mb-1">5. Operational Information</h2>
                <p className="text-[11px] text-gray-500 mb-4">Define status and dates.</p>
                
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Status <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></div>
                      <select className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none font-medium text-gray-700" required>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Under Maintenance">Under Maintenance</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Installation Date</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Warranty Expiry (Optional)</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Commissioning Date (Optional)</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-bold text-gray-700">Notes (Optional)</label>
                    <textarea rows={4} placeholder="Enter notes about this asset..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                    <div className="text-right text-[10px] text-gray-400">0/255</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between z-10">
        <button 
          type="button"
          onClick={() => router.push('/assets')}
          className="px-5 py-2.5 border border-gray-200 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <div className="flex gap-3">
          <button 
            type="button"
            className="px-5 py-2.5 border border-gray-200 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
          <button 
            type="submit"
            form="add-asset-form"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Saving...</span>
            ) : (
              <span className="flex items-center gap-2"><Save size={16} /> Save Asset</span>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
