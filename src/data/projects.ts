import {
  Link2,
  Coffee,
  Video,
  Image,
  Eye,
  UserPlus,
  FileText,
  Braces,
  Camera,
  Terminal,
  Calculator,
  Smartphone,
  Music
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ProjectItem {
  name: string;
  description: string;
  link: string;
  icon: LucideIcon;
}

export const productProjects = [
  {
    name: "MyOPD Zip",
    description: "Power of MyOPD desktop suite compressed for mobile.",
    link: "https://play.google.com/store/apps/details?id=in.myopd.zip",
    label: "Play Store",
    color: "#2d62ff",
  },
  {
    name: "MyOPD Appointments",
    description: "Book appointments online with ease via MyOPD.",
    link: "https://appointments.myopd.in",
    label: "Web",
    color: "#10b981",
  },
];

export const openSourceProjects = [
  {
    name: "AndroidVideoMotion",
    description: "Edit and generate programmed videos with AI features.",
    link: "https://github.com/tejpratap46/AndroidVideoMotion",
  },
  {
    name: "PDFCreator Android",
    description: "Create and view PDF with zero dependency or native code.",
    link: "https://github.com/tejpratap46/PDFCreatorAndroid",
  },
  {
    name: "RecyclerCalendar",
    description: "Custom Calendar View using RecyclerView, written in Kotlin.",
    link: "https://github.com/tejpratap46/RecyclerCalendarAndroid",
  },
  {
    name: "ViewAnimator",
    description: "Easily animate any view with complete control.",
    link: "https://github.com/tejpratap46/AndroidViewAnimator",
  },
];

export const sideProjects: ProjectItem[] = [
  {
    name: "Link Analytics",
    description: "URL shortener with pixel tracking.",
    link: "https://link.tejpratapsingh.com",
    icon: Link2,
  },
  {
    name: "Wake You",
    description: "Keep your system awake.",
    link: "https://wake.tejpratapsingh.com",
    icon: Coffee,
  },
  {
    name: "Video Toolkit",
    description: "Slow-motion video frame analyzer.",
    link: "https://video.tejpratapsingh.com",
    icon: Video,
  },
  {
    name: "Mockup Generator",
    description: "Your screenshots can do more.",
    link: "https://mockup.tejpratapsingh.com",
    icon: Image,
  },
];

export const aiExperiments: ProjectItem[] = [
  {
    name: "Video Analyser",
    description: "Offline video analysis in browser.",
    link: "https://video.tejpratapsingh.com",
    icon: Eye,
  },
  {
    name: "Waitlist App",
    description: "Build a waitlist system for any product",
    link: "https://waitlist.tejpratapsingh.com",
    icon: UserPlus,
  },
  {
    name: "Notebook",
    description: "Manage your daily tasks and notes",
    link: "https://pad.tejpratapsingh.com",
    icon: FileText,
  },
  {
    name: "Camera",
    description: "A web camera for your laptop",
    link: "https://camera.tejpratapsingh.com",
    icon: Camera,
  },
  {
    name: "PDF Reader",
    description: "Read PDFs with ease",
    link: "https://pdf.tejpratapsingh.com",
    icon: FileText,
  },
  {
    name: "Json Viewer",
    description: "View JSON in mac os finder",
    link: "https://json.tejpratapsingh.com",
    icon: Braces,
  },
  {
    name: "Log Viewer",
    description: "View logs without leaving your device.",
    link: "https://log.tejpratapsingh.com",
    icon: Terminal,
  },
  {
    name: "Loan Calculator",
    description: "Advanced loan calculator with EMI.",
    link: "https://loan.tejpratapsingh.com",
    icon: Calculator,
  },
  {
    name: "SDUI Preview (Chromium Only)",
    description: "Render a preview for SDUI for Android Motion Lib",
    link: "https://sdui.tejpratapsingh.com",
    icon: Smartphone,
  },
  {
    name: "ITunes Explorer",
    description: "A web UI to explore ITunes API",
    link: "https://itunes.tejpratapsingh.com",
    icon: Music,
  },
];
