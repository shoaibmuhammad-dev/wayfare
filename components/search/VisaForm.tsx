"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Field, { controlClass } from "@/components/ui/Field";
import { searchVisa, visaCountries } from "@/data/mock";
import type { VisaType } from "@/types";
import { FormError, type FormProps } from "./shared";

export default function VisaForm({ onSearch }: FormProps) {
  const [country, setCountry] = useState(visaCountries[0].country);
  const [type, setType] = useState<VisaType>("Tourist");
  const [travelers, setTravelers] = useState(1);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!country) return setError("Choose a destination country.");
    setError("");
    const items = searchVisa({ country, type, travelers });
    onSearch({ kind: "visa", title: `${type} visa for ${country}`, items });
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Destination country" htmlFor="v-country">
          <select id="v-country" className={controlClass} value={country} onChange={(e) => setCountry(e.target.value)}>
            {visaCountries.map((v) => (
              <option key={v.country} value={v.country}>{v.country}</option>
            ))}
          </select>
        </Field>
        <Field label="Visa type" htmlFor="v-type">
          <select id="v-type" className={controlClass} value={type} onChange={(e) => setType(e.target.value as VisaType)}>
            <option value="Tourist">Tourist</option>
            <option value="Business">Business</option>
          </select>
        </Field>
        <Field label="Travelers" htmlFor="v-pax">
          <input id="v-pax" type="number" min={1} max={10} className={controlClass} value={travelers} onChange={(e) => setTravelers(Math.min(10, Math.max(1, Number(e.target.value) || 1)))} />
        </Field>
        <div className="flex items-end">
          <Button type="submit" className="w-full">Check visa</Button>
        </div>
      </div>
      <FormError message={error} />
    </form>
  );
}
