const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET;
const databasePass = process.env.DATABASE_PASS;

app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
  })
);
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: databasePass,
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

      const token = jwt.sign({ id: result.insertId }, jwtSecret, {
        expiresIn: '7d',
      });

      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully', token });
    });
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: 'You need a token to make this request.' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.post('/login', verifyJWT, (req, res) => {
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
        res.status(200).json({
          message: 'User logged in successfully',
        });
      });
    }
  );
});

app.post('/subscription', verifyJWT, (req, res) => {
  const userId = req.userId;
  const { name, phoneNumber, address } = req.body.personalData;
  const { planName, planPrice, planSubscription } = req.body.planData;
  const addonsData = req.body.addonsData;

  const addons = [];

  for (const key in addonsData) {
    if (addonsData.hasOwnProperty(key)) {
      const addon = addonsData[key];
      addons.push({
        label: addon.label,
        price: addon.price,
      });
    }
  }

  // Insert profile data
  db.query(
    'INSERT INTO profiles (user_id, name, phoneNumber, address) VALUES (?, ?, ?, ?)',
    [userId, name, phoneNumber, address],
    (err, profileResult) => {
      if (err) {
        console.error('Error inserting profile:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Insert subscription data
      db.query(
        'INSERT INTO subscriptions (user_id, planName, planPrice, planSubscription, addon1, addon2, addon3) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          userId,
          planName,
          planPrice,
          planSubscription,
          addons[0]?.label,
          addons[1]?.label,
          addons[2]?.label,
        ],
        (err, subscriptionResult) => {
          if (err) {
            console.error('Error inserting subscription:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          res.status(200).json({ message: 'Subscription data successful' });
        }
      );
    }
  );
});
app.listen(3600, () => {
  console.log('Server is listening on port 3600');
});
