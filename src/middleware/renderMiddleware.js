import { render } from "../../node_modules/lit-html/lit-html.js";
import { navView } from "../views/navView.js";

const main = document.getElementById("content");
const nav = document.querySelector(".navigation");

// Attach render to context
const ctxRender = (templateResult) => {
  render(templateResult, main);
};

export const renderMiddleware = (ctx, next) => {
  ctx.render = ctxRender;
  next();
};

export const renderNav = (ctx, next) => {
  render(navView(ctx), nav);
  next();
};
