"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Activity, ChevronRight, Lock } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "OVERVIEW" },
    { href: "/strategy", label: "QUANT STRATEGIES" },
    { href: "/performance", label: "PERFORMANCE & HEATMAP" },
    { href: "/request-access", label: "ACCREDITED PORTAL" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-panelBorder bg-bgDark/90 backdrop-blur-md">
      {/* Top Bloomberg Ticker Strip */}
      <div className="bg-[#090C10] border-b border-panelBorder/60 py-1.5 px-4 text-xs font-mono text-textSub flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-6 whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-accentCyan font-semibold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            ARCUS CORE ENGINE: ONLINE
          </span>
          <span className="text-panelBorder">|</span>
          <span>5Y CAGR: <strong className="text-posGreen font-mono">+31.4%</strong></span>
          <span className="text-panelBorder">|</span>
          <span>SHARPE: <strong className="text-accentCyan font-mono">2.84</strong></span>
          <span className="text-panelBorder">|</span>
          <span>MAX DD: <strong className="text-posGreen font-mono">-3.8%</strong></span>
          <span className="text-panelBorder">|</span>
          <span>BETA TO SPX: <strong className="text-textMain font-mono">0.08</strong></span>
        </div>
        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-textSub">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-accentCyan" /> ACCREDITED INVESTORS ONLY ($500K MIN)
          </span>
        </div>
      </div>

      {/* Main Header Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded bg-panel border border-accentCyan/40 flex items-center justify-center group-hover:border-accentCyan transition-all shadow-[0_0_12px_rgba(0,229,255,0.2)]">
            <span className="font-mono font-extrabold text-accentCyan text-lg tracking-tighter">A/</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-mono font-bold text-textMain tracking-wider text-base">ARCUS</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/30">QUANT</span>
            </div>
            <span className="text-[10px] font-mono text-textSub tracking-tight block -mt-0.5">ALGORITHMIC CAPITAL</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 font-mono text-xs tracking-wider">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded transition-all ${
                  isActive
                    ? "text-accentCyan bg-accentCyan/10 font-bold border border-accentCyan/30"
                    : "text-textSub hover:text-textMain hover:bg-panel"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center space-x-3">
          <Link
            href="/request-access"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accentCyan text-bgDark font-mono font-bold text-xs tracking-wider hover:bg-accentCyan/90 transition-all shadow-[0_0_16px_rgba(0,229,255,0.3)]"
          >
            <ShieldCheck className="w-4 h-4" />
            REQUEST ACCESS
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
