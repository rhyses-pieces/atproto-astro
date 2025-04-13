import type { APIRoute } from "astro";
import { Agent } from "@atproto/api";
import { client } from "@/lib/auth/client";
import { createSession, generateSessionToken } from "@/lib/auth/session";

export const GET: APIRoute = async ({ request, cookies }) => {
  const url = new URL(request.url);
  const { session: oauthSession } = await client.callback(url.searchParams);
  const agent = new Agent(oauthSession);

  const token = generateSessionToken();
  console.log("token is set: " + token);
  console.log("assert the did: " + agent.assertDid);
  const session = await createSession(token, agent.did!);
  cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    expires: session.expires_at,
    path: "/",
  });

  return new Response("test!!!");
}