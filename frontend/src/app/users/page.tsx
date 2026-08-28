"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Download, Plus, Users, UserCheck, UserMinus, UserX, ShieldCheck, MoreHorizontal, X, MapPin, Phone, Mail, Edit, Loader2 } from "lucide-react";
import Link from "next/link";

type UserSummary = {
  id: string;
  name: string;
  email: string;
  role: string;
  site: string;
  status: string;
  date: string;
  time: string;
};

type UserDetail = {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string | null;
  department: string;
  role: string;
  roles: string[];
  scopes: { site: string; access: string }[];
  status: string;
  joined_date: string;
  last_login: string;
  password_changed: string;
  two_factor_enabled: boolean;
};

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch detail when a user is clicked
  const handleRowClick = async (userId: string) => {
    setSelectedUserId(userId);
    setIsDetailLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/${userId}`);
      const data = await res.json();
      setUserDetail(data);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setSelectedUserId(null);
    setUserDetail(null);
  };

  const handleToggleStatus = async (action: 'activate' | 'deactivate' | 'lock' | 'unlock') => {
    if (!userDetail) return;
    
    let payload = {};
    if (action === 'activate') payload = { is_active: true };
    if (action === 'deactivate') payload = { is_active: false };
    if (action === 'lock') payload = { is_locked: true };
    if (action === 'unlock') payload = { is_locked: false };
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/${userDetail.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchUsers();
        handleRowClick(userDetail.id); // re-fetch detail to update UI
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async () => {
    if (!userDetail) return;
    if (!confirm(`Are you sure you want to delete ${userDetail.name}? This action cannot be undone.`)) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/${userDetail.id}`, { method: "DELETE" });
      if (res.ok) {
        closeDetail();
        fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Stats calculation
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = users.filter(u => u.status === 'Inactive').length;
  const lockedUsers = users.filter(u => u.status === 'Locked').length;
  const adminUsers = users.filter(u => u.role === 'Super Admin').length;

  return (
    <div className="flex flex-col h-full space-y-6 pb-12">
      
      {/* Header & Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Users</h2>
          <p className="text-sm text-gray-500 mt-1">Manage system users, roles, and permissions.</p>
        </div>
        <Link href="/users/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={16} />
          Add User
        </Link>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
            <Users size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">Total Users</div>
          <div className="text-2xl font-bold text-gray-800">{totalUsers}</div>
          <div className="text-[10px] text-gray-400 mt-1">All users in system</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
            <UserCheck size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">Active Users</div>
          <div className="text-2xl font-bold text-gray-800">{activeUsers}</div>
          <div className="text-[10px] font-bold text-gray-800 mt-1">{totalUsers ? Math.round((activeUsers/totalUsers)*100) : 0}% <span className="font-medium text-gray-500">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mb-2">
            <UserMinus size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">Inactive Users</div>
          <div className="text-2xl font-bold text-gray-800">{inactiveUsers}</div>
          <div className="text-[10px] font-bold text-gray-800 mt-1">{totalUsers ? Math.round((inactiveUsers/totalUsers)*100) : 0}% <span className="font-medium text-gray-500">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
            <UserX size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">Locked Users</div>
          <div className="text-2xl font-bold text-gray-800">{lockedUsers}</div>
          <div className="text-[10px] font-bold text-gray-800 mt-1">{totalUsers ? Math.round((lockedUsers/totalUsers)*100) : 0}% <span className="font-medium text-gray-500">of total</span></div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
            <ShieldCheck size={20} />
          </div>
          <div className="text-xs font-medium text-gray-500">System Admins</div>
          <div className="text-2xl font-bold text-gray-800">{adminUsers}</div>
          <div className="text-[10px] font-bold text-gray-800 mt-1">{totalUsers ? Math.round((adminUsers/totalUsers)*100) : 0}% <span className="font-medium text-gray-500">of total</span></div>
        </div>
      </div>

      <div className={`grid grid-cols-1 gap-6 relative ${selectedUserId ? 'xl:grid-cols-3' : 'xl:grid-cols-1'}`}>
        
        {/* Table area */}
        <div className={`${selectedUserId ? 'xl:col-span-2' : 'xl:col-span-1'} space-y-4 transition-all duration-300`}>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search users..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"/>
            </div>
            <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 w-32 outline-none"><option>All Status</option></select>
            <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 w-32 outline-none"><option>All Roles</option></select>
            <select className="bg-white border border-gray-200 shadow-sm text-gray-700 font-bold text-xs rounded-lg px-3 py-2 w-32 outline-none"><option>All Sites</option></select>
            <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50">
              <Filter size={14} /> Filters
            </button>
            <button className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-50">
              <Download size={14} /> Export
            </button>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[10px] text-gray-400 uppercase font-bold border-b border-gray-100 bg-white tracking-wider">
                  <tr>
                    <th className="px-4 py-4">USER</th>
                    <th className="px-4 py-4">EMAIL</th>
                    <th className="px-4 py-4">ROLE</th>
                    <th className="px-4 py-4">SITE / SCOPE</th>
                    <th className="px-4 py-4">STATUS</th>
                    <th className="px-4 py-4">LAST LOGIN</th>
                    <th className="px-4 py-4 text-center">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                        <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center text-gray-400 font-medium">
                        No users found in database.
                      </td>
                    </tr>
                  ) : (
                    users.map((row) => (
                      <tr 
                        key={row.id} 
                        onClick={() => handleRowClick(row.id)}
                        className={`hover:bg-gray-50/50 cursor-pointer transition-colors ${selectedUserId === row.id ? 'bg-blue-50/20 border-l-2 border-l-blue-500' : 'border-l-2 border-l-transparent'}`}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden shrink-0">
                              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${row.name}`} alt="" className="w-full h-full object-cover"/>
                            </div>
                            <div className="font-bold text-gray-800 flex items-center gap-2">
                              {row.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-500">{row.email}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700`}>{row.role}</span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-gray-600">{row.site}</td>
                        <td className="px-4 py-4">
                          <span className={`font-bold ${row.status === 'Active' ? 'text-green-600' : row.status === 'Locked' ? 'text-red-600' : 'text-gray-500'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[10px] font-medium text-gray-500">
                          {row.date ? (
                            <>
                              <div className="font-bold text-gray-700">{row.date}</div>
                              <div>{row.time}</div>
                            </>
                          ) : (
                            <span>Never</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button 
                            className="text-gray-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 border border-gray-200 transition-colors" 
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/users/edit/${row.id}`);
                            }}
                            title="Edit User"
                          >
                            <MoreHorizontal size={14}/>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-white text-xs text-gray-500 rounded-b-xl">
              <span>Showing {users.length} results</span>
            </div>
          </div>
        </div>

        {/* User Detail Drawer */}
        {selectedUserId && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl flex flex-col pt-6 px-0 pb-0 h-[calc(100vh-120px)] sticky top-4">
              
              <div className="px-6 flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">User Detail</h3>
                <button onClick={closeDetail} className="text-gray-400 hover:text-gray-800 p-1 bg-gray-50 rounded-md border border-gray-200"><X size={16}/></button>
              </div>

              {isDetailLoading || !userDetail ? (
                <div className="flex-1 flex items-center justify-center pb-20">
                  <Loader2 size={32} className="animate-spin text-gray-300" />
                </div>
              ) : (
                <>
                  <div className="px-6 flex gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden shrink-0 border border-gray-100">
                      <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userDetail.name}`} alt="" className="w-full h-full object-cover"/>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-gray-800 text-lg">{userDetail.name}</div>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${userDetail.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{userDetail.status}</span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium mb-2">{userDetail.role}</div>
                      
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                          <Mail size={12} className="text-gray-400" />
                          {userDetail.email}
                        </div>
                        {userDetail.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                            <Phone size={12} className="text-gray-400" />
                            {userDetail.phone}
                          </div>
                        )}
                        {userDetail.scopes.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                            <MapPin size={12} className="text-gray-400" />
                            {userDetail.scopes[0].site}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="px-6 border-b border-gray-200">
                    <nav className="flex space-x-6">
                      <a href="#" className="border-b-2 border-blue-600 text-blue-600 py-3 px-1 text-xs font-bold">Profile</a>
                      <a href="#" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-3 px-1 text-xs font-bold">Roles & Permissions</a>
                    </nav>
                  </div>

                  <div className="p-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
                    {/* Profile Details */}
                    <div className="space-y-4 text-xs">
                      <div className="flex justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-gray-500 font-medium">User ID</span>
                        <span className="font-bold text-gray-800">{userDetail.id}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-gray-500 font-medium">Username</span>
                        <span className="font-bold text-gray-800">{userDetail.username}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-gray-500 font-medium">Department</span>
                        <span className="font-bold text-gray-800">{userDetail.department || '-'}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-gray-500 font-medium">Joined Date</span>
                        <span className="font-bold text-gray-800">{userDetail.joined_date}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2.5">
                        <span className="text-gray-500 font-medium">Last Login</span>
                        <span className="font-bold text-gray-800">{userDetail.last_login}</span>
                      </div>
                      <div className="flex justify-between pb-2.5 items-center">
                        <span className="text-gray-500 font-medium">2FA</span>
                        {userDetail.two_factor_enabled ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">Enabled</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-50 text-gray-500 border border-gray-200">Disabled</span>
                        )}
                      </div>
                    </div>

                    {/* Assigned Roles */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-bold text-gray-800 text-sm">Assigned Roles</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {userDetail.roles.map((r, i) => (
                          <span key={i} className="px-2 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">{r}</span>
                        ))}
                      </div>
                    </div>

                    {/* Site / Scope Access */}
                    {userDetail.scopes.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-bold text-gray-800 text-sm">Site / Scope Access</h4>
                        </div>
                        <div className="space-y-3 text-xs">
                          {userDetail.scopes.map((s, i) => (
                            <div key={i} className="flex justify-between">
                              <span className="font-medium text-gray-600">{s.site}</span>
                              <span className="font-bold text-gray-800">{s.access}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 p-6 pt-4 border-t border-gray-100 flex flex-col gap-3 shrink-0">
                    <div className="flex gap-3">
                      {userDetail.status === 'Inactive' ? (
                        <button onClick={() => handleToggleStatus('activate')} className="flex-1 py-2.5 bg-white border border-green-200 rounded-lg text-xs font-bold text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                          <UserCheck size={14} /> Activate User
                        </button>
                      ) : (
                        <button onClick={() => handleToggleStatus('deactivate')} className="flex-1 py-2.5 bg-white border border-orange-200 rounded-lg text-xs font-bold text-orange-600 hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                          <UserMinus size={14} /> Deactivate User
                        </button>
                      )}

                      {userDetail.status === 'Locked' ? (
                        <button onClick={() => handleToggleStatus('unlock')} className="flex-1 py-2.5 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                          <ShieldCheck size={14} /> Unlock User
                        </button>
                      ) : (
                        <button onClick={() => handleToggleStatus('lock')} className="flex-1 py-2.5 bg-[#e11d48] border border-transparent rounded-lg text-xs font-bold text-white hover:bg-[#be123c] transition-colors flex items-center justify-center gap-2 shadow-sm">
                          <UserX size={14} /> Lock User
                        </button>
                      )}
                    </div>
                    
                    <button onClick={handleDeleteUser} className="w-full py-2.5 bg-white border border-red-200 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                      <X size={14} /> Delete User
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
