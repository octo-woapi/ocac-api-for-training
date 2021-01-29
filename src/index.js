"use strict";

const serverConfiguration = require("./server-configuration");

async function init () {
  const server = serverConfiguration.initServer();
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
