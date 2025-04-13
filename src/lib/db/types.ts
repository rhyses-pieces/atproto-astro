import type { NodeSavedSession, NodeSavedState } from "@atproto/oauth-client-node";
import type { ColumnType, Generated, Insertable, JSONColumnType, Selectable, Updateable } from "kysely";

export interface UserTable {
  did: ColumnType<string, string, never>;
  handle: string;
  active: ColumnType<boolean | undefined>;
  nickname: string | null;
  description: string | null;
  // avatar: Blob | null; // how do???
  homepage: string | null;
  // style: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UpdateUser = Updateable<UserTable>;

export interface StatusTable {
  uri: Generated<string>;
  author_did: string;
  content: string;
  created_at: ColumnType<Date, string | undefined, never>;
  indexed_at: ColumnType<Date, string>;
}

export type Status = Selectable<StatusTable>;
export type NewStatus = Insertable<StatusTable>;
export type UpdateStatus = Updateable<StatusTable>;

export interface SessionTable {
  id: Generated<string>;
  user_did: string;
  expires_at: ColumnType<Date, string>;
}

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type UpdateSession = Updateable<SessionTable>;

export interface AtProtoSessionTable {
  session_key: Generated<string>;
  session: JSONColumnType<NodeSavedSession>;
}

export type AtProtoSession = Selectable<AtProtoSessionTable>;
export type NewAtProtoSession = Insertable<AtProtoSessionTable>;
export type UpdateAtProtoSession = Updateable<AtProtoSessionTable>;

export interface AtProtoStateTable {
  state_key: Generated<string>;
  state: JSONColumnType<NodeSavedState>;
}

export type AtProtoState = Selectable<AtProtoStateTable>;
export type NewAtProtoState = Insertable<AtProtoStateTable>;
export type UpdateAtProtoState = Updateable<AtProtoStateTable>;

export interface Database {
  user: UserTable;
  status: StatusTable;
  session: SessionTable;
  auth_session: AtProtoSessionTable;
  auth_state: AtProtoStateTable;
}