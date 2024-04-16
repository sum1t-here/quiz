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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
