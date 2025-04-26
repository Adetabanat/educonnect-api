const request = require("supertest");
const app = require("../app");
const mongodb = require("../data/database");

jest.mock("../data/database", () => ({
  getDatabase: jest.fn().mockReturnValue({
    db: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        find: jest.fn(),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn()
      })
    })
  })
}));

describe("GET /user", () => {
  it("should return a list of users", async () => {
    const mockUsers = [
      { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" }
    ];

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue(mockUsers)
    });

    const response = await request(app).get("/user");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });
});

describe("GET /user/:id", () => {
  it("should return a single user", async () => {
    const mockUser = { id: "67ec87871663f3ed9943ec6f", firstName: "John", lastName: "Doe", userName: "johndoe" };
    const userId = "67ec87871663f3ed9943ec6f";

    mongodb.getDatabase().db().collection().find.mockResolvedValue({
      toArray: jest.fn().mockResolvedValue([mockUser])
    });

    const response = await request(app).get(`/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });
});
