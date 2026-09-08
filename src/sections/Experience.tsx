import { experiences } from "@/data";
import { ArrowUpRight } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-14 sm:py-20 page-column border-t border-line">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
          Experience &amp; Background
        </h2>
        <p className="mt-1 text-sm text-copy-muted font-normal">
          A track record of engineering leadership, automotive systems, and SaaS platforms.
        </p>
      </div>

      {/* Editorial Timeline / Narrative */}
      <div className="space-y-12">
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="pb-10 last:pb-0 border-b last:border-b-0 border-line space-y-3"
          >
            {/* Top row: Role, Company, Period */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-ink">
                  {exp.role}
                </h3>
                <span className="text-copy-muted text-sm">at</span>
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link font-medium text-sm sm:text-base inline-flex items-center gap-0.5"
                >
                  <span>{exp.company}</span>
                  <ArrowUpRight className="w-3 h-3 text-copy-muted" />
                </a>
              </div>

              <div className="font-mono text-xs text-copy-muted shrink-0">
                {exp.period}
              </div>
            </div>

            {/* Description Summary */}
            <p className="text-sm sm:text-base text-copy leading-relaxed">
              {exp.description}
            </p>

            {/* Detail Bullet Points */}
            <ul className="space-y-1.5 pt-1">
              {exp.details.map((detail, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-copy flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-2 shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
