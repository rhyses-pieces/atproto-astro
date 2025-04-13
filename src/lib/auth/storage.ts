import { type NodeSavedSession, type NodeSavedSessionStore, type NodeSavedState, type NodeSavedStateStore } from "@atproto/oauth-client-node";
import type { Kysely } from "kysely";
import type { Database } from "../db/types";

export class StateStore implements NodeSavedStateStore {
  constructor(private db: Kysely<Database>) {};
  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await this.db.selectFrom("auth_state").selectAll().where("state_key", "=", key).executeTakeFirst();
    if (!result) return;
    return result.state;
  };
  async set(key: string, value: NodeSavedState) {
    const state = JSON.stringify(value);
    await this.db
      .insertInto("auth_state")
      .values({ state_key: key, state })
      .onDuplicateKeyUpdate({ state })
      .execute();
  };
  async del(key: string) {
    await this.db.deleteFrom("auth_state").where("state_key", "=", key).execute();
  };
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: Kysely<Database>) {};
  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await this.db.selectFrom("auth_session").selectAll().where("session_key", "=", key).executeTakeFirst();
    if (!result) return;
    return result.session;
  };
  async set(key: string, value: NodeSavedSession) {
    const session = JSON.stringify(value);
    await this.db
      .insertInto("auth_session")
      .values({ session_key: key, session })
      .onDuplicateKeyUpdate({ session })
      .execute();
  };
  async del(key: string) {
    await this.db.deleteFrom("auth_session").where("session_key", "=", key).execute();
  };
}