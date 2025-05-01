"use strict";

const env = require("@simplicityjs/framework/env");

module.exports = {
  url         : env("REDIS_URL"),
  host        : env("REDIS_HOST", "localhost"),
  port        : env("REDIS_PORT", 6379),
  username    : env("REDIS_USERNAME", "default"),
  password    : env("REDIS_PASSWORD"),
  db          : env("REDIS_DATABASE", "0"),
  legacyMode  : env("REDIS_LEGACY_MODE", false),
  autoConnect : env("REDIS_AUTO_CONNECT", false),
  exitOnConnectionFailure: env("REDIS_EXIT_ON_CONNECT_FAIL", false),
};
