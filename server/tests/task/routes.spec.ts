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

const generateToken = (role: string = "collaborator") => {
  return jwt.sign({ id: 1, role }, process.env.APP_SECRET || "default_secret");
};

describe("Task Routes", () => {
  describe("GET /api/tasks", () => {
    it("should fetch tasks successfully for authenticated user", async () => {
      const rows = [{ id: 1, title: "Task 1", project_id: 1 }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

      const response = await supertest(app)
        .get("/api/tasks")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });

  describe("GET /api/tasks/:id", () => {
    it("should fetch a single task", async () => {
      const rows = [{ id: 1, title: "Task 1", project_id: 1 }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

      const response = await supertest(app)
        .get("/api/tasks/1")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows[0]);
    });
  });

  describe("POST /api/tasks", () => {
    it("should add a new task successfully for manager", async () => {
      const result = { insertId: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

      const response = await supertest(app)
        .post("/api/tasks")
        .set("Cookie", [`auth_token=${generateToken("manager")}`])
        .send({ project_id: 1, title: "New Task", priority: "medium", assigned_to: 1 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ insertId: 1 });
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update task successfully for authenticated user", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

      const response = await supertest(app)
        .put("/api/tasks/1")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`])
        .send({ title: "Updated Task" });

      expect(response.status).toBe(204);
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete task successfully for manager", async () => {
      const result = { affectedRows: 1 } as Result;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

      const response = await supertest(app)
        .delete("/api/tasks/1")
        .set("Cookie", [`auth_token=${generateToken("manager")}`]);

      expect(response.status).toBe(204);
    });
  });

  describe("GET /api/me/tasks", () => {
    it("should return user tasks", async () => {
      const rows = [{ id: 1, title: "My Task" }] as Rows;
      jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

      const response = await supertest(app)
        .get("/api/me/tasks")
        .set("Cookie", [`auth_token=${generateToken("collaborator")}`]);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(rows);
    });
  });
});
