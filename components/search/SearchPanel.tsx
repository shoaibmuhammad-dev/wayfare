"use client";

import { useEffect, useState } from "react";
import { serviceIcons } from "@/lib/icons";
import type { SearchResults, ServiceId } from "@/types";
import CarForm from "./CarForm";
import FlightForm from "./FlightForm";
import HotelForm from "./HotelForm";
import Results from "./Results";
import VisaForm from "./VisaForm";

const tabs: { id: ServiceId; label: string }[] = [
  { id: "flights", label: "Flights" },
  { id: "hotels", label: "Hotels" },
  { id: "cars", label: "Cars" },
  { id: "visa", label: "Visa" },
];

export default function SearchPanel() {
  const [active, setActive] = useState<ServiceId>("flights");
  const [results, setResults] = useState<SearchResults | null>(null);

  const select = (id: ServiceId) => {
    setActive(id);
    setResults(null);
  };

  useEffect(() => {
    const handler = (e: Event) => select((e as CustomEvent<ServiceId>).detail);
    window.addEventListener("select-service", handler);
    return () => window.removeEventListener("select-service", handler);
  }, []);

  return (
    <div className="rounded-2xl bg-white shadow-xl shadow-ink/10">
      <div
        role="tablist"
        aria-label="Search by service"
        className="flex overflow-x-auto border-b border-dashed border-line"
      >
        {tabs.map((t) => {
          const Icon = serviceIcons[t.id];
          const selected = active === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              onClick={() => select(t.id)}
              className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap border-b-2 px-5 py-4 text-base font-semibold transition-colors cursor-pointer ${
                selected
                  ? "border-brand text-brand"
                  : "border-transparent text-ink/60 hover:text-ink"
              }`}
            >
              <Icon className="size-5" aria-hidden />
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className="p-5 sm:p-8"
      >
        {active === "flights" && <FlightForm onSearch={setResults} />}
        {active === "hotels" && <HotelForm onSearch={setResults} />}
        {active === "cars" && <CarForm onSearch={setResults} />}
        {active === "visa" && <VisaForm onSearch={setResults} />}
        {results && <Results results={results} />}
      </div>
    </div>
  );
}
