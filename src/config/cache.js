"use strict";

const env = require("@simplicityjs/framework/env");
const storagePath = require("@simplicityjs/framework/storage-path");
const NodeCache  = require("node-cache");

module.exports = {
  /*
   * ----------------------
   * Default Cache Storage.
   * ----------------------
   *
   * Specify the default storage to be used for caching.
   * This is the default connection used
   * for running a cache operation inside the application
   * unless another is explicitly specified during the operation.
   */
  default: env("CACHE_STORE", "memory"),

  /*
   * ----------------
   * Cache Key Prefix
   * -----------------
   *
   * When using the Redis cache store,
   * there might be other applications using the same cache. For
   * To avoid collisions, you may prefix every cache key.
   */
  prefix: env("CACHE_KEY_PREFIX", `${env("APP_NAME").toLowerCase().replace(/[\s*,-]+/g, "_")}_cache_`),

  /*
   * Whether to compress the data prior to caching.
   */
  compress: env("CACHE_COMPRESS_DATA"),

  /*
   * -------------
   * Cache Stores
   * -------------
   *
   * You may define all of the cache "stores" for your application as
   * well as their drivers here.
   *
   * Supported drivers include: "file", "memory", and "redis".
   */
  stores: {
    file: {
      driver: "file",
      storagePath: storagePath("framework/cache/data"),
    },

    memory: {
      driver: "memory",
      store: new NodeCache(),
    },

    redis: {
      driver: "redis",
    },
  },
};
