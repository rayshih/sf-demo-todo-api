import { createApp } from "./app";
import { log } from "./logger";

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST ?? "0.0.0.0";

const app = createApp();

app.listen(port, host, () => {
  log(`listening on ${host}:${port}`);
});
