import { useState } from "react";
import { profile } from "@/data";
import { Mail, Check, ArrowUpRight, FileText } from "lucide-react";
import Underline from "@/components/ui/Underline";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const email = "tejpratap46@gmail.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="pt-28 sm:pt-36 pb-14 sm:pb-18 page-column"
    >
      <div className="space-y-6">
        {/* Main Editorial Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-[2.25rem] font-medium leading-[1.4] text-ink tracking-tight">
          Hi, I'm Tej Pratap Singh – a{" "}
          <Underline
            as="a"
            href="#experience"
            variant="sketch"
            curveVariant={1}
            color="var(--underline-systems)"
            trackColor="var(--underline-systems-track)"
            thickness={2.5}
            alwaysActive={true}
            className="font-semibold text-ink"
            containerClassName="font-semibold cursor-pointer"
          >
            Systems
          </Underline>
          {" "}&amp;{" "}
          <Underline
            as="a"
            href="#experience"
            variant="sketch"
            curveVariant={2}
            color="var(--underline-product)"
            trackColor="var(--underline-product-track)"
            thickness={2.5}
            alwaysActive={true}
            className="font-semibold text-ink"
            containerClassName="font-semibold cursor-pointer"
          >
            Product Engineer.
          </Underline>{" "}
          I turn complex engineering problems into shipped software.
        </h1>

        {/* Narrative Paragraphs */}
        <div className="space-y-4 text-base sm:text-[1.0625rem] text-copy leading-relaxed font-normal">
          <p>
            I help founders, technical leads, and engineering teams shape useful, resilient
            products – from low-level systems architecture and offline-first engines to polished
            user experiences and production-ready applications. Over 10+ years across automotive HMI,
            distributed medical SaaS, and open-source tooling, owning systems from first principles to scale.
          </p>

          <p>
            My strength is judgment – refined at Renault Group, Tata Elxsi, and high-impact medical
            startups: identifying the core constraint, choosing what truly matters, simplifying without
            sacrificing robustness, and sweating every state, latency budget, and edge case. Modern tooling
            accelerates execution, but architectural decisions and software craft come down to human judgment.
          </p>
        </div>

        {/* Availability Badge & Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${email}`}
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-page text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email me</span>
                </>
              )}
            </a>

            <a
              href={profile.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-line bg-[var(--card-surface)] hover:bg-[var(--card-hover-surface)] text-ink text-sm font-medium transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-copy-muted" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-copy-muted" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-copy-muted">
            <span className="availability-dot" />
            <span>Available for select projects &amp; engineering advisory</span>
          </div>
        </div>
      </div>
    </section>
  );
}
