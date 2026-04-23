import express from "express";
import {
  createTodo,
  listTodos,
  getTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { validateObjectId } from "../middlewares/validateObjectId.middleware.js";

const router = express.Router();

/**
 * TODO: Define routes
 *
 * POST   /              → createTodo
 * GET    /              → listTodos
 * GET    /:id           → getTodo (use validateObjectId middleware)
 * PATCH  /:id           → updateTodo (use validateObjectId middleware)
 * PATCH  /:id/toggle    → toggleTodo (use validateObjectId middleware)
 * DELETE /:id           → deleteTodo (use validateObjectId middleware)
 */

// Your routes here
router.post("/", createTodo);
router.get("/", listTodos);

//Important route
router.patch("/:id/toggle", validateObjectId, toggleTodo);

//Generic
router.get("/:id", validateObjectId, getTodo);
router.patch("/:id", validateObjectId, updateTodo);
router.delete("/:id", validateObjectId, deleteTodo);

export default router;
