import { verifyToken } from "../../../src/middlewares/verifyToken";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

jest.mock("jsonwebtoken");

describe("verifyToken middleware", () => {
  let req: any;
  let res: any;
  let next: NextFunction;

  beforeEach(() => {
    req = { cookies: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.APP_SECRET = "test_secret";
  });

  it("should return 401 if no token is present", () => {
    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Non autorisé" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if the token is valid", () => {
    req.cookies.auth_token = "valid_token";
    const decoded = { id: 1, role: "admin" };
    (jwt.verify as jest.Mock).mockReturnValue(decoded);

    verifyToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith("valid_token", "test_secret");
    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if the token is invalid", () => {
    req.cookies.auth_token = "invalid_token";
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
