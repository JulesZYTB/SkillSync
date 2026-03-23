import type { UserPayload } from "../auth";

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
