import type {
  CarCategory,
  CarResult,
  City,
  FlightResult,
  HotelResult,
  TripType,
  VisaResult,
  VisaType,
} from "@/types";
import { daysBetween } from "@/lib/format";

/* ---------- Shared helpers ---------- */

const hash = (value: string) => {
  let h = 7;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
};
const pad = (n: number) => String(n).padStart(2, "0");
const clock = (minutes: number) => `${pad(Math.floor(minutes / 60) % 24)}:${pad(minutes % 60)}`;

export const cities: City[] = [
  { name: "Karachi", code: "KHI", country: "Pakistan" },
  { name: "Lahore", code: "LHE", country: "Pakistan" },
  { name: "Islamabad", code: "ISB", country: "Pakistan" },
  { name: "Dubai", code: "DXB", country: "UAE" },
  { name: "Doha", code: "DOH", country: "Qatar" },
  { name: "Istanbul", code: "IST", country: "Türkiye" },
  { name: "London", code: "LHR", country: "United Kingdom" },
  { name: "Bangkok", code: "BKK", country: "Thailand" },
  { name: "Kuala Lumpur", code: "KUL", country: "Malaysia" },
  { name: "Malé", code: "MLE", country: "Maldives" },
  { name: "Baku", code: "GYD", country: "Azerbaijan" },
  { name: "Paris", code: "CDG", country: "France" },
];

/* ---------- Flights (generated per route, deterministic) ---------- */

const airlines = ["Emirates", "Qatar Airways", "Turkish Airlines", "Etihad", "Gulf Air"];

export function searchFlights(query: {
  from: string;
  to: string;
  passengers: number;
  tripType: TripType;
}): FlightResult[] {
  const route = [query.from, query.to].sort().join("-");
  const base = hash(route);

  return airlines
    .map((airline, i) => {
      const h = hash(`${route}-${airline}`);
      const stops = i % 3 === 0 ? 0 : i % 3;
      const minutes = 150 + (base % 480) + stops * 95;
      const depart = ((h % 20) + 3) * 60 + (h % 4) * 15;
      const fare = 110 + (base % 260) + (h % 90) - stops * 25;
      const price = Math.round(fare * query.passengers * (query.tripType === "return" ? 1.85 : 1));

      return {
        id: `${airline}-${i}`,
        airline,
        from: query.from,
        to: query.to,
        departs: clock(depart),
        arrives: clock(depart + minutes),
        duration: `${Math.floor(minutes / 60)}h ${pad(minutes % 60)}m`,
        stops,
        price,
      };
    })
    .sort((a, b) => a.price - b.price);
}

/* ---------- Hotels ---------- */

interface HotelSeed {
  name: string;
  city: string;
  stars: number;
  rating: number;
  pricePerNight: number;
  amenities: string[];
}

