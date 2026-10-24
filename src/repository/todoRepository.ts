import type { NewTodo, Todo, TodoPatch } from "../types/todo";

export interface TodoRepository {
  create(input: NewTodo): Todo;
  get(id: string): Todo | null;
  list(): Todo[];
  update(id: string, patch: TodoPatch): Todo | null;
  delete(id: string): boolean;
}
