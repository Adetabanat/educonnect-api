const request = require('supertest');
const app = require('../app');
const mongodb = require('../data/database');

describe("Students API", () => {
  beforeAll(async () => {
    await mongodb.connect();
  });

  afterAll(async () => {
    await mongodb.close();
  });

  it("should create a student", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        dateOfBirth: "2000-01-01",
        classId: "1A"
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Student created successfully");
  });

  it("should get all students", async () => {
    const response = await request(app).get("/students");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a student by id", async () => {
    const response = await request(app).get("/students/1");
    expect(response.status).toBe(404); // Student with ID 1 doesn't exist in test data
  });

});
