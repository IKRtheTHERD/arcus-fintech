import { ShieldCheck, Building2, Scale, CheckCircle } from "lucide-react";
import { Partner } from "@/lib/db";

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <div className="bg-[#090C10] border border-panelBorder rounded-lg p-6 font-mono space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-panelBorder pb-4 gap-2">
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-accentCyan" />
          <h3 className="font-bold text-textMain text-sm uppercase tracking-wide">
            INSTITUTIONAL COUNTERPARTIES & GOVERNANCE
          </h3>
        </div>
        <span className="text-xs text-posGreen flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" /> TIER-1 INSTITUTIONAL INFRASTRUCTURE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className="bg-panel p-4 rounded border border-panelBorder space-y-2 hover:border-accentCyan/40 transition-all"
          >
            <span className="text-[10px] text-accentCyan font-bold uppercase tracking-wider block">
              {partner.type.toUpperCase().replace("_", " ")}
            </span>
            <h4 className="font-bold text-textMain text-base">{partner.name}</h4>
            <p className="text-textSub text-xs">{partner.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
