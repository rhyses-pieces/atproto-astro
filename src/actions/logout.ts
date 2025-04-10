import { client } from "@/lib/auth/client";
import { validateSessionToken } from "@/lib/auth/session";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:content";

export default defineAction({
  accept: "form",
  input: z.object({}),
  handler: async (_, context) => {
    const token = context.cookies.get("session")?.value;
    if (!token) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "There's no session to log out of!"
      });
    }
    const { session } = await validateSessionToken(token);
    if (!session) {
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "You're not logged into your account to log out of...?"
      });
    }
    client.revoke(session.user_did);
    context.cookies.delete("session");
    return "logged out!";
  },
});