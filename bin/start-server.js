#!/usr/bin/env node

const cp = require("node:child_process");
const path = require("node:path");
const { parseArgs } = require("node:util");

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

  return new Promise((resolve, reject) => {
    cp.spawn(command, { stdio: "inherit", shell: true })
      .on("close", (code) => (code === 0) ? resolve(code) : reject(code));
  });
}

startServer();
