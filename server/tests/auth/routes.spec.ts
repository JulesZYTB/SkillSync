import supertest from "supertest";
import app from "../../src/app";
import databaseClient from "../../database/client";
import type { Rows } from "../../database/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

process.env.APP_SECRET = "test_secret";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

describe("Auth Routes", () => {
  describe("POST /api/login", () => {
    it("should login successfully with correct credentials", async () => {
      const user = {
        id: 1,
        email: "test@example.com",
        password_hash: "hashed_password",
        full_name: "Test User",
        role: "admin",
      };

      jest.spyOn(databaseClient, "query").mockImplementation(async (sql: any) => {
        const query = typeof sql === "string" ? sql.toLowerCase() : "";
        if (query.includes("from users where email = ?")) {
          return [[user], []] as [Rows, any];
        }
        return [[], []] as [Rows, any];
      });

      jest.spyOn(bcrypt, "compare").mockImplementation(async () => true);

      const response = await supertest(app)
        .post("/api/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      });
      expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should fail with incorrect credentials", async () => {
      const user = {
        id: 1,
        email: "test@example.com",
        password_hash: "hashed_password",
        full_name: "Test User",
        role: "admin",
      };

      jest.spyOn(databaseClient, "query").mockImplementation(async (sql: any) => {
        const query = typeof sql === "string" ? sql.toLowerCase() : "";
        if (query.includes("from users where email = ?")) {
          return [[user], []] as [Rows, any];
        }
        return [[], []] as [Rows, any];
      });

      jest.spyOn(bcrypt, "compare").mockImplementation(async () => false);

      const response = await supertest(app)
        .post("/api/login")
        .send({ email: "test@example.com", password: "wrongpassword" });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Identifiants invalides");
    });
  });

  describe("GET /api/logout", () => {
    it("should clear cookie and return 204", async () => {
      const response = await supertest(app).get("/api/logout");
      expect(response.status).toBe(204);
      // Wait, clearCookie should set an expired cookie or something similar
      expect(response.headers["set-cookie"][0]).toContain("auth_token=;");
    });
  });

  describe("GET /api/me", () => {
    it("should return user info if authenticated", async () => {
      const user = {
        id: 1,
        email: "test@example.com",
        full_name: "Test User",
        role: "admin",
      };

      // Mock verifyToken by providing a valid cookie and secret
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.APP_SECRET || "default_secret");

      jest.spyOn(databaseClient, "query").mockImplementation(async (sql: any) => {
        const query = typeof sql === "string" ? sql.toLowerCase() : "";
        if (query.includes("from users where id = ?")) {
          return [[user], []] as [Rows, any];
        }
        return [[], []] as [Rows, any];
      });

      const response = await supertest(app)
        .get("/api/me")
        .set("Cookie", [`auth_token=${token}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(user);
    });

    it("should fail if not authenticated", async () => {
      const response = await supertest(app).get("/api/me");
      expect(response.status).toBe(401);
    });
  });
});
