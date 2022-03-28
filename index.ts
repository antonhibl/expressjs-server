// Imports
const { debug } : any = require("console");
const express : any = require("express");
const path : any = require("path");
const fs = require('fs');
const pug = require('pug');

// Initialize an expressJS instance
const app : any = express();
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
            "<html><h1><a href='https://datatracker.ietf.org/doc/html/rfc2324/'>HTCPTP</h1><img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftaooftea.com%2Fwp-content%2Fuploads%2F2015%2F12%2Fyixing-dark-brown-small.jpg&f=1&nofb=1' alt='Im a teapot'></a><html>"
        );
    // console debug text to record tea brewing event
    debug("Brewing Tea...");
});

// blog handler
app.get("/blog/:postID", (req : any, res : any) => {
    // read in postID parameter
    const post_id : string = req.params.postID;

    fs.readFile('./assets/db/'.concat(post_id).concat('.json'), 'utf-8', (err, data) => {
        if (err) {
            debug(`Error retrieving blog data: ${err}`);
        } else {
            const blog_data = JSON.parse(data);

            blog_data.main = blog_data.main.join();
            // template data into HTML
            res.render('blog_view', blog_data);
        }
    });

    // print which blog was served for logging and debugging
    debug(`blog ${post_id} served`);
});

// listen on port
app.listen(PORT, () => {
    // send status to console for debugging
    debug(`listening on port: ${PORT}`);
});
