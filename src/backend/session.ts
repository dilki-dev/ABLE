import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const cookieName = "able_admin_session";
const issuer = "able-property-maintenance";
const audience = "able-cms-admin";

function sessionKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET_NOT_CONFIGURED");
  return new TextEncoder().encode(secret);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32);
}

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("able-admin")
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(sessionKey());

  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 12,
    path: "/",
    priority: "high",
  });
}

export async function deleteAdminSession() {
  (await cookies()).delete(cookieName);
}

export async function hasAdminSession() {
  if (!isAdminConfigured()) return false;
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, sessionKey(), {
      algorithms: ["HS256"],
      issuer,
      audience,
      subject: "able-admin",
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}
