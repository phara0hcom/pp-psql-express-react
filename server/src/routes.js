const express = require('express');
const pool = require('./db');
const router = express.Router();



router.get('/api/allPosts', (req, res, next) => {
  pool.query('select * FROM posts ORDER BY date_created DESC', (q_err, q_res) => {
    if(q_err) {
      console.log(q_err);
      res.json(q_err)
    } else {
      res.json(q_res.rows)
    }
  })
})

module.exports = router;