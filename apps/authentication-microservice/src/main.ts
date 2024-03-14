const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const newUser = { email, username, password: hash };

    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res
            .status(400)
            .json({ error: 'Email address already exists' });
        }
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const token = jwt.sign(
        { username: newUser.username },
        'SITaOAsqqbGav8YYpO9oJwt8qLDDm3VwWGXK2ZaHJXJbYQljvzRRvPfdxHOqpmA3',
        { expiresIn: '1h' }
      );

      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully', token });
    });
  });
});

// {
//   "personalData": {
//       "name": "Petar Aksentijevic",
//       "phoneNumber": "0628172344",
//       "address": "Neznanog Junaka 14"
//   },
//   "planData": {
//       "planName": "Advanced",
//       "planPrice": 79,
//       "planSubscription": "year"
//   },
//   "addonsData": {
//       "Addon1": {
//           "label": "Online Service",
//           "price": 10
//       },
//       "Addon2": {
//           "label": "Larger computer storage",
//           "price": 20
//       },
//       "Addon3": {
//           "label": "Customizable profile",
//           "price": 35
//       }
//   }
// }

app.post('/subscription', (req, res) => {
  console.log(req, res);

  const { name, phoneNumber, address } = req.body.personalData;
  const { planName, planPrice, planSubscription } = req.body.planData;
  const { addon1, addon2, addon3 } = req.body.addonsData;

  console.log(name, phoneNumber, address);
  console.log(planName, planPrice, planSubscription);
  console.log(addon1, addon2, addon3);

  res.status(200).json({ message: 'Subscription data successful' });
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

      bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        if (!passwordMatch) {
          return res
            .status(401)
            .json({ error: 'Username or password is incorrect' });
        }

        // Passwords match, user is authenticated
        res.status(200).json({ message: 'User logged in successfully' });
      });
    }
  );
});

app.listen(3600, () => {
  console.log('Server is listening on port 3600');
});
