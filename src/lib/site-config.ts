export const siteConfig = {
  name: "ABLE Property Maintenance",
  shortName: "ABLE",
  tagline: "Reliable Property Care. Built to Last.",
  description:
    "Professional maintenance, repairs and property improvements across Colombo and throughout Sri Lanka.",
  address: "65/62 Kahawita Mawatha, Attidiya, Dehiwala, Sri Lanka",
  phoneDisplay: "+94 71 304 3444",
  phoneHref: "tel:+94713043444",
  phoneRaw: "+94713043444",
  secondaryPhoneDisplay: "+713422304",
  email: "hello@ablepropertymaintenance.lk",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ableksjnvks.vercel.app",
  whatsappUrl:
    "https://wa.me/94713043444?text=Hello%20ABLE%2C%20I%27d%20like%20to%20request%20a%20property%20maintenance%20quote.",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=65%2F62%20Kahawita%20Mawatha%2C%20Attidiya%2C%20Dehiwala%2C%20Sri%20Lanka",
  mapEmbedUrl:
    "https://www.google.com/maps?q=65%2F62%20Kahawita%20Mawatha%2C%20Attidiya%2C%20Dehiwala%2C%20Sri%20Lanka&output=embed",
} as const;

export const navigation = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;
