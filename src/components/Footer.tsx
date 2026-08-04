import Link from "next/link";
import { FileText, ShieldAlert, Lock, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-panelBorder bg-[#090C10] text-textSub text-xs font-mono py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-panelBorder">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-panel border border-accentCyan/40 flex items-center justify-center">
                <span className="font-mono font-bold text-accentCyan text-xs">A/</span>
              </div>
              <span className="font-bold text-textMain text-sm tracking-wider">ARCUS FINTECH CAPITAL MANAGEMENT</span>
            </div>
            <p className="text-textSub leading-relaxed max-w-xl text-[11px]">
              ARCUS Fintech is an SEC-registered investment adviser executing proprietary quantitative strategies and machine learning portfolio management for accredited qualified purchasers and family offices.
            </p>
            <div className="flex items-center space-x-4 text-[11px] text-accentCyan">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SEC CRD #391042</span>
              <span>|</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> ADV PART 2A DISCLOSURE</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h4 className="font-bold text-textMain text-xs tracking-wider uppercase border-b border-panelBorder pb-1">NAVIGATION</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li><Link href="/" className="hover:text-accentCyan transition-colors">System Overview</Link></li>
              <li><Link href="/strategy" className="hover:text-accentCyan transition-colors">Quantitative Methodologies</Link></li>
              <li><Link href="/performance" className="hover:text-accentCyan transition-colors">Returns & Monthly Heatmap</Link></li>
              <li><Link href="/request-access" className="hover:text-accentCyan transition-colors">Investor Access Portal</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h4 className="font-bold text-textMain text-xs tracking-wider uppercase border-b border-panelBorder pb-1">HEADQUARTERS</h4>
            <p className="text-[11px] leading-relaxed">
              One World Trade Center, Suite 8400<br />
              New York, NY 10007<br />
              Institutional Desk: +1 (212) 555-0199<br />
              ir@arcusquant.com
            </p>
          </div>
        </div>

        {/* Regulatory Disclaimers */}
        <div className="space-y-3 text-[10px] text-textSub/80 leading-normal bg-panel/40 p-4 rounded border border-panelBorder">
          <div className="flex items-center gap-1.5 text-accentCyan font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            REGULATORY DISCLOSURES & RISK WARNING
          </div>
          <p>
            Past performance is no guarantee of future results. Investment in algorithmic hedge funds involves substantial risk of loss, including potential loss of principal. Returns presented represent net-of-fees performance for the ARCUS Flagship Master Fund from 2020 through 2024. S&P 500 Total Return Index and HFRI Fund Weighted Composite Index are provided for comparative benchmark purposes only.
          </p>
          <p>
            Securities offered through ARCUS Execution LLC, Member FINRA / SIPC. Access is strictly limited to Accredited Investors as defined under Rule 501 of Regulation D and Qualified Purchasers under Section 2(a)(51) of the Investment Company Act of 1940. Minimum initial investment: $500,000 USD.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] pt-4 text-textSub gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-x-3 gap-y-1 text-center sm:text-left">
            <span>© 2025 Darin. All rights reserved.</span>
            <span className="hidden sm:inline text-panelBorder">|</span>
            <span>Sulaymaniyah, Kurdistan</span>
            <span className="hidden sm:inline text-panelBorder">|</span>
            <a href="mailto:IBR.KR@outlook.com" className="hover:text-accentCyan transition-colors">IBR.KR@outlook.com</a>
            <span className="hidden sm:inline text-panelBorder">|</span>
            <span className="text-accentCyan/70">Designed &amp; Developed by Darin</span>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span className="hover:text-textMain cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-textMain cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-textMain cursor-pointer">Regulatory Filings</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
