const cheerio = require("cheerio");
const request = require("request");

function scrapeLatestArticles() {
	return new Promise((resolve, reject) => {

		request("https://www.theatlantic.com/latest/", (err, results, html) => {

			if (err) {
				reject(err);
			}

			const articles = [];

			const $ = cheerio.load(html);

			// Loop through each of the article posts
			$("li.article.blog-article").each((index, element) => {

				const title = $(element).find("a").find("h2").text();
				const summary = $(element).find("p.dek").text().trim();
				let link = $(element).find("a").attr("href");

				// link is only relative path, so prepend the first part
				link = "https://www.theatlantic.com" + link;

				// save data to articles array
				articles.push({
					title: title,
					summary: summary,
					link: link
				});

			});

			resolve(articles);

		});

	});

}

module.exports = {
	scrapeLatestArticles
}