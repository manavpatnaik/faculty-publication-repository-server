const app = require("../index");
const request = require("supertest");

describe("Comments", () => {
  describe("Get all comments", () => {
    test("Should return 200 as status code", async () => {
      const response = await request(app).get("/comment");
      expect(response.statusCode).toBe(200);
    });
    test("Should return success as true", async () => {
      const response = await request(app).get("/comment");
      expect(response.body.success).toBe(true);
    });
    test("Shoud return data as an array", async () => {
      const response = await request(app).get("/comment");
      expect(typeof response.body.data).toBe("object");
    });
  });

  describe("Get Single Comment", () => {
    describe("When valid comment ID is provided", () => {
      test("Should return 200 HTTP status code", async () => {
        const response = await request(app).get(
          "/comment/62185bf6be5fcbcffb4bbe04"
        );
        expect(response.statusCode).toBe(200);
      });

      test("Should return success as true", async () => {
        const response = await request(app).get(
          "/comment/62185bf6be5fcbcffb4bbe04"
        );
        expect(response.body.success).toBe(true);
      });

      test("Shoud return data as an array", async () => {
        const response = await request(app).get(
          "/comment/62185bf6be5fcbcffb4bbe04"
        );
        expect(typeof response.body.data).toBe("object");
      });
    });

    describe("When invalid comment ID is provided", () => {
      test("Should return 400 HTTP status code", async () => {
        const response = await request(app).get("/comment/62185cffb4bbe04");
        expect(response.statusCode).toBe(400);
      });

      test("Should return success as false", async () => {
        const response = await request(app).get("/comment/62185cffb4bbe04");
        expect(response.body.success).toBe(false);
      });
    });
  });
});
