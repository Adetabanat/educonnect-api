const request = require("supertest");
const app = require("../app");
const mongodb = require("../data/database");

jest.mock("../data/database", () => ({
  getDatabase: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn(),
        findOne: jest.fn(),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn()
      })
    })
  })
}));

describe("GET /users", () => {
  it("should return a list of users", async () => {
    const mockUsers = [
      { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" }
    ];

    const collection = mongodb.getDatabase().db().collection();
    collection.find.mockReturnValue({
      toArray: jest.fn().mockResolvedValue(mockUsers)
    });

    const response = await request(app).get("/users"); // ✅ corrected path

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});

describe("GET /users/:id", () => {
  it("should return a single user", async () => {
    const mockUser = { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" };
    const userId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().findOne.mockResolvedValue(mockUser); // 👈 not find()

    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });
});
