"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User, LogIn, Shield, BarChart3, ClipboardList, Package, ShieldCheck, Moon, Sun, ChevronDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: formData.username,
          password: formData.password
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Invalid credentials");
      }

      const data = await res.json();
      // Store token (in a real app, use HTTP-only cookies or context)
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Redirect to dashboard
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden">
      
      {/* Left Pane - Branding & Features */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply z-10"></div>
          {/* We use a gradient and some abstract shapes instead of the raw image to simulate the sleek dark vibe */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900 z-10"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full z-10"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
              {/* Hexagon icon approx */}
              <div className="w-full h-full border-4 border-slate-900 rounded-md rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-900 rounded-full -rotate-45"></div>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-wider leading-none">HVAC</div>
              <div className="text-[10px] tracking-widest text-blue-200 mt-1">MANAGEMENT SYSTEM</div>
            </div>
          </div>

          {/* Value Prop */}
          <div className="mt-24 max-w-md">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Smart HVAC <br />Management
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed mb-12 opacity-90">
              Monitor, maintain, and optimize your HVAC systems efficiently in one integrated platform.
            </p>

            {/* Features List */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                  <BarChart3 size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Real-time Monitoring</h3>
                  <p className="text-xs text-slate-400 mt-1">Track performance and system health in real time.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                  <ClipboardList size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Work Order Management</h3>
                  <p className="text-xs text-slate-400 mt-1">Streamline maintenance processes and improve response time.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                  <Package size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Asset & Inventory</h3>
                  <p className="text-xs text-slate-400 mt-1">Manage assets, spare parts, and inventory in one place.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Secure & Reliable</h3>
                  <p className="text-xs text-slate-400 mt-1">Role-based access control and enterprise-grade security.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-12 text-xs text-slate-500">
            © 2024 HVAC Management System. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-[500px] xl:w-[600px] flex flex-col items-center justify-center relative p-8">
        
        {/* Top Controls */}
        <div className="absolute top-6 right-8 flex items-center gap-3">
          <div className="flex items-center p-1 border border-gray-200 rounded-lg bg-white">
            <button className="p-1.5 rounded-md bg-gray-100 text-gray-700"><Sun size={14}/></button>
            <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-700"><Moon size={14}/></button>
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg bg-white text-xs font-medium text-gray-700 hover:bg-gray-50">
            English <ChevronDown size={14} className="text-gray-400"/>
          </button>
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 sm:p-10">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100/50">
              <div className="w-8 h-8 border-4 border-slate-900 rounded-md rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-900 rounded-full -rotate-45"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-medium rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Username or Email</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="Enter your username or email"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>

            <div className="relative flex items-center justify-center py-3">
              <div className="absolute border-t border-gray-100 w-full"></div>
              <span className="relative bg-white px-4 text-xs text-gray-400 font-medium">or</span>
            </div>

            <div>
              <button 
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Shield size={16} />
                Sign in with SSO
              </button>
            </div>

            <div className="text-center pt-4 text-xs font-medium text-gray-500">
              Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-700 font-bold">Contact your administrator</a>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}
