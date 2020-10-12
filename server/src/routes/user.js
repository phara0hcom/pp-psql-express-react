const express = require('express');
const pool = require('../db');

const router = express.Router();

router.post('/create', (req, res, next) => {
  const { profile } = req.body;
  const values = [profile.username, profile.email, profile.email_verified];
  pool.query(
    `INSERT INTO users(username, email, email_verified, date_created)
    VALUES($1, $2, $3, NOW())
    ON CONFLICT DO NOTHING`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }

      res.json(q_res.rows);
    }
  );
});

router.get('/get', (req, res, next) => {
  const email = String(req.body.email);
  pool.query(
    `SELECT * FROM users
    WHERE email = $1`,
    [email],
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      } else {
        res.json(q_res.rows);
      }
    }
  );
});

router.get('/posts/:user_id', (req, res, next) => {
  const user_id = String(req.params.user_id);
  pool.query(
    `SELECT * FROM posts
    WHERE user_id = $1`,
    [user_id],
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      } else {
        res.json(q_res.rows);
      }
    }
  );
});

module.exports = router;
