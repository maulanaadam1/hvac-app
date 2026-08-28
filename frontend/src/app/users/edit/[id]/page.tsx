"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, UploadCloud, EyeOff, Eye, Info, ArrowRight, LayoutDashboard, Package, Wrench, ClipboardList, FileText, CheckCircle2, UserPlus, X, Loader2, Check, Save } from "lucide-react";
import Link from "next/link";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const userId = params.id;

  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    phone_number: "",
    department: "",
    job_title: "",
    status: "active",
    language: "en",
    password: "",
    confirmPassword: "",
    role_name: ""
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/users/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      
      const data = await res.json();
      
      setFormData({
        fullName: data.name,
        email: data.email,
        username: data.username,
        phone_number: data.phone || "",
        department: data.department || "",
        job_title: "", // Not available in current GET schema, keep blank
        status: data.status.toLowerCase(),
        language: "en", // Default for now
        password: "", // Keep blank for security
        confirmPassword: "",
        role_name: data.role === "None" ? "" : data.role
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password Validations (Only if user tries to type a new password)
  const pwd = formData.password;
  const isTypingPassword = pwd.length > 0;
  
  const hasMinLength = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  
  const rulesPassedCount = [hasMinLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;
  
  let pwdStrength = "Weak";
  let pwdStrengthColor = "bg-red-500";
  let pwdStrengthText = "text-red-500";
  if (rulesPassedCount === 4) {
    pwdStrength = "Strong";
    pwdStrengthColor = "bg-green-500";
    pwdStrengthText = "text-green-500";
  } else if (rulesPassedCount >= 2) {
    pwdStrength = "Medium";
    pwdStrengthColor = "bg-orange-400";
    pwdStrengthText = "text-orange-500";
  } else if (pwd.length === 0) {
    pwdStrength = "";
    pwdStrengthColor = "bg-gray-200";
  }

  const isPwdMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;
  const showMatchError = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;

  const isFormValid = () => {
    if (isTypingPassword) {
      return rulesPassedCount === 4 && isPwdMatch;
    }
    return true; // If they aren't changing the password, it's valid
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.fullName || !formData.email || !formData.username || !formData.department || !formData.role_name) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!isFormValid()) {
      setError("Please ensure password requirements match if you are changing it.");
      return;
    }

    // Split name
    const nameParts = formData.fullName.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || " ";

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      username: formData.username,
      phone_number: formData.phone_number || null,
      department: formData.department,
      job_title: formData.job_title || null,
      status: formData.status,
      language: formData.language,
      password: formData.password || "dummy_to_bypass_schema", // If empty, we send a dummy string but handle it in backend, or update the pydantic schema.
      // Wait, Pydantic UserCreate requires password. 
      // It's better to just send what we have, but our FastAPI PUT endpoint uses UserCreate which requires password.
      // We will send the password as is. In FastAPI we check `if user_in.password and user_in.password != "dummy_to_bypass_schema": update hash`
      role_name: formData.role_name
    };
    
    // To cleanly bypass Pydantic requirement on PUT without making it Optional globally:
    if (!payload.password) payload.password = "DONT_UPDATE_PASSWORD";

    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/api/v1/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to update user");
      }

      // Success
      router.push("/users");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full space-y-6">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/users" className="hover:text-gray-800">Users</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">Edit User</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Edit User</h2>
          <p className="text-sm text-gray-500 mt-1">Modify user details and system access permissions.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium flex justify-between items-center">
          {error}
          <button type="button" onClick={() => setError(null)}><X size={16}/></button>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative">
        
        {/* Left Column (User Info & Security) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* User Information */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-6">User Information</h3>
            
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Photo Upload */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="w-32 h-32 rounded-full border border-gray-200 overflow-hidden shrink-0 group relative cursor-pointer">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${formData.fullName}`} alt="" className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <UploadCloud size={20} className="mb-1" />
                    <span className="text-[10px] font-bold">Change</span>
                  </div>
                </div>
              </div>
              
              {/* Name and Email */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter full name" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter email address" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Username <span className="text-red-500">*</span></label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Enter username" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm mb-1" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📞</span>
                  <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Enter phone number" className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Department <span className="text-red-500">*</span></label>
                <select name="department" value={formData.department} onChange={handleChange} required className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer">
                  <option value="" disabled className="text-gray-400">Select department</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Operations">Operations</option>
                  <option value="Finance">Finance</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Job Title</label>
                <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} placeholder="Enter job title" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Status <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className={`absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${formData.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="locked">Locked</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Language</label>
                <select name="language" value={formData.language} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer">
                  <option value="en">English</option>
                  <option value="id">Bahasa Indonesia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-1">Account Security</h3>
            <p className="text-[11px] text-gray-500 mb-6">Leave blank if you do not want to change the password.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">New Password</label>
                <div className="relative mb-2">
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Enter new password" className="w-full pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                
                {/* Password Strength Bar */}
                {isTypingPassword && (
                  <div className="space-y-1.5">
                    <div className="flex gap-1">
                      <div className={`h-1 flex-1 rounded-full ${rulesPassedCount >= 1 ? pwdStrengthColor : 'bg-gray-200'}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${rulesPassedCount >= 2 ? pwdStrengthColor : 'bg-gray-200'}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${rulesPassedCount === 4 ? pwdStrengthColor : 'bg-gray-200'}`}></div>
                    </div>
                    <div className={`text-[10px] font-bold ${pwdStrengthText}`}>
                      {pwdStrength ? `Password strength: ${pwdStrength}` : 'Enter a password'}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Confirm New Password</label>
                <div className="relative mb-1">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className={`w-full pl-3 pr-9 py-2 bg-white border rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 shadow-sm ${showMatchError ? 'border-red-400 focus:ring-red-500' : isPwdMatch ? 'border-green-400 focus:ring-green-500' : 'border-gray-200 focus:ring-blue-500'}`} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirmPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                {/* Match indicator */}
                <div className="h-4">
                  {showMatchError && <div className="text-[10px] font-bold text-red-500 flex items-center gap-1"><X size={10} /> Passwords do not match</div>}
                  {isPwdMatch && <div className="text-[10px] font-bold text-green-600 flex items-center gap-1"><Check size={10} /> Passwords match</div>}
                </div>
              </div>
            </div>

            {isTypingPassword && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-6 pt-6 border-t border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 mb-2">Password must contain:</h4>
                  <ul className="space-y-1.5">
                    <li className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
                      {hasMinLength ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-1 h-1 rounded-full bg-gray-400 ml-1 mr-0.5"></div>} 
                      Minimum 8 characters
                    </li>
                    <li className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${hasUpper ? 'text-green-600' : 'text-gray-500'}`}>
                      {hasUpper ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-1 h-1 rounded-full bg-gray-400 ml-1 mr-0.5"></div>} 
                      At least one uppercase letter
                    </li>
                    <li className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                      {hasNumber ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-1 h-1 rounded-full bg-gray-400 ml-1 mr-0.5"></div>} 
                      At least one number
                    </li>
                    <li className={`flex items-center gap-2 text-[11px] font-medium transition-colors ${hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                      {hasSpecial ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-1 h-1 rounded-full bg-gray-400 ml-1 mr-0.5"></div>} 
                      At least one special character
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Roles & Scope) */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Role & Permissions */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-1">Role & Permissions</h3>
            <p className="text-xs text-gray-500 font-medium mb-6">Assign a role to define user permissions and access level.</p>
            
            <div className="mb-4">
              <div className="flex justify-between items-end mb-1.5">
                <label className="block text-xs font-bold text-gray-700">Role <span className="text-red-500">*</span></label>
                <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">View role details</a>
              </div>
              <select name="role_name" value={formData.role_name} onChange={handleChange} required className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer">
                <option value="" disabled className="text-gray-400">Select a role</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Facility Manager">Facility Manager</option>
                <option value="Lead Technician">Lead Technician</option>
              </select>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 flex gap-3 mb-6">
              <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-gray-800 mb-0.5">Permissions are inherited from the selected role.</div>
                <div className="text-[10px] text-gray-500 font-medium">You can view role permissions or create a custom role.</div>
              </div>
            </div>
            
            <h4 className="text-xs font-bold text-gray-800 mb-3">Permissions Preview</h4>
            <div className="border border-gray-100 rounded-lg overflow-hidden mb-4">
              <div className="flex items-center justify-between p-3 border-b border-gray-50 bg-white">
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={14} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Dashboard</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">View dashboard and system overview</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 font-bold text-[10px] rounded">Allow</span>
              </div>
            </div>

            <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline">
              View all permissions (24) <ArrowRight size={12} />
            </a>
          </div>

          {/* Site / Scope Access */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h3 className="font-bold text-gray-800 text-lg mb-1">Site / Scope Access</h3>
            <p className="text-xs text-gray-500 font-medium mb-6">Define which locations or sites the user can access.</p>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Radio Group */}
              <div className="space-y-4">
                
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mt-0.5 flex items-center justify-center group-hover:border-blue-500">
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">All Sites</div>
                    <div className="text-[10px] text-gray-500 font-medium mt-0.5">User can access all sites and locations</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-full border-4 border-blue-600 bg-white mt-0.5 flex items-center justify-center"></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Specific Sites</div>
                    <div className="text-[10px] text-gray-500 font-medium mt-0.5 w-48">User can access selected sites and locations only</div>
                  </div>
                </label>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to push content above fixed footer */}
      <div className="h-24 w-full shrink-0"></div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 right-0 md:left-64 left-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3 z-50">
        <Link href="/users" className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition-colors">
          Cancel
        </Link>
        <button type="submit" disabled={isLoading || !isFormValid()} className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </form>
  );
}
