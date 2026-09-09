import SEO from "../components/SEO";
import Navigation from "../sections/Navigation";
import Hero from "../sections/Hero";
import SelectedWorks from "../sections/SelectedWorks";
import SideProjects from "../sections/SideProjects";
import Experience from "../sections/Experience";
import TechStack from "../sections/TechStack";
import Footer from "../sections/Footer";

export default function Home() {
  return (
    <>
      <SEO />
      <Navigation />
      <main className="min-h-screen bg-page">
        <Hero />
        <SelectedWorks />
        <SideProjects />
        <Experience />
        <TechStack />
      </main>
      <Footer />
    </>
  );
}
