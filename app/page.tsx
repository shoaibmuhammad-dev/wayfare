import Hero from "@/components/sections/Hero";
import SearchSection from "@/components/sections/SearchSection";
import Marquee from "@/components/sections/Marquee";
import Services from "@/components/sections/Services";
import Destinations from "@/components/sections/Destinations";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <Marquee />
      <Services />
      <Destinations />
      <WhyUs />
      <Testimonials />
      <Contact />
    </>
  );
}
