import { skillCategories, toolsAndOthers } from "@/data";

export default function TechStack() {
  return (
    <section id="stack" className="py-14 sm:py-20 page-column border-t border-line">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
          Stack &amp; Capabilities
        </h2>
        <p className="mt-1 text-sm text-copy-muted font-normal">
          Technologies and domains I have architected and shipped software with.
        </p>
      </div>

      {/* Grid of Categorized Technologies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div key={category.title} className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-copy-muted font-semibold">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-line bg-[var(--card-surface)] hover:bg-[var(--card-hover-surface)] hover:border-line-strong text-xs font-mono text-ink transition-all inline-flex items-center gap-1.5"
                >
                  <span>{skill.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Tools & Infrastructure */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-copy-muted font-semibold">
            Infrastructure &amp; Systems
          </h3>
          <div className="flex flex-wrap gap-2">
            {toolsAndOthers.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg border border-line bg-[var(--card-surface)] hover:bg-[var(--card-hover-surface)] hover:border-line-strong text-xs font-mono text-ink transition-all inline-flex items-center gap-1.5"
              >
                <span>{tool.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
