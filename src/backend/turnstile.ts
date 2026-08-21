import "server-only";

type TurnstileResult = { success?: boolean; action?: string; hostname?: string; "error-codes"?: string[] };

export function isTurnstileConfigured() {
  if (process.env.NODE_ENV !== "production" && process.env.TURNSTILE_DEV_BYPASS === "true") return true;
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string, remoteAddress: string, expectedAction: "quote" | "admin-login") {
  if (process.env.NODE_ENV !== "production" && process.env.TURNSTILE_DEV_BYPASS === "true") return true;
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || !token) return false;

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
    return result.success === true && result.action === expectedAction;
  } catch {
    return false;
  }
}
