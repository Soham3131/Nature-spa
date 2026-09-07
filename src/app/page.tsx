import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Stats from "@/components/sections/Stats";
import Reviews from "@/components/sections/Reviews";
import JournalPreview from "@/components/sections/JournalPreview";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Experience />
      <Services />
      <Gallery />
      <Stats />
      <Reviews />
      <JournalPreview />
      <Faq />
      <Contact />
    </>
  );
}
