"use strict";

/*
 * Configuration for compression of static assets.
 */
module.exports = {
  /*
   * The content types (Content-Type header) to compress.
   * This can be an array or a string delimited by any of the following:
   *   - space
   *   - comma (,)
   *   - semicolon (;)
   *   - pipe (|)
   * For the default content types that should be compressed,
   * see http://www.senchalabs.org/connect/compress.html#exports.filter
   */
  types: [
    "css", "html", "javascript", "json", "text", "dart", "image/svg+xml",
    "application/x-font-ttf", "application/vnd.ms-opentype",
    "application/vnd.ms-fontobject"
  ],

  /*
   * Minimum file size threshold for compression to be applied.
   * Files with a size below this threshold (default: 1024 bytes)
   * won't get compressed.
   */
  threshold: 1024,

  /*
   * The compression level from -1 (default)
   * through 0 (fastest but least compression) to 9 (slowest but highest compression).
   * See https://www.npmjs.com/package/compression#level for details
   */
  level: -1,

  /*
   * A request header, that when sent enables us to bypass compression.
   * Set this to a falsy value to prevent clients from bypassing compression.
   * You can then choose to bypass compression on a case-by-case basis
   * for specific routes you want.
   */
  bypassHeader: "x-no-compression",

  /*
   * If true, disable compression of static assets
   */
  disable: false,
};
