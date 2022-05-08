import { html } from "../../node_modules/lit-html/lit-html.js";

const navTemplate = (isUser) => html`<a class="nav-link" href="/browse"
    >Browse</a
  >
  <div id="user-nav">${isUser ? logged() : guest()}</div> `;

const guest = () => html`<div id="guest-nav">
  <a class="nav-link" href="/login">Sign in</a>
</div>`;

const logged = () => html`<a class="nav-link" href="/create">Create</a>
  <a class="nav-link profile-link" href="/profile/:userId"
    ><i class="fas fa-user-circle"></i
  ></a>
  <a id="logoutBtn" class="nav-link" href="/logout">Logout</a>`;

export const navView = (ctx) => {
  return navTemplate(ctx.user);
};
