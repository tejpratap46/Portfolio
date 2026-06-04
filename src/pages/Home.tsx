import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SEO from "../components/SEO";
import LivingGradientMesh from "../sections/LivingGradientMesh";
import Navigation from "../sections/Navigation";
import Hero from "../sections/Hero";
import Mission from "../sections/Mission";
import Experience from "../sections/Experience";
import SelectedWorks from "../sections/SelectedWorks";
import TechStack from "../sections/TechStack";
import Contact from "../sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    // Expose lenis instance globally for navigation
    (window as any).lenis = lenisRef.current;

    // Connect Lenis to GSAP ScrollTrigger
    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
    };
  }, []);

  return (
    <>
      <SEO />
      {/* WebGL Background - fixed behind everything */}
      <LivingGradientMesh />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <Hero />
        <Mission />
        <Experience />
        <SelectedWorks />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}
