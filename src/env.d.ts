declare namespace App {
  interface Locals {
    user: {
      id: string;
      handle: string;
    } | null,
    session: {
      id: string;
      user_did: string;
      expires_at: Date | string;
    } | null,
  }
  interface SessionData {
    user_did: string;
  }
}