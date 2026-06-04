import { MapPin, Briefcase, Heart, Code2 } from "lucide-react";

export const about = {
  title: "Hi! I am a Software Developer from India",
  description: [
    "With a background in Mobile Development, I have created multiple applications across domains like Automotive and Medical.",
    "Currently working with RNTBCI to build next-generation infotainment systems on top of Android Automotive.",
    "Previously, I had the opportunity to work with a startup that brings technological solutions to medical professionals, helping them manage their patients and providing easier access to medical history and scheduling."
  ],
  highlights: [
    {
      icon: Code2,
      title: "NexGen Infotainment",
      description: "Car infotainment system for a major OEM",
    },
    {
      icon: Heart,
      title: "Medical EMR",
      description: "Offline-first EMR that syncs across devices",
    },
    {
      icon: Briefcase,
      title: "E-Commerce",
      description: "Full-featured e-commerce application",
    },
    {
      icon: MapPin,
      title: "Scheduling",
      description: "Appointment scheduling system",
    },
  ],
  extraNote: "... And multiple apps in Infotainment system that we cannot discuss yet."
};
