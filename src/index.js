const { create: createApp } = require("@simplicityjs/framework");
const config = require("./config");

const port = config.get("app.port");
const app = createApp();

app.listen(port);
