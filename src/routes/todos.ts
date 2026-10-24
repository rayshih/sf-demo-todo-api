import { Router } from "express";
import type { TodoRepository } from "../repository/todoRepository";
import { createTodoSchema, updateTodoSchema } from "../validation/todoSchemas";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function todosRouter(repository: TodoRepository): Router {
  const router = Router();

  router.get("/todos", (req, res) => {
    const limit = parseLimit(req.query.limit);
    const todos = repository.list();
    res.status(200).json(limit === undefined ? todos : todos.slice(0, limit));
  });

  router.post("/todos", (req, res) => {
    const parsed = createTodoSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request";
      res.status(400).json({ error: message });
      return;
    }

    const todo = repository.create({
      title: parsed.data.title,
      completed: parsed.data.completed ?? false,
    });
    res.status(201).json(todo);
  });

  router.get("/todos/:id", (req, res) => {
    const todo = repository.get(req.params.id);
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.status(200).json(todo);
  });

  router.patch("/todos/:id", (req, res) => {
    const parsed = updateTodoSchema.safeParse(req.body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request";
      res.status(400).json({ error: message });
      return;
    }

    const updated = repository.update(req.params.id, {
      title: parsed.data.title,
      completed: parsed.data.completed,
    });
    res.status(200).json(updated);
  });

  router.delete("/todos/:id", (req, res) => {
    const deleted = repository.delete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }

    res.status(204).end();
  });

  return router;
}

function parseLimit(raw: unknown): number | undefined {
  if (raw === undefined) {
    return DEFAULT_LIMIT;
  }

  const value = typeof raw === "string" ? Number(raw) : Number.NaN;
  if (!Number.isInteger(value) || value < 1 || value > MAX_LIMIT) {
    return undefined;
  }

  return value;
}
