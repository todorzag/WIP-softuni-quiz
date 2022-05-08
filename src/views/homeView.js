import { html } from "../../node_modules/lit-html/lit-html.js";
import * as quizService from "../services/quizzes.js";

const homeTemplate = (allQuizzes, topics) => html`<section id="welcome">
  <div class="hero layout">
    <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
    <div class="glass welcome">
      <h1>Welcome to Quiz Fever!</h1>
      <p>
        Home to ${allQuizzes.length} quizes in ${topics} topics.
        <a href="/browse">Browse all quizes</a>.
      </p>
      <a class="action cta" href="/login">Sign in to create a quiz</a>
    </div>
  </div>

  <div class="pad-large alt-page">
    <h2>Our most recent quiz:</h2>

    ${allQuizzes.map((quiz) => quizTemplate(quiz))}

    <div>
      <a class="action cta" href="/browse">Browse all quizes</a>
    </div>
  </div>
</section>`;

const quizTemplate = (quiz) => html`<article class="preview layout">
  <div class="right-col">
    <a class="action cta" href="/details/${quiz.id}">View Quiz</a>
  </div>
  <div class="left-col">
    <h3>${quiz.get("title")}</h3>
    <span class="quiz-topic">Topic: ${quiz.get("topic")}</span>
    <div class="quiz-meta">
      <span>${quiz.get("questionNumber")} questions</span>
      <span>|</span>
      <span>Taken 54 times</span>
    </div>
  </div>
</article>`;

export const homeView = (ctx) => {
  Promise.all([quizService.getAll(), quizService.getTopics()]).then(
    (values) => {
      ctx.render(homeTemplate(values[0], values[1].length));
    }
  );
};
