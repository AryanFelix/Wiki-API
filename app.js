//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require("lodash")

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(function (req, res){
        Article.find({}, function (err, articles){
            if(err){
                console.log(err);
            }
            else {
                res.send(articles);
            }
        });
    })
    .post(function(req, res){
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function(err){
            if(err){
                res.send(err);
            }
            else {
                res.send("Article Saved!")
            }
        });
    })
    .delete(function(req, res){
        Article.deleteMany({}, function(err){
            if(err)
            {
                console.log(err);
                res.send(err);
            }
            else {
                res.send("Deleted all articles!");
            }
        });
    });

app.route("/articles/:topic")
    .get(function(req, res){
        const articleSearched = req.params.topic;
        Article.findOne({title : articleSearched}, function (err, article){
            if(err){
                console.log(err);
            }
            else if (article){
                res.send(article);
            }
            else{
                res.send("No articles found.");
            }
        });
    })
    .put(function(req, res){
        const articleToUpdate = req.params.topic;
        Article.update({
            title: articleToUpdate
        }, 
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            overwrite: true
        },
        function(err){
            if(err){
                res.send(err);
            }
            else {
                res.send("Successfully updated article");
            }
        })
    })
    .patch(function(req, res){
        const articleToUpdate = req.params.topic;
        Article.update({
            title: articleToUpdate
        },
        {
            $set: req.body
        },
        function(err){
            if(err){
                res.send(err);
            }
            else {
                res.send("Successfully updated article");
            }
        })
    })
    .delete(function(req, res){
        const articleToDelete = req.params.topic;
        Article.deleteOne({title: articleToDelete}, function(err){
            if(err){
                res.send(err);
            }
            else {
                res.send("Deleted article");
            }
        })
    });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});