import { html } from "../../node_modules/lit-html/lit-html.js";
import * as auth from "../services/auth.js";

const registerTemplate = (submitHandler) => html`<section id="register">
  <div class="pad-large">
    <div class="glass narrow">
      <header class="tab layout">
        <a class="tab-item" href="/login">Login</a>
        <h1 class="tab-item active">Register</h1>
      </header>
      <form class="pad-med centered" @submit=${submitHandler}>
        <label class="block centered"
          >Username:
          <input class="auth-input input" type="text" name="username"
        /></label>
        <label class="block centered"
          >Email: <input class="auth-input input" type="text" name="email"
        /></label>
        <label class="block centered"
          >Password:
          <input class="auth-input input" type="password" name="password"
        /></label>
        <label class="block centered"
          >Repeat:
          <input class="auth-input input" type="password" name="repass"
        /></label>
        <input class="block action cta" type="submit" value="Create Account" />
      </form>
      <footer class="tab-footer">
        Already have an account? <a class="invert" href="#">Sign in here</a>.
      </footer>
    </div>
  </div>
</section>`;

export const registerView = (ctx) => {
  const submitHandler = (e) => {
    e.preventDefault();

    let { username, email, password, repass } = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    let user = {
      username,
      email,
      password,
      repass,
    };

    if (password !== repass) {
      alert("Passwords do not match!");
      return;
    }

    if (auth.validate(user)) {
      alert("All fields must be filled!");
      return;
    }

    auth.register(user);
    ctx.page.redirect("/login");
  };

  ctx.render(registerTemplate(submitHandler));
};
