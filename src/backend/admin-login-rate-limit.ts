import "server-only";
import { ensureDatabaseSchema, getDatabase } from "./database";

export async function isAdminLoginRateLimited(ipHash: string) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM admin_login_attempts
    WHERE ip_hash = ${ipHash}
      AND succeeded = FALSE
      AND created_at > NOW() - INTERVAL '15 minutes'
  `;
  return Number(rows[0]?.count ?? 0) >= 10;
}

export async function recordAdminLoginAttempt(ipHash: string, succeeded: boolean) {
  await ensureDatabaseSchema();
  const sql = getDatabase();
  await sql`INSERT INTO admin_login_attempts (ip_hash, succeeded) VALUES (${ipHash}, ${succeeded})`;
  await sql`DELETE FROM admin_login_attempts WHERE created_at < NOW() - INTERVAL '7 days'`;
}
