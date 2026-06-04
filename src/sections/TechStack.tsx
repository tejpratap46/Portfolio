import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillCategories, toolsAndOthers } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const catRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      catRefs.current.forEach((cat, i) => {
        if (!cat) return;
        gsap.fromTo(
          cat,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cat,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative z-10 bg-[#f9f9f9] dark:bg-[#0a0a0a] py-20 sm:py-24 px-5 sm:px-8 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 opacity-0">
          <span className="text-sm tracking-widest uppercase text-black/40 dark:text-white/40 block mb-3 transition-colors duration-300">
            05. Skills
          </span>
          <h2 className="text-4xl sm:text-5_xl md:text-6xl font-normal text-black dark:text-white tracking-[-2px] transition-colors duration-300">
            Tech Stack
          </h2>
        </div>

        {/* Skill categories with pills */}
        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.title}
              ref={(el) => {
                catRefs.current[i] = el;
              }}
              className="opacity-0"
            >
              <h3 className="text-sm font-medium text-black/40 dark:text-white/40 uppercase tracking-wider mb-4 transition-colors duration-300">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill) => (
                  <a
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={skill.name}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white/90 shadow-sm dark:shadow-none hover:border-[#2d62ff]/40 dark:hover:border-[#2d62ff]/40 hover:shadow-md transition-all duration-300 cursor-pointer hover:text-[#2d62ff]"
                  >
                    {skill.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra skills cloud */}
        <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
          <h3 className="text-sm font-medium text-black/40 dark:text-white/40 uppercase tracking-wider mb-4 transition-colors duration-300">
            Tools & Others
          </h3>
          <div className="flex flex-wrap gap-2">
            {toolsAndOthers.map((tool) => (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                key={tool.name}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/[0.03] dark:bg-white/[0.05] text-black/60 dark:text-white/60 border border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer hover:text-black dark:hover:text-white"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
