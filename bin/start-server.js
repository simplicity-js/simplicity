#!/usr/bin/env node

const path = require("node:path");
const { parseArgs } = require("node:util");
const exec = require("./exec");

const rootDir = path.dirname(__dirname);
const options = parseArgs({
  allowPositionals: true,
  options: {
    port: { type: "string", short: "p" },
  },
});

function startServer() {
  let command = `node ${rootDir}${path.sep}src${path.sep}index.js`;
  const port = options.values.port;

  if(port) {
    command += ` --port ${port}`;
  }

  exec(command).catch((err) => console.error(err));
}

startServer();
