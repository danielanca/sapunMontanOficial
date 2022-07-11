import React from "react";
import path from "path";
import fs from "fs";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import express from "express";
import serialize from "serialize-javascript";

import App from "../src/App";

const routes = require("../src/services/routes");

const PORT = process.env.PORT || 3006;
const app = express();

app.get("/", (req, res) => {
  const app = ReactDOMServer.renderToString(`${App}`);
  const indexFile = path.resolve("./build/index.html");
  console.log(`Client incoming on  ${PORT}`);
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
  });
});

app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(route.path, req.url)) || {};
  console.log("PARAM IS:", req.url);
  const promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  promise
    .then((data) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with React Router</title>
            <script src="/bundle.js" defer></script>
            <link href="/main.css" rel="stylesheet">
            <script>
              window.__INITIAL_DATA__ = ${serialize(data)}
            </script>
          </head>

          <body>
            <div id="app">${markup}</div>
          </body>
        </html>
        `);
    })
    .catch(next);

  const markup = ReactDOM.renderToString(
    ` ${(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    )}
    `
  );

  const app = ReactDOMServer.renderToString(`${App}`);
  const indexFile = path.resolve("./build/index.html");
  console.log(`Client incoming on  ${PORT}`);
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
  });
});

app.use(express.static(path.resolve(__dirname, "..", "./build")));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
