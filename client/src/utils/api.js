export async function fetchTriviaQuestions(amount = 3, category = 12) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=multiple`
  );
  const data = await response.json();

  return data.results.map((q) => ({
    text: decodeHTML(q.question),
    options: shuffle([
      ...q.incorrect_answers.map((i) => ({
        text: decodeHTML(i),
        isCorrect: false,
      })),
      {
        text: decodeHTML(q.correct_answer),
        isCorrect: true,
      },
    ]),
  }));
}

// 🧼 Helper: Clean up special characters like &quot; or &amp;
function decodeHTML(str) {
  const parser = new DOMParser();
  return parser.parseFromString(str, "text/html").body.textContent;
}

// 🔀 Helper: Randomize option order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}