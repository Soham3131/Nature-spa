import type { Metadata } from "next";
import Hero1 from "@/components/home1/Hero1";
import Story from "@/components/home1/Story";
import Rituals from "@/components/home1/Rituals";
import Experience1 from "@/components/home1/Experience1";
import Numbers from "@/components/home1/Numbers";
import Space from "@/components/home1/Space";
import Products from "@/components/home1/Products";
import Journey from "@/components/home1/Journey";
import PhotoGallery from "@/components/home1/PhotoGallery";
import Testimonial from "@/components/home1/Testimonial";
import CallToAction from "@/components/home1/CallToAction";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Where Nature Meets Your Wellbeing",
  description: site.shortDesc,
  alternates: { canonical: "/home1" },
  // A second cut of the landing page — kept out of search while it is reviewed.
  robots: { index: false, follow: false },
};

export default function Home1() {
  return (
    <>
      <Hero1 />
      <Story />
      <Rituals />
      <Experience1 />
      <Numbers />
      <Space />
      <Products />
      <Journey />
      <PhotoGallery />
      <Testimonial />
      <CallToAction />
    </>
  );
}
