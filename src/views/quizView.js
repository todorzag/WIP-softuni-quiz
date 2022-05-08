import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import * as quizService from "../services/quizzes.js";

import {
  isCheckedAnswer,
  isCheckedNav,
  quizTracker,
} from "../services/quizManager.js";

const quizNavTemplate = (quiz, questionNum, questions) => html`<header
    class="pad-large"
  >
    <h1>
      ${quiz.get("title")}: Question ${questionNum} /
      ${quiz.get("questionNumber")}
    </h1>
    <nav class="layout q-control">
      <span class="block">Question index</span>
      ${questionNav(quiz, quiz.get("questionNumber"), questionNum)}
    </nav>
  </header>
  ${quizTemplate(quiz, questionNum, questions, quizTracker)} `;

const quizTemplate = (quiz, questionNum, questions, quizTracker) => html`<div
  class="pad-large alt-page"
>
  <article class="question">
    <p class="q-text">${questions[questionNum - 1].get("text")}</p>

    <div @click=${quizTracker}>
      ${answersTemplate(questions[questionNum - 1].get("answers"), questionNum)}
    </div>

    <nav class="q-control">
      <span class="block">12 questions remaining</span>
      <a class="action" href="/quiz/${quiz.id}/${Number(questionNum) - 1}"
        ><i class="fas fa-arrow-left"></i> Previous</a
      >
      <a class="action" href="#"><i class="fas fa-sync-alt"></i> Start over</a>
      <div class="right-col">
        ${Number(questionNum) !== quiz.get("questionNumber")
          ? html`<a
              class="action"
              href="/quiz/${quiz.id}/${Number(questionNum) + 1}"
              >Next <i class="fas fa-arrow-right"></i
            ></a>`
          : nothing}

        <a class="action" href="#">Submit answers</a>
      </div>
    </nav>
  </article>
</div>`;

const questionNav = (quiz, numQuestions, questionNum) => {
  const squareTemplates = [];

  for (let i = 1; i <= numQuestions; i++) {
    squareTemplates.push(
      html`<a
        class="q-index ${Number(questionNum) === i
          ? "q-current"
          : ""} ${isCheckedNav(i) ? "q-answered" : ""}"
        href="/quiz/${quiz.id}/${i}"
      ></a>`
    );
  }

  return squareTemplates;
};

const answersTemplate = (answers, questionNum) => {
  const squareTemplates = [];

  for (let i = 1; i <= answers.length; i++) {
    squareTemplates.push(
      html`<label class="q-answer radio">
        <input
          class="input"
          type="radio"
          name=${`question-${questionNum}`}
          value=${i}
          .checked=${isCheckedAnswer(i, questionNum)}
        />
        <i class="fas fa-check-circle"></i>
        ${answers[i - 1]}
      </label>`
    );
  }

  return squareTemplates;
};

export const quizView = (ctx) => {
  quizService
    .getQuiz(ctx.params.quizId)
    .then((quiz) =>
      quizService
        .getQuizQuestions(quiz)
        .then((questions) =>
          ctx.render(
            quizNavTemplate(quiz, ctx.params.questionNumber, questions)
          )
        )
    );
};
