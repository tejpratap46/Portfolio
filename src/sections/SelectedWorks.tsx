import { useRef, useState, useEffect } from "react";
import ProjectPlaceholder from "../components/ProjectPlaceholder";
import Underline from "@/components/ui/Underline";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface WorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  type: "window" | "phone";
  accentColor: string;
  tags: string[];
  imageSrc?: string;
  screenshots?: string[];
}

const selectedWorks: WorkItem[] = [
  {
    id: "myopd-zip",
    title: "MyOPD Zip",
    category: "Mobile Medical Platform",
    description: "An offline-first mobile electronic medical record (EMR) and clinic management workflow for doctors.",
    link: "https://play.google.com/store/apps/details?id=in.myopd.zip",
    type: "phone",
    accentColor: "#2563eb",
    tags: ["Android", "Offline-First", "Healthcare"],
  },
  {
    id: "renault-hmi",
    title: "Renault Next-Gen Automotive HMI",
    category: "Automotive HMI & AOSP",
    description: "Park Assist, EV energy flow, and Drive Assist digital cockpit applications for Android Automotive OS.",
    link: "https://www.renault.com",
    type: "window",
    accentColor: "#f59e0b",
    tags: ["AOSP", "Automotive", "HMI"],
  },
  {
    id: "myopd-appointments",
    title: "MyOPD Appointments",
    category: "Web Telehealth",
    description: "Frictionless patient appointment booking, real-time schedule syncing, and digital clinic discovery.",
    link: "https://appointments.myopd.in",
    type: "window",
    accentColor: "#10b981",
    tags: ["React", "Distributed DB", "Payments"],
  },
  {
    id: "android-video-motion",
    title: "AndroidVideoMotion",
    category: "Open Source Media Engine",
    description: "A programmatic video motion graphics and AI-assisted animation library for Android creators.",
    link: "https://github.com/tejpratap46/AndroidVideoMotion",
    type: "window",
    accentColor: "#8b5cf6",
    tags: ["Kotlin", "Video Processing", "AI"],
  },
  {
    id: "pdf-creator-android",
    title: "PDFCreator Android",
    category: "Android Native Toolkit",
    description: "A zero-dependency native PDF creation, invoice rendering, and document viewing engine.",
    link: "https://github.com/tejpratap46/PDFCreatorAndroid",
    type: "phone",
    accentColor: "#ef4444",
    tags: ["Kotlin", "Graphics API", "Open Source"],
  },
];

interface ProjectScreenshotsGalleryProps {
  work: WorkItem;
  screenshots: string[];
  sidePadding: number;
}

