import { useRef, useState, useEffect } from "react";
import {
  Link2,
  Coffee,
  Video,
  Image,
  Smartphone,
  Music,
  Calendar,
  Sparkles,
  Eye,
  UserPlus,
  FileText,
  Camera,
  Braces,
  Terminal,
  Calculator,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SideProject {
  name: string;
  description: string;
  link: string;
  category: string;
  icon: React.ElementType;
}

const allSideProjects: SideProject[] = [
  // Column 1
  {
    name: "Link Analytics",
    description: "Lightweight URL shortener with zero-cookie UTM & pixel tracking.",
    link: "https://link.tejpratapsingh.com",
    category: "Web Utility",
    icon: Link2,
  },
  {
    name: "Wake You",
    description: "Browser & OS wake-lock utility to prevent system sleep during long builds.",
    link: "https://wake.tejpratapsingh.com",
    category: "Productivity",
    icon: Coffee,
  },
  {
    name: "Video Toolkit",
    description: "Client-side frame-by-frame video analyzer and motion measurement canvas.",
    link: "https://video.tejpratapsingh.com",
    category: "Media Tool",
    icon: Video,
  },
  {
    name: "Mockup Generator",
    description: "Transform raw screenshots into clean multi-device marketing visuals.",
    link: "https://mockup.tejpratapsingh.com",
    category: "Design Tool",
    icon: Image,
  },

  // Column 2
  {
    name: "SDUI Preview",
    description: "Real-time renderer for Server-Driven UI payloads across mobile clients.",
    link: "https://sdui.tejpratapsingh.com",
    category: "Architecture",
    icon: Smartphone,
  },
  {
    name: "RecyclerCalendar",
    description: "Custom high-performance calendar view for Android built on RecyclerView.",
    link: "https://github.com/tejpratap46/RecyclerCalendarAndroid",
    category: "Android Lib",
    icon: Calendar,
  },
  {
    name: "ITunes Explorer",
    description: "Keyboard-navigable web interface for exploring Apple Search APIs.",
    link: "https://itunes.tejpratapsingh.com",
    category: "API Tool",
    icon: Music,
  },
  {
    name: "ViewAnimator",
    description: "Fluent, chainable view animation framework for Android applications.",
    link: "https://github.com/tejpratap46/AndroidViewAnimator",
    category: "Android Lib",
    icon: Sparkles,
  },

  // Column 3
  {
    name: "Video Analyser",
    description: "Offline, in-browser frame inspector and motion tracking playground.",
    link: "https://video.tejpratapsingh.com",
    category: "AI & Video",
    icon: Eye,
  },
  {
    name: "Waitlist App",
    description: "Turnkey viral referral and waitlist system for upcoming launches.",
    link: "https://waitlist.tejpratapsingh.com",
    category: "Growth App",
    icon: UserPlus,
  },
  {
    name: "Notebook",
    description: "Minimalist offline-first scratchpad and markdown task organizer.",
    link: "https://pad.tejpratapsingh.com",
    category: "Utility",
    icon: FileText,
  },
  {
    name: "Web Camera",
    description: "Lightweight browser camera preview and snapshot tool with mirror mode.",
    link: "https://camera.tejpratapsingh.com",
    category: "Web Tool",
    icon: Camera,
  },

  // Column 4
  {
    name: "PDF Reader",
    description: "Fast, zero-telemetry client-side PDF document reader and annotator.",
    link: "https://pdf.tejpratapsingh.com",
    category: "Document Tool",
    icon: FileText,
  },
  {
    name: "JSON Viewer",
    description: "Tree and graph JSON inspection utility formatted like macOS Finder.",
    link: "https://json.tejpratapsingh.com",
    category: "Dev Tool",
    icon: Braces,
  },
  {
    name: "Log Viewer",
    description: "Inspect, filter, and stream application logs directly in the browser.",
    link: "https://log.tejpratapsingh.com",
    category: "Dev Tool",
    icon: Terminal,
  },
  {
    name: "Loan Calculator",
    description: "Interactive EMI calculator with amortization schedules and charts.",
    link: "https://loan.tejpratapsingh.com",
    category: "Finance Tool",
    icon: Calculator,
  },
];

// Chunk array into columns of 4 projects
function chunkProjects(items: SideProject[], size: number): SideProject[][] {
  const chunks: SideProject[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export default function SideProjects() {
  const columns = chunkProjects(allSideProjects, 4);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sidePadding, setSidePadding] = useState(20);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);

  // Measure exact left offset of .page-column content
  useEffect(() => {
    const updatePadding = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        // The distance from the viewport left edge to the text start
        const offset = Math.max(16, rect.left);
        setSidePadding(offset);
      }
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);

    // Calculate approximate active column index
    const colWidth = el.querySelector(".column-card")?.clientWidth || 320;
    const index = Math.round(el.scrollLeft / (colWidth + 16));
    setActiveColumnIndex(Math.min(Math.max(index, 0), columns.length - 1));
  };

  useEffect(() => {
    checkScroll();
  }, [sidePadding]);

  const scrollByDirection = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const colWidth = el.querySelector(".column-card")?.clientWidth || 320;
    const scrollAmount = (colWidth + 16) * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="side-projects" className="py-14 sm:py-20 border-t border-line">
      {/* Section Header (Within Page Column) */}
      <div ref={headerRef} className="page-column mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
            Side projects &amp; experiments
          </h2>
          <p className="mt-1 text-sm text-copy-muted font-normal">
            Open-source libraries, web tools, and technical experiments (4 per column).
          </p>
        </div>

        {/* Scroll Controls & Indicators */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-xs font-mono text-copy-muted">
            {activeColumnIndex + 1} / {columns.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              className="p-1.5 rounded-full border border-line bg-page text-ink hover:bg-[var(--card-surface)] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              className="p-1.5 rounded-full border border-line bg-page text-ink hover:bg-[var(--card-surface)] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edge-to-Edge Scrollable Columns Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-1"
        style={{
          paddingLeft: `${sidePadding}px`,
          paddingRight: `${sidePadding}px`,
          scrollPaddingLeft: `${sidePadding}px`,
          scrollPaddingRight: `${sidePadding}px`,
        }}
      >
        <div className="flex items-stretch gap-4 w-max">
          {columns.map((column, colIdx) => (
            <div
              key={colIdx}
              className="column-card w-[82vw] sm:w-[350px] md:w-[380px] shrink-0 snap-start flex flex-col gap-3"
            >
              {column.map((project) => {
                const Icon = project.icon;
                return (
                  <a
                    key={project.name}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 sm:p-4 rounded-xl border border-line bg-[var(--card-surface)] hover:bg-[var(--card-hover-surface)] hover:border-line-strong text-decoration-none transition-all duration-200 group flex flex-col justify-between gap-2 shadow-xs hover:-translate-y-0.5"
                  >
                    {/* Card Top: Icon + Title + Category + Arrow */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/5 border border-line text-ink shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <strong className="block text-sm font-medium text-ink truncate leading-tight">
                            {project.name}
                          </strong>
                          <span className="text-[10px] font-mono text-copy-muted uppercase tracking-wider block">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <svg
                        className="w-3.5 h-3.5 text-copy-muted group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 shrink-0 mt-0.5"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M3 13 13 3M6 3h7v7" />
                      </svg>
                    </div>

                    {/* Card Bottom: Description */}
                    <p className="text-xs text-copy leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="page-column mt-4 flex items-center justify-between sm:hidden text-[11px] font-mono text-copy-muted">
        <span>Swipe horizontally to explore</span>
        <span>
          {activeColumnIndex + 1} of {columns.length} columns
        </span>
      </div>
    </section>
  );
}
