"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronRight, 
  UploadCloud, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  ShieldCheck, 
  Clock, 
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Activity,
  Edit
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    email: "",
    phone_number: "",
    department: "",
    job_title: ""
  });
  
  // Password Change State
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  useEffect(() => {
    const loadProfile = async () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setUserData(userObj); // Set initially for fast render
          
          // Fetch freshest user data from backend
          const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/${userObj.id}`);
          if (profileRes.ok) {
            const freshData = await profileRes.json();
            // Merge fresh data
            const merged = {
              ...userObj,
              email: freshData.email,
              phone_number: freshData.phone,
              department: freshData.department,
              last_login: freshData.last_login !== "Never" ? new Date(freshData.last_login).toISOString() : null,
              password_last_changed: freshData.password_changed !== "Unknown" ? new Date(freshData.password_changed).toISOString() : null
            };
            setUserData(merged);
            localStorage.setItem("user", JSON.stringify(merged));
          }
          
          // Fetch real activities
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/${userObj.id}/activities`);
          if (res.ok) {
            const data = await res.json();
            setActivities(data);
          }
        } catch (e) {
          console.error("Failed to load profile data", e);
        }
      }
      setIsLoading(false);
    };
    loadProfile();
  }, []);

  const handleEditClick = () => {
    setEditForm({
      email: userData.email || "",
      phone_number: userData.phone_number || "",
      department: userData.department || "",
      job_title: userData.job_title || ""
    });
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/${userData.id}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: editForm.email,
          phone_number: editForm.phone_number,
          department: editForm.department,
          job_title: editForm.job_title
        })
      });

      if (res.ok) {
        const updatedUser = {
          ...userData,
          email: editForm.email,
          phone_number: editForm.phone_number,
          department: editForm.department,
          job_title: editForm.job_title
        };
        setUserData(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        // Refresh activities
        const actRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/${userData.id}/activities`);
        if (actRes.ok) {
          const actData = await actRes.json();
          setActivities(actData);
        }
      } else {
        const errorData = await res.json();
        console.error("Failed to update profile", errorData);
        alert(`Error: ${errorData.detail || "Failed to update profile"}`);
      }
    } catch (e) {
      console.error("Network error", e);
      alert("Network error. Please try again.");
    } finally {
      setIsEditing(false);
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-gray-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col h-full items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
          <User size={32} />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800">Profile Not Found</h2>
          <p className="text-sm text-gray-500 mt-1">We couldn't load your profile information.</p>
        </div>
        <button 
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const userName = userData.full_name || "Admin User";
  const userRole = userData.roles?.[0] || "Administrator";
  const initials = userName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="flex flex-col h-full space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <ChevronRight size={12} />
          <Link href="/users" className="hover:text-gray-800">Users</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">My Profile</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your personal information and account security.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Main Info) */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden relative">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
            
            <div className="px-6 pb-6 relative">
              <div className="flex justify-between items-end -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700 shadow-sm relative group overflow-hidden">
                  {initials}
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <UploadCloud size={20} className="mb-1" />
                    <span className="text-[9px] font-bold">UPDATE</span>
                  </div>
                </div>
                {!isEditing ? (
                  <button 
                    onClick={handleEditClick}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 transition-colors flex items-center gap-1.5"
                  >
                    <Edit size={12} /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 transition-colors"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-800">{userName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    {userRole}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Active
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email Address</div>
                    {isEditing ? (
                      <input 
                        type="email" 
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-2 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-800">{userData.email}</div>
                    )}
                  </div>
                </div>
                
                {/* Phone Number */}
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.phone_number}
                        onChange={(e) => setEditForm({...editForm, phone_number: e.target.value})}
                        className="w-full px-2 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-800">{userData.phone_number || "-"}</div>
                    )}
                  </div>
                </div>
                
                {/* Department */}
                <div className="flex items-start gap-3">
                  <Briefcase size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Department</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.department}
                        onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                        className="w-full px-2 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter department"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-800">{userData.department || "-"}</div>
                    )}
                  </div>
                </div>

                {/* Job Title */}
                <div className="flex items-start gap-3">
                  <User size={16} className="text-gray-400 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Job Title</div>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.job_title}
                        onChange={(e) => setEditForm({...editForm, job_title: e.target.value})}
                        className="w-full px-2 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter job title"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-800">{userData.job_title || "-"}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-600" /> Account Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-600">Last Login</span>
                </div>
                <span className="text-xs font-bold text-gray-800">
                  {userData.last_login ? new Date(userData.last_login).toLocaleString() : "Never"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-gray-400" />
                  <span className="text-xs font-medium text-gray-600">Password Updated</span>
                </div>
                <span className="text-xs font-bold text-gray-800">
                  {userData.password_last_changed ? new Date(userData.password_last_changed).toLocaleDateString() : "Default Password"}
                </span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column (Settings & Activity) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Security & Password */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-lg">Security Settings</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">Update your password to keep your account secure.</p>
            </div>
            
            <form className="max-w-md space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Current Password</label>
                <div className="relative">
                  <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    placeholder="Enter current password" 
                    className="w-full pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" 
                  />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showCurrentPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Enter new password" 
                    className="w-full pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" 
                  />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNewPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                    <CheckCircle2 size={12} className="text-gray-300" /> Minimum 8 characters
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                    <CheckCircle2 size={12} className="text-gray-300" /> One uppercase & one number
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button type="button" className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-gray-800 shadow-sm transition-colors">
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <div className="mb-6 flex justify-between items-end pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Recent Activity</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Your latest actions in the platform.</p>
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
            </div>
            
            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              {activities.length > 0 ? (
                activities.map((act, index) => (
                  <div key={act.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active ${index > 0 ? 'mt-6' : ''}`}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${act.action.includes('Logged In') ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                      {act.action.includes('Logged In') ? <Activity size={12} /> : <CheckCircle2 size={12} />}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gray-800 text-sm">{act.action}</div>
                        <div className="text-[10px] font-bold text-gray-400">
                          {act.timestamp ? new Date(act.timestamp).toLocaleString() : 'Unknown'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 font-medium">{act.description}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-sm font-medium text-gray-500">
                  No recent activities found. Log in again to see activities!
                </div>
              )}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
