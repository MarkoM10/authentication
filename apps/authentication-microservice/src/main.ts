const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Ma4ko10MJLB00',
  database: 'register',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

app.post('/register', (req, res) => {
  //   console.log(req);
  const { email, username, password } = req.body;

  // console.log('User register data: ', email, username, password);

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = { email, username, password };

  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Email address already exists' });
      }
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('User registered successfully');
    res.status(200).json({ message: 'User registered successfully' });
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, results) => {
      if (err) {
        console.error('Error retrieving user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ error: 'Username or password is incorrect' });
      }

      const user = results[0];

      // Compare the provided password with the stored password
      if (password !== user.password) {
        return res
          .status(401)
          .json({ error: 'Username or password is incorrect' });
      }

      // Passwords match, user is authenticated
      res.status(200).json({ message: 'User logged in successfully' });
    }
  );
});

app.listen(3600, () => {
  console.log('Server is listening on port 3600');
});
