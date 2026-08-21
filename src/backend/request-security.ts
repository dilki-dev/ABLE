import "server-only";

const productionHosts = new Set(["www.ableconstructions.lk", "ableconstructions.lk"]);

export function requestAddress(headers: Headers) {
  const address = headers.get("cf-connecting-ip") || headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown";
  return address.slice(0, 128);
}

export function hasValidRequestOrigin(headers: Headers) {
  const origin = headers.get("origin");
  const host = headers.get("x-forwarded-host")?.split(",")[0]?.trim() || headers.get("host");
  if (!origin || !host) return process.env.NODE_ENV !== "production";
  try {
    const originUrl = new URL(origin);
    const originHost = originUrl.host.toLowerCase();
    const requestHost = host.toLowerCase();
    if (process.env.NODE_ENV === "production") {
      return originUrl.protocol === "https:" && productionHosts.has(originHost) && productionHosts.has(requestHost) && originHost === requestHost;
    }
    return (originUrl.protocol === "http:" || originUrl.protocol === "https:") && originHost === requestHost;
  } catch {
    return false;
  }
}
