import { checkRole } from "../../../src/middlewares/checkRole";
import type { Request, Response, NextFunction } from "express";

describe("checkRole middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call next() if the user has the required role", () => {
    req = { user: { id: 1, role: "admin", email: "test@test.com", full_name: "test" } as any };
    const middleware = checkRole("admin");

    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should call next() if the user has one of the authorized roles", () => {
    req = { user: { id: 1, role: "manager", email: "test@test.com", full_name: "test" } as any };
    const middleware = checkRole("admin", "manager");

    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 403 if the user does not have the correct role", () => {
    req = { user: { id: 1, role: "collaborator", email: "test@test.com", full_name: "test" } as any };
    const middleware = checkRole("admin");

    middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Accès refusé" });
    expect(next).not.toHaveBeenCalled();
  });
});
