import { TrendingUp, ShieldCheck, Activity, Award, Layers } from "lucide-react";

export default function StatsStrip() {
  const stats = [
    {
      label: "5-YEAR AUDITED CAGR",
      value: "+31.4%",
      subtext: "vs S&P 500 (+14.2%)",
      color: "text-posGreen",
      icon: TrendingUp,
    },
    {
      label: "RISK-ADJUSTED SHARPE",
      value: "2.84",
      subtext: "Risk-Free Rate = 4.5%",
      color: "text-accentCyan",
      icon: Award,
    },
    {
      label: "MAX HISTORICAL DRAWDOWN",
      value: "-3.8%",
      subtext: "vs S&P 500 (-24.5%)",
      color: "text-posGreen",
      icon: ShieldCheck,
    },
    {
      label: "SP500 CORRELATION BETA",
      value: "0.08",
      subtext: "Strict Market Neutrality",
      color: "text-textMain",
      icon: Layers,
    },
    {
      label: "DAILY ML SIGNALS",
      value: "620,000+",
      subtext: "Across 14 Global Exchanges",
      color: "text-accentCyan",
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 font-mono">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={idx}
            className="bg-panel border border-panelBorder rounded-lg p-4 space-y-2 hover:border-accentCyan/40 transition-all group shadow-md"
          >
            <div className="flex items-center justify-between text-textSub text-[10px]">
              <span className="tracking-wider uppercase font-bold">{stat.label}</span>
              <IconComponent className="w-3.5 h-3.5 text-accentCyan group-hover:scale-110 transition-transform" />
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${stat.color} font-mono-data`}>
              {stat.value}
            </div>
            <div className="text-[10px] text-textSub">
              {stat.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
}
