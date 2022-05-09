const app = require("../index");
const request = require("supertest");

describe("Publications", () => {
  describe("Get All publications", () => {
    test("Should respond with 200 HTTP status code", async () => {
      const response = await request(app).get("/publication");
      expect(response.statusCode).toBe(200);
    });

    test("Should json as Content-Type header", async () => {
      const response = await request(app).get("/publication");
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Response must have success as true", async () => {
      const response = await request(app).get("/publication");
      expect(response.body.success).toBe(true);
    });
  });

  describe("Get Single Publication", () => {
    test("Should respond with 200 HTTP status code", async () => {
      const response = await request(app).get("/publication/621851bc67c00f6d6b475123");
      expect(response.statusCode).toBe(200);
    });

    test("Should json as Content-Type header", async () => {
      const response = await request(app).get("/publication/621851bc67c00f6d6b475123");
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Response must have success as true", async () => {
      const response = await request(app).get("/publication/621851bc67c00f6d6b475123");
      expect(response.body.success).toBe(true);
    });
  });
});
