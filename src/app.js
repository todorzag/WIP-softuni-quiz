import page from "../node_modules/page/page.mjs";

import { renderMiddleware, renderNav } from "./middleware/renderMiddleware.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { loadingCube } from "./middleware/loadingMiddleware.js";

import { homeView } from "./views/homeView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";
import { registerView } from "./views/registerView.js";
import { browseView } from "./views/browseView.js";
import { detailsView } from "./views/detailsView.js";
import { quizView } from "./views/quizView.js";

page(authMiddleware);
page(renderMiddleware);
page(renderNav);
page(loadingCube);

page("/", homeView);
page("/login", loginView);
page("/logout", logoutView);
page("/register", registerView);
page("/browse", browseView);
page("/details/:quizId", detailsView);
page("/quiz/:quizId/:questionNumber", quizView);

page.start();
