import supertest from "supertest";
import app from "../../src/app";
import databaseClient from "../../database/client";
import type { Rows, Result } from "../../database/client";
import jwt from "jsonwebtoken";

process.env.APP_SECRET = "test_secret";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

const generateToken = (role: string = "admin") => {
  return jwt.sign({ id: 1, role }, process.env.APP_SECRET || "default_secret");
};

describe("User Routes", () => {
  describe("GET /api/users", () => {
    it("should fetch users successfully for admin", async () => {
      const rows = [{ id: 1, full_name: "Admin User", email: "admin@test.com", role: "admin" }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

      const response = await supertest(app)
        .get("/api/users")
        .set("Cookie", [`auth_token=${generateToken("admin")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });

    it("should fail for non-admin/manager", async () => {
      const response = await supertest(app)
        .get("/api/users")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(403);
    });
  });

  describe("GET /api/stats", () => {
    it("should fetch stats successfully for manager", async () => {
      jest.spyOn(databaseClient, "query").mockImplementation(async (sql: any) => {
        const query = typeof sql === "string" ? sql.toLowerCase() : "";
        if (query.includes("count(*)") && query.includes("from users")) return [[{ role: "admin", count: 1 }], []] as [Rows, any];
        if (query.includes("count(*)") && query.includes("from projects")) return [[{ status: "active", count: 1 }], []] as [Rows, any];
        if (query.includes("count(*)") && query.includes("from skills")) return [[{ count: 5 }], []] as [Rows, any];
        if (query.includes("count(*)") && query.includes("from tasks")) return [[{ status: "todo", count: 1 }], []] as [Rows, any];
        return [[], []] as [Rows, any];
      });

      const response = await supertest(app)
        .get("/api/stats")
        .set("Cookie", [`auth_token=${generateToken("manager")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("users");
      expect(response.body).toHaveProperty("projects");
      expect(response.body).toHaveProperty("skills");
      expect(response.body).toHaveProperty("tasks");
    });
  });

  describe("GET /api/users/:id", () => {
    it("should fetch a single user successfully for admin", async () => {
      const rows = [{ id: 1, full_name: "Test User", email: "test@test.com", role: "collaborator" }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

      const response = await supertest(app)
        .get("/api/users/1")
        .set("Cookie", [`auth_token=${generateToken("admin")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows[0]);
    });

    it("should return 404 if user not found", async () => {
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [[], []]);

      const response = await supertest(app)
        .get("/api/users/999")
        .set("Cookie", [`auth_token=${generateToken("admin")}`]);

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/users", () => {
    it("should add a new user successfully for admin", async () => {
      const result = { insertId: 2 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

      const newUser = {
        full_name: "New User",
        email: "new@test.com",
        password: "password123",
        role: "collaborator"
      };

      const response = await supertest(app)
        .post("/api/users")
        .set("Cookie", [`auth_token=${generateToken("admin")}`])
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ insertId: 2 });
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update user successfully for admin", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

      const updatedUser = {
        full_name: "Updated Name",
        email: "updated@test.com",
        role: "manager"
      };

      const response = await supertest(app)
        .put("/api/users/1")
        .set("Cookie", [`auth_token=${generateToken("admin")}`])
        .send(updatedUser);

      expect(response.status).toBe(204);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user successfully for admin", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

      const response = await supertest(app)
        .delete("/api/users/1")
        .set("Cookie", [`auth_token=${generateToken("admin")}`]);

      expect(response.status).toBe(204);
    });
  });
});
