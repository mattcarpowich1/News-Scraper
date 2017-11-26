const express = require('express');
const router = express.Router();
const { findAllAfterSaving } = require('../db/db_ops.js');

router.get('/', (req, res) => {
	findAllAfterSaving()
    .then(articles => {
      res.render('index', { articles });
    })
    .catch(error => {
      console.log(error);
    })
});

module.exports = router;