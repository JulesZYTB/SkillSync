// to make the file a module and avoid the TypeScript error
export type {};

import { UserPayload } from "../auth";

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
