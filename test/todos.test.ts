import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";

describe("POST /todos", () => {
  it("creates a todo and defaults completed to false", async () => {
    const response = await request(createApp())
      .post("/todos")
      .send({ title: "Buy milk" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: "1",
      title: "Buy milk",
      completed: false,
    });
  });

  it("stores completed when it is provided", async () => {
    const response = await request(createApp())
      .post("/todos")
      .send({ title: "Walk the dog", completed: true });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: "1",
      title: "Walk the dog",
      completed: true,
    });
  });

  it("assigns incrementing ids", async () => {
    const app = createApp();

    const first = await request(app).post("/todos").send({ title: "First" });
    const second = await request(app).post("/todos").send({ title: "Second" });

    expect(first.body.id).toBe("1");
    expect(second.body.id).toBe("2");
  });

  it("rejects a missing title", async () => {
    const response = await request(createApp()).post("/todos").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: expect.any(String) });
  });

  it("rejects an empty title", async () => {
    const response = await request(createApp())
      .post("/todos")
      .send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Title is required" });
  });

  it("rejects a non-string title", async () => {
    const response = await request(createApp())
      .post("/todos")
      .send({ title: 12 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: expect.any(String) });
  });
});

describe("GET /todos", () => {
  it("returns an empty list", async () => {
    const response = await request(createApp()).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("returns created todos in insertion order", async () => {
    const app = createApp();
    await request(app).post("/todos").send({ title: "First" });
    await request(app)
      .post("/todos")
      .send({ title: "Second", completed: true });

    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toMatchObject({
      id: "1",
      title: "First",
      completed: false,
    });
    expect(response.body[1]).toMatchObject({
      id: "2",
      title: "Second",
      completed: true,
    });
  });
});

describe("GET /todos/:id", () => {
  it("returns the todo", async () => {
    const app = createApp();
    await request(app).post("/todos").send({ title: "Buy milk" });

    const response = await request(app).get("/todos/1");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: "1",
      title: "Buy milk",
      completed: false,
    });
  });

  it("returns 404 when the todo does not exist", async () => {
    const response = await request(createApp()).get("/todos/missing");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: "Todo not found" });
  });
});

describe("PATCH /todos/:id", () => {
  it("updates the title and leaves completed unchanged", async () => {
    const app = createApp();
    await request(app).post("/todos").send({ title: "Buy milk" });

    const response = await request(app)
      .patch("/todos/1")
      .send({ title: "Buy bread" });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: "1",
      title: "Buy bread",
      completed: false,
    });

    const fetched = await request(app).get("/todos/1");
    expect(fetched.body).toMatchObject({
      title: "Buy bread",
      completed: false,
    });
  });

  it("updates completed only", async () => {
    const app = createApp();
    await request(app).post("/todos").send({ title: "Buy milk" });

    const response = await request(app)
      .patch("/todos/1")
      .send({ completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: "1",
      title: "Buy milk",
      completed: true,
    });
  });

  it("rejects an empty patch", async () => {
    const app = createApp();
    await request(app).post("/todos").send({ title: "Buy milk" });

    const response = await request(app).patch("/todos/1").send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "At least one field is required" });
  });

  it("rejects an empty title", async () => {
    const app = createApp();
    await request(app).post("/todos").send({ title: "Buy milk" });

    const response = await request(app).patch("/todos/1").send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Title is required" });
  });
});
