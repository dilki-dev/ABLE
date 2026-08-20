export const siteContent = {
  brand: {
    name: "ABLE",
    tagline: "Digital products built to move",
  },
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
  ],
  hero: {
    eyebrow: "Independent digital studio · Colombo / Everywhere",
    title: "We turn ambitious ideas into digital products people remember.",
    description:
      "Strategy, identity, and engineering in one focused team. We help growing businesses move from scattered ideas to a clear, confident digital presence.",
    primaryAction: { label: "Start a project", href: "mailto:hello@able.studio" },
    secondaryAction: { label: "See our approach", href: "#process" },
    availability: "Booking select projects for Q4",
  },
  stats: [
    { value: "24", label: "products launched" },
    { value: "3.2×", label: "average conversion lift" },
    { value: "6 wks", label: "idea to first release" },
  ],
  clientLogos: ["NORTHSTAR", "MOSAIC", "KINETIK", "FIELDNOTE", "LUMA"],
  services: [
    {
      number: "01",
      title: "Strategy & direction",
      description:
        "We turn business goals into a focused product plan, a clear message, and priorities your whole team can use.",
      items: ["Research", "Positioning", "Product roadmap"],
    },
    {
      number: "02",
      title: "Brand & experience",
      description:
        "We build distinctive visual systems and intuitive interfaces that make your value obvious from the first interaction.",
      items: ["Visual identity", "UX/UI design", "Design systems"],
    },
    {
      number: "03",
      title: "Web & product",
      description:
        "We engineer fast, accessible websites and products that are easy for your team to maintain as you grow.",
      items: ["Next.js development", "CMS integration", "Launch support"],
    },
  ],
  process: [
    {
      number: "01",
      title: "Align",
      description: "Define the real problem, audience, and outcome before designing anything.",
      duration: "Week 1",
    },
    {
      number: "02",
      title: "Shape",
      description: "Explore the strongest direction, prototype it, and refine the details together.",
      duration: "Weeks 2–3",
    },
    {
      number: "03",
      title: "Ship",
      description: "Build, test, launch, and leave your team with a system they can confidently run.",
      duration: "Weeks 4–6",
    },
  ],
  project: {
    eyebrow: "Featured transformation",
    title: "From complex platform to clear daily habit.",
    description:
      "Arcline had powerful financial tools hidden behind a product customers found difficult to trust. We simplified the story, rebuilt the interface, and created a flexible launch system.",
    tags: ["Strategy", "Product design", "Next.js"],
    results: [
      { value: "+38%", label: "trial conversion" },
      { value: "−42%", label: "support requests" },
    ],
  },
  testimonial: {
    quote:
      "ABLE gave us the clarity we had been missing for years. They understood the business, challenged the right things, and made the final product feel inevitable.",
    author: "Maya Perera",
    role: "Co-founder, Arcline",
  },
  finalCta: {
    eyebrow: "Have something ambitious in mind?",
    title: "Let’s make it clear, useful, and impossible to ignore.",
    action: { label: "Tell us about your project", href: "mailto:hello@able.studio" },
  },
  footer: {
    email: "hello@able.studio",
    location: "Colombo, Sri Lanka · Working worldwide",
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "Dribbble", href: "https://dribbble.com" },
    ],
  },
} as const;
