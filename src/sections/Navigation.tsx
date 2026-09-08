import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon, Terminal, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "../components/ui/sheet";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#side-projects", label: "Side projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/chat", label: "AI Chat" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      if (location.pathname !== "/") {
        navigate(href);
      } else {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[var(--page)]/90 backdrop-blur-md border-b border-line py-3.5 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="page-column flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-ink hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-ink inline-block" />
          <span>Tej Pratap Singh</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium">
            {navLinks.map((link) => {
              const isExternal = !link.href.startsWith("/#");
              if (isExternal) {
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-copy hover:text-ink transition-colors px-1 py-0.5"
                  >
                    {link.label}
                  </Link>
                );
              }
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-copy hover:text-ink transition-colors px-1 py-0.5"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Theme Switcher Segmented Control */}
          <div className="flex items-center p-0.5 rounded-full border border-line bg-[var(--card-surface)]">
            <button
              onClick={() => setTheme("light")}
              title="Light theme"
              className={`p-1.5 rounded-full transition-all ${
                theme === "light"
                  ? "bg-page text-ink shadow-xs"
                  : "text-copy-muted hover:text-ink"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              title="Dark theme"
              className={`p-1.5 rounded-full transition-all ${
                theme === "dark"
                  ? "bg-page text-ink shadow-xs"
                  : "text-copy-muted hover:text-ink"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme("tech")}
              title="Tech theme"
              className={`p-1.5 rounded-full transition-all ${
                theme === "tech"
                  ? "bg-page text-ink shadow-xs"
                  : "text-copy-muted hover:text-ink"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-1.5 text-copy hover:text-ink transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-page border-l border-line p-6"
              >
                <SheetTitle className="text-sm font-semibold text-ink mb-6">
                  Navigation
                </SheetTitle>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => {
                    const isExternal = !link.href.startsWith("/#");
                    if (isExternal) {
                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-base font-medium text-copy hover:text-ink transition-colors"
                        >
                          {link.label}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-base font-medium text-copy hover:text-ink transition-colors"
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

