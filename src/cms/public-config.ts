import type { SiteContent } from "./content-schema";

export function publicConfig(business: SiteContent["business"]) {
  const digits = business.phoneRaw.replace(/\D/g, "");
  const encodedAddress = encodeURIComponent(business.address);
  return {
    ...business,
    phoneHref: `tel:${business.phoneRaw}`,
    whatsappUrl: `https://wa.me/${digits}?text=Hello%20ABLE%20Property%20Maintenance%2C%20I%20would%20like%20to%20request%20a%20quotation.`,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    mapEmbedUrl: `https://www.google.com/maps?q=${encodedAddress}&output=embed`,
  };
}
