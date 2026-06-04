import { Github, Twitter, Linkedin, FileText, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/tejpratap46", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/_tejpratap", label: "Twitter" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/tejpr",
    label: "LinkedIn",
  },
  { icon: FileText, href: "https://read.cv/tej", label: "Read.cv" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Tej Pratap Singh
          </h3>
          <p className="text-muted-foreground mb-8">
            Software Developer & Deputy Manager @Renault Group
          </p>

          <div className="flex gap-4 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
            <a
              href="mailto:tejpratap46@gmail.com"
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground/60 flex items-center gap-1.5">
            Made with{" "}
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> by Tej
            Pratap Singh
          </p>
          <p className="text-xs text-muted-foreground/40 mt-2">
            {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
