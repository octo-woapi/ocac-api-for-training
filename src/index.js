"use strict";

const { database } = require("./database");
const serverConfiguration = require("./server-configuration");

async function init () {
  await database
  .authenticate()
  .then(async () => {
    console.log("Connection to database established successfully.");

    const server = serverConfiguration.initServer();
    await server.start();
    console.log("Server running on %s", server.info.uri);
  })
  .catch((err) => {
    console.log("Unable to connect to the database: ", err);
  });
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
