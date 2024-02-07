import app from "../app.js";
import { expect } from "chai";
import supertest from "supertest";

describe("HHTP status code 404 check", () => {
  it("Route not present : status 404", (done) => {
    //const result = 1 + 2;
    //expect(result).to.equal(3);
    supertest(app)
      .get("/healthzport")
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
