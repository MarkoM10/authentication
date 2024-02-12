console.log('Hello World');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'], // Add other HTTP methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Add other allowed headers if needed
  })
);

app.post('/register', (req, res) => {
  //   console.log(req);
  const { email, username, password } = req.body;

  console.log('User register data: ', email, username, password);

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.status(200).json({ message: 'User registered successfully' });
});

app.listen(3600, () => {
  console.log('Server is listening on port 3600');
});
