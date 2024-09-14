"use strict";

const env = require("@simplicityjs/framework/env");


module.exports = {
  /*
   * -------------------
   * Application Name
   * ------------------
   *
   * This the name of your application. It is used in cases when the
   * framework needs to place the application's name in a notification or
   * any other location as required by the application or its packages.
   */
  name: env("APP_NAME"),

  /*
   * -------------------
   * Application Port
   * ------------------
   *
   * This is the port your application should run on.
   * It is used when the port is not specified via any other CLI means.
   */
  port: env("APP_PORT"),

  /*
   * -------------------
   * Application URL
   * ------------------
   *
   * This is your application's fully qualified URL.
   */
  url: env("APP_URL", "http://localhost"),

  /*
   * ------------------------
   * Application Environment
   * ------------------------
   *
   * This value determines the "environment" your application is currently
   * running in. It helps to determine configuration preferences
   * for application services.
   */
  environment: env("NODE_ENV", "production").toLowerCase(),

  debug: env("DEBUG"),

  /*
   * ------------------------
   * Application Timezone
   * ------------------------
   *
   * This is the default timezone for your application, which
   * will be used by the date and time functions.
   */
  timezone: env("TIMEZONE", "UTC").toUpperCase(),

  /*
   * ------------------------
   * Maintenance Mode Driver
   * ------------------------
   *
   * This option determines the driver used to determine and
   * manage Simplicity's "maintenance mode" status. The "redis" driver
   * makes it possible to control maintenance mode across multiple machines.
   *
   * Supported drivers include: "file" and "redis"
   */
  maintenance: {
    driver: "file",
  },
};
