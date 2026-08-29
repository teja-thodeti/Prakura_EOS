import app from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function start() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`[server] ExpenseOS API running on http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  console.error("[server] Failed to start:", err);
  process.exit(1);
});
