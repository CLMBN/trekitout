
var express = require('express');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require('mongoose');

var Article = require('./models/Article.js')
mongoose.Promise = Promise;

var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

//--------------------------- MONGOOSE ---------------------------

// if (process.env.MONGODB_URI) {
//   mongoose.connect(process.env.MONGODB_URI)
// } else {
  mongoose.connect('mongodb://heroku_kqxcxvjb:v013pehj9jabhajnh039cjelc4@ds011734.mlab.com:11734/heroku_kqxcxvjb');
// }

var db = mongoose.connection;

// Show any Mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//--------------------------- ROUTES ---------------------------



//route for react HTML page
app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
});



//app listening...
app.listen(PORT,function() {
    console.log('App is listening at ' + PORT);
})