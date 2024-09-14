"use strict";

const createConfigObject = require("@simplicityjs/framework/config")();

const config = createConfigObject(__dirname, ["config.spec.js", "index.js"]);

module.exports = config;
