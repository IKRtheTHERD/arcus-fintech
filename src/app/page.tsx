import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, Terminal, ChevronRight, Lock, Sparkles } from "lucide-react";
import StatsStrip from "@/components/StatsStrip";
import ReturnsChart from "@/components/ReturnsChart";
import HeatmapTable from "@/components/HeatmapTable";
import StrategyBreakdown from "@/components/StrategyBreakdown";
import RiskMetricsTable from "@/components/RiskMetricsTable";
import InvestorForm from "@/components/InvestorForm";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import { getStrategies, getMonthlyReturns, getRiskMetrics, getTeam, getPartners } from "@/lib/db";

export const revalidate = 60;

export default async function HomePage() {
  const [strategies, monthlyReturns, riskMetrics, team, partners] = await Promise.all([
    getStrategies(),
    getMonthlyReturns(),
    getRiskMetrics(),
    getTeam(),
    getPartners(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="space-y-8 text-center sm:text-left relative pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accentCyan/10 text-accentCyan border border-accentCyan/30 font-mono text-xs font-semibold">
          <Terminal className="w-4 h-4" />
          <span>INSTITUTIONAL QUANTITATIVE ASSET MANAGEMENT</span>
          <span className="w-2 h-2 rounded-full bg-posGreen animate-pulse"></span>
        </div>

        <div className="space-y-4 max-w-4xl">
          <h1 className="font-mono font-extrabold text-4xl sm:text-6xl text-textMain tracking-tight uppercase leading-[1.1]">
            ALPHA, <span className="text-accentCyan underline decoration-accentCyan/30 underline-offset-8">ENGINEERED.</span>
          </h1>
          <p className="text-textSub font-mono text-base sm:text-lg max-w-3xl leading-relaxed">
            Proprietary algorithmic execution systems delivering non-correlated alpha (+31.4% 5Y CAGR, 2.84 Sharpe Ratio) for accredited investors and family offices. Zero market exposure, quantitative precision.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 font-mono text-xs">
          <Link
            href="/request-access"
            className="w-full sm:w-auto px-8 py-4 rounded bg-accentCyan text-bgDark font-extrabold text-sm tracking-wider uppercase hover:bg-accentCyan/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.4)]"
          >
            <ShieldCheck className="w-5 h-5" />
            REQUEST ACCREDITED ACCESS
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/performance"
            className="w-full sm:w-auto px-8 py-4 rounded bg-panel border border-panelBorder hover:border-accentCyan text-textMain font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
          >
            <Activity className="w-4 h-4 text-accentCyan" />
            INSPECT AUDITED RETURNS MATRIX
          </Link>
        </div>

        {/* Key Metrics Strip */}
        <div className="pt-4">
          <StatsStrip />
        </div>
      </section>

      {/* Interactive Yield & Cumulative Returns Chart */}
      <section id="returns-chart" className="space-y-4">
        <ReturnsChart />
      </section>

      {/* Monthly Returns Heatmap Table */}
      <section id="heatmap" className="space-y-4">
        <HeatmapTable initialReturns={monthlyReturns} />
      </section>

      {/* Quantitative Strategies Breakdown */}
      <section id="strategies" className="space-y-4">
        <StrategyBreakdown strategies={strategies} />
      </section>

      {/* Risk Metrics & Convexity Matrix */}
      <section id="risk-metrics" className="space-y-4">
        <RiskMetricsTable metrics={riskMetrics} />
      </section>

      {/* Team & Institutional Governance */}
      <section id="team" className="space-y-12">
        <TeamSection team={team} />
        <PartnersSection partners={partners} />
      </section>

      {/* Accredited Investor Qualification Form Portal */}
      <section id="access-portal" className="space-y-4">
        <InvestorForm />
      </section>
    </div>
  );
}
