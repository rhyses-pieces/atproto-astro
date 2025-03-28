import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export default defineAction({
  accept: "form",
  input: z.object({
    emoji: z.string().emoji({ message: "Contains non-emoji characters" }),
    status: z.string(),
  }),
  handler: async (input, context) => {
    if (!context.session?.has("user")) {
      throw new ActionError({
        code: "UNAUTHORIZED",
        message: "User should be logged in!",
      });
    } 
    // find user from db
    // insert status into the db
    // return results
  },
});