import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // const user = context.locals.user;
  // if (!user && context.request.url.endsWith("/user")) {
  //   return context.redirect("/");
  // }
  // if (user && context.request.url.endsWith("/login")) {
  //   // find the previous url thru searchparams THEN redirect back there
  //   // const previousUrl = new URLSearchParams("hi");
  //   return context.redirect("/user");
  // }
  return next();
});