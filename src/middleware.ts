import { defineMiddleware } from "astro:middleware";
import { client } from "./lib/auth/client";
import { validateSessionToken } from "./lib/auth/session";

export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("session")?.value ?? null;
  if (token === null) {
    context.locals.session = null;
    return next();
  }

  const { session } = await validateSessionToken(token);
  if (session === null) {
    context.cookies.delete("session");
    return next();
  }
  
  try {
    await client.restore(session.user_did);
  } catch (error) {
    context.cookies.delete("session");
    return next();
  }

  context.cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    expires: session.expires_at,
    path: "/",
  });

  context.locals.session = session;
  return next();
});