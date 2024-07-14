const FrameworkServiceProvider = require(
  "@simplicityjs/framework/component/service-provider");

module.exports = class ServiceProvider extends FrameworkServiceProvider {
  #config;

  constructor(config) {
    super();

    this.#config = config;
  }

  config() {
    return this.#config;
  }
};
