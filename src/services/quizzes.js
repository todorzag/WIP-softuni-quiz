export const getAll = () => {
  const query = new Parse.Query("Quizzes");
  query.limit(3);
  return query.find();
};

export const getTopics = () =>
  getAll().then((results) => {
    let topics = [];
    results.map((x) => {
      topics.push(x.get("topic"));
    });
    return [...new Set(topics)];
  });

export const searchQuiz = (searchQuery, topic) => {
  const query = new Parse.Query("Quizzes");

  if (topic !== "All Categories") {
    query.equalTo("topic", topic);
  }

  query.startsWith("title", searchQuery);
  return query.find();
};

export const getQuiz = (id) => {
  const query = new Parse.Query("Quizzes");
  return query.get(id);
};

export const getQuizQuestions = async (quiz) => {
  const query = new Parse.Query("Questions");
  query.equalTo("quiz", quiz);
  return await query.find();
};
