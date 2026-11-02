import { BedDouble, Car, Plane, Stamp, type LucideIcon } from "lucide-react";
import type { ServiceId } from "@/types";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  flights: Plane,
  hotels: BedDouble,
  cars: Car,
  visa: Stamp,
};
