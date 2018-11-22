// server.js
// load the things we need
var express = require("express");
var app = express();
var fs = require("fs");
app.use(express.static("public/index/"));
// set the view engine to ejs
app.set("view engine", "ejs");

// index page
app.get("/", function(req, res) {
  res.render("pages/index",{
    new_heading: "Guestbook Company",
    new_heading2: "Selite",
    new_heading3: "Guestbook"

  });

});
// Datan täyttö vieraskirjaan //
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

 /*app.get("/guestbook", function(req, res) {
  res.sendFile(__dirname + "/adduser.html");
});*/

app.get("/guestbook", function(req, res) {
  res.render("pages/guestbook",{
    new_heading: "Guestbook"
  });
});

app.post("/guestbook", function(req, res) {
  var data = require("./guestbookdata.json");
  data.push({
    Name: req.body.name,
    Age: req.body.age,
    Email: req.body.email,
    Comment: req.body.comment,
    Company: req.body.company,
    Date: new Date().toDateString()

  });

  var jsonStr = JSON.stringify(data);
  fs.writeFile("guestbookdata.json", jsonStr, err => {
    if (err) throw err;
    console.log("it's saved!");
  });
  res.statusCode = 302;
  res.setHeader("Location", "http://localhost:8081/bookdata");
  res.end();
});
//tulostus taulukkoon //
app.get("/bookdata", function(req, res) {
  var data = require("./guestbookdata.json");

  //parse results

  res.render("pages/bookdata", { data: data });
});
app.listen(8081);
console.log("App is using port 8081");
