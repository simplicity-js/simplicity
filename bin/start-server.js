#!/usr/bin/env node

const { parseArgs } = require("node:util");
const exec = require("./exec");

const options = parseArgs({
  allowPositionals: true,
  options: {
    port: { type: "string", short: "p" },
  },
});

startServer();


function startServer() {
  let command = "node ./src/index.js";
  const port = options.values.port;

  if(port) {
    command += ` --port ${port}`;
  }

  exec(command).catch(() => {});
}
