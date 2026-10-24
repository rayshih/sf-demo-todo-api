import { z } from "zod";

const titleSchema = z.string().min(1, "Title is required");

export const createTodoSchema = z.object({
  title: titleSchema,
  completed: z.boolean().optional(),
});

export const updateTodoSchema = z
  .object({
    title: titleSchema.optional(),
    completed: z.boolean().optional(),
  })
  .refine(
    (value) => value.title !== undefined || value.completed !== undefined,
    { message: "At least one field is required" },
  );

export type CreateTodoBody = z.infer<typeof createTodoSchema>;
export type UpdateTodoBody = z.infer<typeof updateTodoSchema>;
