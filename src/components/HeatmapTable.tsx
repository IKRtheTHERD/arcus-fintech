"use client";

import { useState, useEffect } from "react";
import { Grid, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { MonthlyReturn } from "@/lib/db";

interface HeatmapTableProps {
  initialReturns?: MonthlyReturn[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export default function HeatmapTable({ initialReturns }: HeatmapTableProps) {
  const [returns, setReturns] = useState<MonthlyReturn[]>(initialReturns || []);
  const [loading, setLoading] = useState(!initialReturns);

  useEffect(() => {
    if (returns.length === 0) {
      async function loadData() {
        try {
          const res = await fetch("/api/returns");
          const json = await res.json();
          if (json.monthlyReturns) {
            setReturns(json.monthlyReturns);
          }
        } catch (e) {
          console.error("Failed fetching heatmap data", e);
        } finally {
          setLoading(false);
        }
      }
      loadData();
    }
  }, [returns]);

  const getCellStyle = (val: number) => {
    if (val >= 3.5) return "bg-[#1f4728] text-[#56d364] border border-[#2ea043]/50 shadow-[0_0_8px_rgba(86,211,100,0.2)]";
    if (val >= 2.5) return "bg-[#16361e] text-[#3fb950] border border-[#2ea043]/30";
    if (val >= 1.5) return "bg-[#122817] text-[#7ee787]";
    return "bg-[#161b22] text-[#8b949e]";
  };

  return (
    <div className="bg-panel border border-panelBorder rounded-lg p-6 space-y-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-panelBorder pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Grid className="w-5 h-5 text-accentCyan" />
            <h3 className="font-mono font-bold text-textMain text-lg tracking-wide uppercase">
              MONTHLY RETURNS HEATMAP (2020–2024)
            </h3>
          </div>
          <p className="text-textSub text-xs font-mono mt-1">
            Historical net return matrix queried from ARCUS ledger database.
          </p>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs">
          <span className="flex items-center gap-1 text-posGreen">
            <CheckCircle2 className="w-3.5 h-3.5" />
            100% POSITIVE MONTHS RATE
          </span>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center font-mono text-xs text-accentCyan animate-pulse">
          QUERYING MONTHLY PERFORMANCE MATRIX FROM DATABASE...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-center font-mono border-collapse text-xs">
            <thead>
              <tr className="border-b border-panelBorder text-textSub text-[11px]">
                <th className="py-2.5 px-3 text-left font-bold text-textMain">YEAR</th>
                {MONTHS.map((m) => (
                  <th key={m} className="py-2.5 px-2 font-medium">{m}</th>
                ))}
                <th className="py-2.5 px-3 text-right font-bold text-accentCyan">ANNUAL TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-panelBorder/50">
              {returns.map((row) => (
                <tr key={row.year} className="hover:bg-[#1c2128] transition-colors">
                  <td className="py-3 px-3 text-left font-bold text-textMain bg-[#090C10]/50">
                    {row.year}
                  </td>
                  {MONTHS.map((m) => {
                    const val = row[m];
                    return (
                      <td key={m} className="p-1">
                        <div className={`py-2 px-1 rounded font-bold transition-all hover:scale-105 ${getCellStyle(val)}`}>
                          +{val.toFixed(1)}%
                        </div>
                      </td>
                    );
                  })}
                  <td className="py-3 px-3 text-right font-extrabold text-posGreen bg-[#090C10]/60 text-sm">
                    +{row.total.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Heatmap Legend & Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-panelBorder font-mono text-xs text-textSub">
        <div className="flex items-center space-x-2">
          <span className="text-[10px]">COLOR LEGEND:</span>
          <span className="px-2 py-0.5 rounded bg-[#161b22] text-[#8b949e] text-[10px]">&lt;1.5%</span>
          <span className="px-2 py-0.5 rounded bg-[#122817] text-[#7ee787] text-[10px]">1.5%-2.4%</span>
          <span className="px-2 py-0.5 rounded bg-[#16361e] text-[#3fb950] text-[10px]">2.5%-3.4%</span>
          <span className="px-2 py-0.5 rounded bg-[#1f4728] text-[#56d364] text-[10px]">&ge;3.5%</span>
        </div>

        <div className="text-center md:text-right md:col-span-2 text-textSub flex justify-end gap-6 text-[11px]">
          <span>AVG MONTHLY RETURN: <strong className="text-textMain font-bold">+2.55%</strong></span>
          <span>BEST MONTH: <strong className="text-posGreen font-bold">+4.8% (Mar 20)</strong></span>
          <span>MAX MONTHLY DRAWDOWN: <strong className="text-posGreen font-bold">0.0%</strong></span>
        </div>
      </div>
    </div>
  );
}
