"use client";

import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Field, { controlClass } from "@/components/ui/Field";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, site } from "@/data/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email))
      next.email = "Enter a valid email address.";
    if (message.length < 10)
      next.message = "Tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    // Mock submit
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 900);
  }

  const info = [
    { icon: MapPin, text: site.contact.address },
    { icon: Phone, text: site.contact.phone },
    { icon: Mail, text: site.contact.email },
    { icon: Clock, text: site.contact.hours },
  ];

  return (
    <section id="contact" className="scroll-mt-16 bg-surface py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              title="Tell us where you want to go"
              description="An agent replies within one working day with options and a clear price."
            />
            <ul data-reveal className="mt-8 space-y-4">
              {info.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="pt-2">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            data-reveal
            onSubmit={submit}
            noValidate
            className="rounded-2xl bg-white p-6 sm:p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" htmlFor="ct-name" error={errors.name}>
                <input
                  id="ct-name"
                  name="name"
                  autoComplete="name"
                  className={controlClass}
                />
              </Field>
              <Field label="Email" htmlFor="ct-email" error={errors.email}>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={controlClass}
                />
              </Field>
              <Field label="Phone (optional)" htmlFor="ct-phone">
                <input
                  id="ct-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={controlClass}
                />
              </Field>
              <Field label="Service" htmlFor="ct-service">
                <select
                  id="ct-service"
                  name="service"
                  className={controlClass}
                  defaultValue=""
                >
                  <option value="">Not sure yet</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                label="Message"
                htmlFor="ct-message"
                error={errors.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="ct-message"
                  name="message"
                  rows={5}
                  className={`${controlClass} h-auto py-3`}
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
              {status === "sent" && (
                <p role="status" className="text-base font-medium text-brand">
                  Message sent. We will reply within one working day.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
