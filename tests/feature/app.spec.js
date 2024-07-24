"use strict";

const request = require("supertest");
const { create: createApp } = require("@simplicityjs/framework/application");
const { STATUS_CODES, STATUS_TEXTS } = require(
  "@simplicityjs/framework/component/http");
const { chai } = require("../test-helper");

const app = createApp();


describe("Application", function() {
  let expect;
  const port = 5002;
  const host = `http://localhost:${port}`;

  before(async function() {
    expect = (await chai()).expect;
    app.listen(port);
  });

  after(function(done) {
    app.close(done);
  });

  describe("Routes", function webRouter() {
    describe("/", function homePage() {
      it("should serve the web base path", function(done) {
        request(host)
          .get("/")
          .expect(200)
          .expect("Content-Type", "text/html; charset=utf-8")
          .end((err, res) => {
            if(err) {
              return done(err);
            }

            expect(res.text).to.match(/class="page-body.*"/);
            done();
          });
      });
    });

    describe("/download", function downloadPage() {
      it("should download a file", function downloadPage(done) {
        request(host)
          .get("/download")
          .expect(200)
          .expect("Content-Type", "application/octet-stream")
          .expect("Content-Disposition", "attachment; filename=\"home.pug\"")
          .end(done);
      });
    });

    describe("/api", function homePage() {
      it("should serve the API base path", function(done) {
        request(host)
          .get("/api")
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8")
          .end((err, res) => {
            if(err) {
              return done(err);
            }

            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("success", true);
            expect(res.body).to.have.property("message", STATUS_TEXTS[STATUS_CODES.HTTP_OK]);
            done();
          });
      });
    });

    describe("A non existent path", function pageNotFound() {
      it("should return a 404 error page", function(done) {
        request(host)
          .get("/iDontExist")
          .expect(404)
          .expect("Content-Type", "text/html; charset=utf-8")
          .end((err, res) => {
            if(err) {
              return done(err);
            }

            expect(res.text).to.match(/<title>Not Found |/);
            expect(res.text).to.match(/class="page-body.*"/);
            done();
          });
      });
    });
  });
});
