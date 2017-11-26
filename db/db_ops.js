const { scrape } = require('../scraper/scraper.js');
const Article = require('../models/article.js');
const mongoose = require('mongoose');
const async = require('async');

mongoose.Promise = Promise;

function findAllAfterSaving() {
	return new Promise((resolve, reject) => {
		saveArticles()
			.then(() => {
				Article.find({})
					.then(documents => {
						resolve(documents);
					})
					.catch(error => {
						reject(error);
					});
			})
			.catch(error => {
				reject(error);
			})
	});
}

function saveArticles() {
	return new Promise((resolve, reject) => {

		scrape()
			.then(articles => {
				insertMany(articles, () => {
					resolve();
				});
			})
			.catch(err => {
				reject(err);
			});

	});
}

function insertMany(articles, resolve) {
	async.each(articles, (item, callback) => {

		Article.create(item)
			.then(() => {
				callback();
			})
			.catch(error => {
				callback(error);
			});

	}, resolve);
}

module.exports = { findAllAfterSaving };