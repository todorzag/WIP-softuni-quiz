import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { clearSolution } from "../services/quizManager.js";
import * as quizService from "../services/quizzes.js";

const detailsTemplate = (quiz, user, isUser) => html`<section id="details">
  <div class="pad-large alt-page">
    <article class="details">
      <h1>${quiz.get("title")}</h1>
      <span class="quiz-topic"
        >A quiz by <a href="/user/${user.id}">${user.get("username")}</a> on the
        topic of ${quiz.get("topic")}</span
      >
      <div class="quiz-meta">
        <span>${quiz.get("questionNumber")} Questions</span>
        <span>|</span>
        <span>Taken ${quiz.get("timesTaken")} times</span>
      </div>
      <p class="quiz-desc">${quiz.get("summary")}</p>

      <div>
        ${isUser
          ? html`<a class="cta action" href="/quiz/${quiz.id}/${1}"
              >Begin Quiz</a
            >`
          : nothing}
      </div>
    </article>
  </div>
</section>`;

export const detailsView = (ctx) => {
  clearSolution();
  quizService.getQuiz(ctx.params.quizId).then((quiz) =>
    quiz
      .get("ownerId")
      .fetch()
      .then((user) => ctx.render(detailsTemplate(quiz, user, ctx.user)))
  );
};