const hotels: HotelSeed[] = [
  { name: "Marina Crest Hotel", city: "Dubai", stars: 5, rating: 9.1, pricePerNight: 210, amenities: ["Pool", "Spa", "Free breakfast"] },
  { name: "Creekside Inn", city: "Dubai", stars: 3, rating: 8.2, pricePerNight: 85, amenities: ["Wi-Fi", "Airport shuttle"] },
  { name: "Bosphorus Terrace", city: "Istanbul", stars: 4, rating: 8.9, pricePerNight: 120, amenities: ["Sea view", "Free breakfast", "Wi-Fi"] },
  { name: "Galata Lodge", city: "Istanbul", stars: 3, rating: 8.4, pricePerNight: 70, amenities: ["Rooftop café", "Wi-Fi"] },
  { name: "Kensington Row", city: "London", stars: 4, rating: 8.7, pricePerNight: 240, amenities: ["Gym", "Wi-Fi", "Breakfast"] },
  { name: "Thames Stay", city: "London", stars: 3, rating: 8.0, pricePerNight: 140, amenities: ["Wi-Fi", "Near Tube"] },
  { name: "Sukhumvit Garden", city: "Bangkok", stars: 4, rating: 8.8, pricePerNight: 78, amenities: ["Pool", "Free breakfast"] },
  { name: "Riverside Suites", city: "Bangkok", stars: 5, rating: 9.3, pricePerNight: 155, amenities: ["River view", "Spa", "Pool"] },
  { name: "Petronas View", city: "Kuala Lumpur", stars: 4, rating: 8.6, pricePerNight: 92, amenities: ["Pool", "Gym", "Wi-Fi"] },
  { name: "Coral Atoll Resort", city: "Malé", stars: 5, rating: 9.5, pricePerNight: 430, amenities: ["Private beach", "Snorkeling", "All meals"] },
  { name: "Maafushi Guesthouse", city: "Malé", stars: 3, rating: 8.3, pricePerNight: 110, amenities: ["Beach access", "Breakfast"] },
  { name: "Clifton Grand", city: "Karachi", stars: 5, rating: 8.9, pricePerNight: 130, amenities: ["Sea view", "Pool", "Wi-Fi"] },
  { name: "Saddar Business Hotel", city: "Karachi", stars: 3, rating: 7.9, pricePerNight: 55, amenities: ["Wi-Fi", "Breakfast"] },
  { name: "Gulberg Heights", city: "Lahore", stars: 4, rating: 8.5, pricePerNight: 90, amenities: ["Gym", "Wi-Fi", "Breakfast"] },
  { name: "Left Bank Maison", city: "Paris", stars: 4, rating: 8.8, pricePerNight: 260, amenities: ["Breakfast", "Wi-Fi", "Near metro"] },
  { name: "Old City Boutique", city: "Baku", stars: 4, rating: 8.7, pricePerNight: 95, amenities: ["Breakfast", "Wi-Fi"] },
  { name: "Lusail Tower Hotel", city: "Doha", stars: 5, rating: 9.0, pricePerNight: 185, amenities: ["Pool", "Spa", "Wi-Fi"] },
];

export const hotelCities = Array.from(new Set(hotels.map((h) => h.city)));

export function searchHotels(query: {
  city: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
}): HotelResult[] {
  const nights = daysBetween(query.checkIn, query.checkOut);
  return hotels
    .filter((h) => h.city === query.city)
    .sort((a, b) => b.rating - a.rating)
    .map((h, i) => ({
      id: `${h.name}-${i}`,
      ...h,
      nights,
      total: h.pricePerNight * nights * query.rooms,
    }));
}

/* ---------- Cars ---------- */

interface CarSeed {
  name: string;
  category: CarCategory;
  seats: number;
  bags: number;
  transmission: string;
  pricePerDay: number;
}

const cars: CarSeed[] = [
  { name: "Toyota Yaris", category: "Economy", seats: 5, bags: 2, transmission: "Automatic", pricePerDay: 32 },
  { name: "Suzuki Swift", category: "Economy", seats: 5, bags: 2, transmission: "Manual", pricePerDay: 26 },
  { name: "Toyota Fortuner", category: "SUV", seats: 7, bags: 4, transmission: "Automatic", pricePerDay: 78 },
  { name: "Kia Sportage", category: "SUV", seats: 5, bags: 3, transmission: "Automatic", pricePerDay: 58 },
  { name: "Mercedes E-Class", category: "Luxury", seats: 5, bags: 3, transmission: "Automatic", pricePerDay: 165 },
  { name: "BMW 5 Series", category: "Luxury", seats: 5, bags: 3, transmission: "Automatic", pricePerDay: 150 },
  { name: "Toyota Hiace", category: "Van", seats: 12, bags: 8, transmission: "Manual", pricePerDay: 95 },
  { name: "Hyundai Staria", category: "Van", seats: 9, bags: 5, transmission: "Automatic", pricePerDay: 110 },
];

export const carCategories: Array<CarCategory | "Any"> = ["Any", "Economy", "SUV", "Luxury", "Van"];

