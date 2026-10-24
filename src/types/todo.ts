export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface NewTodo {
  title: string;
  completed: boolean;
}

export interface TodoPatch {
  title?: string;
  completed?: boolean;
}
