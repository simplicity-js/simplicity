"use strict";

const env = require("@simplicityjs/framework/env");
const resourcePath = require("@simplicityjs/framework/resource-path");


module.exports = {
  /*
   * -------------------
   * View Storage Paths
   * -------------------
   *
   * Here you may specify an array of paths that should be checked
   * when loading view templates from disk.
   */
  paths: [
    resourcePath("views"),
  ],

  /*
   * ----------------------
   * View Template Engine
   * ----------------------
   *
   * The templating engine to use for your views.
   * You can specify any templating engine supported by Express.
   * If you specify a template engine different from pug,
   * make sure to install the appropriate package for the engine.
   */
  engine: env("VIEW_ENGINE", "pug"),
};
