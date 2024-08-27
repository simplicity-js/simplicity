const Connections = require("@simplicityjs/framework/connections");
const CacheFactory = require("@simplicityjs/framework/factory/cache");
const ServiceProvider = require("./service-provider");


module.exports = class CacheServiceProvider extends ServiceProvider {
  constructor(config) {
    super(config);
  }

  register() {
    const container = this.container();
    const config = this.config();
    const cacheConfig = config.get("cache");
    const defaultCache = cacheConfig.default;
    const defaultCacheData = cacheConfig.stores[defaultCache];
    const cacheDriver = defaultCacheData.driver;
    const cacheParams = defaultCacheData;

    if(defaultCache === "redis") {
      const redisClient = Connections.get("redis", config.get("redis"));

      cacheParams.connection = redisClient;
    }

    const cache = CacheFactory.createCache(cacheDriver, cacheParams);

    /*
     * Bind the default cache to the container
     */
    container.bind("cache", function createCache() {
      return cache;
    });
  }
};
