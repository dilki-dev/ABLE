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
      <h2 className={`mt-4 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl lg:text-5xl ${inverted ? "text-white" : "text-[#111111]"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-7 sm:text-lg ${inverted ? "text-white/65" : "text-[#64645f]"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
