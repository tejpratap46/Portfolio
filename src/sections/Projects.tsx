import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Globe, Sparkles, Wrench } from "lucide-react";
import {
  openSourceProjects,
  productProjects as builtProjects,
  sideProjects,
  aiExperiments,
} from "@/data";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            04. Some Things I have Built
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* Built Projects */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Globe className="w-5 h-5 text-amber-400" />
            Products Built
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {builtProjects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {project.name}
                  </h4>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-amber-400 transition-colors" />
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  {project.description}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium">
                  {project.label}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Open Source */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Github className="w-5 h-5 text-amber-400" />
            Open Source Libraries
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {openSourceProjects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all"
              >
                <Github className="w-6 h-6 text-amber-400 mb-4" />
                <h4 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {project.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Side Projects */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Wrench className="w-5 h-5 text-amber-400" />
            Side Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sideProjects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all"
              >
                <h4 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {project.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-medium">
                  Visit <ExternalLink className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* AI Experiments */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            AI Experiments
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiExperiments.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group rounded-2xl bg-white/[0.02] border border-white/5 p-6 hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all"
              >
                <h4 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {project.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-medium">
                  Try it out <ExternalLink className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
