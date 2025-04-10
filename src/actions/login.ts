import { client } from "@/lib/auth/client";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { nanoid } from "nanoid";

export default defineAction({
  accept: "form",
  input: z.object({
    handle: z.string(),
  }),
  handler: async (input) => {
    const handle = input.handle;
    const state = nanoid();
    try {
      const url = await client.authorize(handle, {
        scope: "atproto transition:generic",
        state,
      });
      return { redirectTo: url };
    } catch (error) {
      console.error(error);
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: "OAuth broken, contact the site owner!",
      });
    }
  },
});