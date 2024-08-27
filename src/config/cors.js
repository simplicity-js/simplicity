const env = require("@simplicityjs/framework/env");

const REGEX = /[\s+,;|]+/;
const split = str => str.split(REGEX).map(s => s.trim());


/*
 * --------------------------------------------------------------------------
 * Cross-Origin Resource Sharing (CORS) Configuration
 * --------------------------------------------------------------------------
 *
 * Here you may configure your settings for cross-origin resource sharing (CORS).
 * This determines what cross-origin operations may execute in web browsers.
 */
module.exports = {
  allowedHeaders: split(env("ALLOWED_HEADERS")),
  allowedMethods: split(env("ALLOWED_METHODS").toUpperCase()),
  allowedOrigins: split(env("ALLOWED_ORIGINS")),
  credentials: env("USE_CREDENTIALS", false),
};
