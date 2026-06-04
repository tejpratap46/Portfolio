import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = textRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !heading || !subtitle) return;

    const text = profile.mission.heading;
    heading.innerHTML = "";

    const chars: HTMLSpanElement[] = [];
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];
      span.style.display = "inline-block";
      span.style.transform = "perspective(1000px) rotateX(90deg)";
      span.style.opacity = "0";
      span.style.transformOrigin = "center bottom";
      if (text[i] === " ") span.style.width = "0.3em";
      heading.appendChild(span);
      chars.push(span);
    }

    const ctx = gsap.context(() => {
      gsap.to(chars, {
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "center center",
          scrub: true,
        },
      });

      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            end: "center center",
            scrub: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 py-32 bg-[#f9f9f9] dark:bg-[#0a0a0a] transition-colors duration-300"
      style={{ zIndex: 10 }}
    >
      <h2
        ref={textRef}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-normal text-black dark:text-white leading-[1.1] tracking-[-2px] text-center transition-colors duration-300"
      >
        {profile.mission.heading}
      </h2>
      <p
        ref={subtitleRef}
        className="mt-8 text-lg sm:text-xl text-black/50 dark:text-white/50 max-w-xl text-center leading-relaxed opacity-0 transition-colors duration-300"
      >
        {profile.mission.subtitle}
      </p>
    </section>
  );
}
