import React from "react";
import path from "path";
import fs from "fs";
import { matchPath } from "react-router-dom";
import { StaticRouter } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom/server";
import express from "express";
import serialize from "serialize-javascript";

import { App } from "../src/App";

const routes = require("../src/services/routes.cjs");

const PORT = process.env.PORT || 3006;
const app = express();

// app.get("/", (req, res) => {
//   const app = ReactDOMServer.renderToString(`${App}`);
//   const indexFile = path.resolve("./build/index.html");
//   console.log(`Client incoming on  ${PORT}`);
//   fs.readFile(indexFile, "utf8", (err, data) => {
//     if (err) {
//       console.error("Something went wrong:", err);
//       return res.status(500).send("Oops, better luck next time!");
//     }

//     return res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
//   });
// });

// matchPath(route.path, req.url)
//console.log(`Routes: route.path: ${route.path} req.url ${req.url}`)
app.get("*", (req, res, next) => {
  // const activeRoute = routes.default.find((route) => matchPath(route.path, req.url)) || {};

  // const promise = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();

  // promise
  //   .then((data) => {
  //     res.send(`
  //       <!DOCTYPE html>
  //       <html>
  //         <head>
  //           <title>Syka</title>
  //           <script src="/bundle.js" defer></script>
  //           <link href="/main.css" rel="stylesheet">
  //           <script>
  //             window.__INITIAL_DATA__ = ${serialize(data)}
  //           </script>
  //         </head>

  //         <body>
  //           <div id="App">${markup}</div>
  //         </body>
  //       </html>
  //       `);
  //   })
  //   .catch(next);

  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const app = ReactDOMServer.renderToString(<App></App>);
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
