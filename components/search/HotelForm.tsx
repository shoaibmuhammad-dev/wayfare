"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Field, { controlClass } from "@/components/ui/Field";
import { hotelCities, searchHotels } from "@/data/mock";
import { todayISO } from "@/lib/format";
import { FormError, type FormProps } from "./shared";

export default function HotelForm({ onSearch }: FormProps) {
  const [city, setCity] = useState(hotelCities[0]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!checkIn || !checkOut) return setError("Pick check-in and check-out dates.");
    if (checkOut <= checkIn) return setError("Check-out must be after check-in.");
    setError("");
    const items = searchHotels({ city, checkIn, checkOut, rooms });
    onSearch({ kind: "hotels", title: `${items.length} stays in ${city}`, items });
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Field label="Destination" htmlFor="h-city">
          <select id="h-city" className={controlClass} value={city} onChange={(e) => setCity(e.target.value)}>
            {hotelCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Check-in" htmlFor="h-in">
          <input id="h-in" type="date" min={todayISO()} className={controlClass} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </Field>
        <Field label="Check-out" htmlFor="h-out">
          <input id="h-out" type="date" min={checkIn || todayISO()} className={controlClass} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </Field>
        <Field label="Rooms" htmlFor="h-rooms">
          <input id="h-rooms" type="number" min={1} max={5} className={controlClass} value={rooms} onChange={(e) => setRooms(Math.min(5, Math.max(1, Number(e.target.value) || 1)))} />
        </Field>
        <div className="flex items-end">
          <Button type="submit" className="w-full">Find hotels</Button>
        </div>
      </div>
      <FormError message={error} />
    </form>
  );
}
