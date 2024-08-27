const LogFactory = require("@simplicityjs/framework/factory/log");
const ServiceProvider = require("./service-provider");


module.exports = class LogServiceProvider extends ServiceProvider {
  constructor(config) {
    super(config);
  }

  register() {
    const config = this.config();
    const container = this.container();
    const appName = config.get("app.name");
    const logConfig = config.get("logging");

    container.bind("logger", function getLogger() {
      return LogFactory.createLogger({
        ...logConfig,
        label: appName,
        transports: logConfig.channels,
      });
    });
  }
};
