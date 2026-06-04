import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

function TextSlideLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative overflow-hidden inline-block h-[1.4em] leading-[1.4em]"
    >
      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full text-black/60 dark:text-white/60">
        {label}
      </span>
      <span className="absolute top-full left-0 block transition-transform duration-300 ease-in-out group-hover:-translate-y-full font-medium text-black dark:text-white">
        {label}
      </span>
    </a>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    // Use the global lenis instance attached to window in Home.tsx
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      // Fallback if lenis is not found
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 px-5 sm:px-8 flex items-center justify-between transition-all duration-500 ${
        isScrolled
          ? "bg-[#f9f9f9]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5"
          : "bg-transparent"
      }`}
    >
      <a
        href="#hero"
        onClick={handleLinkClick}
        className="text-base font-medium tracking-tight text-black dark:text-white transition-colors duration-300"
      >
        Tej Pratap Singh
      </a>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <TextSlideLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={handleLinkClick}
            />
          ))}
        </div>
        ...
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4 text-black/70" />
          ) : (
            <Sun className="w-4 h-4 text-white/70" />
          )}
        </button>
      </div>
    </nav>
  );
}
