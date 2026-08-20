import type { SiteContent } from "./content-schema";

export function publicConfig(business: SiteContent["business"]) {
  const digits = business.phoneRaw.replace(/\D/g, "");
  const encodedAddress = encodeURIComponent(business.address);
  return {
    ...business,
    phoneHref: `tel:${business.phoneRaw}`,
    whatsappUrl: `https://wa.me/${digits}?text=Hello%20ABLE%2C%20I%27d%20like%20to%20request%20a%20property%20maintenance%20quote.`,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodedAddress}&output=embed`,
  };
}
