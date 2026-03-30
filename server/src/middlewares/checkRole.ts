import type { RequestHandler } from "express";

/* const isAdmin: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Accès refusé" }); // : Administrateur requis
    return;
  }
  next();
};

const isManager: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "admin" && req.user?.role !== "manager") {
    res.status(403).json({ message: "Accès refusé" }); // : Manager requis
    return;
  }
  next();
};

const isCollaborator: RequestHandler = (req, res, next) => {
  if (req.user?.role !== "collaborator") {
    res.status(403).json({ message: "Accès refusé" }); // : Collaborator requis
    return;
  }
  next();
};
 */
const checkRole = (role: string, role2?: string): RequestHandler => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      if (role2 && req.user?.role === role2) {
        next();
        return;
      }
      res.status(403).json({ message: "Accès refusé" }); // : Role requis
      return;
    }
    next();
  };
};
export { checkRole };
