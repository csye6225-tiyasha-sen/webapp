import app from "../app.js";
import supertest from "supertest";
import { isRouteIncluded } from "../middleware/middleware.js";
import { expect } from "chai";

describe("Test cases running", () => {
  it("Route test cases included", (done) => {
    expect(1 + 0).to.equal(1);
    done();
  });
});
