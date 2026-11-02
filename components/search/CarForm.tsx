"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Field, { controlClass } from "@/components/ui/Field";
import { carCategories, cities, searchCars } from "@/data/mock";
import { todayISO } from "@/lib/format";
import type { CarCategory } from "@/types";
import { CityOptions, FormError, type FormProps } from "./shared";

export default function CarForm({ onSearch }: FormProps) {
  const [city, setCity] = useState("Dubai");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [category, setCategory] = useState<CarCategory | "Any">("Any");
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!pickup || !dropoff) return setError("Pick pick-up and drop-off dates.");
    if (dropoff < pickup) return setError("Drop-off must be on or after pick-up.");
    setError("");
    const items = searchCars({ city, pickup, dropoff, category });
    onSearch({ kind: "cars", title: `${items.length} cars available in ${city}`, items });
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="Pick-up city" htmlFor="c-city">
          <select id="c-city" className={controlClass} value={city} onChange={(e) => setCity(e.target.value)}>
            <CityOptions list={cities} valueKey="name" />
          </select>
        </Field>
        <Field label="Pick-up date" htmlFor="c-pick">
          <input id="c-pick" type="date" min={todayISO()} className={controlClass} value={pickup} onChange={(e) => setPickup(e.target.value)} />
        </Field>
        <Field label="Drop-off date" htmlFor="c-drop">
          <input id="c-drop" type="date" min={pickup || todayISO()} className={controlClass} value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
        </Field>
        <Field label="Car type" htmlFor="c-cat">
          <select id="c-cat" className={controlClass} value={category} onChange={(e) => setCategory(e.target.value as CarCategory | "Any")}>
            {carCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <div className="flex items-end">
          <Button type="submit" className="w-full">Browse cars</Button>
        </div>
      </div>
      <FormError message={error} />
    </form>
  );
}
