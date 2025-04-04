import type { APIRoute } from "astro";
import { client } from "@/lib/auth/client";

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(client.clientMetadata), {
    headers: {
      "Content-Type": "application/json",
    }
  });
}