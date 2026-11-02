export default function SectionHeading({
  title,
  description,
  light = false,
}: {
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div data-reveal className="max-w-2xl">
      <h2
        className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${light ? "text-white/70" : "text-ink/70"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
