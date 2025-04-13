declare namespace App {
  interface Locals {
    user: import("@/lib/db/types").User | null,
    session: import("@/lib/db/types").Session | null,
  }
  interface SessionData {
    user_did: string;
  }
}