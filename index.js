// Imports
const { debug } = require("console");
const express = require("express");
const path = require("path");

// Initialize an expressJS instance
const app = express();
// define port
const PORT = process.env.PORT || 8000;

// Establish file server in my assets dir
app.use(express.static("assets"));

// teapot request handler
app.get("/teapot", (req, res) => {
  // change header to HTCPCP 418
  res
    .status(418)
    .send(   // send out html body with linkage
      "<html><h1><a href='https://datatracker.ietf.org/doc/html/rfc2324/'>HTCPTP</h1><img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftaooftea.com%2Fwp-content%2Fuploads%2F2015%2F12%2Fyixing-dark-brown-small.jpg&f=1&nofb=1' alt='Im a teapot'></a><html>"
    );
  // console debug text to record tea brewing event
  debug("Brewing Tea...");
});

// blog handler
app.get("/blog/:postID", (req, res) => {
  // read in postID parameter
  const post_id = req.params.postID;

  // print which blog was served for logging and debugging
  debug(`blog ${post_id} served`);
});

// listen on port
app.listen(PORT, () => {
  // send status to console for debugging
  debug(`listening on port: ${PORT}`);
});
