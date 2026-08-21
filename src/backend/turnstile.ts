import "server-only";

type TurnstileResult = { success?: boolean; action?: string; hostname?: string; "error-codes"?: string[] };
const productionHostnames = new Set(["www.ableconstructions.lk", "ableconstructions.lk"]);

export function isTurnstileConfigured() {
  if (process.env.NODE_ENV !== "production" && process.env.TURNSTILE_DEV_BYPASS === "true") return true;
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string, remoteAddress: string, expectedAction: "quote" | "admin-login") {
  if (process.env.NODE_ENV !== "production" && process.env.TURNSTILE_DEV_BYPASS === "true") return true;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || !token || token.length > 2048) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: remoteAddress }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return false;
    const result = await response.json() as TurnstileResult;
    const hostname = result.hostname?.toLowerCase().replace(/\.$/, "");
    const validHostname = process.env.NODE_ENV !== "production" || Boolean(hostname && productionHostnames.has(hostname));
    return result.success === true && result.action === expectedAction && validHostname;
  } catch {
    return false;
  }
}
