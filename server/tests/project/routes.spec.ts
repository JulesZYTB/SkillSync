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

describe("Project Routes", () => {
  describe("GET /api/projects", () => {
    it("should fetch projects successfully for authenticated user", async () => {
      const rows = [{ id: 1, title: "Project 1", description: "Desc", owner_id: 1 }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []] as unknown as [Rows, Fields]);

      const response = await supertest(app)
        .get("/api/projects")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/projects/:id", () => {
    it("should fetch a single project", async () => {
      const rows = [{ id: 1, title: "Project 1", description: "Desc", owner_id: 1 }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []] as unknown as [Rows, Fields]);

      const response = await supertest(app)
        .get("/api/projects/1")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows[0]);
    });
  });

  describe("POST /api/projects", () => {
    it("should add a new project successfully for manager", async () => {
      const result = { insertId: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []] as unknown as [Result, Fields]);

      const response = await supertest(app)
        .post("/api/projects")
        .set("Cookie", [`auth_token=${generateToken("manager")}`])
        .send({ title: "New Project", description: "Desc", owner_id: 1 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ insertId: 1 });
    });

    it("should fail for collaborator", async () => {
      const response = await supertest(app)
        .post("/api/projects")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`])
        .send({ title: "New Project", description: "Desc", owner_id: 1 });

      expect(response.status).toBe(403);
    });
  });

  describe("PUT /api/projects/:id", () => {
    it("should update project successfully for manager", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []] as unknown as [Result, Fields]);

      const response = await supertest(app)
        .put("/api/projects/1")
        .set("Cookie", [`auth_token=${generateToken("manager")}`])
        .send({ title: "Updated Project" });

      expect(response.status).toBe(204);
    });
  });

  describe("DELETE /api/projects/:id", () => {
    it("should delete project successfully for manager", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []] as unknown as [Result, Fields]);

      const response = await supertest(app)
        .delete("/api/projects/1")
        .set("Cookie", [`auth_token=${generateToken("manager")}`]);

      expect(response.status).toBe(204);
    });
  });

  describe("GET /api/me/projects", () => {
    it("should return user projects", async () => {
      const rows = [{ id: 1, title: "Project 1" }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []] as unknown as [Rows, Fields]);

      const response = await supertest(app)
        .get("/api/me/projects")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });
});
