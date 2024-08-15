const Application = require("./bootstrap/app");

function start() {
  const app = Application.create();

  app.listen();
}

start();
