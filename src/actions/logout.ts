import { type APIContext } from "astro";
import { defineAction } from "astro:actions";

export default defineAction({
  handler: async (context: APIContext) => {
    const session = await context.session?.has("user");
    if (session) {
      context.cookies.delete("auth_session");
    }
    context.session?.destroy();
  },
});