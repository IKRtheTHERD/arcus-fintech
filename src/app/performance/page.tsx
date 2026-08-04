import { getMonthlyReturns, getRiskMetrics } from "@/lib/db";
import ReturnsChart from "@/components/ReturnsChart";
import HeatmapTable from "@/components/HeatmapTable";
import RiskMetricsTable from "@/components/RiskMetricsTable";
import Link from "next/link";
import { TrendingUp, ShieldCheck, ArrowRight, Activity, BarChart3 } from "lucide-react";

export const metadata = {
  title: "Performance & Monthly Heatmap — ARCUS FINTECH",
  description: "Audited monthly returns heatmap matrix, risk metrics, and cumulative yield growth.",
};

export default async function PerformancePage() {
  const [monthlyReturns, riskMetrics] = await Promise.all([
    getMonthlyReturns(),
    getRiskMetrics(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-panelBorder pb-8 space-y-4 font-mono">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/30 text-xs font-bold">
          <Activity className="w-3.5 h-3.5" />
          AUDITED QUANTITATIVE PERFORMANCE LEDGER
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-textMain tracking-tight uppercase">
          RETURNS MATRIX & RISK HEATMAP
        </h1>
        <p className="text-textSub text-sm sm:text-base max-w-3xl leading-relaxed">
          Comprehensive 2020–2024 performance analytics for the ARCUS Flagship Quantitative Strategy. Net of all fees, audited by KPMG LLP.
        </p>
      </div>

      {/* SVG Interactive Chart */}
      <ReturnsChart />

      {/* Monthly Returns Heatmap Table */}
      <HeatmapTable initialReturns={monthlyReturns} />

      {/* Risk Metrics Table */}
      <RiskMetricsTable metrics={riskMetrics} />

      {/* Bottom CTA Banner */}
      <div className="bg-[#090C10] border border-panelBorder p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-textMain uppercase">WANT TO VERIFY FULL AUDITED REPORTING?</h3>
          <p className="text-textSub text-xs">Access KPMG audited statements and ADV Part 2 disclosures via our investor portal.</p>
        </div>
        <Link
          href="/request-access"
          className="px-6 py-3 rounded bg-accentCyan text-bgDark font-bold text-xs uppercase tracking-wider hover:bg-accentCyan/90 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
          REQUEST ACCREDITED ACCESS
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
