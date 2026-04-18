import { Philosopher } from "next/font/google";
import NavBar from "./components/NavBar";
import Image from "next/image";
import ScrollProgressBar from "./components/ScrollProgressBar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import Texture from "./components/Texture";
import ContactSection from "./components/ContactSection";
import BackgroundSection from "./components/BackgroundSection";
import Highlights from "./components/Highlights";
import Archive from "./components/Archive";

export default function Home() {
  return (
    <div className="relative">
      <Texture />
      <ScrollProgressBar />
      <NavBar />
      <main>
        <HeroSection />
        <BackgroundSection />
        <ServicesSection />

        <Highlights />
        <Archive />
        <div className="subtle-block-drift flex flex-col gap-4 px-[2vw] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6 md:py-8">
          <span className="text-balance text-2xl italic leading-tight opacity-50 sm:text-3xl md:text-4xl lg:text-5xl">
            BOOKING PROJECTS
          </span>
          <span className="flash-blur-wrap shrink-0 text-2xl italic sm:text-3xl md:text-4xl lg:text-5xl">
            <span>April 2026</span>
            <span className="flash-blur-ghost" aria-hidden="true">
              April 2026
            </span>
          </span>
        </div>
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
