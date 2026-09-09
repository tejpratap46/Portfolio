import ProjectPlaceholder from "../components/ProjectPlaceholder";
import Underline from "@/components/ui/Underline";

interface WorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  type: "window" | "phone";
  accentColor: string;
  tags: string[];
  imageSrc?: string;
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

export default function SelectedWorks() {
  return (
    <section id="work" className="py-14 sm:py-20 page-column">
      {/* Section Header */}
      <div className="mb-10 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
          Selected work
        </h2>
      </div>

      {/* Selected Work Showcase Stream */}
      <div className="space-y-14 sm:space-y-16">
        {selectedWorks.map((work) => (
          <div key={work.id} className="work-item-slot group">
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
                imageSrc={work.imageSrc}
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
                <span className="text-copy">
                  {work.description}
                </span>
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
        ))}
      </div>
    </section>
  );
}
