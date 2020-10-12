const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/all', (req, res, next) => {
  pool.query(
    'SELECT * FROM posts ORDER BY date_created DESC',
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      } else {
        res.json(q_res.rows);
      }
    }
  );
});

router.post('/create', (req, res, next) => {
  const { body } = req;
  const values = [body.title, body.body, body.uid, body.username];
  pool.query(
    `INSERT INTO posts(title, body, user_id, author, date_created)
     VALUES($1, $2, $3, $4, NOW())`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }

      res.json(q_res.rows);
    }
  );
});

router.put('/update/:pid', (req, res, next) => {
  const { body, params } = req;
  const values = [body.title, body.body, body.uid, body.username, params.id];

  pool.query(
    `UPDATE posts set title = $1, body = $2 user_id = $3, author = $4, date_updated = NOW()
     WHERE pid = $5`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }

      res.json(q_res.rows);
    }
  );
});

router.delete('/delete/:post_id', async (req, res, next) => {
  const { post_id } = req.params;
  await pool.query(
    `DELETE FROM comments
     WHERE post_id = $1`,
    [post_id],
    (q_err, q_res) => {
      if (q_err) {
        console.log('/post/delete', q_err);
      }
    }
  );

  pool.query(
    `DELETE FROM post
     WHERE post_id = $1`,
    [post_id],
    (q_err, q_res) => {
      if (q_err) {
        console.log('/post/delete', q_err);
      }
    }
  );
});

module.exports = router;
