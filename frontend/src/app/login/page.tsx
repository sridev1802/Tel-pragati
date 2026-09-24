"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye, EyeOff, ChevronRight, Phone, Mail, FileText,
  Languages, X, Server, ShieldCheck, Cpu, Lock, User as UserIcon, UserCog,
} from "lucide-react";
import { Role } from "../../data/types";
import { useAuthStore } from "../../state/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState<Role>("operator");
  const [userId, setUserId]             = useState("Operator");
  const [password, setPassword]         = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLoading, setIsLoading]       = useState(false);
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);

  const handleRoleChange = (newRole: Role) => {
    setSelectedRole(newRole);
    if      (newRole === "engineer") { setUserId("Tech");    setPassword("Engineer@123"); }
    else if (newRole === "operator") { setUserId("Operator");setPassword("Admin"); }
    else if (newRole === "admin")    { setUserId("Admin");   setPassword("Admin@2026"); }
    else                             { setUserId("Auditor"); setPassword("Auditor@MoPNG"); }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let displayName = "Er. Arvind Sharma";
    let roleDesignation = "Senior Production Engineer";
    if      (selectedRole === "operator") { displayName = "P. R. Joshi";           roleDesignation = "Control Room Lead Operator"; }
    else if (selectedRole === "admin")    { displayName = "Dr. M. S. Rathore";     roleDesignation = "Chief General Manager (Production)"; }
    else if (selectedRole === "viewer")   { displayName = "Guest Auditor (MoPNG)"; roleDesignation = "Technical Inspection Officer"; }

    setTimeout(() => {
      login(`${displayName} (${roleDesignation})`, selectedRole);
      setIsLoading(false);
      router.push("/field");
    }, 600);
  };

  const fieldLabel = "block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5";
  const fieldBase =
    "w-full rounded-xl border-2 border-slate-200 bg-white/90 text-sm text-slate-900 font-semibold " +
    "focus:outline-none focus:border-[#F0A030] focus:ring-4 focus:ring-[#F0A030]/20 placeholder:text-slate-400 transition-shadow";

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col font-sans antialiased text-slate-900 selection:bg-[#F0A030]/30"
         style={{ background: "linear-gradient(135deg, #FFF3DC 0%, #EAF3FF 48%, #DDF5EF 100%)" }}>

      {/* ── Colour washes (logo palette: red, amber, teal, navy) ── */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-50" style={{ background: "#F7B267" }} />
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-40" style={{ background: "#3FB8AF" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/4 w-[460px] h-[460px] rounded-full blur-3xl opacity-40" style={{ background: "#F28B82" }} />

      {/* ── Top bar: Oil India logo (left) · language (right) ───── */}
      <header className="relative z-10 px-5 sm:px-8 pt-4 pb-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <img
            src="/oil-india-logo.png"
            alt="Oil India Limited"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
          />
          <div className="hidden sm:block leading-tight border-l-2 border-[#C8202A]/40 pl-3">
            <div className="text-sm font-extrabold text-slate-800 tracking-wide">OIL INDIA LIMITED</div>
            <div className="text-[11px] text-slate-500 font-medium">MoPNG · Baghewala Asset</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/80 border border-slate-200 rounded-full pl-3 pr-2 py-1 shadow-sm">
          <Languages className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-transparent text-xs text-slate-800 focus:outline-none cursor-pointer font-semibold"
          >
            <option value="English">English</option>
            <option value="Hindi">हिन्दी</option>
            <option value="Assamese">অসমীয়া</option>
            <option value="Rajasthani">राजस्थानी</option>
          </select>
        </div>
      </header>

      {/* ── Main: form (left) · big TEL PRAGATI brand (right) ───── */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[minmax(400px,500px)_1fr] gap-6 lg:gap-10 px-5 sm:px-8 pb-6 items-center">

        {/* ═══ LEFT — Sign-in card ═══ */}
        <section className="w-full max-w-md mx-auto lg:mx-0 lg:ml-4">
          {/* Compact brand for small screens (big version shows on the right at lg+) */}
          <div className="lg:hidden flex justify-center mb-4">
            <img src="/tel-pragati-logo.png" alt="TEL PRAGATI — Progress in Oil Production" className="h-40 w-auto object-contain drop-shadow-md" />
          </div>

          <div className="rounded-3xl bg-white/90 backdrop-blur shadow-[0_24px_60px_-20px_rgba(11,58,110,0.35)] border border-white overflow-hidden">
            <div className="h-2" style={{ background: "linear-gradient(90deg,#C8202A,#F0A030,#16808A,#0B3A6E)" }} />
            <div className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-[#0B3A6E] tracking-tight">Secure Access Portal</h2>
                <p className="text-xs text-slate-500 font-medium mt-1">Sign in to the TEL PRAGATI Digital Twin</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className={fieldLabel}>Select role</label>
                  <div className="relative">
                    <UserCog className="w-4 h-4 text-[#16808A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedRole}
                      onChange={(e) => handleRoleChange(e.target.value as Role)}
                      className={`${fieldBase} py-3 pl-10 pr-3 cursor-pointer`}
                    >
                      <option value="operator">Technician / Control Room Operator</option>
                      <option value="engineer">Senior Production Engineer</option>
                      <option value="admin">Chief General Manager / Asset Administrator</option>
                      <option value="viewer">Statutory Auditor (MoPNG Inspection)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>User ID</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-[#C8202A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Enter User ID"
                      className={`${fieldBase} py-3 pl-10 pr-3`}
                    />
                  </div>
                </div>

                <div>
                  <label className={fieldLabel}>Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#F0A030] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      className={`${fieldBase} py-3 pl-10 pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-white font-extrabold text-sm tracking-wide py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#C8202A]/25 hover:brightness-105 active:scale-[0.99] transition disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  style={{ background: "linear-gradient(90deg,#C8202A 0%,#E8590C 55%,#F0A030 100%)" }}
                >
                  {isLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Authenticating…</span>
                    </>
                  ) : (
                    <>
                      <span>Access dashboard</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-5 mt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[11px] text-slate-500">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <a href="tel:18003453477" className="flex items-center gap-1 hover:text-[#0B3A6E] transition-colors">
                    <Phone className="w-3 h-3" />1800-345-3477
                  </a>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" />help@telpragati.oilindia.in
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIntegrationsModal(true)}
                  className="flex items-center gap-1 font-semibold text-[#16808A] hover:text-[#0B3A6E] transition-colors"
                >
                  <FileText className="w-3 h-3" />Integrations
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ RIGHT — Big TEL PRAGATI brand panel (lg+) ═══ */}
        <section className="hidden lg:flex flex-col items-center justify-center h-full min-h-[560px] rounded-[2rem] relative overflow-hidden border border-white/70 shadow-[0_30px_80px_-30px_rgba(11,58,110,0.45)]"
                 style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(255,247,232,0.85) 45%, rgba(224,246,242,0.9) 100%)" }}>
          <div aria-hidden className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-40 blur-2xl" style={{ background: "#F0A030" }} />
          <div aria-hidden className="absolute -bottom-28 -left-20 w-96 h-96 rounded-full opacity-30 blur-2xl" style={{ background: "#16808A" }} />

          <img
            src="/tel-pragati-logo.png"
            alt="TEL PRAGATI — Progress in Oil Production"
            className="relative w-[min(88%,620px)] h-auto object-contain drop-shadow-[0_18px_30px_rgba(11,58,110,0.25)]"
          />

          <div className="relative mt-4 text-center px-8">
            <h1 className="text-3xl xl:text-4xl font-black tracking-tight text-[#0B3A6E]">TEL PRAGATI Digital Twin</h1>
            <p className="mt-2 text-sm xl:text-base font-semibold text-[#C8202A]">Well-to-Surface Heavy Oil O&amp;M Platform</p>
            <p className="mt-1 text-xs text-slate-500 font-medium">Baghewala Field · Oil India Limited</p>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-subtle" />MQTT Live
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse-subtle" />TimescaleDB
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-subtle" />MLflow
            </span>
          </div>
        </section>
      </main>

      {/* ── Integrations Modal ─────────────────────────────────── */}
      {showIntegrationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#16808A] flex items-center justify-center">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">TEL PRAGATI — Active Integrations</h3>
                  <p className="text-[11px] text-slate-500 font-mono">Baghewala Asset Real-Time Topology</p>
                </div>
              </div>
              <button onClick={() => setShowIntegrationsModal(false)} aria-label="Close" className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {[
                { icon: <Cpu className="w-4 h-4 text-[#16808A]" />, name: "Baghewala Wellhead IoT Broker", detail: "MQTT TCP:1883 / WS:9001 (Active)" },
                { icon: <Server className="w-4 h-4 text-blue-600" />, name: "TimescaleDB Telemetry Historian", detail: "PostgreSQL 16 :5432 (Hypertable Synced)" },
                { icon: <ShieldCheck className="w-4 h-4 text-[#C8202A]" />, name: "MLflow Model Registry", detail: "Port :5000 (Physics + ML Fusion Engine)" },
              ].map((item) => (
                <div key={item.name} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{item.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{item.detail}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">ONLINE</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setShowIntegrationsModal(false)}
                className="px-5 py-2 rounded-lg text-white text-xs font-bold hover:brightness-105"
                style={{ background: "linear-gradient(90deg,#C8202A,#F0A030)" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
