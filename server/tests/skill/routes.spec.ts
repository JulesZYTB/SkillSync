import supertest from "supertest";
import app from "../../src/app";
import databaseClient from "../../database/client";
import type { Rows, Result, Fields } from "../../database/client";
import jwt from "jsonwebtoken";

process.env.APP_SECRET = "test_secret";

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

const generateToken = (role: "collaborator" | "manager" | "admin" = "collaborator") => {
  return jwt.sign({ id: 1, role }, process.env.APP_SECRET || "default_secret");
};

describe("Skill Routes", () => {
  describe("GET /api/skills", () => {
    it("should fetch skills successfully for authenticated user", async () => {
      const rows = [{ id: 1, label: "Javascript" }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []] as unknown as [Rows, Fields]);

      const response = await supertest(app)
        .get("/api/skills")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("POST /api/skills", () => {
    it("should add a new skill successfully for admin", async () => {
      const result = { insertId: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []] as unknown as [Result, Fields]);

      const response = await supertest(app)
        .post("/api/skills")
        .set("Cookie", [`auth_token=${generateToken("admin")}`])
        .send({ label: "React" });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ insertId: 1 });
    });

    it("should fail for collaborator", async () => {
      const response = await supertest(app)
        .post("/api/skills")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`])
        .send({ label: "React" });

      expect(response.status).toBe(403);
    });
  });

  describe("DELETE /api/skills/:id", () => {
    it("should delete skill successfully for admin", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []] as unknown as [Result, Fields]);

      const response = await supertest(app)
        .delete("/api/skills/1")
        .set("Cookie", [`auth_token=${generateToken("admin")}`]);

      expect(response.status).toBe(204);
    });
  });

  describe("GET /api/me/skills", () => {
    it("should return user skills", async () => {
      const rows = [{ label: "Javascript", level: 5 }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []] as unknown as [Rows, Fields]);

      const response = await supertest(app)
        .get("/api/me/skills")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("POST /api/me/skills", () => {
    it("should update user skill level", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []] as unknown as [Result, Fields]);

      const response = await supertest(app)
        .post("/api/me/skills")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`])
        .send({ skill_id: 1, level: 4 });

      expect(response.status).toBe(204);
    });
  });
});
