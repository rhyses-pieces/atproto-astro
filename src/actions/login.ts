import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export default defineAction({
  accept: "form",
  input: z.object({
    handle: z.string(),
  }),
  handler: async (input, context) => {
    const sessionExists = await context.session?.has("user");
    if (sessionExists) {
      await context.session?.regenerate();
      const user = await context.session?.get("user");
      return user;
    } else {
      const user = {
        handle: input.handle,
      };
      // check if user exists in database
      // log in the user to the database
      // create new session
      context.session?.set("user", user);
      console.log("session set!");
      return user;
    }
  },
});