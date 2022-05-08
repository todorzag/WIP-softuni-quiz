let solution = {};

export const clearSolution = () => {
  solution = {};
};

export const quizTracker = (e) => {
  if (e.target.tagName === "INPUT") {
    solution[e.target.name] = Number(e.target.value);
  }
};

export const isCheckedNav = (num) => {
  return `question-${num}` in solution;
};

export const isCheckedAnswer = (answerNum, questionNum) => {
  return answerNum === solution[`question-${questionNum}`];
};
