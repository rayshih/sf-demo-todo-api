import express from "express";
import { MemoryTodoRepository } from "./repository/memoryTodoRepository";
import type { TodoRepository } from "./repository/todoRepository";
import { registerRoutes } from "./routes";

export function createApp(
  repository: TodoRepository = new MemoryTodoRepository(),
): express.Express {
  const app = express();
  app.set("env", process.env.NODE_ENV ?? "development");
  app.use(express.json());
  registerRoutes(app, repository);
  return app;
}
