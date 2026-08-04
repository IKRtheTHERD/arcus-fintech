import { getStrategies } from "@/lib/db";
import StrategyBreakdown from "@/components/StrategyBreakdown";
import Link from "next/link";
import { Cpu, ArrowRight, ShieldCheck, Layers, Zap, Terminal } from "lucide-react";

export const metadata = {
  title: "Quantitative Strategies — ARCUS FINTECH",
  description: "Detailed quantitative methodology, orderbook execution engines, and risk management parameters.",
};

export default async function StrategyPage() {
  const strategies = await getStrategies();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="border-b border-panelBorder pb-8 space-y-4 font-mono">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/30 text-xs font-bold">
          <Cpu className="w-3.5 h-3.5" />
          QUANTITATIVE METHODOLOGY & ALGORITHMIC ARCHITECTURE
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-textMain tracking-tight uppercase">
          QUANT STRATEGY ENGINES
        </h1>
        <p className="text-textSub text-sm sm:text-base max-w-3xl leading-relaxed">
          ARCUS operates four non-correlated quantitative sub-systems designed to systematically capture statistical mispricings, order flow imbalances, and options skew while maintaining net-zero market beta.
        </p>
      </div>

      {/* Main Strategy Breakdown Component */}
      <StrategyBreakdown strategies={strategies} />

      {/* Deep-Dive Architectural Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <div className="bg-panel border border-panelBorder p-6 rounded-lg space-y-3">
          <div className="w-8 h-8 rounded bg-[#090C10] border border-accentCyan/40 flex items-center justify-center text-accentCyan font-bold">
            01
          </div>
          <h3 className="font-bold text-textMain text-sm uppercase">SIGNAL GENERATION & FEATURE ENGINEERING</h3>
          <p className="text-textSub leading-relaxed">
            Continuously ingests 620,000+ data ticks per second across Level-3 orderbooks, cross-asset correlations, options implied volatility surfaces, and macro liquidity indicators.
          </p>
        </div>

        <div className="bg-panel border border-panelBorder p-6 rounded-lg space-y-3">
          <div className="w-8 h-8 rounded bg-[#090C10] border border-accentCyan/40 flex items-center justify-center text-accentCyan font-bold">
            02
          </div>
          <h3 className="font-bold text-textMain text-sm uppercase">PORTFOLIO OPTIMIZATION & RISK ENGINE</h3>
          <p className="text-textSub leading-relaxed">
            Real-time quadratic convex optimization enforces strict position limits, value-at-risk (VaR) constraints, and automatic tail-risk hedge triggers.
          </p>
        </div>

        <div className="bg-panel border border-panelBorder p-6 rounded-lg space-y-3">
          <div className="w-8 h-8 rounded bg-[#090C10] border border-accentCyan/40 flex items-center justify-center text-accentCyan font-bold">
            03
          </div>
          <h3 className="font-bold text-textMain text-sm uppercase">ULTRA-LOW LATENCY EXECUTION LAYER</h3>
          <p className="text-textSub leading-relaxed">
            Direct Market Access (DMA) sub-millisecond order routing via Equinix NY4 and LD4 co-located fiber networks to minimize slippage and maximize fill quality.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#090C10] border border-accentCyan/40 p-8 rounded-lg text-center space-y-4 font-mono">
        <h3 className="text-xl font-bold text-textMain uppercase">READY TO EXAMINE COMPLETE WHITE PAPER & DUEL-LEGER?</h3>
        <p className="text-textSub text-xs max-w-xl mx-auto">
          Accredited institutional investors may request complete quantitative code methodology and historical trade audit logs.
        </p>
        <Link
          href="/request-access"
          className="inline-flex items-center gap-2 px-6 py-3 rounded bg-accentCyan text-bgDark font-bold text-xs uppercase tracking-wider hover:bg-accentCyan/90 transition-all shadow-[0_0_16px_rgba(0,229,255,0.3)]"
        >
          <ShieldCheck className="w-4 h-4" />
          REQUEST ACCREDITED INVESTOR PORTAL
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
