var express = require('express');
const Crawler = require("crawler");
var router = express.Router();

/* GET home page. */
router.get('/:url1/:url2/:url3', function(req, res, next){
	const format_url = "https://www.animeunited.com.br/"+req.url+"/";
    const content = [];

    var c = new Crawler({
        maxConnections: 10,
        callback: function(error, response, done) {
            if(error){
                console.log(error);
            }
            else{
                const $ = response.$;

                const title     = $('.entry-title-primary').first().text().trim();
                const subtitle  = $('.entry-subtitle').first().text().trim();

                var img = $('.entry-content figure img').attr('data-lazy-src');
                var deBug = $('.entry-content figure img').attr('data-lazy-srcset');
                
                if(typeof deBug != 'undefined'){
                    img = deBug.split(",");
                    img = img[img.length-1].split(" ");
                    img = img[1];
                }

                const alt = $('.entry-content noscript img').attr('alt').trim();

                $('.entry-content figure').remove();
                var text = $('.entry-content').first();

                content.push({
                    title,
                    subtitle,
                    img,
                    alt,
                    text
                });
                
            }
            done();
            res.render("news", {content});
            // res.send("Teste 3");
        }
    });
    c.queue(format_url);
});

router.get('/:url1/:url2', function(req, res, next){
    const format_url = "https://www.animeunited.com.br/"+req.url+"/";
    const content = [];

    var c = new Crawler({
        maxConnections: 10,
        callback: function(error, response, done) {
            if(error){
                console.log(error);
            }
            else{
                const $ = response.$;

                const title     = $('.entry-title-primary').first().text().trim();
                const subtitle  = $('.entry-subtitle').first().text().trim();

                var img = $('.entry-content figure img').attr('data-lazy-src');
                var deBug = $('.entry-content figure img').attr('data-lazy-srcset');
                
                if(typeof deBug != 'undefined'){
                    img = deBug.split(",");
                    img = img[img.length-1].split(" ");
                    img = img[1];
                }

                const alt = $('.entry-content noscript img').attr('alt').trim();

                $('.entry-content figure').remove();
                var text = $('.entry-content').first();

                content.push({
                    title,
                    subtitle,
                    img,
                    alt,
                    text
                });
                
            }
            done();
            res.render("news", {content});
            // res.send("Teste 3");
        }
    });
    c.queue(format_url);
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
