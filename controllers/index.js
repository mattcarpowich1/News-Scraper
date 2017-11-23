const express = require('express');
const { scrapeLatestArticles } = require('./scraper/scraper.js');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

module.exports = router;