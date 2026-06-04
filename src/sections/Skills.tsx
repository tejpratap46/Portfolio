import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            02. Things I have Learned
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Technologies & <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
              className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-amber-500/20 transition-all"
            >
              <h3 className="text-lg font-semibold text-amber-400 mb-4">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
                    <a
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amber-400 hover:underline transition-colors"
                    >
                      {skill.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
