import userRepository from "../../../src/modules/user/userRepository";
import databaseClient from "../../../database/client";

describe("UserRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should read a user by ID", async () => {
    const mockUser = { id: 1, full_name: "Jean", email: "jean@test.com", role: "admin" };
    const spy = jest.spyOn(databaseClient, "query").mockResolvedValue([[mockUser]] as any);

    const user = await userRepository.read(1);

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("select id, full_name, email, role from users where id = ?"),
      [1]
    );
    expect(user).toEqual(mockUser);
  });

  it("should create a user and return the insertId", async () => {
    const newUser = { full_name: "Paul", email: "paul@test.com", password_hash: "hash", role: "collaborator" as const };
    const spy = jest.spyOn(databaseClient, "query").mockResolvedValue([{ insertId: 10 }] as any);

    const insertId = await userRepository.create(newUser);

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("insert into users"),
      ["Paul", "paul@test.com", "hash", "collaborator"]
    );
    expect(insertId).toBe(10);
  });
});
