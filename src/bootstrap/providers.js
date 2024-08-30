/*
 * Specify your service providers in this file.
 */

const AppServiceProvider = require("service-providers/app-service-provider");
const CacheServiceProvider = require("service-providers/cache-service-provider");


/*
 * List the service providers in the order they should be invoked.
 */
module.exports = [
  AppServiceProvider,
  CacheServiceProvider,

  /*
   * If your service providers are stored inside the
   * `src/service-providers/` directory,
   * you can avoid having to importing them first and instead list them
   * as CamelCase or hyphen-case strings:
   */
  "DatabaseServiceProvider",
  "log-service-provider"
];
