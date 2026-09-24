"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { Sparkline } from "../charts/Sparkline";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trendPct?: number;
  sparklineData?: number[];
  variant?: "amber" | "thermal" | "mechanical" | "safe" | "warn" | "critical" | "neutral" | "brand";
  subtext?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
  /** Severity wash when this stat is the one breaching an alarm threshold. */
  status?: "critical" | "warn" | "safe" | "info" | "none";
  /** Breathing rim while the underlying alert is unacknowledged. */
  pulse?: boolean;
}

/* Shared severity washes — defined once in globals.css. */
const statusPanel: Record<string, string> = {
  critical: "panel-critical",
  warn:     "panel-warn",
  safe:     "panel-safe",
  info:     "panel-info",
  none:     "",
};

const variantStyles = {
  amber:      { valueColor: "text-accent-amber",      sparkColor: "var(--accent-amber)",      border: "border-line hover:border-accent-amber/40",      iconBg: "bg-accent-amber/15 text-accent-amber" },
  thermal:    { valueColor: "text-accent-thermal",    sparkColor: "var(--accent-thermal)",    border: "border-line hover:border-accent-thermal/40",    iconBg: "bg-accent-thermal/15 text-accent-thermal" },
  mechanical: { valueColor: "text-accent-mechanical", sparkColor: "var(--accent-mechanical)", border: "border-line hover:border-accent-mechanical/40", iconBg: "bg-accent-mechanical/15 text-accent-mechanical" },
  safe:       { valueColor: "text-status-safe",       sparkColor: "var(--status-safe)",       border: "border-line hover:border-status-safe/40",       iconBg: "bg-status-safe/15 text-status-safe" },
  warn:       { valueColor: "text-status-warn",       sparkColor: "var(--status-warn)",       border: "border-status-warn/40 bg-status-warn/5",        iconBg: "bg-status-warn/15 text-status-warn" },
  critical:   { valueColor: "text-status-critical",   sparkColor: "var(--status-critical)",   border: "border-status-critical/40 bg-status-critical/5", iconBg: "bg-status-critical/15 text-status-critical" },
  neutral:    { valueColor: "text-text-primary",      sparkColor: "var(--text-muted)",         border: "border-line hover:border-line-strong",          iconBg: "bg-surface-2 text-text-secondary" },
  brand:      { valueColor: "text-brand",             sparkColor: "var(--brand)",              border: "border-line hover:border-brand/40",             iconBg: "bg-brand/15 text-brand" },
};

/* Solid fills: the whole box takes the severity colour (fixed shades chosen for white text). */
const filledGradient: Record<string, string> = {
  critical:   "linear-gradient(135deg, #DC3B2F 0%, #A82218 100%)",
  warn:       "linear-gradient(135deg, #D9800B 0%, #A85E05 100%)",
  safe:       "linear-gradient(135deg, #22A05A 0%, #15703E 100%)",
  mechanical: "linear-gradient(135deg, #12A08E 0%, #0A6E62 100%)",
  thermal:    "linear-gradient(135deg, #DE5A3A 0%, #A63A1E 100%)",
  amber:      "linear-gradient(135deg, #E8A020 0%, #B5730A 100%)",
  brand:      "linear-gradient(135deg, #7C6BE8 0%, #5343B8 100%)",
  neutral:    "linear-gradient(135deg, #5B6675 0%, #3B4453 100%)",
};

export function StatCard({
  label,
  value,
  unit,
  trendPct,
  sparklineData,
  variant = "neutral",
  subtext,
  icon,
  isLoading = false,
  error = null,
  className = "",
  status = "none",
  pulse = false,
}: StatCardProps) {
  const v = variantStyles[variant];

  /* The colour variants already carry intent — fold them into the shared wash
     so alerting stats look identical wherever they appear. */
  const resolvedStatus =
    status !== "none"
      ? status
      : variant === "critical"
      ? "critical"
      : variant === "warn"
      ? "warn"
      : "none";

  const pulseClass =
    pulse && resolvedStatus === "critical"
      ? "panel-pulse-critical"
      : pulse && resolvedStatus === "warn"
      ? "panel-pulse-warn"
      : "";

  /* ── Loading skeleton ── */
  if (isLoading) {
    return (
      <div className={`bg-surface-1 border border-line rounded-xl p-4 shadow-card flex flex-col justify-between ${className}`}>
        <div className="space-y-2">
          <div className="skeleton h-3 w-20 rounded" />
          <div className="skeleton h-8 w-24 rounded" />
        </div>
        <div className="skeleton h-2 w-16 rounded mt-2" />
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className={`bg-surface-1 border border-status-critical/40 rounded-xl p-4 shadow-card flex flex-col justify-between ${className}`}>
        <span className="text-[11px] font-sans font-semibold text-text-secondary uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-1.5 text-xs text-status-critical my-2 font-sans">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-2">{error}</span>
        </div>
      </div>
    );
  }

  const trendClass =
    trendPct !== undefined
      ? "text-white/90"
      : "";

  return (
    <div
      style={{ background: filledGradient[variant] }}
      className={`border border-white/10 rounded-xl p-4 shadow-card text-white transition-all duration-300 flex flex-col justify-between hover:brightness-110 ${pulseClass} ${className}`}
    >
      {/* Label row */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-sans font-semibold text-white/85 uppercase tracking-wide">
          {label}
        </span>
        {icon ? (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/20 text-white`}>
            {icon}
          </div>
        ) : trendPct !== undefined ? (
          <div className={`flex items-center gap-0.5 text-xs font-mono font-semibold flex-shrink-0 ${trendClass}`}>
            {trendPct > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : trendPct < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
            <span>{trendPct > 0 ? `+${trendPct}%` : `${trendPct}%`}</span>
          </div>
        ) : null}
      </div>

      {/* Value row */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-1.5 min-w-0">
          <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight tabular-nums text-white">
            {value}
          </span>
          {unit && (
            <span className="text-xs font-mono text-white/75 font-normal flex-shrink-0">
              {unit}
            </span>
          )}
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-20 h-7 flex-shrink-0">
            <Sparkline data={sparklineData} color="#FFFFFF" height={28} />
          </div>
        )}
      </div>

      {/* Trend under value, when icon occupies the top-right slot */}
      {icon && trendPct !== undefined && (
        <div className={`flex items-center gap-1 text-[11px] font-mono font-semibold mt-1.5 ${trendClass}`}>
          {trendPct > 0 ? <TrendingUp className="w-3 h-3" /> : trendPct < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          <span>{trendPct > 0 ? `+${trendPct}%` : `${trendPct}%`}</span>
          <span className="text-white/75 font-sans font-normal normal-case">vs last period</span>
        </div>
      )}

      {/* Subtext */}
      {subtext && (
        <div className="pt-2 mt-2 border-t border-white/25">
          <span className="text-[11px] text-white/85 font-sans line-clamp-1">{subtext}</span>
        </div>
      )}
    </div>
  );
}
