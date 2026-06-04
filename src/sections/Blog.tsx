import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, StickyNote, ArrowUpRight } from "lucide-react";

const blogLinks = [
  {
    title: "Blogs",
    description:
      "I occasionally write blogs of my findings and learnings, few that are published and keep hundreds of them in draft.",
    link: "https://me.tejpratapsingh.com/blog",
    icon: BookOpen,
  },
  {
    title: "Notes",
    description:
      "Here are some of the topics that I have learned throughout my career, in a searchable knowledge base.",
    link: "https://notes.tejpratapsingh.com",
    icon: StickyNote,
  },
];

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-mono text-sm tracking-wider uppercase mb-4 block">
            05. Thoughts & Learnings
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Blog & <span className="text-gradient">Notes</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {blogLinks.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/5 p-8 hover:border-amber-500/20 hover:bg-amber-500/[0.02] transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <item.icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-amber-400 transition-colors" />
              </div>

              <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
