const level = process.env.LOG_LEVEL ?? "info";

export function log(message: string): void {
  if (level === "silent") {
    return;
  }

  console.log(`[${level}] ${message}`);
}
