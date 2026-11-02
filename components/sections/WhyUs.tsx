import Container from "@/components/ui/Container";
import Counter from "@/components/ui/Counter";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats, whyUs } from "@/data/site";

export default function WhyUs() {
  return (
    <section
      id="about"
      className="scroll-mt-16 bg-ink py-20 text-white sm:py-28"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ParallaxImage
          src={"/jairph-1XLyzi17Z2M-unsplash.jpg"}
          alt="Traveler looking over a mountain valley at sunrise"
          sizes="(min-width: 1024px) 50vw, 100vw"
          reveal
          className="relative aspect-4/5 rounded-2xl"
        />

        <Reveal>
          <SectionHeading
            light
            title="Travel planning without the back and forth"
          />
          <ul className="mt-8 space-y-6">
            {whyUs.map((item) => (
              <li key={item.title} data-reveal>
                <h3 className="font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-1 leading-relaxed text-white/70">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-white/15 pt-10">
            {stats.map((s) => (
              <div key={s.label} data-reveal>
                <dd className="font-display text-4xl font-semibold text-accent sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-base text-white/70">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
