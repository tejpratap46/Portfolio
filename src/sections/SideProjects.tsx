import {
  Link2,
  Coffee,
  Video,
  Image,
  Smartphone,
  Music,
  Calendar,
  Sparkles
} from "lucide-react";

interface SideProject {
  name: string;
  description: string;
  link: string;
  category: string;
  icon: React.ElementType;
}

const sideProjectsList: SideProject[] = [
  {
    name: "Link Analytics",
    description: "Lightweight URL shortener with zero-cookie UTM & pixel conversion tracking.",
    link: "https://link.tejpratapsingh.com",
    category: "Web Utility",
    icon: Link2,
  },
  {
    name: "Wake You",
    description: "Minimalist browser & OS wake-lock utility to prevent system sleep during builds.",
    link: "https://wake.tejpratapsingh.com",
    category: "Tool",
    icon: Coffee,
  },
  {
    name: "Video Toolkit",
    description: "Client-side frame-by-frame video analyzer and motion measurement canvas.",
    link: "https://video.tejpratapsingh.com",
    category: "Media",
    icon: Video,
  },
  {
    name: "Mockup Generator",
    description: "Transform raw screenshots into clean multi-device marketing visuals.",
    link: "https://mockup.tejpratapsingh.com",
    category: "Design Tool",
    icon: Image,
  },
  {
    name: "SDUI Preview",
    description: "Real-time canvas renderer for Server-Driven UI payloads across mobile clients.",
    link: "https://sdui.tejpratapsingh.com",
    category: "Architecture",
    icon: Smartphone,
  },
  {
    name: "RecyclerCalendar",
    description: "Custom performant calendar view for Android built natively on RecyclerView.",
    link: "https://github.com/tejpratap46/RecyclerCalendarAndroid",
    category: "Open Source",
    icon: Calendar,
  },
  {
    name: "ITunes Explorer",
    description: "Fast keyboard-navigable web interface for exploring Apple Search APIs.",
    link: "https://itunes.tejpratapsingh.com",
    category: "API Explorer",
    icon: Music,
  },
  {
    name: "ViewAnimator",
    description: "Fluent, chainable view animation framework for Android applications.",
    link: "https://github.com/tejpratap46/AndroidViewAnimator",
    category: "Android Lib",
    icon: Sparkles,
  },
];

export default function SideProjects() {
  return (
    <section id="side-projects" className="py-14 sm:py-20 page-column border-t border-line">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
          Side projects &amp; experiments
        </h2>
        <p className="mt-1 text-sm text-copy-muted font-normal">
          Selected open-source libraries, web tools, and technical prototypes.
        </p>
      </div>

      {/* 2-Column Responsive Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sideProjectsList.map((project) => {
          const Icon = project.icon;
          return (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-tile group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/5 border border-line text-ink">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-sm font-semibold text-ink group-hover:text-ink transition-colors">
                      {project.name}
                    </strong>
                    <span className="text-[11px] font-mono text-copy-muted">
                      {project.category}
                    </span>
                  </div>
                </div>

                <svg
                  className="project-arrow w-4 h-4 text-copy-muted group-hover:text-ink shrink-0"
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

              <p className="text-xs sm:text-sm text-copy leading-relaxed">
                {project.description}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
