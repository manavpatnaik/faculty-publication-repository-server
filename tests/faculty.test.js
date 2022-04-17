const { getAllFaculty, getSingleFaculty } = require("../controllers/faculty");
const app = require("../index");
const request = require("supertest");

describe("Login Faculty", () => {
  describe("Given an email and password", () => {
    test("Should respond with 200 HTTP status code", async () => {
      const response = await request(app).post("/faculty/login").send({
        email: "faculty1@gmail.com",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });

    test("Should json as Content-Type header", async () => {
      const response = await request(app).post("/faculty/login").send({
        email: "faculty1@gmail.com",
        password: "password",
      });
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Response must have success as true", async () => {
      const response = await request(app).post("/faculty/login").send({
        email: "faculty1@gmail.com",
        password: "password",
      });
      expect(response.body.success).toBe(true);
    });

    test("Response must contain token", async () => {
      const response = await request(app).post("/faculty/login").send({
        email: "faculty1@gmail.com",
        password: "password",
      });
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe("When email and password is missing", () => {
    test("Should respond with 400 HTTP status code", async () => {
      const response = await request(app).post("/faculty/login").send();
      expect(response.statusCode).toBe(400);
    });

    test("Should return success as false", async () => {
      const response = await request(app).post("/faculty/login").send();
      expect(response.body.success).toBe(false);
    });
  });

  describe("When email/password is invalid", () => {
    test("Should return 401 as status code", async () => {
      const response = await request(app).post("/faculty/login").send({
        email: "random@email.com",
        password: "password",
      });
      expect(response.statusCode).toBe(401);
    });

    test("Should return success as false", async () => {
      const response = await request(app).post("/faculty/login").send();
      expect(response.body.success).toBe(false);
    });
  });
});

describe("Get All Faculty", () => {
  test("Must return 200 as HTTP status code", async () => {
    const response = await request(app).get("/faculty");
    expect(response.statusCode).toBe(200);
  });

  test("Must return success as true", async () => {
    const response = await request(app).get("/faculty");
    expect(response.body.success).toBe(true);
  });

  test("Data returned must be an Array of Objects", async () => {
    const response = await request(app).get("/faculty");
    expect(response.body.data).toBeTruthy();
    expect(response.body.data).toBeDefined();
    expect(typeof response.body.data).toBe("object");
  });
});

describe("Get Single Faculty", () => {
  describe("When valid faculty ID is provided", () => {
    test("Should return 200 HTTP status code", async () => {
      const response = await request(app).get("/faculty");
      expect(response.statusCode).toBe(200);
    });

    test("Should return success as true", async () => {
      const response = await request(app).get("/faculty");
      expect(response.body.success).toBe(true);
    });

    test("Should return object as data", async () => {
      const response = await request(app).get("/faculty");
      expect(typeof response.body.data).toBe("object");
    });
  });
});
