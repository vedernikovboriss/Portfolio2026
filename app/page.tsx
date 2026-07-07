import NavBar from "./components/NavBar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import ServicesSection from "./components/ServicesSection";
import WorkflowSection from "./components/WorkflowSection";
import Footer from "./components/Footer/Footer";
import BackgroundSection from "./components/BackgroundSection";
import Highlights from "./components/Highlights";
import Archive from "./components/Archive";
import HeroSection from "./components/HeroSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <div className="page-shell relative">
      <ScrollProgressBar />
      <NavBar />
      <main>
        <h1 className="sr-only">
          Boris Vedernikov — Creative Frontend Developer in Valencia, Spain
        </h1>
        <HeroSection />
        <BackgroundSection />
        <ServicesSection />

        <Highlights />
        <Archive />
        <WorkflowSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
