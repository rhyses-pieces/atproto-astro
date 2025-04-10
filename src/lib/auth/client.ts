import type { Kysely } from "kysely";
import type { Database } from "../db/types";
import { PORT, PUBLIC_URL } from "astro:env/server";
import { Agent } from "@atproto/api";
import { JoseKey } from "@atproto/jwk-jose";
import { NodeOAuthClient } from "@atproto/oauth-client-node";
import { db } from "../db";
import { SessionStore, StateStore } from "./storage";

const SCOPES = "atproto transition:generic";
const REDIRECT_PATH = "/oauth/callback";
const IS_DEV = process.env.NODE_ENV == "development";
const url = IS_DEV ? `http://127.0.0.1:${PORT}` : PUBLIC_URL;

const LOCAL_SEARCH_PARAMS = new URLSearchParams({
  scope: SCOPES,
  redirect_uri: new URL(REDIRECT_PATH, url).toString(),
});

async function createClient(db: Kysely<Database>) {
  if (!PUBLIC_URL) throw new Error("PUBLIC_URL is not set but required for oauth");

  return new NodeOAuthClient({
    clientMetadata: {
      client_name: "status app",
      client_id: IS_DEV
        ? `http://localhost?${LOCAL_SEARCH_PARAMS.toString()}`
        : `${PUBLIC_URL}/oauth/client-metadata.json`,
      client_uri: url,
      redirect_uris: [`${url}/oauth/callback`],
      scope: SCOPES,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      application_type: "web",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
      jwks_uri: `${url}/oauth/jwks.json`,
    },
    keyset: await Promise.all([JoseKey.generate()]),
    stateStore: new StateStore(db),
    sessionStore: new SessionStore(db),
  });
}

export const client = await createClient(db);

export async function getAgent({ did }: { did: string }) {
  const session = await client.restore(did);
  if (session) return new Agent(session);
  return null;
}