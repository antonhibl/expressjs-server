/* eslint-disable @typescript-eslint/no-var-requires */
// Imports
const { debug } = require("console");
const express = require("express");
const https = require('https');
const logger = require('morgan')
const path = require("path");
const fs = require('fs');
const pug = require('pug');

// Initialize an expressJS instance
const app : any = express();
app.use(express.urlencoded({'extended': true}))
app.use(logger('dev'))

// pug templating engine
app.set('view engine', 'pug');
app.set('views','./assets/views');
// define port
const PORT : number = Number(process.env.PORT) || 8000;

// Establish file server in my assets dir
app.use(express.static("assets"));

// teapot request handler
app.get("/teapot", (req : any, res : any) => {
    // change header to HTCPCP 418
    res
        .status(418)
        .send(   // send out html body with linkage
            `<html>\
                <h1><a href='https://datatracker.ietf.org/doc/html/rfc2324/'>HTCPTP</h1>\
                    <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftaooftea.com%2Fwp-content%2Fuploads%2F2015%2F12%2Fyixing-dark-brown-small.jpg&f=1&nofb=1' alt='Im a teapot'>\
                </a>\
            <html>\
            `
        );
    // console debug text to record tea brewing event
    debug("Brewing Tea...");
});

// get a random number handler
app.get('/do_a_random', (req : any, res: any) => {
    res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
});

// security stuff
const privateKey = fs.readFileSync( 'ssl/server.key' );
const certificate = fs.readFileSync( 'ssl/server.cert' );

// spawn server instance with security that listens
https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(PORT, () => {
    // send status to console for debugging
    debug(`listening on port: ${PORT}`);
});
