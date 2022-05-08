import * as auth from "../services/auth.js";

export const authMiddleware = async function (ctx, next) {
  const currentUser = await Parse.User.current();
  if (currentUser) {
    ctx.user = currentUser.attributes;
  }
  next();
};
