import { links, profile } from "@/data";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-14 sm:py-18 page-column border-t border-line">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Social Links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-copy hover:text-ink transition-colors inline-flex items-center gap-0.5"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-3 h-3 text-copy-muted" />
            </a>
          ))}
          <a
            href={profile.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-copy hover:text-ink transition-colors inline-flex items-center gap-0.5"
          >
            <span>Resume (PDF)</span>
            <ArrowUpRight className="w-3 h-3 text-copy-muted" />
          </a>
        </div>

        {/* Colophon & Copyright */}
        <div className="text-xs font-mono text-copy-muted">
          &copy; {currentYear} {profile.name}
        </div>
      </div>
    </footer>
  );
}