export function searchCars(query: {
  city: string;
  pickup: string;
  dropoff: string;
  category: CarCategory | "Any";
}): CarResult[] {
  const days = daysBetween(query.pickup, query.dropoff);
  const cityFactor = 1 + (hash(query.city) % 20) / 100;

  return cars
    .filter((c) => query.category === "Any" || c.category === query.category)
    .map((c, i) => {
      const pricePerDay = Math.round(c.pricePerDay * cityFactor);
      return { id: `${c.name}-${i}`, ...c, pricePerDay, days, total: pricePerDay * days };
    })
    .sort((a, b) => a.pricePerDay - b.pricePerDay);
}

/* ---------- Visa ---------- */

interface VisaRule {
  fee: number;
  processing: string;
  stay: string;
}

interface VisaCountry {
  country: string;
  tourist: VisaRule;
  business: VisaRule;
  documents: string[];
}

const baseDocs = [
  "Passport valid for 6+ months",
  "Recent passport-size photo",
  "Confirmed return ticket",
  "Bank statement (last 3 months)",
];

export const visaCountries: VisaCountry[] = [
  { country: "United Arab Emirates", tourist: { fee: 95, processing: "3 to 5 days", stay: "30 days" }, business: { fee: 140, processing: "5 to 7 days", stay: "90 days" }, documents: [...baseDocs, "Hotel booking"] },
  { country: "Türkiye", tourist: { fee: 60, processing: "2 to 4 days", stay: "30 days" }, business: { fee: 90, processing: "4 to 6 days", stay: "60 days" }, documents: [...baseDocs, "Hotel booking"] },
  { country: "Thailand", tourist: { fee: 55, processing: "5 to 7 days", stay: "60 days" }, business: { fee: 120, processing: "7 to 10 days", stay: "90 days" }, documents: [...baseDocs, "Hotel booking", "Proof of funds"] },
  { country: "Malaysia", tourist: { fee: 40, processing: "3 to 5 days", stay: "30 days" }, business: { fee: 85, processing: "5 to 7 days", stay: "60 days" }, documents: [...baseDocs, "Hotel booking"] },
  { country: "United Kingdom", tourist: { fee: 160, processing: "15 to 21 days", stay: "6 months" }, business: { fee: 160, processing: "15 to 21 days", stay: "6 months" }, documents: [...baseDocs, "Travel history", "Employment letter"] },
  { country: "Schengen (France)", tourist: { fee: 100, processing: "15 to 30 days", stay: "90 days" }, business: { fee: 100, processing: "15 to 30 days", stay: "90 days" }, documents: [...baseDocs, "Travel insurance", "Hotel booking"] },
  { country: "Azerbaijan", tourist: { fee: 35, processing: "3 to 4 days", stay: "30 days" }, business: { fee: 60, processing: "4 to 6 days", stay: "30 days" }, documents: [...baseDocs, "Hotel booking"] },
  { country: "Qatar", tourist: { fee: 50, processing: "3 to 5 days", stay: "30 days" }, business: { fee: 95, processing: "5 to 7 days", stay: "30 days" }, documents: [...baseDocs, "Hotel booking"] },
];

const AGENCY_FEE = 20;

export function searchVisa(query: { country: string; type: VisaType; travelers: number }): VisaResult[] {
  const entry = visaCountries.find((v) => v.country === query.country);
  if (!entry) return [];

  const rule = query.type === "Tourist" ? entry.tourist : entry.business;
  const documents =
    query.type === "Business" ? [...entry.documents, "Invitation letter from host company"] : entry.documents;

  return [
    {
      id: `${entry.country}-${query.type}`,
      country: entry.country,
      type: query.type,
      fee: rule.fee,
      processing: rule.processing,
      stay: rule.stay,
      documents,
      travelers: query.travelers,
      total: (rule.fee + AGENCY_FEE) * query.travelers,
    },
  ];
}
