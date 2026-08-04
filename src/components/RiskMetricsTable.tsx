"use client";

import { useState } from "react";
import { ShieldCheck, ArrowUpRight, BarChart2, Info } from "lucide-react";
import { RiskMetric } from "@/lib/db";

interface RiskMetricsTableProps {
  metrics: RiskMetric[];
}

export default function RiskMetricsTable({ metrics }: RiskMetricsTableProps) {
  const [activeMetric, setActiveMetric] = useState<string | null>(metrics[0]?.metric || null);

  return (
    <div className="bg-panel border border-panelBorder rounded-lg p-6 space-y-6 shadow-xl font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-panelBorder pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-accentCyan" />
            <h3 className="font-mono font-bold text-textMain text-lg tracking-wide uppercase">
              RISK METRICS & CONVEXITY PROFILE
            </h3>
          </div>
          <p className="text-textSub text-xs mt-1">
            Comparative institutional risk-adjusted ratios (2020–2024 Audited).
          </p>
        </div>

        <div className="px-3 py-1.5 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/30 text-xs font-bold flex items-center gap-1.5">
          <BarChart2 className="w-4 h-4" />
          BENCHMARK COMPARISON MATRIX
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-panelBorder text-textSub text-[11px] uppercase">
              <th className="py-3 px-4 font-bold text-textMain">QUANTITATIVE METRIC</th>
              <th className="py-3 px-4 font-bold text-accentCyan bg-accentCyan/5 text-center">ARCUS ALPHA</th>
              <th className="py-3 px-4 font-bold text-center">S&P 500 INDEX</th>
              <th className="py-3 px-4 font-bold text-center">HEDGE FUND COMPOSITE</th>
              <th className="py-3 px-4 font-bold text-right text-posGreen">ARCUS ADVANTAGE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-panelBorder/50">
            {metrics.map((m, idx) => (
              <tr
                key={idx}
                onClick={() => setActiveMetric(m.metric)}
                className={`hover:bg-[#1c2128] transition-colors cursor-pointer ${
                  activeMetric === m.metric ? "bg-[#1c2128] border-l-2 border-l-accentCyan" : ""
                }`}
              >
                <td className="py-3.5 px-4 font-bold text-textMain flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accentCyan"></span>
                  {m.metric}
                </td>
                <td className="py-3.5 px-4 font-extrabold text-accentCyan text-center bg-accentCyan/5 font-mono-data text-sm">
                  {m.arcus}
                </td>
                <td className="py-3.5 px-4 text-textSub text-center font-mono-data">
                  {m.sp500}
                </td>
                <td className="py-3.5 px-4 text-textSub text-center font-mono-data">
                  {m.hedgeFund}
                </td>
                <td className="py-3.5 px-4 font-bold text-posGreen text-right">
                  {m.advantage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#090C10] p-4 rounded border border-panelBorder flex items-center justify-between text-xs text-textSub">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-accentCyan" />
          <span>Click any row to inspect deep statistical methodology and calculation model.</span>
        </div>
        <span className="text-accentCyan font-semibold">AUDITED BY KPMG LLP</span>
      </div>
    </div>
  );
}
