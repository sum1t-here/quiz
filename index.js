const express = require('express');
const cors = require('cors');
const app = express();

const question = require('./question.json');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Quiz API!');
});

// display questions without correct answer
app.get('/quiz', (req, res) => {
  res.json(question.map(({ correctAnswer, ...q }) => q));
});

app.post('/submit', (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;
  const feedback = [];

  userAnswers.forEach((userAnswer, index) => {
    const correctAnswerIndex = question[index].correctAnswer; // Get the index of the correct answer
    console.log('Correct Answer Index:', correctAnswerIndex);
    const correctAnswer = question[index].choices[correctAnswerIndex]; // Get the correct answer text
    console.log('Correct Answer:', correctAnswer);
    console.log('User Answer:', userAnswer);

    if (userAnswer === correctAnswerIndex) {
      score++;
      feedback.push({ question: question[index].question, correct: true }); // Add feedback indicating correct answer
    } else {
      feedback.push({
        question: question[index].question,
        correct: false,
        correctAnswer: correctAnswer, // Add the correct answer text to feedback
      });
    }
  });

  res.json({ score, feedback });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
