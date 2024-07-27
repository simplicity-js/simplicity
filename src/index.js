/*const { create: createApp } = require("@simplicityjs/framework/application");
const config = require("./config");

function start() {
  const port = config.get("app.port");
  const app = createApp();

  app.listen(port);
}

start();
*/

const Application = require("./bootstrap/app");

function start() {
  const app = Application.create();

  app.listen();
}

start();
