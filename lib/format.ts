export const formatPrice = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const daysBetween = (from: string, to: string) =>
  Math.max(1, Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86_400_000));
