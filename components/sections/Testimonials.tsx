import TestimonialCard from "@/components/cards/TestimonialCard";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/site";

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading title="What travelers say after they land" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} item={t} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
