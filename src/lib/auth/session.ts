import type { NewSession, Session } from "../db/types";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "../db";

const DAYS_IN_MS = 1000 * 60 * 60 * 24;
const SESSION_DURATION_DAYS = 30;
const RENEWAL_THRESHOLD_DAYS = 15;

async function getSession(token: string): Promise<Session> {
  const result = await db.selectFrom("session")
    .selectAll()
    .where("id", "=", token)
    .executeTakeFirstOrThrow();
  return result;
}

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userDid: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: NewSession = {
    id: sessionId,
    user_did: userDid,
    expires_at: new Date(Date.now() + DAYS_IN_MS * SESSION_DURATION_DAYS).toISOString(),
  };
  const result = await db.insertInto("session").values(session).returning("id").executeTakeFirst();
  if (!result) {
    throw new Error("No ID found for session!");
  }
  return await getSession(result.id);
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db.selectFrom("session").selectAll().where("id", "=", token).executeTakeFirst();
  if (!result) {
    return { session: null };
  }
  const session: Session = result;
  if (Date.now() >= session.expires_at.getTime()) {
    invalidateSession(sessionId);
    return { session: null };
  }
  if (Date.now() >= session.expires_at.getTime() - DAYS_IN_MS * RENEWAL_THRESHOLD_DAYS) {
    session.expires_at = new Date(Date.now() + DAYS_IN_MS * SESSION_DURATION_DAYS);
    await db.updateTable("session").set({ expires_at: session.expires_at }).where("id", "=", session.id).executeTakeFirst();
  }
  return { session };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.deleteFrom("session").where("id", "=", sessionId).executeTakeFirstOrThrow();
}

export async function invalidateAllSessions(userDid: string): Promise<void> {
  await db.deleteFrom("session").where("user_did", "=", userDid).execute();
}

export type SessionValidationResult = | { session: Session | null };