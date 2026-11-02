import ServiceCard from "@/components/cards/ServiceCard";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 pb-20 sm:pb-28">
      <Container>
        <Reveal>
          <SectionHeading
            title="Everything for the trip, under one roof"
            description="Book one service or all four. Our agents keep your dates, documents and bookings in sync."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {services.map((service) => {
              return <ServiceCard service={service} />;
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
