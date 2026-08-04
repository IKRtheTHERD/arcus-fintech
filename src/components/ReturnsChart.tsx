"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Award, BarChart3, Info } from "lucide-react";
import { PerformancePoint } from "@/lib/db";

interface ReturnsChartProps {
  initialData?: Record<string, PerformancePoint[]>;
}

export default function ReturnsChart({ initialData }: ReturnsChartProps) {
  const [timeframe, setTimeframe] = useState<"1Y" | "3Y" | "5Y">("1Y");
  const [data, setData] = useState<PerformancePoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/returns?timeframe=${timeframe}`);
        const json = await res.json();
        if (json.performanceSeries) {
          setData(json.performanceSeries);
        }
      } catch (err) {
        console.error("Failed loading performance series", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [timeframe]);

  const activePoint = hoverIndex !== null && data[hoverIndex] ? data[hoverIndex] : data[data.length - 1];

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 320;
  const padding = { top: 30, right: 30, bottom: 40, left: 50 };

  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  // Calculate min & max values for scale
  const allValues = data.flatMap((d) => [d.arcus, d.sp500, d.hedgeFund]);
  const minValue = Math.min(...(allValues.length ? allValues : [90]), 90);
  const maxValue = Math.max(...(allValues.length ? allValues : [500]), 140);

  const getX = (index: number) => {
    if (data.length <= 1) return padding.left;
    return padding.left + (index / (data.length - 1)) * chartW;
  };

  const getY = (val: number) => {
    const range = maxValue - minValue || 1;
    return padding.top + chartH - ((val - minValue) / range) * chartH;
  };

  // Generate SVG path string
  const createPath = (key: "arcus" | "sp500" | "hedgeFund") => {
    if (!data.length) return "";
    return data.reduce((acc, point, i) => {
      const x = getX(i);
      const y = getY(point[key]);
      return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, "");
  };

  // Generate Area Gradient for Arcus
  const createAreaPath = () => {
    if (!data.length) return "";
    const linePath = createPath("arcus");
    const firstX = getX(0);
    const lastX = getX(data.length - 1);
    const bottomY = padding.top + chartH;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const startingValue = data.length > 0 ? data[0].arcus : 100;
  const latestArcus = activePoint ? activePoint.arcus : 100;
  const pctGain = (((latestArcus - startingValue) / startingValue) * 100).toFixed(1);

  return (
    <div className="bg-panel border border-panelBorder rounded-lg p-6 space-y-6 shadow-xl relative overflow-hidden">
      {/* Top Controls & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-panelBorder pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-accentCyan" />
            <h3 className="font-mono font-bold text-textMain text-lg tracking-wide uppercase">
              CUMULATIVE YIELD & PERFORMANCE
            </h3>
          </div>
          <p className="text-textSub text-xs font-mono mt-1">
            Net cumulative return vs S&P 500 & Hedge Fund Weighted Index.
          </p>
        </div>

        {/* Timeframe selector tabs */}
        <div className="flex items-center space-x-1 bg-[#090C10] p-1 rounded border border-panelBorder font-mono text-xs">
          {(["1Y", "3Y", "5Y"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 rounded transition-all font-bold ${
                timeframe === t
                  ? "bg-accentCyan text-bgDark shadow-[0_0_10px_rgba(0,229,255,0.4)]"
                  : "text-textSub hover:text-textMain hover:bg-panel"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Summary Strip */}
      {activePoint && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#090C10] p-4 rounded border border-panelBorder font-mono text-xs">
          <div>
            <span className="text-textSub block text-[10px]">TIME / DATE</span>
            <span className="text-textMain font-bold text-sm">{activePoint.date}</span>
          </div>
          <div>
            <span className="text-accentCyan block text-[10px] font-bold">ARCUS ALPHA</span>
            <span className="text-accentCyan font-bold text-sm font-mono-data">
              {activePoint.arcus.toFixed(1)} <span className="text-xs text-posGreen">(+{pctGain}%)</span>
            </span>
          </div>
          <div>
            <span className="text-textSub block text-[10px]">S&P 500 BENCHMARK</span>
            <span className="text-textMain font-mono-data font-semibold text-sm">
              {activePoint.sp500.toFixed(1)}
            </span>
          </div>
          <div>
            <span className="text-textSub block text-[10px]">HEDGE FUND AVG</span>
            <span className="text-textSub font-mono-data text-sm">
              {activePoint.hedgeFund.toFixed(1)}
            </span>
          </div>
        </div>
      )}

      {/* SVG Interactive Canvas */}
      <div className="relative w-full aspect-[2.4/1] bg-[#090C10]/60 rounded border border-panelBorder p-2">
        {loading && (
          <div className="absolute inset-0 bg-bgDark/80 backdrop-blur-sm z-10 flex items-center justify-center font-mono text-xs text-accentCyan">
            <span className="animate-pulse">COMPUTING PERFORMANCE MATRIX...</span>
          </div>
        )}

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="arcusGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding.top + chartH * ratio;
            const val = (maxValue - ratio * (maxValue - minValue)).toFixed(0);
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="#21262D"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 8}
                  y={y + 3}
                  fill="#8B949E"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={createAreaPath()} fill="url(#arcusGlow)" />

          {/* Lines */}
          {/* Hedge Fund index line (Gray) */}
          <path
            d={createPath("hedgeFund")}
            fill="none"
            stroke="#484F58"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* S&P 500 line (Muted Neutral White) */}
          <path
            d={createPath("sp500")}
            fill="none"
            stroke="#8B949E"
            strokeWidth="2"
          />

          {/* ARCUS line (Electric Cyan Glowing) */}
          <path
            d={createPath("arcus")}
            fill="none"
            stroke="#00E5FF"
            strokeWidth="3.5"
            className="filter drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
          />

          {/* X Axis Labels */}
          {data.map((point, i) => {
            const x = getX(i);
            return (
              <text
                key={i}
                x={x}
                y={svgHeight - 12}
                fill="#8B949E"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {point.date}
              </text>
            );
          })}

          {/* Interactive Hover Vertical Bar & Dots */}
          {data.map((point, i) => {
            const x = getX(i);
            const yArcus = getY(point.arcus);
            const isHovered = hoverIndex === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                className="cursor-pointer"
              >
                {/* Hit box */}
                <rect
                  x={x - chartW / (data.length * 2)}
                  y={padding.top}
                  width={chartW / data.length}
                  height={chartH}
                  fill="transparent"
                />

                {isHovered && (
                  <>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + chartH}
                      stroke="#00E5FF"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={x}
                      cy={yArcus}
                      r="6"
                      fill="#00E5FF"
                      className="filter drop-shadow-[0_0_10px_rgba(0,229,255,0.9)]"
                    />
                    <circle cx={x} cy={yArcus} r="2" fill="#0D1117" />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend & Capital Growth Multiplier */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 font-mono text-xs text-textSub">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-2 text-textMain">
            <span className="w-3 h-1 rounded bg-accentCyan shadow-[0_0_8px_#00E5FF]"></span>
            <strong className="text-accentCyan">ARCUS ALPHA</strong>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-textSub"></span>
            S&P 500 Index
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-t border-dashed border-textSub"></span>
            Hedge Fund Composite
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] bg-panelBorder/40 px-3 py-1.5 rounded border border-panelBorder">
          <Info className="w-3.5 h-3.5 text-accentCyan" />
          <span>$100,000 Initial Capital Growth: <strong className="text-posGreen">${(100000 * (latestArcus / startingValue)).toLocaleString("en-US", { maximumFractionDigits: 0 })}</strong></span>
        </div>
      </div>
    </div>
  );
}
