const request = require("supertest");
const app = require("../app");
const mongodb = require("../data/database");

jest.mock("../data/database", () => ({
  getDatabase: jest.fn(() => ({
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        find: jest.fn(),
        findOne: jest.fn(),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn()
      }))
    }))
  }))
}));

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const mockUsers = [
      { firstName: "John", lastName: "Doe" },
      { firstName: "Jane", lastName: "Smith" }
    ];

    const collection = mongodb.getDatabase().db().collection();
    collection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue(mockUsers)
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});

describe("GET /users/:id", () => {
  it("should return a single user", async () => {
    const mockUser = { firstName: "John", lastName: "Doe" };
    const userId = "67ec87871663f3ed9943ec6f";

    const collection = mongodb.getDatabase().db().collection();
    collection.findOne.mockResolvedValue(mockUser);

    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });
});
