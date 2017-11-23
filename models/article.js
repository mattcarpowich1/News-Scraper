const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({

	title: {
		type: String,
		trim: true,
		unique: true,
		required: "Article title is required."
	},

	summary: {
		type: String,
		trim: true,
		required: "Article summary is required."
	},

	link: {
		type: String,
		trim: true,
		required: "Article link is required."
	}

});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;