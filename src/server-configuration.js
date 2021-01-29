"use strict";

const Hapi = require("@hapi/hapi");
const routes = require("./routes");

function initServer() {
  const PORT = process.env.PORT || "3000";
  const HOST = process.env.HOST || "0.0.0.0";

  const server = Hapi.server({
    port: PORT,
    host: HOST,
  });

  routes.allRoutes.forEach((singleRoute) => {
    server.route(singleRoute);
  });

  return server;
}

exports.initServer = initServer;
