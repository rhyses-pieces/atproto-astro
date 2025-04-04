import type { APIRoute } from "astro";
import { Agent } from "@atproto/api";
import { client } from "@/lib/auth/client";

export const GET: APIRoute = async ({ request, cookies }) => {
  const url = new URL(request.url);
  const { session } = await client.callback(url.searchParams);
  const agent = new Agent(session);

  return new Response();
}