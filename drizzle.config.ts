import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config();

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  tablesFilter: ["!mastra*"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
