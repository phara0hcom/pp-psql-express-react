const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/all/:post_id', (req, res, next) => {
  const { post_id } = req.params;
  pool.query(
    `SELECT * FROM comments
    WHERE post_id = $1
    ORDER BY date_created DESC`,
    [post_id],
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
  const values = [body.comment, body.user_id, body.post_id, body.username];
  pool.query(
    `INSERT INTO comments(comment, user_id, post_id, author, date_created)
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

router.put('/update/:cid', (req, res, next) => {
  const { body, params } = req;
  const values = [
    body.comment,
    body.user_id,
    body.post_id,
    body.username,
    params.cid,
  ];
  pool.query(
    `UPDATE comments set 
    comment = $1, user_id = $2, post_id = $3, author = $4, date_updated = NOW()
    WHERE cip = $5`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        return next(q_err);
      }

      res.json(q_res.rows);
    }
  );
});

router.delete('/delete/:cid', async (req, res, next) => {
  const { cid } = req.params;
  await pool.query(
    `DELETE FROM comments
     WHERE cid = $1`,
    [cid],
    (q_err, q_res) => {
      if (q_err) {
        console.log('/post/delete', q_err);
      }
    }
  );
});

module.exports = router;
