const { create: createApp } = require("@simplicityjs/framework/application");
const config = require("./config");

function start() {
  const port = config.get("app.port");
  const app = createApp();

  app.listen(port);
}

start();
