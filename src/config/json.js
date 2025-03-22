"use strict";

const env = require("@simplicityjs/framework/env");


/*
 * --------------------------------------------------------------------------
 * Configuration options for the express.json() middleware
 * --------------------------------------------------------------------------
 *
 * Here you may configure your settings for the express.json() middleware
 * such as the maximum limit of request body data.
 */
module.exports = {
  limit: env("REQUEST_BODY_LIMIT", "100kb"),
};
