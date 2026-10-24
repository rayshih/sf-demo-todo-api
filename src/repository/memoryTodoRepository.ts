import type { NewTodo, Todo, TodoPatch } from "../types/todo";
import type { TodoRepository } from "./todoRepository";

export class MemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [];
  private nextId = 1;

  create(input: NewTodo): Todo {
    const todo: Todo = {
      id: String(this.nextId),
      title: input.title,
      completed: input.completed,
    };
    this.nextId += 1;
    this.todos.push(todo);
    return { ...todo };
  }

  get(id: string): Todo | null {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) {
      return null;
    }
    return { ...todo };
  }

  list(): Todo[] {
    return this.todos.map((todo) => ({ ...todo }));
  }

  update(id: string, patch: TodoPatch): Todo | null {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const current = this.todos[index];
    const updated: Todo = {
      id: current.id,
      title: patch.title !== undefined ? patch.title : current.title,
      completed:
        patch.completed !== undefined ? patch.completed : current.completed,
    };
    this.todos[index] = updated;
    return { ...updated };
  }

  delete(id: string): boolean {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }

    this.todos.splice(index, 1);
    return true;
  }
}
