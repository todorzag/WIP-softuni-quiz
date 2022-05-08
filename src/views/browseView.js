import { html } from "../../node_modules/lit-html/lit-html.js";
import * as quizService from "../services/quizzes.js";

const browseTemplate = (allQuizzes, topics, searchHandler) => html`<section
  id="browse"
>
  <header class="pad-large">
    <form class="browse-filter" @submit=${searchHandler}>
      <input class="input" type="text" name="query" />
      <select class="input" name="topic" id="topics">
        ${topicsOptionsTemplate(topics)}
      </select>
      <input class="input submit action" type="submit" value="Filter Quizes" />
    </form>
    <h1>All quizes</h1>
  </header>

  <div class="pad-large alt-page">
    ${allQuizzes.map((quiz) => previewTemplate(quiz))}
  </div>
</section>`;

const previewTemplate = (quiz) => html` <article class="preview layout">
  <div class="right-col">
    <a class="action cta" href="/details/${quiz.id}">View Quiz</a>
  </div>
  <div class="left-col">
    <h3>
      <a class="quiz-title-link" href="/detials/${quiz.id}"
        >${quiz.get("title")}</a
      >
    </h3>
    <span class="quiz-topic">Topic: ${quiz.get("topic")}</span>
    <div class="quiz-meta">
      <span>${quiz.get("questionNumber")} questions</span>
      <span>|</span>
      <span>Taken ${quiz.get("timesTaken")} times</span>
    </div>
  </div>
</article>`;

export const topicsOptionsTemplate = (topics) => html`<option value="all">
    All Categories
  </option>
  ${topics.map((topic) => html`<option value="topic">${topic}</option>`)}`;

export const browseView = async (ctx) => {
  let allQuizzes = await quizService.getAll();
  let topics = await quizService.getTopics();

  const searchHandler = (e) => {
    e.preventDefault();

    let form = new FormData(e.currentTarget);
    let query = form.get("query");

    let optionElement = document.getElementById("topics");
    let topic = optionElement.options[optionElement.selectedIndex].text;

    quizService
      .searchQuiz(query, topic)
      .then((result) =>
        ctx.render(browseTemplate(result, topics, searchHandler))
      );
  };

  ctx.render(browseTemplate(allQuizzes, topics, searchHandler));
};
