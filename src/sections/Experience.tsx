import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Building2 } from "lucide-react";
import { experiences } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
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
      id="experience"
      className="relative z-10 bg-[#f9f9f9] dark:bg-[#0a0a0a] py-24 sm:py-32 px-5 sm:px-8 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <span className="text-sm tracking-widest uppercase text-black/40 dark:text-white/40 block mb-3 transition-colors duration-300">
            03. Experience
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-black dark:text-white tracking-[-2px] transition-colors duration-300">
            Where I've Worked
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-black/10 dark:bg-white/10 transition-colors duration-300" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="relative pl-12 sm:pl-20 opacity-0"
                style={{ perspective: "1000px" }}
              >
                <div className="absolute left-2 sm:left-6 top-3 w-4 h-4 rounded-full bg-[#2d62ff] border-4 border-[#f9f9f9] dark:border-[#0a0a0a] transition-colors duration-300" />

                <div className="group rounded-2xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-6 sm:p-8 hover:border-[#2d62ff]/20 dark:hover:border-[#2d62ff]/30 hover:shadow-lg dark:hover:shadow-[#2d62ff]/5 transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-5 h-5 text-[#2d62ff]" />
                        <h3 className="text-lg font-medium text-black dark:text-white transition-colors duration-300">
                          {exp.company}
                        </h3>
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black/30 dark:text-white/30 hover:text-[#2d62ff] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <p className="text-[#2d62ff] font-medium text-sm">
                        {exp.role}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-xs text-black/50 dark:text-white/50 font-mono transition-colors duration-300">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-black/60 dark:text-white/50 text-sm mb-4 leading-relaxed transition-colors duration-300">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.details.map((detail, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-black/50 dark:text-white/40 transition-colors duration-300"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#2d62ff]/60 mt-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
