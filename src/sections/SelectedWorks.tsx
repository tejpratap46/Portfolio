import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Globe, Sparkles, Wrench } from "lucide-react";
import {
  productProjects,
  openSourceProjects,
  sideProjects,
  aiExperiments,
} from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 bg-[#f9f9f9] dark:bg-[#0a0a0a] py-24 sm:py-32 px-5 sm:px-8 transition-colors duration-300"
    >
      <div ref={headerRef} className="max-w-6xl mx-auto mb-16 opacity-0">
        <span className="text-sm tracking-widest uppercase text-black/40 dark:text-white/40 block mb-3 transition-colors duration-300">
          04. Portfolio
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal text-black dark:text-white tracking-[-2px] transition-colors duration-300">
          Selected Projects
        </h2>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        {/* Products */}
        <div>
          <h3 className="text-lg font-medium text-black/60 dark:text-white/60 mb-6 flex items-center gap-2 transition-colors duration-300">
            <Globe className="w-5 h-5" />
            Products Built
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {productProjects.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  ref={addCardRef}
                  className="rounded-2xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-6 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300 opacity-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-medium text-black dark:text-white group-hover:text-[#2d62ff] transition-colors">
                      {p.name}
                    </h4>
                    <ExternalLink className="w-4 h-4 text-black/30 dark:text-white/30 group-hover:text-[#2d62ff] transition-colors" />
                  </div>
                  <p className="text-sm text-black/50 dark:text-white/50 mb-4 transition-colors">
                    {p.description}
                  </p>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.label}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Open Source */}
        <div>
          <h3 className="text-lg font-medium text-black/60 dark:text-white/60 mb-6 flex items-center gap-2 transition-colors duration-300">
            <Github className="w-5 h-5" />
            Open Source
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {openSourceProjects.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  ref={addCardRef}
                  className="rounded-2xl bg-white dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-6 hover:border-black/15 dark:hover:border-white/15 hover:shadow-lg transition-all duration-300 h-full opacity-0"
                >
                  <Github className="w-5 h-5 text-black/30 dark:text-white/30 mb-4 group-hover:text-[#2d62ff] transition-colors" />
                  <h4 className="text-base font-medium text-black dark:text-white mb-2 group-hover:underline decoration-1 underline-offset-4 transition-colors">
                    {p.name}
                  </h4>
                  <p className="text-sm text-black/50 dark:text-white/50 transition-colors">
                    {p.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Side Projects + AI */}
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-lg font-medium text-black/60 dark:text-white/60 mb-6 flex items-center gap-2 transition-colors duration-300">
              <Wrench className="w-5 h-5" />
              Side Projects
            </h3>
            <div className="space-y-0">
              {sideProjects.map((p) => (
                <a
                  key={p.name}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:pl-2 transition-all duration-300"
                >
                  <div>
                    <p className="font-medium text-black dark:text-white group-hover:text-[#2d62ff] transition-colors">
                      {p.name}
                    </p>
                    <p className="text-sm text-black/50 dark:text-white/50 transition-colors">
                      {p.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-[#2d62ff] transition-colors shrink-0 ml-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-black/60 dark:text-white/60 mb-6 flex items-center gap-2 transition-colors duration-300">
              <Sparkles className="w-5 h-5" />
              AI Experiments
            </h3>
            <div className="space-y-0">
              {aiExperiments.map((p) => (
                <a
                  key={p.name}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:pl-2 transition-all duration-300"
                >
                  <div>
                    <p className="font-medium text-black dark:text-white group-hover:text-[#2d62ff] transition-colors">
                      {p.name}
                    </p>
                    <p className="text-sm text-black/50 dark:text-white/50 transition-colors">
                      {p.description}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-black/20 dark:text-white/20 group-hover:text-[#2d62ff] transition-colors shrink-0 ml-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
