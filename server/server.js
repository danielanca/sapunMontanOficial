import React from "react";
import path from "path";
import fs from "fs";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import * as ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom/server";
import express from "express";
import serialize from "serialize-javascript";
import App from "../src/App";
import Mapp from "../src/Mapp.cjs";

import routes from "../src/services/routes.cjs";

const PORT = process.env.PORT || 3006;
const app = express();

// matchPath(route.path, req.url)
//console.log(`Routes: route.path: ${route.path} req.url ${req.url}`)
app.get("*", (req, res, next) => {
  console.log("Route contains", routes);
  // const activeRoute = routes.default.find((route) => matchPath(route.path, req.url)) || {};
  let promise = Promise.resolve();
  // promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise
    .then((data) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${req.url}</title>
            <script src="/bundle.js" defer></script>
            <link href="/main.css" rel="stylesheet">
            <script>
              window.__INITIAL_DATA__ = ${serialize(data)}
            </script>
          </head>

          <body>
            <div id="app">${ReactDOMServer.renderToString(
              // <StaticRouter location={req.url}>
              <App />
              // </StaticRouter>
              // <div>
              //   <span>SICKA</span>
              // </div>
              // </StaticRouter>
            )}</div>
          </body>
        </html>
        `);
    })
    .catch(next);

  // const indexFile = path.resolve("./build/index.html");

  // fs.readFile(indexFile, "utf8", (err, data) => {
  //   if (err) {
  //     console.error("Something went wrong:", err);
  //     return res.status(500).send("Oops, better luck next time!");
  //   }

  //   return res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
  // });
});

app.use(express.static(path.resolve(__dirname, "..", "./build")));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
