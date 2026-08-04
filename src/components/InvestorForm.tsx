"use client";

import { useState } from "react";
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, ArrowRight, FileCheck } from "lucide-react";

export default function InvestorForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    investableAssets: "$1M - $5M",
    investorType: "Individual Accredited Investor",
    referralSource: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Application submission failed.");
      }

      setSubmittedApp(json.application);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-panel border border-panelBorder rounded-lg p-6 sm:p-8 space-y-6 shadow-2xl relative font-mono">
      {submittedApp ? (
        <div className="text-center py-10 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-posGreen/20 border-2 border-posGreen text-posGreen mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(63,185,80,0.4)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded bg-posGreen/10 text-posGreen border border-posGreen/30 text-xs font-bold uppercase">
              QUALIFICATION APPLICATION SUBMITTED
            </span>
            <h3 className="font-mono font-extrabold text-2xl text-textMain">ACCESS REQUEST RECEIVED</h3>
            <p className="text-textSub text-xs max-w-lg mx-auto leading-relaxed">
              Your application has been logged into the ARCUS compliance database under Reference Key:
            </p>
            <div className="inline-block bg-[#090C10] px-4 py-2 rounded border border-accentCyan text-accentCyan font-bold text-sm tracking-wider">
              {submittedApp.id}
            </div>
          </div>

          <div className="bg-[#090C10] p-6 rounded border border-panelBorder max-w-md mx-auto text-left space-y-3 text-xs">
            <div className="flex justify-between border-b border-panelBorder/50 pb-2">
              <span className="text-textSub">APPLICANT NAME:</span>
              <strong className="text-textMain">{submittedApp.fullName}</strong>
            </div>
            <div className="flex justify-between border-b border-panelBorder/50 pb-2">
              <span className="text-textSub">QUALIFICATION EMAIL:</span>
              <strong className="text-textMain">{submittedApp.email}</strong>
            </div>
            <div className="flex justify-between border-b border-panelBorder/50 pb-2">
              <span className="text-textSub">INVESTABLE ASSETS:</span>
              <strong className="text-accentCyan">{submittedApp.investableAssets}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-textSub">VERIFICATION STATUS:</span>
              <strong className="text-posGreen font-bold">{submittedApp.status}</strong>
            </div>
          </div>

          <p className="text-[11px] text-textSub italic max-w-md mx-auto">
            An ARCUS Institutional Representative will contact you within 24 hours to conduct Rule 501 accreditation verification and issue fund offering memorandum.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-panelBorder pb-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-accentCyan" />
              <h3 className="font-mono font-bold text-textMain text-xl tracking-wide uppercase">
                ACCREDITED INVESTOR QUALIFICATION PORTAL
              </h3>
            </div>
            <p className="text-textSub text-xs">
              Access to ARCUS Quantitative Strategies is restricted to Accredited Investors ($500K USD Minimum Initial Commitment).
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded bg-negRed/10 border border-negRed/40 text-negRed text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-textSub uppercase font-bold">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Jonathan Sterling"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[#090C10] border border-panelBorder rounded px-3.5 py-2.5 text-textMain focus:outline-none focus:border-accentCyan transition-colors"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-textSub uppercase font-bold">Institutional / Corporate Email *</label>
              <input
                type="email"
                required
                placeholder="j.sterling@sterlingfamilyoffice.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#090C10] border border-panelBorder rounded px-3.5 py-2.5 text-textMain focus:outline-none focus:border-accentCyan transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="block text-textSub uppercase font-bold">Direct Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 (212) 555-0199"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#090C10] border border-panelBorder rounded px-3.5 py-2.5 text-textMain focus:outline-none focus:border-accentCyan transition-colors"
              />
            </div>

            {/* Investor Type */}
            <div className="space-y-1.5">
              <label className="block text-textSub uppercase font-bold">Investor Classification *</label>
              <select
                value={formData.investorType}
                onChange={(e) => setFormData({ ...formData, investorType: e.target.value })}
                className="w-full bg-[#090C10] border border-panelBorder rounded px-3.5 py-2.5 text-textMain focus:outline-none focus:border-accentCyan transition-colors"
              >
                <option value="Individual Accredited Investor">Individual Accredited Investor ($1M+ Net Worth)</option>
                <option value="Family Office">Single / Multi-Family Office</option>
                <option value="Institutional Fund">Institutional Fund of Funds / RIA</option>
                <option value="Endowment">Endowment / Pension / Sovereign Wealth</option>
              </select>
            </div>

            {/* Investable Assets */}
            <div className="space-y-1.5">
              <label className="block text-textSub uppercase font-bold">Liquid Investable Assets *</label>
              <select
                value={formData.investableAssets}
                onChange={(e) => setFormData({ ...formData, investableAssets: e.target.value })}
                className="w-full bg-[#090C10] border border-panelBorder rounded px-3.5 py-2.5 text-textMain focus:outline-none focus:border-accentCyan transition-colors"
              >
                <option value="$500K - $1M">$500,000 – $1,000,000 USD</option>
                <option value="$1M - $5M">$1,000,000 – $5,000,000 USD</option>
                <option value="$5M - $25M">$5,000,000 – $25,000,000 USD</option>
                <option value="$25M+">$25,000,000+ USD</option>
              </select>
            </div>

            {/* Referral / Source */}
            <div className="space-y-1.5">
              <label className="block text-textSub uppercase font-bold">Referral Source / Key (Optional)</label>
              <input
                type="text"
                placeholder="Prime Broker / Existing Investor / Advisor"
                value={formData.referralSource}
                onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                className="w-full bg-[#090C10] border border-panelBorder rounded px-3.5 py-2.5 text-textMain focus:outline-none focus:border-accentCyan transition-colors"
              />
            </div>
          </div>

          <div className="bg-[#090C10] p-4 rounded border border-panelBorder text-[11px] text-textSub flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-accentCyan flex-shrink-0 mt-0.5" />
            <span>
              By submitting, you certify under penalty of perjury that you satisfy SEC Rule 501 Accredited Investor requirements or represent a Qualified Purchaser under Investment Company Act Section 2(a)(51).
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded bg-accentCyan text-bgDark font-mono font-extrabold text-sm tracking-wider uppercase hover:bg-accentCyan/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50"
          >
            {submitting ? (
              <span className="animate-pulse">VERIFYING ACCREDITATION CREDENTIALS...</span>
            ) : (
              <>
                <FileCheck className="w-4 h-4" />
                SUBMIT ACCREDITED INVESTOR APPLICATION
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
