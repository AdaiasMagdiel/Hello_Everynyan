var express = require('express');
const Crawler = require("crawler");
var router = express.Router();

const SITE = 'https://www.animeunited.com.br/noticias/animes/';

/* GET home page. */
router.get('/', function(req, res, next){
	
	const news = [];
	var c = new Crawler({
		maxConnections: 10,
		callback: function(error, response, done) {
			if(error){
				console.log(error);
			}
			else{
				const $ = response.$

				$('.row.gutter-6').each(function(i, e){
					const img = $(this).find('noscript>img').attr('src');
					const alt = $(this).find('noscript>img').attr('alt');
					const url = $(this).find('.thumbnail-container').attr('href').split("/").slice(3).join("/");
					const title = $(this).find('.entry-title-primary').text().trim();
					const subtitle = $(this).find('.entry-subtitle').text().trim();
					const excerpt = $(this).find('.entry-content p').text().trim();


					news.push({
						img,
						alt,
						url: "news/"+url,
						title,
						subtitle,
						excerpt
					});
				});

				var prev = next = false;
				prev = $(".nav-previous").length != 0 ? true : false;
				next = $(".nav-next").length != 0 ? true : false;

				var ID = 1;
			}
			done();
			res.render("index", {news, prev, next, ID});
		}
	});
	c.queue(SITE);

});

router.get('/:id', function(req, res, next){
	
	const id = req.params.id;
	const news = [];
	var c = new Crawler({
		maxConnections: 10,
		callback: function(error, response, done) {
			if(error){
				console.log(error);
			}
			else{
				const $ = response.$

				$('.row.gutter-6').each(function(i, e){
					const img = $(this).find('noscript>img').attr('src');
					const alt = $(this).find('noscript>img').attr('alt');
					const url = $(this).find('.thumbnail-container').attr('href').split("/").slice(3).join("/");
					const title = $(this).find('.entry-title-primary').text().trim();
					const subtitle = $(this).find('.entry-subtitle').text().trim();
					const excerpt = $(this).find('.entry-content p').text().trim();


					news.push({
						img,
						alt,
						url: "news/"+url,
						title,
						subtitle,
						excerpt
					});
				});

				var prev = next = false;
				prev = $(".nav-previous").length != 0 ? true : false;
				next = $(".nav-next").length != 0 ? true : false;

				var ID = parseInt(id);
			}
			done();
			res.render("index", {news, prev, next, ID});
		}
	});
	c.queue(SITE+"page/"+id+"/");

});

/******************
**Crawler Exemplo**
******************/

/*
var c = new Crawler({
	maxConnections: 10,
	callback: function(error, response, done) {
		if(error){
			console.log(error);
		}
		else{
			const $ = response.$;
		}
		done();
		res.render("index", {obj});
	}
});
c.queue(SITE);
*/

module.exports = router;
