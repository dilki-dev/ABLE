type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
};

export function SectionHeading({ eyebrow, title, description, align = "left", inverted = false }: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`section-title mt-4 ${inverted ? "text-white" : "text-[var(--ink)]"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-8 sm:text-lg ${inverted ? "text-white/65" : "text-[var(--muted)]"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