function ProjectScreenshotsGallery({
  work,
  screenshots,
  sidePadding,
}: ProjectScreenshotsGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 15);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 15);

    const firstItem = el.querySelector(".screenshot-card");
    const itemWidth = firstItem ? firstItem.clientWidth + 16 : 300;
    const index = Math.round(el.scrollLeft / itemWidth);
    setActiveIdx(Math.min(Math.max(index, 0), screenshots.length - 1));
  };

  useEffect(() => {
    checkScroll();
  }, [sidePadding, screenshots]);

  const scrollByDirection = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const firstItem = el.querySelector(".screenshot-card");
    const itemWidth = firstItem ? firstItem.clientWidth + 16 : 300;
    const scrollAmount = itemWidth * (direction === "left" ? -1 : 1);
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    startScrollLeft.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    scrollContainerRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="space-y-3">
      {/* Edge-to-Edge Scrollable Gallery Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-1 cursor-grab active:cursor-grabbing select-none"
        style={{
          paddingLeft: `${sidePadding}px`,
          paddingRight: `${sidePadding}px`,
          scrollPaddingLeft: `${sidePadding}px`,
          scrollPaddingRight: `${sidePadding}px`,
        }}
      >
        <div className="flex items-stretch gap-4 sm:gap-6 w-max">
          {screenshots.map((src, idx) => {
            if (work.type === "phone") {
              return (
                <a
                  key={idx}
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCardClick}
                  className="screenshot-card w-[200px] sm:w-[240px] md:w-[260px] aspect-[9/16] shrink-0 snap-start rounded-[22px] border border-line bg-[var(--card-surface)] hover:border-line-strong hover:shadow-md transition-all duration-200 overflow-hidden relative group/card block cursor-pointer"
                  title={`${work.title} – Screenshot ${idx + 1}`}
                >
                  <img
                    src={src}
                    alt={`${work.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-[1.02]"
                    loading="lazy"
                    draggable={false}
                  />
                </a>
              );
            }

            return (
              <a
                key={idx}
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCardClick}
                className="screenshot-card w-[82vw] sm:w-[480px] md:w-[580px] aspect-[16/10] shrink-0 snap-start rounded-xl border border-line bg-[var(--card-surface)] hover:border-line-strong hover:shadow-md transition-all duration-200 overflow-hidden relative group/card flex flex-col cursor-pointer"
                title={`${work.title} – Screenshot ${idx + 1}`}
              >
                {/* Mini window top bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-line bg-black/[0.02] dark:bg-white/[0.02] shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400/70 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-yellow-400/70 inline-block" />
                    <span className="w-2 h-2 rounded-full bg-green-400/70 inline-block" />
                  </div>
                  <span className="text-[10px] font-mono text-copy-muted truncate max-w-[180px]">
                    {work.title.toLowerCase().replace(/[\s+]/g, "-")}-0{idx + 1}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-copy-muted">
                    {work.category}
                  </span>
                </div>
                <div className="flex-1 overflow-hidden relative bg-page">
                  <img
                    src={src}
                    alt={`${work.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-[1.02]"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Editorial Copy Link & Scroll Navigation Controls */}
      <div className="page-column flex items-baseline justify-between gap-4">
        <a
          href={work.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-baseline gap-1 text-base sm:text-lg text-copy hover:text-ink transition-colors leading-snug group/link"
        >
          <Underline
            as="span"
            variant="dual"
            thickness={1.5}
            className="font-semibold text-ink"
          >
            {work.title}
          </Underline>
          <span className="text-copy-muted font-normal">–</span>
          <span className="text-copy">{work.description}</span>
          <svg
            className="inline-block w-4 h-4 ml-1 text-copy-muted group-hover/link:text-ink group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200 shrink-0 self-center"
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
        </a>

        {/* Scroll Controls for Multiple Screenshots */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-copy-muted">
            {activeIdx + 1} / {screenshots.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              className="p-1 rounded-full border border-line bg-page text-ink hover:bg-[var(--card-surface)] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              className="p-1 rounded-full border border-line bg-page text-ink hover:bg-[var(--card-surface)] disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWorks() {
  const headerTextRef = useRef<HTMLHeadingElement>(null);
  const [sidePadding, setSidePadding] = useState(20);

  // Measure exact left offset of .page-column content (matching project title)
  useEffect(() => {
    const updatePadding = () => {
      if (headerTextRef.current) {
        const rect = headerTextRef.current.getBoundingClientRect();
        const offset = Math.max(16, rect.left);
        setSidePadding(offset);
      }
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => window.removeEventListener("resize", updatePadding);
  }, []);

  return (
    <section id="work" className="py-14 sm:py-20">
      {/* Section Header (Within Page Column) */}
      <div className="page-column mb-10 sm:mb-12">
        <h2
          ref={headerTextRef}
          className="text-xl sm:text-2xl font-semibold text-ink tracking-tight"
        >
          Selected work
        </h2>
      </div>

      {/* Selected Work Showcase Stream */}
      <div className="space-y-14 sm:space-y-16">
        {selectedWorks.map((work) => {
          const screenshots =
            work.screenshots && work.screenshots.length > 0
              ? work.screenshots
              : work.imageSrc
              ? [work.imageSrc]
              : [];
          const hasMultipleScreenshots = screenshots.length > 1;

          if (hasMultipleScreenshots) {
            return (
              <div key={work.id} className="work-item-slot-multi">
                <ProjectScreenshotsGallery
                  work={work}
                  screenshots={screenshots}
                  sidePadding={sidePadding}
                />
              </div>
            );
          }

          return (
            <div key={work.id} className="page-column">
              <div className="work-item-slot group">
                {/* Visual Media Showcase with Mockup */}
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-item-media block cursor-pointer"
                  title={`View ${work.title}`}
                >
                  <ProjectPlaceholder
                    title={work.title}
                    category={work.category}
                    type={work.type}
                    accentColor={work.accentColor}
                    tags={work.tags}
                    imageSrc={screenshots[0] || work.imageSrc}
                  />
                </a>

                {/* Editorial Copy Link */}
                <div className="pt-1">
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-baseline gap-1 text-base sm:text-lg text-copy hover:text-ink transition-colors leading-snug group/link"
                  >
                    <Underline
                      as="span"
                      variant="dual"
                      thickness={1.5}
                      className="font-semibold text-ink"
                    >
                      {work.title}
                    </Underline>
                    <span className="text-copy-muted font-normal">–</span>
                    <span className="text-copy">{work.description}</span>
                    <svg
                      className="inline-block w-4 h-4 ml-1 text-copy-muted group-hover/link:text-ink group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200 shrink-0 self-center"
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
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
