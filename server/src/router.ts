import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";
import authActions from "./modules/auth/authActions";
import userActions from "./modules/user/userActions";
import skillActions from "./modules/skill/skillActions";
import projectActions from "./modules/project/projectActions";
import taskActions from "./modules/task/taskActions";

import { verifyToken, isAdmin, isManager } from "./middlewares/authMiddleware";

router.get("/items", itemActions.browse);
router.get("/items/:id", itemActions.read);
router.post("/items", itemActions.add);

// Define authentication-related routes
router.post("/login", authActions.login);
router.get("/logout", authActions.logout);
router.get("/me", verifyToken, authActions.me);

// Define user-related routes
router.get("/users", verifyToken, isManager, userActions.browse);
router.get("/stats", verifyToken, isManager, userActions.getStats);
router.get("/users/:id", verifyToken, isAdmin, userActions.read);

router.post("/users", verifyToken, isAdmin, userActions.add);
router.put("/users/:id", verifyToken, isAdmin, userActions.edit);
router.delete("/users/:id", verifyToken, isAdmin, userActions.destroy);

// Define skill-related routes
router.get("/skills", verifyToken, skillActions.browse);
router.post("/skills", verifyToken, isAdmin, skillActions.add);
router.delete("/skills/:id", verifyToken, isAdmin, skillActions.destroy);
router.get("/me/skills", verifyToken, skillActions.readUserSkills);
router.post("/me/skills", verifyToken, skillActions.updateUserSkill);

// Define project-related routes
router.get("/projects", verifyToken, projectActions.browse);
router.get("/projects/:id", verifyToken, projectActions.read);
router.post("/projects", verifyToken, isManager, projectActions.add);
router.put("/projects/:id", verifyToken, isManager, projectActions.edit);
router.delete("/projects/:id", verifyToken, isManager, projectActions.destroy);
router.get("/me/projects", verifyToken, projectActions.readMyProjects);

// Define task-related routes
router.get("/tasks", verifyToken, taskActions.browse);
router.get("/tasks/:id", verifyToken, taskActions.read);
router.post("/tasks", verifyToken, isManager, taskActions.add);
router.put("/tasks/:id", verifyToken, taskActions.edit);
router.delete("/tasks/:id", verifyToken, isManager, taskActions.destroy);
router.get("/me/tasks", verifyToken, taskActions.readMyTasks);

/* ************************************************************************* */

export default router;
