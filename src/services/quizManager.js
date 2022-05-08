let solution = {};

export const quizTracker = (e) => {
  if (e.target.tagName === "INPUT") {
    solution[e.target.name] = Number(e.target.value);
    console.log(solution);
  }
};

export const isCheckedNav = (num) => {
  return `question-${num}` in solution;
};

export const isCheckedAnswer = (answerNum, questionNum) => {
  console.log(questionNum);
  console.log(answerNum);
  console.log(solution[`question-${questionNum}`]);
  return answerNum === solution[`question-${questionNum}`];
};
