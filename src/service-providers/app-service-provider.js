"use strict";

const ServiceProvider = require("./service-provider");


/*
 * Extending the parent `ServiceProvider` gives us access to
 * the DI/Service Container via `this.container()` method.
 */
module.exports = class AppServiceProvider extends ServiceProvider {
  constructor(config) {
    super(config);
  }

  /**
   * Register the service's dependencies in the dependency container.
   */
  register() {
    const config = this.config();
    const container = this.container();

    container.bind("config", function configGetter() {
      return config;
    });
  }
};
