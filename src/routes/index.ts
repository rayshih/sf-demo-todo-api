import type { Express } from "express";
import type { TodoRepository } from "../repository/todoRepository";
import { healthRouter } from "./health";
import { todosRouter } from "./todos";

export function registerRoutes(app: Express, repository: TodoRepository): void {
  app.use(healthRouter());
  app.use(todosRouter(repository));
}
