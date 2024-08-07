"use strict";

const chai = () => import("chai").then(chai => chai);

after(function(done) {
  /*
   * Ensure output is flushed before exiting.
   * https://github.com/nodejs/node-v0.x-archive/issues/8329#issuecomment-54778937
   */
  process.nextTick(() => process.exit(0));

  done();
});


module.exports = {
  chai,
};
