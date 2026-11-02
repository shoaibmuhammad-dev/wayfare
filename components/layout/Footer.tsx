import { MapPin, Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import { services, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-display text-2xl font-semibold text-white">
            {site.name}
          </p>
          <p className="mt-3 max-w-xs leading-relaxed">{site.tagline}</p>
        </div>

        <div>
          <p className="font-semibold text-white">Services</p>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.id}>
                <a href="#services" className="hover:text-white">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Explore</p>
          <ul className="mt-4 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white">Visit or call</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {site.contact.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
              {site.contact.phone}
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
              {site.contact.email}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="text-center py-6 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}
