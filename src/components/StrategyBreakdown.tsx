"use client";

import { useState } from "react";
import { Cpu, Zap, Activity, ShieldCheck, Layers, ArrowUpRight, Check } from "lucide-react";
import { Strategy } from "@/lib/db";

interface StrategyBreakdownProps {
  strategies: Strategy[];
}

export default function StrategyBreakdown({ strategies }: StrategyBreakdownProps) {
  const [selectedId, setSelectedId] = useState<string>(strategies[0]?.id || "stat-arb");

  const selectedStrategy = strategies.find((s) => s.id === selectedId) || strategies[0];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accentCyan/10 text-accentCyan border border-accentCyan/30 font-mono text-xs">
          <Cpu className="w-3.5 h-3.5" />
          QUANTITATIVE ALPHA ENGINES
        </div>
        <h2 className="font-mono font-extrabold text-3xl sm:text-4xl text-textMain tracking-tight uppercase">
          ALGORITHMIC STRATEGY ARCHITECTURE
        </h2>
        <p className="text-textSub font-mono text-sm leading-relaxed">
          Four non-correlated algorithmic execution models generating consistent, low-volatility returns across all macroeconomic regimes.
        </p>
      </div>

      {/* Tabs / Selection Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {strategies.map((strat) => {
          const isSelected = strat.id === selectedId;
          return (
            <button
              key={strat.id}
              onClick={() => setSelectedId(strat.id)}
              className={`p-4 rounded-lg border text-left font-mono transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-panel border-accentCyan shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                  : "bg-[#090C10] border-panelBorder hover:bg-panel/60 text-textSub"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-accentCyan"></div>
              )}
              <div className="flex items-center justify-between text-xs text-textSub mb-2">
                <span className="font-bold text-accentCyan">{strat.id.toUpperCase()}</span>
                <span className="text-posGreen font-bold">+{strat.cagr}% CAGR</span>
              </div>
              <h4 className="font-bold text-textMain text-sm line-clamp-1 mb-1">{strat.name}</h4>
              <div className="text-[11px] text-textSub flex items-center justify-between font-mono mt-3 pt-2 border-t border-panelBorder">
                <span>SHARPE: <strong className="text-textMain">{strat.sharpe}</strong></span>
                <span>BETA: <strong className="text-textMain">{strat.beta}</strong></span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Strategy Inspector Card */}
      {selectedStrategy && (
        <div className="bg-panel border border-panelBorder rounded-lg p-6 sm:p-8 space-y-8 shadow-2xl relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-panelBorder">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/30 font-mono text-xs font-bold">
                  ACTIVE ENGINE: {selectedStrategy.id.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-posGreen flex items-center gap-1 font-semibold">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> LIVE TRADING
                </span>
              </div>
              <h3 className="font-mono font-bold text-2xl text-textMain">{selectedStrategy.name}</h3>
              <p className="text-accentCyan font-mono text-xs italic">{selectedStrategy.tagline}</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 bg-[#090C10] p-4 rounded border border-panelBorder font-mono text-center">
              <div>
                <span className="text-textSub block text-[10px]">HISTORICAL CAGR</span>
                <span className="text-posGreen font-bold text-xl font-mono-data">+{selectedStrategy.cagr}%</span>
              </div>
              <div>
                <span className="text-textSub block text-[10px]">SHARPE RATIO</span>
                <span className="text-accentCyan font-bold text-xl font-mono-data">{selectedStrategy.sharpe}</span>
              </div>
              <div>
                <span className="text-textSub block text-[10px]">MAX DRAWDOWN</span>
                <span className="text-posGreen font-bold text-xl font-mono-data">{selectedStrategy.maxDrawdown}%</span>
              </div>
            </div>
          </div>

          {/* Description & Execution Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-mono text-xs">
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-bold text-textMain text-sm uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-accentCyan" /> STRATEGY METHODOLOGY & SIGNAL EXTRACTION
              </h4>
              <p className="text-textSub leading-relaxed text-sm">
                {selectedStrategy.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded bg-[#090C10] border border-panelBorder space-y-1">
                  <span className="text-textSub text-[10px] block">REAL-TIME SIGNALS EVALUATED</span>
                  <span className="text-textMain font-bold text-sm text-accentCyan">{selectedStrategy.signalsPerDay} / 24h</span>
                </div>
                <div className="p-3 rounded bg-[#090C10] border border-panelBorder space-y-1">
                  <span className="text-textSub text-[10px] block">AVERAGE POSITION DURATION</span>
                  <span className="text-textMain font-bold text-sm">{selectedStrategy.avgHoldingTime}</span>
                </div>
              </div>
            </div>

            {/* Risk Controls & Capacity */}
            <div className="bg-[#090C10] p-5 rounded border border-panelBorder space-y-4">
              <h4 className="font-bold text-textMain text-xs uppercase border-b border-panelBorder pb-2">
                EXECUTION PARAMETERS
              </h4>
              <ul className="space-y-3 text-[11px]">
                <li className="flex justify-between border-b border-panelBorder/40 pb-2">
                  <span className="text-textSub">STRATEGY CAPACITY:</span>
                  <strong className="text-accentCyan">{selectedStrategy.capacity}</strong>
                </li>
                <li className="flex justify-between border-b border-panelBorder/40 pb-2">
                  <span className="text-textSub">SP500 BETA CORRELATION:</span>
                  <strong className="text-textMain">{selectedStrategy.beta} (Market Neutral)</strong>
                </li>
                <li className="flex justify-between border-b border-panelBorder/40 pb-2">
                  <span className="text-textSub">ORDER ROUTING:</span>
                  <strong className="text-textMain">Sub-millisecond Direct Market Access</strong>
                </li>
                <li className="flex justify-between">
                  <span className="text-textSub">RISK SYSTEM:</span>
                  <strong className="text-posGreen flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Auto Tail-Stop
                  </strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
