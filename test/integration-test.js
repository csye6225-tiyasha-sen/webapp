import express from "express";
import request from "supertest";
import app from "../app.js";
import db from "../config/dbConfig.js";

before((done) => {
  app.listen(4000);
  done();
});

describe("Validate if account exists", function () {
  it("POST /v1/user - Create an account and respond with JSON", function (done) {
    request(app)
      .post("/v1/user")
      .send({
        first_name: "test",
        last_name: "Sen",
        password: "Ti123",
        username: "ti.seeer@northeastern.edu",
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      //.expect("Content-Type", "text/html; charset=utf-8")
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  //Comments for review today

  it("GET /v1/user/self - Validate the created account exists", function (done) {
    request(app)
      .get("/v1/user/self")
      .auth("ti.seeer@northeastern.edu", "Ti123")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
      .timeout(1000);
  });
});

describe("Validate if account exists", function () {
  it("PUT /v1/user - Create an account and respond with JSON", function (done) {
    request(app)
      .put("/v1/user/self")
      .send({
        first_name: "testt",
        last_name: "Sen",
        password: "Tiyasha123",
      })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .auth("ti.seeer@northeastern.edu", "Ti123")
      .expect(204)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("GET /v1/user/self - Validate the account got updated", function (done) {
    request(app)
      .get("/v1/user/self")
      .auth("ti.seeer@northeastern.edu", "Tiyasha123")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      })
      .timeout(1000);
  });
});

after(function (done) {
  db.userModel.destroy({ where: { username: "ti.seeer@northeastern.edu" } });
  done();
});
