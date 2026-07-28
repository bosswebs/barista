import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import RoleSwitcher from '@/components/lms/RoleSwitcher';
import {
  ShieldAlert, Settings, Building2, Users, Shield, Cpu, Database, RefreshCw,
  Globe, Key, Lock, Bell, CheckCircle2, AlertTriangle, Play, Pause, Save,
  Palette, CreditCard, Mail, MessageSquare, Video, HardDrive, BarChart3, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

export const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'campuses' | 'branding' | 'rbac' | 'security' | 'integrations' | 'subscriptions' | 'backups' | 'ai_engine' | 'audit'
  >('campuses');

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('AIzaSyD-BBACADEMY-2026-KEY-SECRET');
  const [aiEnabled, setAiEnabled] = useState(true);

  const campuses = [
    { id: 'c1', name: 'Kigali Main Campus', code: 'KGL-01', location: 'KN 5 Rd, Kigali, Rwanda', students: 1420, status: 'Active', type: 'Physical' },
    { id: 'c2', name: 'Musanze Coffee Innovation Hub', code: 'MSZ-02', location: 'Musanze Town, Rwanda', students: 380, status: 'Active', type: 'Physical' },
    { id: 'c3', name: 'Rubavu Lakefront Center', code: 'RBV-03', location: 'Rubavu Beach, Rwanda', students: 210, status: 'Active', type: 'Physical' },
    { id: 'c4', name: 'Global Virtual Campus', code: 'VRT-04', location: 'Online / Worldwide', students: 530, status: 'Active', type: 'Digital' },
  ];

  const auditLogs = [
    { id: 'l1', user: 'Jean-Paul Nkurunziza (Super Admin)', action: 'Updated System Integration: Flutterwave Webhook', ip: '197.243.0.45', time: '10 mins ago', severity: 'Info' },
    { id: 'l2', user: 'Marie Uwase (Admin)', action: 'Issued Certificate BBA-2026-003', ip: '197.243.12.18', time: '42 mins ago', severity: 'Info' },
    { id: 'l3', user: 'System Sentinel', action: 'Automated Database Snapshot Completed (2.4 GB)', ip: '127.0.0.1', time: '2 hours ago', severity: 'Success' },
    { id: 'l4', user: 'Unknown IP', action: 'Failed Auth Attempt on Admin Route (Blocked by WAF)', ip: '41.216.90.11', time: '4 hours ago', severity: 'Warning' },
  ];

  return (
    <Layout>
      <RoleSwitcher currentRole="super_admin" />

      <div className="min-h-screen bg-slate-950 text-slate-100 font-inter pt-8 pb-16">
        <div className="container-custom">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 border border-purple-800/40 rounded-3xl p-8 mb-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold mb-2">
                  <ShieldAlert size={14} strokeWidth={2.5} /> SUPER ADMIN MASTER PLATFORM CONTROL
                </span>
                <h1 className="font-cormorant text-4xl lg:text-5xl font-bold text-white tracking-wide">
                  Enterprise Infrastructure & System Governance
                </h1>
                <p className="text-slate-300 text-sm mt-1 max-w-3xl">
                  Multi-campus operations, whitelabeling, system integrations, payment gateway keys, database backups, audit trail, and AI engine control.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setMaintenanceMode(!maintenanceMode);
                    toast.warning(`System Maintenance Mode ${!maintenanceMode ? 'ENABLED' : 'DISABLED'}`);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                    maintenanceMode ? 'bg-amber-500 text-slate-950 hover:bg-amber-400' : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {maintenanceMode ? <Pause size={15} /> : <Play size={15} />}
                  Maintenance Mode: {maintenanceMode ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                <Building2 size={20} />
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Multi-Campus</p>
              <h3 className="font-cormorant font-bold text-2xl text-white">4 Active Campuses</h3>
              <p className="text-[11px] text-purple-400 font-semibold mt-1">Kigali, Musanze, Rubavu, Virtual</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
                <Cpu size={20} />
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">AI Engine Status</p>
              <h3 className="font-cormorant font-bold text-2xl text-white">Gemini 3.6 Flash</h3>
              <p className="text-[11px] text-teal-400 font-semibold mt-1">Quiz, Content & Grading AI Active</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Database size={20} />
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Database Health</p>
              <h3 className="font-cormorant font-bold text-2xl text-white">99.99% Uptime</h3>
              <p className="text-[11px] text-emerald-400 font-semibold mt-1">Last Backup: 2 hrs ago</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
                <Shield size={20} />
              </div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Security Shield</p>
              <h3 className="font-cormorant font-bold text-2xl text-white">WAF Active</h3>
              <p className="text-[11px] text-indigo-400 font-semibold mt-1">0 Breach Alerts</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto border-b border-slate-800 mb-8 bg-slate-900 p-2 rounded-2xl scrollbar-none">
            {[
              { id: 'campuses', label: 'Multi-Campus', icon: Building2 },
              { id: 'branding', label: 'Branding & Theme', icon: Palette },
              { id: 'rbac', label: 'RBAC Permission Matrix', icon: Users },
              { id: 'security', label: 'Security & WAF', icon: Lock },
              { id: 'integrations', label: 'API Integrations', icon: Key },
              { id: 'subscriptions', label: 'Subscriptions & Gateways', icon: CreditCard },
              { id: 'backups', label: 'Backups & Health', icon: Database },
              { id: 'ai_engine', label: 'AI Engine Control', icon: Sparkles },
              { id: 'audit', label: 'Audit Trail Logs', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg font-bold'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* TAB CONTENTS */}

          {/* TAB 1: MULTI-CAMPUS */}
          {activeTab === 'campuses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-900 p-6 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-white">Multi-Campus & Hub Management</h3>
                  <p className="text-xs text-slate-400">Configure physical training centers and virtual learning hubs</p>
                </div>
                <button onClick={() => toast.success("New campus configuration modal opened.")} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl">
                  + Add New Campus
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campuses.map((c) => (
                  <div key={c.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 hover:border-purple-500/40 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">{c.code}</span>
                        <h4 className="font-cormorant font-bold text-xl text-white mt-1">{c.name}</h4>
                        <p className="text-xs text-slate-400">{c.location}</p>
                      </div>
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {c.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-xs text-slate-300">
                      <span>Enrolled Students: <strong>{c.students}</strong></span>
                      <button onClick={() => toast.info(`Editing ${c.name}...`)} className="text-purple-400 hover:underline font-semibold">
                        Manage Campus →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: BRANDING */}
          {activeTab === 'branding' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl">
              <h3 className="font-cormorant text-2xl font-bold text-white">Institution Whitelabeling & Visual Identity</h3>
              
              <div className="space-y-4 font-inter text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Institution Legal Name</label>
                  <input type="text" defaultValue="Beyond Barista Academy International" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Primary Color Code</label>
                    <input type="text" defaultValue="#006D77 (Teal LMS Brand)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" />
                  </div>
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Accent Color Code</label>
                    <input type="text" defaultValue="#E29578 (Terracotta Accent)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Custom Domain Name</label>
                  <input type="text" defaultValue="academy.beyondbarista.rw" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-mono text-[11px]" />
                </div>

                <button onClick={() => toast.success("Branding tokens saved successfully!")} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2">
                  <Save size={16} /> Save Visual Tokens
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: RBAC MATRIX */}
          {activeTab === 'rbac' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 overflow-x-auto">
              <h3 className="font-cormorant text-2xl font-bold text-white">Role-Based Access Control (RBAC) Permission Matrix</h3>
              
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800 text-slate-300 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3">Module Permission</th>
                    <th className="p-3 text-center">Super Admin</th>
                    <th className="p-3 text-center">Admin</th>
                    <th className="p-3 text-center">Instructor</th>
                    <th className="p-3 text-center">Student</th>
                    <th className="p-3 text-center">Guest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {[
                    { perm: 'Platform Config & API Keys', super: true, admin: false, inst: false, stu: false, guest: false },
                    { perm: 'Faculty & Academic Program Setup', super: true, admin: true, inst: false, stu: false, guest: false },
                    { perm: 'Course Content & Lesson Authoring', super: true, admin: true, inst: true, stu: false, guest: false },
                    { perm: 'Interactive Quiz Taking & Submission', super: true, admin: true, inst: true, stu: true, guest: false },
                    { perm: 'Public Course Catalog & Preview Player', super: true, admin: true, inst: true, stu: true, guest: true },
                    { perm: 'Issue Verified PDF Certificates', super: true, admin: true, inst: true, stu: false, guest: false },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/50">
                      <td className="p-3 font-semibold text-white">{row.perm}</td>
                      <td className="p-3 text-center">{row.super ? '✅' : '❌'}</td>
                      <td className="p-3 text-center">{row.admin ? '✅' : '❌'}</td>
                      <td className="p-3 text-center">{row.inst ? '✅' : '❌'}</td>
                      <td className="p-3 text-center">{row.stu ? '✅' : '❌'}</td>
                      <td className="p-3 text-center">{row.guest ? '✅' : '❌'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === 'security' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl font-inter text-xs">
              <h3 className="font-cormorant text-2xl font-bold text-white">System Security & Web Application Firewall</h3>

              <div className="space-y-4">
                <div className="p-4 bg-slate-800 rounded-xl flex items-center justify-between border border-slate-700">
                  <div>
                    <p className="font-bold text-white">Two-Factor Authentication (2FA) Requirement</p>
                    <p className="text-slate-400 text-[11px]">Enforce TOTP 2FA for all Super Admin & Admin accounts</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600" />
                </div>

                <div className="p-4 bg-slate-800 rounded-xl flex items-center justify-between border border-slate-700">
                  <div>
                    <p className="font-bold text-white">Automated Rate Limiting & DDoS Shield</p>
                    <p className="text-slate-400 text-[11px]">Cap requests at 120 RPM per IP address</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-purple-600" />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Whitelisted IP Subnets</label>
                  <textarea rows={2} defaultValue="197.243.0.0/16, 41.216.90.0/24" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-mono text-[11px]" />
                </div>

                <button onClick={() => toast.success("Security Firewall rules updated.")} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl">
                  Update Security Rules
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Stripe Payment Gateway', icon: CreditCard, status: 'Connected', desc: 'Global card processing & recurring billing' },
                { name: 'Flutterwave MoMo', icon: CreditCard, status: 'Connected', desc: 'MTN & Airtel Mobile Money East Africa' },
                { name: 'Zoom Video Communications', icon: Video, status: 'Connected', desc: 'Automated live webinar link creation' },
                { name: 'Resend Email Service', icon: Mail, status: 'Connected', desc: 'Transactional receipts & verification emails' },
                { name: 'Twilio SMS Gateway', icon: MessageSquare, status: 'Connected', desc: 'Course notification SMS alerts' },
                { name: 'AWS S3 Cloud Storage', icon: HardDrive, status: 'Connected', desc: 'HD video lectures & PDF course material' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 flex items-center justify-center">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <p className="text-slate-400 text-[11px]">{item.desc}</p>
                      </div>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">
                      {item.status}
                    </span>
                  </div>
                  <button onClick={() => toast.info(`Configuring ${item.name}...`)} className="w-full bg-slate-800 hover:bg-slate-750 text-slate-300 font-semibold text-xs py-2 rounded-xl border border-slate-700">
                    Configure Keys & Webhooks
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: SUBSCRIPTIONS */}
          {activeTab === 'subscriptions' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl">
              <h3 className="font-cormorant text-2xl font-bold text-white">Subscription Plans & Gateway Pricing</h3>
              <div className="grid grid-cols-3 gap-4 font-inter text-xs">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="font-bold text-white">Free Starter Tier</p>
                  <p className="text-2xl font-bold text-emerald-400 my-2">$0 / mo</p>
                  <p className="text-[11px] text-slate-400">Access to 5 orientation lessons & public catalog</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-teal-500">
                  <p className="font-bold text-white">Premium Monthly</p>
                  <p className="text-2xl font-bold text-teal-400 my-2">$29 / mo</p>
                  <p className="text-[11px] text-slate-400">All 24 Barista Modules, Quizzes & PDF Certs</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-purple-500">
                  <p className="font-bold text-white">Annual Master Pass</p>
                  <p className="text-2xl font-bold text-purple-400 my-2">$199 / yr</p>
                  <p className="text-[11px] text-slate-400">Full access, Job Board priority & 1-on-1 Mentorship</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: BACKUPS */}
          {activeTab === 'backups' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl font-inter text-xs">
              <h3 className="font-cormorant text-2xl font-bold text-white">Automated Database Backups & Storage Health</h3>
              
              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex justify-between items-center">
                <div>
                  <p className="font-bold text-white">Automated Daily Snapshot</p>
                  <p className="text-slate-400 text-[11px]">Scheduled every day at 02:00 UTC to AWS S3 Bucket</p>
                </div>
                <button onClick={() => toast.success("Manual Database Snapshot triggered!")} className="bg-purple-600 text-white font-bold px-4 py-2 rounded-xl">
                  Trigger Instant Snapshot
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-slate-300">Recent Snapshots:</p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] flex justify-between">
                  <span>bba_db_backup_2026-07-28_0200.sql.gz (2.41 GB)</span>
                  <span className="text-emerald-400 font-bold">Success</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] flex justify-between">
                  <span>bba_db_backup_2026-07-27_0200.sql.gz (2.38 GB)</span>
                  <span className="text-emerald-400 font-bold">Success</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: AI ENGINE CONTROL */}
          {activeTab === 'ai_engine' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 max-w-3xl font-inter text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-white flex items-center gap-2">
                    AI Pedagogical Engine Control <Sparkles size={18} className="text-purple-400" />
                  </h3>
                  <p className="text-slate-400 text-[11px]">Manage generative model selection and prompt guardrails</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">AI Features Enabled:</span>
                  <button
                    onClick={() => setAiEnabled(!aiEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors p-1 ${aiEnabled ? 'bg-purple-600' : 'bg-slate-700'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${aiEnabled ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Active Model Engine</label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white font-bold">
                    <option>Gemini 3.6 Flash (Recommended for High Speed & Quality)</option>
                    <option>Gemini 1.5 Pro</option>
                    <option>OpenAI GPT-4o</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Gemini API Key</label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-purple-300 font-mono"
                  />
                </div>

                <button onClick={() => toast.success("AI Configuration saved!")} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-5 rounded-xl">
                  Save AI Engine Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: AUDIT TRAIL */}
          {activeTab === 'audit' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="font-cormorant text-2xl font-bold text-white">Real-Time System Audit Trail</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left font-inter text-xs">
                  <thead className="bg-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="p-3">User / Actor</th>
                      <th className="p-3">Action Description</th>
                      <th className="p-3">IP Address</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-semibold text-white">{log.user}</td>
                        <td className="p-3 text-slate-300">{log.action}</td>
                        <td className="p-3 font-mono text-[11px] text-slate-400">{log.ip}</td>
                        <td className="p-3 text-slate-400">{log.time}</td>
                        <td className="p-3 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            log.severity === 'Warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                            log.severity === 'Success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            'bg-purple-950 text-purple-400 border border-purple-800'
                          }`}>
                            {log.severity}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
