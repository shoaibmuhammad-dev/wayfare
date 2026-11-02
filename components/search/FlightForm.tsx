"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Field, { controlClass } from "@/components/ui/Field";
import { cities, searchFlights } from "@/data/mock";
import { todayISO } from "@/lib/format";
import type { TripType } from "@/types";
import { CityOptions, FormError, type FormProps } from "./shared";

export default function FlightForm({ onSearch }: FormProps) {
  const [tripType, setTripType] = useState<TripType>("return");
  const [from, setFrom] = useState("KHI");
  const [to, setTo] = useState("DXB");
  const [depart, setDepart] = useState("");
  const [back, setBack] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (from === to)
      return setError("Choose different departure and arrival cities.");
    if (!depart) return setError("Pick a departure date.");
    if (tripType === "return" && (!back || back < depart)) {
      return setError("Return date must be on or after the departure date.");
    }
    setError("");
    const items = searchFlights({ from, to, passengers, tripType });
    onSearch({
      kind: "flights",
      title: `${items.length} flights from ${from} to ${to}`,
      items,
    });
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="mb-5 flex gap-2" role="radiogroup" aria-label="Trip type">
        {(["return", "oneway"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={tripType === t}
            onClick={() => setTripType(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              tripType === t
                ? "bg-ink text-white"
                : "bg-surface text-ink/70 hover:text-ink"
            }`}
          >
            {t === "return" ? "Return" : "One way"}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <Field label="From" htmlFor="f-from" className="lg:col-span-1">
          <select
            id="f-from"
            className={controlClass}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <CityOptions list={cities} />
          </select>
        </Field>
        <Field label="To" htmlFor="f-to" className="lg:col-span-1">
          <select
            id="f-to"
            className={controlClass}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <CityOptions list={cities} />
          </select>
        </Field>
        <Field label="Depart" htmlFor="f-depart">
          <input
            id="f-depart"
            type="date"
            min={todayISO()}
            className={controlClass}
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
          />
        </Field>
        <Field label="Return" htmlFor="f-back">
          <input
            id="f-back"
            type="date"
            min={depart || todayISO()}
            disabled={tripType === "oneway"}
            className={`${controlClass} disabled:bg-surface disabled:opacity-60`}
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </Field>
        <Field label="Passengers" htmlFor="f-pax">
          <input
            id="f-pax"
            type="number"
            min={1}
            max={9}
            className={controlClass}
            value={passengers}
            onChange={(e) =>
              setPassengers(
                Math.min(9, Math.max(1, Number(e.target.value) || 1)),
              )
            }
          />
        </Field>
        <div className="flex items-end">
          <Button type="submit" className="w-full">
            Search flights
          </Button>
        </div>
      </div>
      <FormError message={error} />
    </form>
  );
}
