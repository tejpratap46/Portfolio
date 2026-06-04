import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText } from "lucide-react";
import { links, profile } from "@/data";

gsap.registerPlugin(ScrollTrigger);

function DarkSlideLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden inline-block h-[1.4em] leading-[1.4em]"
    >
      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full text-white/50">
        {label}
      </span>
      <span className="absolute top-full left-0 block transition-transform duration-300 ease-in-out group-hover:-translate-y-full font-medium text-white">
        {label}
      </span>
    </a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const linksContainer = linksRef.current;
    if (!section || !heading || !linksContainer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        linksContainer.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col justify-between bg-black text-white z-10 px-5 sm:px-8 py-20"
    >
      <div className="flex-1 flex flex-col justify-center">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-normal leading-[1.1] tracking-[-3px] max-w-[900px] opacity-0"
        >
          Let's build something{" "}
          <span className="text-white/40">legendary.</span>
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-12">
        <div ref={linksRef} className="flex flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <DarkSlideLink
              key={link.label}
              href={link.href}
              label={link.label}
            />
          ))}
          <a
            href={profile.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        <div className="text-right">
          <p className="text-xs text-white/30">
            Designed &amp; Engineered by {profile.name}
          </p>
          <p className="text-xs text-white/20 mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
