import { defineAction } from "astro:actions";
import login from "./login";
import addStatus from "./addStatus";

export const server = {
  login: login,
  logout: defineAction({
    handler(context) {
      return context.session?.destroy();
    },
  }),
  status: addStatus,
}