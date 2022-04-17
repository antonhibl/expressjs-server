// Imports
var debug = require("console").debug;
var express = require("express");
var https = require("https");
var logger = require("morgan");
var path = require("path");
var fs = require("fs");
var pug = require("pug");
var process = require("process");

// Initialize an expressJS instance
var app = express();

// logging settings
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// pug templating engine
app.set("view engine", "pug");

// set template dir
app.set("views", "./assets/views");

// define port
var PORT = Number(process.env.PORT) || 443;

// Establish file server in my assets dir
app.use(express.static("assets"));
// teapot request handler
app.get("/teapot", function (req, res) {
  // change header to HTCPCP 418
  res.status(418).send(
    // send out html body with linkage
    `<html>\
      <h1>\
	  <a href='https://datatracker.ietf.org/doc/html/rfc2324/'>HTCPTP</h1>\
        <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftaooftea.com%2Fwp-content%2Fuploads%2F2015%2F12%2Fyixing-dark-brown-small.jpg&f=1&nofb=1' alt='Im a teapot'>\
      </a>\
    <html>\
    `
  );
  // console debug text to record tea brewing event
  debug("Brewing Tea...");
});

app.get("/life", function(req, res) {
	res.render("life");
});

app.get("/cs212/final", function(req, res) {
  // send the web page to the browser
  res.render(`final`);
});

// do a random number function
app.get("/do_a_random", function (req, res) {
  res.send("Your number is: ".concat(Math.floor(Math.random() * 100) + 1));
});

app.post("/cs212/homework/8/", function(req, res) {
  var madlib_form = req.body;
  var mad_array = new Array(12);
  
  for(var x=0;x<12;x++) {
      mad_array[x] = madlib_form[`${x}`];
      const class_str = "<em class='special'>";
      mad_array[x] = class_str.concat(mad_array[x]).concat("</em>");
  }
  
  var story_array = [
      "<p>Today I went to the zoo and saw a(n)",
      "jumping up and down in its tree. It",
      "through the large tunnel that led to its",
      "I got some peanuts and passed them through the cage to a gigantic gray",
      "towering above my head. Feeding that thing made me hungry. I went to get a",
      "scoop of ice cream. It filled my stomach. Afterwards I had to",
      "to catch our bus. When I got home I",
      "my mom for a",
      "day at the zoo.</p>",
  ];
  
  story_array.splice(8, 0, mad_array[11]);
  story_array.splice(7, 0, mad_array[10]);
  story_array.splice(6, 0, mad_array[9]);
  story_array.splice(6, 0, mad_array[8]);
  story_array.splice(5, 0, mad_array[7]);
  story_array.splice(4, 0, mad_array[6]);
  story_array.splice(3, 0, mad_array[5]);
  story_array.splice(3, 0, mad_array[4]);
  story_array.splice(2, 0, mad_array[3]);
  story_array.splice(2, 0, mad_array[2]);
  story_array.splice(1, 0, mad_array[1]);
  story_array.splice(1, 0, mad_array[0]);
   story_array.push(`
   <style>
@import url('https://fonts.googleapis.com/css2?family=League+Spartan&family=Libre+Baskerville&display=swap');
html {
	height: 100%;
	width: 100%;
	background-color: rgb(35, 36, 37);
}
  
p {
	width: auto;
    height: auto;
    padding: 3%;
    padding-left: 10%;
    padding-right: 10%;
    text-align: center;
    font-family: 'Libre Baskerville', sans-serif;
    font-size: 32px;
    color: ghostwhite;
}
  
@media screen and (max-width: 350px) {
  html {
    height: 100%;
    width: 100%;
    background-color: rgb(35, 36, 37); 
  }
  p {
    color: ghostwhite;
    font-family: 'Libre Baskerville', serif;
    font-size: 32px;
  }
}
.special {
	color: springgreen;
	font-style: normal;
}
.special:hover {
	color: coral;
	font-style: normal;
}
</style>`);

  const story_str = story_array.join(" ");


  res.send(story_str);
});

if (process.argv[2] === 'local') {
  PORT = 8080
}

// SSL Cert and my RSA key
var privateKey = fs.readFileSync("ssl/server.key");
var certificate = fs.readFileSync("ssl/server.crt");

// Create server instance to utilize our SSL cert/key and listen
https
  .createServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app
  )
  .listen(PORT, function () {
    // send status to console for debugging
    debug("listening on port: ".concat(PORT));
  });
