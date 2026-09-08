import type { ReactNode } from "react";

export interface ProjectPlaceholderProps {
  title: string;
  category: string;
  type?: "window" | "phone" | "tablet";
  accentColor?: string;
  imageSrc?: string;
  aspectRatio?: string;
  tags?: string[];
  mockupSnippet?: ReactNode;
}

export default function ProjectPlaceholder({
  title,
  category,
  type = "window",
  accentColor = "#3b82f6",
  imageSrc,
  tags,
  mockupSnippet,
}: ProjectPlaceholderProps) {
  if (imageSrc) {
    return (
      <div className="relative w-full h-full aspect-[16/10] overflow-hidden bg-[var(--card-surface)]">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    );
  }

  // Window Mockup Frame
  if (type === "window") {
    return (
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-[var(--card-surface)] border-b border-line flex flex-col select-none overflow-hidden group">
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/70 inline-block" />
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[11px] font-mono text-copy-muted max-w-[240px] truncate border border-line">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            {title.toLowerCase().replace(/[\s+]/g, "-")}.app
          </div>

          <div className="w-10 flex justify-end">
            <span className="text-[10px] font-mono uppercase tracking-wider text-copy-muted">
              {category}
            </span>
          </div>
        </div>

        {/* Browser Viewport Content Placeholder */}
        <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-transparent to-black/[0.015] dark:to-white/[0.015]">
          {/* Background subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Top content wireframe */}
          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-xs font-mono font-bold text-xs"
                  style={{ backgroundColor: accentColor }}
                >
                  {title.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink leading-tight">{title}</h4>
                  <p className="text-[11px] text-copy-muted font-mono">{category}</p>
                </div>
              </div>
              {tags && (
                <div className="hidden sm:flex items-center gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/5 dark:bg-white/5 text-copy border border-line"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Simulated UI layout cards */}
            {mockupSnippet || (
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="col-span-2 p-3.5 rounded-lg border border-line bg-page shadow-xs space-y-2">
                  <div className="h-2 w-1/3 rounded bg-line" />
                  <div className="h-1.5 w-full rounded bg-line/60" />
                  <div className="h-1.5 w-4/5 rounded bg-line/60" />
                  <div className="pt-2 flex gap-2">
                    <div className="h-4 w-12 rounded bg-line" />
                    <div className="h-4 w-16 rounded bg-line/80" />
                  </div>
                </div>
                <div className="col-span-1 p-3 rounded-lg border border-line bg-page shadow-xs flex flex-col justify-between">
                  <div className="h-2 w-1/2 rounded bg-line" />
                  <div className="h-6 w-full rounded-md flex items-center justify-center text-[10px] font-mono text-copy-muted bg-black/[0.02] dark:bg-white/[0.02] border border-line">
                    SYS_OK
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom subtle watermark note */}
          <div className="z-10 flex items-center justify-between text-[11px] font-mono text-copy-muted pt-4 border-t border-line/60">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              Live preview mode
            </span>
            <span className="text-[10px] opacity-75">Placeholder mockup</span>
          </div>
        </div>
      </div>
    );
  }

  // Mobile Phone Mockup Frame
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] bg-[var(--card-surface)] border-b border-line flex items-center justify-center p-4 sm:p-6 overflow-hidden group">
      {/* Phone device frame */}
      <div className="w-[190px] sm:w-[220px] aspect-[9/16] rounded-[24px] border-[2px] border-line bg-page shadow-md flex flex-col overflow-hidden relative">
        {/* Notch / Dynamic Island */}
        <div className="h-4 bg-page flex items-center justify-center pt-1">
          <div className="w-12 h-2.5 rounded-full bg-line" />
        </div>

        {/* Screen content */}
        <div className="flex-1 p-3 flex flex-col justify-between text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <div
                className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
                style={{ backgroundColor: accentColor }}
              >
                {title.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-[11px] font-medium text-ink truncate">{title}</span>
            </div>

            <div className="p-2 rounded-md border border-line bg-black/[0.02] dark:bg-white/[0.02] space-y-1">
              <div className="h-1.5 w-1/2 rounded bg-line" />
              <div className="h-1 w-full rounded bg-line/60" />
            </div>

            <div className="grid grid-cols-2 gap-1">
              <div className="h-8 rounded border border-line bg-black/[0.02] dark:bg-white/[0.02]" />
              <div className="h-8 rounded border border-line bg-black/[0.02] dark:bg-white/[0.02]" />
            </div>
          </div>

          <div className="pt-2">
            <div
              className="h-5 w-full rounded-md flex items-center justify-center text-[9px] text-white font-medium"
              style={{ backgroundColor: accentColor }}
            >
              Open App
            </div>
          </div>
        </div>

        {/* Home bar */}
        <div className="h-3 flex items-center justify-center pb-1">
          <div className="w-10 h-0.5 rounded-full bg-line" />
        </div>
      </div>

      {/* Decorative backdrop elements */}
      <div className="absolute right-6 top-6 hidden sm:block text-right">
        <span className="text-xs font-mono uppercase tracking-widest text-copy-muted block">{category}</span>
        <span className="text-xs text-ink font-semibold">{title}</span>
      </div>
    </div>
  );
}
