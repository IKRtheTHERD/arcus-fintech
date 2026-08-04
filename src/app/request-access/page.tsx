import InvestorForm from "@/components/InvestorForm";
import PartnersSection from "@/components/PartnersSection";
import { getPartners } from "@/lib/db";
import { Lock, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Accredited Investor Access Portal — ARCUS FINTECH",
  description: "Private application portal for accredited investors and family offices.",
};

export default async function RequestAccessPage() {
  const partners = await getPartners();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b border-panelBorder pb-8 space-y-4 font-mono text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/30 text-xs font-bold">
          <Lock className="w-3.5 h-3.5" />
          SEC REGULATION D RULE 501 COMPLIANT
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-textMain tracking-tight uppercase">
          ACCREDITED INVESTOR PORTAL
        </h1>
        <p className="text-textSub text-sm sm:text-base leading-relaxed">
          Participation in ARCUS Quantitative Strategies is restricted to Accredited Investors and Qualified Purchasers. Minimum initial investment: $500,000 USD.
        </p>
      </div>

      {/* Access Form */}
      <div className="max-w-4xl mx-auto">
        <InvestorForm />
      </div>

      {/* Institutional Counterparties */}
      <PartnersSection partners={partners} />
    </div>
  );
}
