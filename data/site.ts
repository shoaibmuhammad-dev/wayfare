import type { Destination, Service, Testimonial } from "@/types";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wayfare.example";

export const site = {
  name: "Wayfare",
  tagline: "Visas, flights, hotels and cars from one desk.",
  description:
    "Wayfare is a Karachi travel agency for visa processing, flight tickets, hotel booking and car rental. Compare options, get a clear price and book with one agent.",
  contact: {
    phone: "+92 300 000 0000",
    email: "hello@wayfare.example",
    address: "Office 12, Clifton Block 5, Karachi, Pakistan",
    hours: "Mon to Sat, 10am to 7pm PKT",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Destinations", href: "#destinations" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
};

export const services: Service[] = [
  {
    id: "visa",
    title: "Visa services",
    description:
      "Document checks, applications and follow-ups handled by people who file them daily.",
    points: [
      "Free document review",
      "Tourist and business visas",
      "Status updates by WhatsApp",
    ],
    cta: "Check visa fees",
    image: "/visa-services-image.jpg",
    imageAlt: "Passport, camera and map laid out for trip planning",
  },
  {
    id: "flights",
    title: "Flight tickets",
    description:
      "Compare fares across airlines and book one-way, return or multi-stop trips.",
    points: [
      "Fares from 5 airlines",
      "Flexible date changes",
      "Group and family bookings",
    ],
    cta: "Search flights",
    image: "/flight-ticket-service.jpg",
    imageAlt: "Aircraft wing above the clouds at sunrise",
  },
  {
    id: "hotels",
    title: "Hotel booking",
    description:
      "Hand-picked stays from budget city rooms to beachfront resorts.",
    points: [
      "Free breakfast options",
      "Verified guest ratings",
      "Airport transfers on request",
    ],
    cta: "Find hotels",
    image: "/hotel-booking-service.jpg",
    imageAlt: "Resort hotel with a swimming pool",
  },
  {
    id: "cars",
    title: "Car rental",
    description: "Cars and vans with or without a driver, ready when you land.",
    points: ["Economy to luxury", "Airport pickup", "Fully insured"],
    cta: "Browse cars",
    image: "/car-rental-service.jpg",
    imageAlt: "Rental car driving along an open road",
  },
];

export const destinations: Destination[] = [
  {
    code: "DXB",
    name: "Dubai",
    country: "United Arab Emirates",
    from: 245,
    blurb: "Skyline, souks and desert nights",
    image: "/dubai.jpg",
  },
  {
    code: "IST",
    name: "Istanbul",
    country: "Türkiye",
    from: 310,
    blurb: "Two continents, one ferry ride",
    image: "/istanbul.jpg",
  },
  {
    code: "LHR",
    name: "London",
    country: "United Kingdom",
    from: 520,
    blurb: "Museums, markets and the Tube",
    image: "/london.jpg",
  },
  {
    code: "MLE",
    name: "Malé",
    country: "Maldives",
    from: 395,
    blurb: "Overwater villas and reef snorkeling",
    image: "/maldives.jpg",
  },
  {
    code: "BKK",
    name: "Bangkok",
    country: "Thailand",
    from: 285,
    blurb: "Street food and temple mornings",
    image: "/thailand.jpg",
  },
  {
    code: "CDG",
    name: "Paris",
    country: "France",
    from: 560,
    blurb: "Cafés, galleries and long walks",
    image: "/paris.jpg",
  },
];

export const stats = [
  { value: 12000, suffix: "+", label: "Travelers booked" },
  { value: 48, suffix: "", label: "Countries covered" },
  { value: 97, suffix: "%", label: "Visa approval rate" },
  { value: 9, suffix: " yrs", label: "In business" },
];

export const whyUs = [
  {
    title: "One agent, every booking",
    text: "Your visa, flights, hotel and car are planned together, so dates and documents always match.",
  },
  {
    title: "Clear prices up front",
    text: "You see the government fee, our service fee and the fare before you commit.",
  },
  {
    title: "Help while you travel",
    text: "Missed connection or changed plan? Message us and a real person answers.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ayesha Rahman",
    trip: "Family visa and flights to Dubai",
    quote:
      "They caught a missing document the day before our appointment. Visa came through in four days and the flights were already booked around it.",
    rating: 5,
  },
  {
    name: "Hamza Qureshi",
    trip: "Business trip to Kuala Lumpur",
    quote:
      "One call covered my visa, hotel near the venue and a car from the airport. I did not have to chase anyone.",
    rating: 5,
  },
  {
    name: "Sana Iqbal",
    trip: "Honeymoon in the Maldives",
    quote:
      "They found us a better resort for the same budget and kept the transfers timed with our flights. Nothing went wrong.",
    rating: 4,
  },
];
