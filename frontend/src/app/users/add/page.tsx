"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, UploadCloud, EyeOff, Eye, Info, ArrowRight, LayoutDashboard, Package, Wrench, ClipboardList, FileText, CheckCircle2, UserPlus, X, Loader2, Check } from "lucide-react";
import Link from "next/link";

export default function AddUserPage() {
  const router = useRouter();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password Validations
  const pwd = formData.password;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!formData.fullName || !formData.email || !formData.username || !formData.department || !formData.password || !formData.role_name) {
      setError("Please fill in all required fields.");
      return;
    }
    if (rulesPassedCount < 4) {
      setError("Please meet all password requirements before proceeding.");
      return;
    }
    if (!isPwdMatch) {
      setError("Passwords do not match.");
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
      password: formData.password,
      role_name: formData.role_name
    };

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to create user");
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col min-h-full space-y-6">
      
      {/* Breadcrumb & Header */}
      <div className="flex flex-col space-y-4">
        <div className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
          <Link href="/users" className="hover:text-gray-800">Users</Link>
          <ChevronRight size={12} />
          <span className="text-gray-800">Add User</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800">Add User</h2>
          <p className="text-sm text-gray-500 mt-1">Create a new user account and define access permissions.</p>
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
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 transition-colors cursor-pointer group">
                  <UploadCloud size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-gray-700">Upload Photo</span>
                </div>
                <span className="text-[10px] font-medium text-gray-400">JPG, PNG (max 2MB)</span>
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
                <span className="text-[10px] font-medium text-gray-500">Used for system login</span>
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
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-green-500"></div>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
            <h3 className="font-bold text-gray-800 text-lg mb-6">Account Security</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Password <span className="text-red-500">*</span></label>
                <div className="relative mb-2">
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required placeholder="Enter password" className="w-full pl-3 pr-9 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
                
                {/* Password Strength Bar */}
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
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Confirm Password <span className="text-red-500">*</span></label>
                <div className="relative mb-1">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm password" className={`w-full pl-3 pr-9 py-2 bg-white border rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 shadow-sm ${showMatchError ? 'border-red-400 focus:ring-red-500' : isPwdMatch ? 'border-green-400 focus:ring-green-500' : 'border-gray-200 focus:ring-blue-500'}`} />
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
              
              <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-800">Send Welcome Email</span>
                  {/* Toggle */}
                  <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 bottom-1 w-3 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-gray-500 leading-relaxed pr-8">
                  User will receive an email with login credentials and system access.
                </p>
              </div>
            </div>

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
              <div className="flex items-center justify-between p-3 border-b border-gray-50 bg-white">
                <div className="flex items-center gap-3">
                  <Package size={14} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Assets</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">View and manage assets</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 font-bold text-[10px] rounded">Allow</span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-gray-50 bg-white">
                <div className="flex items-center gap-3">
                  <Wrench size={14} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Work Orders</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">Create, edit, and manage work orders</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 font-bold text-[10px] rounded">Allow</span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-gray-50 bg-white">
                <div className="flex items-center gap-3">
                  <ClipboardList size={14} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Preventive Maintenance</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">View and manage PM plans and schedules</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 font-bold text-[10px] rounded">Allow</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white">
                <div className="flex items-center gap-3">
                  <FileText size={14} className="text-gray-400" />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Reports</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">View and export reports</div>
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

              {/* Select Dropdown & Tags */}
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Sites <span className="text-red-500">*</span></label>
                <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm appearance-none cursor-pointer mb-3">
                  <option value="" disabled selected className="text-gray-400">Select sites</option>
                  <option value="building_a">Building A</option>
                </select>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[11px] font-bold text-gray-700">
                    Building A <button type="button" className="text-gray-400 hover:text-gray-600"><X size={12}/></button>
                  </div>
                </div>
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
        <button type="submit" disabled={isLoading || rulesPassedCount < 4 || !isPwdMatch} className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />} 
          {isLoading ? "Creating..." : "Create User"}
        </button>
      </div>

    </form>
  );
}
