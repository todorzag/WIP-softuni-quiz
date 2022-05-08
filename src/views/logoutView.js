import * as auth from "../services/auth.js";

export const logoutView = (ctx) => {
  auth.logout().then(() => ctx.page.redirect("/"));
};
