import { UserCheck, GraduationCap, Award } from "lucide-react";
import { TeamMember } from "@/lib/db";

interface TeamSectionProps {
  team: TeamMember[];
}

export default function TeamSection({ team }: TeamSectionProps) {
  return (
    <div className="space-y-8 font-mono">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded bg-accentCyan/10 text-accentCyan border border-accentCyan/30 text-xs font-bold uppercase">
          QUANTITATIVE RESEARCH LEADERSHIP
        </span>
        <h2 className="font-mono font-extrabold text-3xl text-textMain uppercase tracking-tight">
          PIONEERING QUANTITATIVE MINDS
        </h2>
        <p className="text-textSub text-xs">
          Built by former senior quantitative researchers and execution leads from D.E. Shaw, Renaissance Technologies, Citadel, and Two Sigma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-panel border border-panelBorder rounded-lg p-5 space-y-3 hover:border-accentCyan/50 transition-all group"
          >
            <div className="w-10 h-10 rounded bg-[#090C10] border border-accentCyan/40 flex items-center justify-center text-accentCyan font-bold text-base">
              {member.name.split(" ").map(n => n[0]).join("")}
            </div>

            <div>
              <h3 className="font-bold text-textMain text-sm group-hover:text-accentCyan transition-colors">
                {member.name}
              </h3>
              <p className="text-accentCyan text-xs">{member.title}</p>
            </div>

            <div className="pt-2 border-t border-panelBorder/60 space-y-2 text-[11px] text-textSub">
              <p className="line-clamp-3 leading-relaxed">{member.bio}</p>
              <div className="flex items-center gap-1.5 text-textMain font-semibold pt-1">
                <GraduationCap className="w-3.5 h-3.5 text-accentCyan" />
                <span>{member.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
