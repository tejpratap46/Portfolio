import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/data";
import { Link } from "react-router";
import { MessageCircle } from "lucide-react";

export default function Hero() {
  const tagRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const resumeRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(
      [
        tagRef.current,
        headingRef.current,
        ctaRef.current,
        resumeRef.current,
        imageRef.current,
      ],
      {
        opacity: 0,
        y: 30,
      },
    );

    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(tagRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4",
      )
      .to(
        [ctaRef.current, resumeRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        "-=0.5",
      )
      .to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8",
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end px-5 sm:px-8 pb-16 lg:pb-24"
      style={{ zIndex: 10 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 max-w-2xl">
            <p
              ref={tagRef}
              className="text-sm tracking-widest uppercase text-black/50 dark:text-white/50 mb-6 transition-colors duration-300"
            >
              {profile.tagline}
            </p>

            <h1
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-black dark:text-white leading-[1.1] tracking-[-3px] transition-colors duration-300"
            >
              {profile.heroHeading.line1}
              <br />
              {profile.heroHeading.line2}{" "}
              <em className="font-light text-black/60 dark:text-white/50 transition-colors duration-300">
                {profile.heroHeading.emphasis}
              </em>
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-10">
              <div className="flex items-center gap-4">
                <a
                  ref={ctaRef}
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-black/80 dark:hover:bg-white/90 transition-all shrink-0"
                >
                  Get in touch
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M8 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <a
                  ref={resumeRef}
                  href={profile.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/10 dark:border-white/10 text-black dark:text-white text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all shrink-0"
                >
                  Resume
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 15L12 3M12 15L8 11M12 15L16 11M2 17L2 19C2 20.1046 2.89543 21 4 21L20 21C21.1046 21 22 20.1046 22 19L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <span className="text-sm text-black/40 dark:text-white/40 transition-colors duration-300">
                {profile.role}
              </span>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div ref={imageRef} className="shrink-0 self-center lg:self-auto">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-[#2d62ff]/10 dark:bg-[#2d62ff]/20 blur-xl transition-colors duration-300" />
              {/* Image container */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-black/5 dark:border-white/10 shadow-2xl transition-colors duration-300">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Chat Toggle */}
              <Link
                to="/chat"
                className="absolute bottom-2 -right-12 sm:-right-16 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-black/80 dark:hover:bg-white/90 transition-all shadow-xl z-20 group whitespace-nowrap"
                aria-label="Chat with AI"
              >
                <div className="relative flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 transition-colors" />
                  <span className="absolute -top-1.5 -right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <span>Ask AI</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
