import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SearchPanel from "@/components/search/SearchPanel";

export default function SearchSection() {
  return (
    <section id="search" className="relative -mt-28 scroll-mt-24 sm:-mt-32">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 top-28 rounded-t-3xl bg-page sm:top-32"
      />
      <Container className="relative">
        <Reveal>
          <div data-reveal>
            <SearchPanel />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
