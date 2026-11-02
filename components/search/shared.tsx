import type { City } from "@/types";

export function CityOptions({ list, valueKey = "code" }: { list: City[]; valueKey?: "code" | "name" }) {
  return (
    <>
      {list.map((c) => (
        <option key={c.code} value={c[valueKey]}>
          {c.name} ({c.code})
        </option>
      ))}
    </>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
      {message}
    </p>
  );
}

export interface FormProps {
  onSearch: (results: import("@/types").SearchResults) => void;
}
