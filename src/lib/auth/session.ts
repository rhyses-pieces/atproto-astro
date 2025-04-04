import type { AstroCookies } from "astro";
import { db } from "../db";

const EXPIRE = 1000 * 60 * 60 * 24;
const SESSION_DURATION_DAYS = 30;
const RENEWAL_THRESHOLD_DAYS = 15;

export function generateSesssionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  // token
  return "";
}

async function validateSessionToken(token: string) {
  
}