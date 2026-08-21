import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { ensureDatabaseSchema, getDatabase } from "./database";

const cookieName = process.env.NODE_ENV === "production" ? "__Host-able_admin_session" : "able_admin_session";
const legacyCookieName = "able_admin_session";
const issuer = "able-property-maintenance";
const audience = "able-cms-admin";
const sessionLifetimeSeconds = 60 * 60 * 8;

function sessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET_NOT_CONFIGURED");
  return secret;
}

function sessionKey() {
  return new TextEncoder().encode(sessionSecret());
}

function hashSessionId(sessionId: string) {
  return createHmac("sha256", sessionSecret()).update(sessionId).digest("hex");
}

async function verifiedSessionId(token: string) {
  const { payload } = await jwtVerify(token, sessionKey(), {
    algorithms: ["HS256"],
    issuer,
    audience,
    subject: "able-admin",
  });
  return payload.role === "admin" && typeof payload.jti === "string" && payload.jti.length >= 32 ? payload.jti : null;
}

export function isAdminConfigured() {
  const hashMatch = process.env.ADMIN_PASSWORD_HASH?.match(/^\$2[aby]\$(\d{2})\$.{53}$/);
  const cost = Number(hashMatch?.[1] ?? 0);
  return Boolean(hashMatch && cost >= 10 && cost <= 14 && process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 32);
}

export async function createAdminSession() {
  await ensureDatabaseSchema();
  const sessionId = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + sessionLifetimeSeconds * 1000);
  const sql = getDatabase();
  await sql`DELETE FROM admin_sessions WHERE expires_at <= NOW()`;
  await sql`INSERT INTO admin_sessions (id_hash, expires_at) VALUES (${hashSessionId(sessionId)}, ${expiresAt.toISOString()})`;

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("able-admin")
    .setIssuer(issuer)
    .setAudience(audience)
    .setJti(sessionId)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(sessionKey());

  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: sessionLifetimeSeconds,
    path: "/",
    priority: "high",
  });
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  try {
    if (token) {
      const sessionId = await verifiedSessionId(token);
      if (sessionId) {
        await ensureDatabaseSchema();
        const sql = getDatabase();
        await sql`DELETE FROM admin_sessions WHERE id_hash = ${hashSessionId(sessionId)}`;
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name !== "JWTExpired") throw error;
  } finally {
    cookieStore.set(cookieName, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", expires: new Date(0), maxAge: 0, path: "/" });
    if (cookieName !== legacyCookieName) cookieStore.set(legacyCookieName, "", { httpOnly: true, secure: true, sameSite: "strict", expires: new Date(0), maxAge: 0, path: "/" });
  }
}

export async function hasAdminSession() {
  if (!isAdminConfigured()) return false;
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;

  try {
    const sessionId = await verifiedSessionId(token);
    if (!sessionId) return false;
    await ensureDatabaseSchema();
    const sql = getDatabase();
    const rows = await sql`SELECT 1 FROM admin_sessions WHERE id_hash = ${hashSessionId(sessionId)} AND expires_at > NOW() LIMIT 1`;
    return rows.length === 1;
  } catch {
    return false;
  }
}

export async function requireAdminSession() {
  if (!(await hasAdminSession())) throw new Error("UNAUTHORIZED");
}
