export type ServiceId = "flights" | "hotels" | "cars" | "visa";
export type TripType = "return" | "oneway";
export type CarCategory = "Economy" | "SUV" | "Luxury" | "Van";
export type VisaType = "Tourist" | "Business";

export interface City {
  name: string;
  code: string;
  country: string;
}

export interface Service {
  id: ServiceId;
  title: string;
  description: string;
  points: string[];
  cta: string;
  image: string;
  imageAlt: string;
}

export interface Destination {
  code: string;
  name: string;
  country: string;
  from: number;
  blurb: string;
  image: string;
}

export interface Testimonial {
  name: string;
  trip: string;
  quote: string;
  rating: number;
}

export interface FlightResult {
  id: string;
  airline: string;
  from: string;
  to: string;
  departs: string;
  arrives: string;
  duration: string;
  stops: number;
  price: number;
}

export interface HotelResult {
  id: string;
  name: string;
  city: string;
  stars: number;
  rating: number;
  amenities: string[];
  pricePerNight: number;
  nights: number;
  total: number;
}

export interface CarResult {
  id: string;
  name: string;
  category: CarCategory;
  seats: number;
  bags: number;
  transmission: string;
  pricePerDay: number;
  days: number;
  total: number;
}

export interface VisaResult {
  id: string;
  country: string;
  type: VisaType;
  fee: number;
  processing: string;
  stay: string;
  documents: string[];
  travelers: number;
  total: number;
}

export type SearchResults =
  | { kind: "flights"; title: string; items: FlightResult[] }
  | { kind: "hotels"; title: string; items: HotelResult[] }
  | { kind: "cars"; title: string; items: CarResult[] }
  | { kind: "visa"; title: string; items: VisaResult[] };
