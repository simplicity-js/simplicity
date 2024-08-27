const env = require("@simplicityjs/framework/env");
const storagePath = require("@simplicityjs/framework/storage-path");


module.exports = {
  logExceptions : env("LOG_UNCAUGHT_EXCEPTIONS", true),
  logRejections : env("LOG_PROMISE_REJECTIONS", true),
  logToConsole  : env("LOG_TO_CONSOLE", true),
  logToFile     : env("LOG_TO_FILE", true),

  /*
   * The location to place log files if logToFile is enabled.
   * Required if the `logToFile` option is true.
   */
  logDir: storagePath("app/logs"),


  /*
   *--------------------------------------------------------------------------
   * Log Channels
   *--------------------------------------------------------------------------
   *
   * Here you may configure the log channels for your application. Out of
   * the box, Simple Framework uses the Winston logging library. This gives
   * you a variety of powerful log handlers to utilize.
   *
   * For example (Using LogTail):
   * const { Logtail } = require("@logtail/node");
   * const { LogtailTransport } = require("@logtail/winston");
   *
   * const logtail = new Logtail(YOUR_LOGTAIL_SOURCE_TOKEN);
   */
  channels: [
    /* new LogtailTransport(logtail), */
  ],
};
