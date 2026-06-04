import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { about } from "@/data";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          <div>
            <span className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-4 block">
              01. About Me
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              {about.title.split("Software Developer")[0]}
              <span className="text-gradient">Software Developer</span>
              {about.title.split("Software Developer")[1]}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {about.description.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-6">
              Career Highlights
            </h3>
            {about.highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
            <p className="text-sm text-muted-foreground/60 pt-2">
              {about.extraNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
